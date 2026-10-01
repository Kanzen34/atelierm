import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Sécurité des headers HTTP
app.use(helmet());

// CORS restreint (uniquement votre domaine)
app.use(cors({
    origin: 'http://localhost:5173', // Votre URL frontend (à changer en production)
    methods: ['POST'],
    credentials: true
}));

app.use(express.json({ limit: '10kb' })); // Limiter la taille des requêtes

// Rate limiting : max 5 requêtes par heure par IP
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 5, // 5 requêtes max
    message: {
        success: false,
        message: 'Trop de demandes envoyées. Veuillez réessayer dans une heure.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/contact', limiter);

// Validation et sanitisation
const contactValidation = [
    body('lastname')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Le nom doit contenir entre 2 et 50 caractères')
        .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
        .withMessage('Le nom contient des caractères invalides')
        .escape(),

    body('firstname')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Le prénom doit contenir entre 2 et 50 caractères')
        .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
        .withMessage('Le prénom contient des caractères invalides')
        .escape(),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Email invalide')
        .normalizeEmail()
        .isLength({ max: 100 })
        .withMessage('Email trop long'),

    body('phone')
        .trim()
        .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
        .withMessage('Numéro de téléphone invalide')
        .escape(),

    body('project')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('La description doit contenir entre 10 et 2000 caractères')
        .escape()
];

// Liste noire de mots spam
const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'winner', 'click here', 'buy now'];

function containsSpam(text) {
    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
}

app.post('/api/contact', contactValidation, async (req, res) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Certaines informations sont invalides. Veuillez vérifier vos données.',
            errors: errors.array()
        });
    }

    const { lastname, firstname, email, phone, project } = req.body;

    // Détection de spam dans le contenu
    if (containsSpam(project) || containsSpam(lastname) || containsSpam(firstname)) {
        return res.status(400).json({
            success: false,
            message: 'Votre message a été détecté comme spam.'
        });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER || 'votre-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'votre-mot-de-passe-app'
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER || 'votre-email@gmail.com',
        to: process.env.EMAIL_TO || 'destination@exemple.com',
        subject: `Nouveau contact de ${firstname} ${lastname}`,
        // Utiliser text en plus de html pour éviter le spam
        text: `
      Nouvelle demande de contact
      
      Nom: ${lastname}
      Prénom: ${firstname}
      Email: ${email}
      Téléphone: ${phone}
      
      Projet:
      ${project}
    `,
        html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Nom:</strong> ${lastname}</p>
      <p><strong>Prénom:</strong> ${firstname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Projet:</strong></p>
      <p>${project}</p>
    `,
        // Headers anti-spam
        headers: {
            'X-Priority': '1',
            'X-MSMail-Priority': 'High',
            'Importance': 'high'
        }
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email envoyé avec succès' });
    } catch (error) {
        console.error('Erreur complète:', error);

        let userMessage = 'Une erreur est survenue lors de l\'envoi de votre message.';

        if (error.code === 'EAUTH') {
            userMessage = 'Problème de configuration du serveur email. Veuillez réessayer plus tard.';
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            userMessage = 'Impossible de se connecter au serveur email. Vérifiez votre connexion internet.';
        } else if (error.responseCode === 550) {
            userMessage = 'L\'adresse email de destination est invalide.';
        }

        res.status(500).json({
            success: false,
            message: userMessage
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur sécurisé sur http://localhost:${PORT}`));