<template>
  <div class="FormContact">
    <form @submit.prevent="handleSubmit" class="FormContact-form">
      <!--
        Honeypot anti-bot.
        Ce champ est volontairement invisible pour les visiteurs.
        Un bot qui le remplit sera rejeté par le backend.
      -->
      <input
        type="text"
        name="website"
        v-model="honeypot"
        class="honeypot-input"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div class="FormContact-row">
        <div class="FormContact-group">
          <label for="lastname" class="FormContact-label">
            Nom <span class="FormContact-required">*</span>
          </label>

          <input
            id="lastname"
            v-model="formData.lastname"
            type="text"
            name="lastname"
            class="FormContact-input"
            :class="{ 'has-error': errors.lastname }"
            placeholder="Votre nom"
            autocomplete="family-name"
            @blur="validateField('lastname')"
          />

          <span v-if="errors.lastname" class="FormContact-errorMessage">
            {{ errors.lastname }}
          </span>
        </div>

        <div class="FormContact-group">
          <label for="firstname" class="FormContact-label">
            Prénom <span class="FormContact-required">*</span>
          </label>

          <input
            id="firstname"
            v-model="formData.firstname"
            type="text"
            name="firstname"
            class="FormContact-input"
            :class="{ 'has-error': errors.firstname }"
            placeholder="Votre prénom"
            autocomplete="given-name"
            @blur="validateField('firstname')"
          />

          <span v-if="errors.firstname" class="FormContact-errorMessage">
            {{ errors.firstname }}
          </span>
        </div>
      </div>

      <div class="FormContact-row">
        <div class="FormContact-group">
          <label for="email" class="FormContact-label">
            Email <span class="FormContact-required">*</span>
          </label>

          <input
            id="email"
            v-model="formData.email"
            type="email"
            name="email"
            class="FormContact-input"
            :class="{ 'has-error': errors.email }"
            placeholder="votre.email@exemple.com"
            autocomplete="email"
            @blur="validateField('email')"
          />

          <span v-if="errors.email" class="FormContact-errorMessage">
            {{ errors.email }}
          </span>
        </div>

        <div class="FormContact-group">
          <label for="phone" class="FormContact-label">
            Téléphone <span class="FormContact-required">*</span>
          </label>

          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            name="phone"
            class="FormContact-input"
            :class="{ 'has-error': errors.phone }"
            placeholder="06 12 34 56 78"
            autocomplete="tel"
            @blur="validateField('phone')"
          />

          <span v-if="errors.phone" class="FormContact-errorMessage">
            {{ errors.phone }}
          </span>
        </div>
      </div>

      <div class="FormContact-group">
        <label for="project" class="FormContact-label">
          Décrivez votre projet
          <span class="FormContact-required">*</span>
        </label>

        <textarea
          id="project"
          v-model="formData.project"
          name="project"
          class="FormContact-textarea"
          :class="{ 'has-error': errors.project }"
          placeholder="Parlez-nous de votre projet..."
          rows="6"
          @blur="validateField('project')"
        ></textarea>

        <span v-if="errors.project" class="FormContact-errorMessage">
          {{ errors.project }}
        </span>
      </div>

      <!-- Erreur générale du serveur -->
      <div v-if="submitError" class="FormContact-submitError" role="alert">
        {{ submitError }}
      </div>

      <ButtonBase
        :text="!isSubmitting ? 'Envoyer la demande' : 'Envoi en cours'"
        :disabled="isSubmitting"
        class="FormContact-submitButton"
        @click="handleSubmit"
      />

      <div v-if="submitSuccess" class="FormContact-successMessage" role="status">
        ✓ Votre demande a été envoyée avec succès !
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import ButtonBase from './ButtonBase.vue'

/**
 * Structure des données du formulaire
 */
interface FormData {
  lastname: string
  firstname: string
  email: string
  phone: string
  project: string
}

/**
 * Structure des erreurs du formulaire
 */
interface FormErrors {
  lastname?: string
  firstname?: string
  email?: string
  phone?: string
  project?: string
}

/**
 * Données du formulaire
 */
const formData = reactive<FormData>({
  lastname: '',
  firstname: '',
  email: '',
  phone: '',
  project: '',
})

/**
 * Erreurs de validation
 */
const errors = reactive<FormErrors>({})

/**
 * État d'envoi
 */
const isSubmitting = ref(false)

/**
 * Message de succès
 */
const submitSuccess = ref(false)

/**
 * Message d'erreur général
 */
const submitError = ref('')

/**
 * Honeypot anti-bot
 */
const honeypot = ref('')

/**
 * Validation d'un champ
 */
function validateField(field: keyof FormData): void {
  delete errors[field]

  const value = formData[field].trim()

  // Champ obligatoire
  if (!value) {
    errors[field] = 'Ce champ est obligatoire'
    return
  }

  // Validation du nom
  if (field === 'lastname') {
    if (value.length < 2 || value.length > 50) {
      errors.lastname = 'Le nom doit contenir entre 2 et 50 caractères'
      return
    }

    if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
      errors.lastname = 'Le nom contient des caractères invalides'
      return
    }
  }

  // Validation du prénom
  if (field === 'firstname') {
    if (value.length < 2 || value.length > 50) {
      errors.firstname = 'Le prénom doit contenir entre 2 et 50 caractères'
      return
    }

    if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
      errors.firstname = 'Le prénom contient des caractères invalides'
      return
    }
  }

  // Validation email
  if (field === 'email') {
    if (value.length > 100) {
      errors.email = 'L’adresse email est trop longue'
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value)) {
      errors.email = 'Veuillez entrer une adresse email valide'
      return
    }
  }

  // Validation téléphone français
  if (field === 'phone') {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/

    if (!phoneRegex.test(value)) {
      errors.phone = 'Veuillez entrer un numéro de téléphone valide'
      return
    }
  }

  // Validation projet
  if (field === 'project') {
    if (value.length < 10) {
      errors.project = 'La description doit contenir au moins 10 caractères'
      return
    }

    if (value.length > 2000) {
      errors.project = 'La description ne peut pas dépasser 2000 caractères'
      return
    }
  }
}

