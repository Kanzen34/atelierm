import nodemailer from 'nodemailer'

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER

// --------------------------------------------------
// Configuration
// --------------------------------------------------

const MAX_BODY_SIZE = 10 * 1024 // 10 KB

const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'winner', 'click here', 'buy now']

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function containsSpam(text) {
  const lowerText = text.toLowerCase()

  return spamKeywords.some((keyword) => lowerText.includes(keyword))
}

function isValidFrenchPhone(phone) {
  return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phone)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// --------------------------------------------------
// Netlify Function
// --------------------------------------------------

export default async (request) => {
  // ------------------------------------------------
  // Méthode HTTP
  // ------------------------------------------------

  if (request.method !== 'POST') {
    return jsonResponse(405, {
      success: false,
      message: 'Méthode non autorisée.',
    })
  }

  // ------------------------------------------------
  // Vérification de la taille
  // ------------------------------------------------

  const contentLength = Number(request.headers.get('content-length') || 0)

  if (contentLength > MAX_BODY_SIZE) {
    return jsonResponse(413, {
      success: false,
      message: 'Requête trop volumineuse.',
    })
  }

  // ------------------------------------------------
  // Récupération du JSON
  // ------------------------------------------------

  let data

  try {
    data = await request.json()
  } catch {
    return jsonResponse(400, {
      success: false,
      message: 'Données invalides.',
    })
  }

  // ------------------------------------------------
  // Honeypot anti-bot
  // ------------------------------------------------
  //
  // Ce champ doit rester vide côté frontend.
  // Les robots ont tendance à le remplir.
  //

  if (data.website) {
    return jsonResponse(400, {
      success: false,
      message: 'Votre message a été détecté comme spam.',
    })
  }

  // ------------------------------------------------
  // Nettoyage
  // ------------------------------------------------

  const lastname = String(data.lastname || '').trim()
  const firstname = String(data.firstname || '').trim()
  const email = String(data.email || '')
    .trim()
    .toLowerCase()
  const phone = String(data.phone || '').trim()
  const project = String(data.project || '').trim()

  // ------------------------------------------------
  // Validation
  // ------------------------------------------------

  if (lastname.length < 2 || lastname.length > 50 || !/^[a-zA-ZÀ-ÿ\s-]+$/.test(lastname)) {
    return jsonResponse(400, {
      success: false,
      message: 'Le nom est invalide.',
    })
  }

  if (firstname.length < 2 || firstname.length > 50 || !/^[a-zA-ZÀ-ÿ\s-]+$/.test(firstname)) {
    return jsonResponse(400, {
      success: false,
      message: 'Le prénom est invalide.',
    })
  }

  if (email.length > 100 || !isValidEmail(email)) {
    return jsonResponse(400, {
      success: false,
      message: "L'adresse email est invalide.",
    })
  }

  if (!isValidFrenchPhone(phone)) {
    return jsonResponse(400, {
      success: false,
      message: 'Le numéro de téléphone est invalide.',
    })
  }

  if (project.length < 10 || project.length > 2000) {
    return jsonResponse(400, {
      success: false,
      message: 'La description du projet doit contenir entre 10 et 2000 caractères.',
    })
  }

  // ------------------------------------------------
  // Anti-spam
  // ------------------------------------------------

  if (containsSpam(project) || containsSpam(lastname) || containsSpam(firstname)) {
    return jsonResponse(400, {
      success: false,
      message: 'Votre message a été détecté comme spam.',
    })
  }

  // ------------------------------------------------
  // Vérification configuration email
  // ------------------------------------------------

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.error('Variables email manquantes.')

    return jsonResponse(500, {
      success: false,
      message: 'Le service email est temporairement indisponible.',
    })
  }

  // ------------------------------------------------
  // Connexion Gmail SMTP
  // ------------------------------------------------

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,

    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  })

  // ------------------------------------------------
  // Construction du mail
  // ------------------------------------------------

  const safeLastname = escapeHtml(lastname)
  const safeFirstname = escapeHtml(firstname)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeProject = escapeHtml(project)

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_TO,
    replyTo: email,
    subject: `Nouvelle demande de contact - ${firstname} ${lastname}`,
    text: `
Nouvelle demande de contact

Nom : ${lastname}
Prénom : ${firstname}
Email : ${email}
Téléphone : ${phone}

Projet :
${project}
`,

    html: `
      <h2>Nouvelle demande de contact</h2>

      <p>
        <strong>Nom :</strong>
        ${safeLastname}
      </p>

      <p>
        <strong>Prénom :</strong>
        ${safeFirstname}
      </p>

      <p>
        <strong>Email :</strong>
        ${safeEmail}
      </p>

      <p>
        <strong>Téléphone :</strong>
        ${safePhone}
      </p>

      <hr>

      <p>
        <strong>Projet :</strong>
      </p>

      <p>
        ${safeProject.replace(/\n/g, '<br>')}
      </p>
    `,
  }

  // ------------------------------------------------
  // Envoi
  // ------------------------------------------------

  try {
    await transporter.sendMail(mailOptions)

    return jsonResponse(200, {
      success: true,
      message: 'Votre message a bien été envoyé.',
    })
  } catch (error) {
    console.error('Erreur Nodemailer :', error)

    return jsonResponse(500, {
      success: false,
      message: "Une erreur est survenue lors de l'envoi de votre message.",
    })
  }
}