/**
 * Validation complète du formulaire
 */
function validateForm(): boolean {
  // Réinitialisation des erreurs
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof FormErrors]
  })

  let isValid = true

  const fields: Array<keyof FormData> = ['lastname', 'firstname', 'email', 'phone', 'project']

  fields.forEach((field) => {
    validateField(field)

    if (errors[field]) {
      isValid = false
    }
  })

  return isValid
}

/**
 * Réinitialisation du formulaire
 */
function resetForm(): void {
  formData.lastname = ''
  formData.firstname = ''
  formData.email = ''
  formData.phone = ''
  formData.project = ''

  honeypot.value = ''

  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof FormErrors]
  })
}

/**
 * Envoi du formulaire
 */
async function handleSubmit(): Promise<void> {
  /*
   * Protection contre les doubles clics / doubles soumissions.
   */
  if (isSubmitting.value) {
    return
  }

  /*
   * Si le honeypot est rempli,
   * on considère qu'il s'agit d'un bot.
   */
  if (honeypot.value.trim() !== '') {
    console.warn('Bot détecté')

    return
  }

  /*
   * Réinitialisation des messages précédents.
   */
  submitSuccess.value = false
  submitError.value = ''

  /*
   * Validation frontend.
   */
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    /*
     * IMPORTANT :
     *
     * On utilise une URL relative.
     *
     * En local avec Netlify :
     * /api/contact
     *
     * En production :
     * https://atelierm-renovation.fr/api/contact
     *
     * Il ne faut surtout plus utiliser :
     * http://localhost:3000/api/contact
     */
    const response = await fetch('/api/contact', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        lastname: formData.lastname.trim(),
        firstname: formData.firstname.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        project: formData.project.trim(),

        /*
         * Le backend vérifiera également le honeypot.
         */
        website: honeypot.value,
      }),
    })

    /*
     * Vérification que la réponse est bien du JSON.
     */
    const contentType = response.headers.get('content-type')

    if (!contentType?.includes('application/json')) {
      throw new Error('Le serveur a retourné une réponse inattendue.')
    }

    const data = await response.json()

    console.log('Réponse du serveur :', data)

    /*
     * Succès
     */
    if (response.ok && data.success) {
      submitSuccess.value = true

      resetForm()

      /*
       * On garde le message visible quelques secondes.
       */
      setTimeout(() => {
        submitSuccess.value = false
      }, 5000)

      return
    }

    /*
     * Erreur de validation retournée par le backend.
     */
    if (data.errors && Array.isArray(data.errors)) {
      data.errors.forEach(
        (error: { path?: string; param?: string; msg?: string; message?: string }) => {
          const field = error.path || error.param
          const message = error.msg || error.message || 'Valeur invalide'

          if (field && field in formData) {
            errors[field as keyof FormErrors] = message
          }
        },
      )
    }

    /*
     * Message général.
     */
    submitError.value = data.message || 'Une erreur est survenue. Veuillez réessayer.'
  } catch (error) {
    console.error('Erreur lors de l’envoi du formulaire :', error)

    submitError.value =
      'Impossible de contacter le serveur. Vérifiez votre connexion internet ou réessayez plus tard.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.FormContact {
  margin: 0 auto;
  padding: 30px;
}

.FormContact-form {
  border-radius: 12px;
  background: var(--white);
}

.FormContact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.FormContact-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.FormContact-label {
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--brand-secondary);
}

.FormContact-required {
  color: var(--accent-primary);
}

.FormContact-input,
.FormContact-textarea {
  padding: 12px 16px;
  border: 2px solid var(--brand-tertiary);
  border-radius: 8px;
  font-size: 1.8rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.FormContact-textarea {
  transition: resize 0s;
}

.FormContact-input:focus,
.FormContact-textarea:focus {
  outline: none;
  border-color: var(--brand-secondary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.FormContact-input.has-error,
.FormContact-textarea.has-error {
  border-color: var(--forms-error);
}

.FormContact-textarea {
  min-height: 120px;
  resize: vertical;
}

.FormContact-errorMessage {
  display: block;
  margin-top: 6px;
  font-size: 1.2rem;
  color: var(--forms-error);
}

.FormContact-submitButton {
  width: 100%;
  text-align: center;
}

.FormContact-submitError {
  margin-bottom: 20px;
  padding: 16px;
  background: #fdecec;
  border: 1px solid var(--forms-error);
  border-radius: 12px;
  font-size: 14px;
  color: var(--forms-error);
  text-align: center;
  font-weight: 600;
}

.FormContact-successMessage {
  margin-top: 20px;
  padding: 16px;
  background: var(--positive-tertiary);
  border-radius: 30px;
  font-size: 14px;
  color: var(--positive-primary);
  text-align: center;
  font-weight: 600;
}

/*
 * Honeypot.
 *
 * Il est invisible pour les utilisateurs
 * mais reste présent dans le DOM pour les bots.
 */
.honeypot-input {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .FormContact-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
