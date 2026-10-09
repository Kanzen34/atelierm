<template>
  <div class="FormContact">
    <form @submit.prevent="handleSubmit" class="FormContact-form">
      <!-- Honeypot - champ caché pour piéger les bots -->
      <input
        type="text"
        name="website"
        v-model="honeypot"
        style="position: absolute; left: -9999px; width: 1px; height: 1px"
        tabindex="-1"
        autocomplete="off"
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
            class="FormContact-input"
            :class="{ 'has-error': errors.lastname }"
            placeholder="Votre nom"
            @blur="validateField('lastname')"
          />
          <span v-if="errors.lastname" class="FormContact-errorMessage">{{ errors.lastname }}</span>
        </div>

        <div class="FormContact-group">
          <label for="firstname" class="FormContact-label">
            Prénom <span class="FormContact-required">*</span>
          </label>
          <input
            id="firstname"
            v-model="formData.firstname"
            type="text"
            class="FormContact-input"
            :class="{ 'has-error': errors.firstname }"
            placeholder="Votre prénom"
            @blur="validateField('firstname')"
          />
          <span v-if="errors.firstname" class="FormContact-errorMessage">{{
            errors.firstname
          }}</span>
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
            class="FormContact-input"
            :class="{ 'has-error': errors.email }"
            placeholder="votre.email@exemple.com"
            @blur="validateField('email')"
          />
          <span v-if="errors.email" class="FormContact-errorMessage">{{ errors.email }}</span>
        </div>

        <div class="FormContact-group">
          <label for="phone" class="FormContact-label">
            Téléphone <span class="FormContact-required">*</span>
          </label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            class="FormContact-input"
            :class="{ 'has-error': errors.phone }"
            placeholder="06 12 34 56 78"
            @blur="validateField('phone')"
          />
          <span v-if="errors.phone" class="FormContact-errorMessage">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="honeypot" aria-hidden="true">
        <label for="website"> Site web </label>

        <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
      </div>

      <div class="FormContact-group">
        <label for="project" class="FormContact-label">
          Décrivez votre projet <span class="FormContact-required">*</span>
        </label>
        <textarea
          id="project"
          v-model="formData.project"
          class="FormContact-textarea"
          :class="{ 'has-error': errors.project }"
          placeholder="Parlez-nous de votre projet..."
          rows="6"
          @blur="validateField('project')"
        ></textarea>
        <span v-if="errors.project" class="FormContact-errorMessage">{{ errors.project }}</span>
      </div>

      <ButtonBase
        :text="!isSubmitting ? 'Envoyer la demande' : 'Envoi en cours'"
        :disabled="isSubmitting"
        class="FormContact-submitButton"
        @click="handleSubmit"
      />
      <!--  -->
      <div v-if="submitSuccess" class="FormContact-successMessage">
        ✓ Votre demande a été envoyée avec succès !
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import ButtonBase from './ButtonBase.vue'

/**
 * Form data structure
 */
interface FormData {
  lastname: string
  firstname: string
  email: string
  phone: string
  project: string
}

/**
 * Form errors structure
 */
interface FormErrors {
  lastname?: string
  firstname?: string
  email?: string
  phone?: string
  project?: string
}

/**
 * Form data reactive object
 */
const formData = reactive<FormData>({
  lastname: '',
  firstname: '',
  email: '',
  phone: '',
  project: '',
})

/**
 * Form errors reactive object
 */
const errors = reactive<FormErrors>({})

/**
 * Form submission state
 */
const isSubmitting = ref(false)

/**
 * Success message state
 */
const submitSuccess = ref(false)

const honeypot = ref('')

/**
 * Validates a specific form field
 * @param field - The field name to validate
 */
function validateField(field: keyof FormData): void {
  // Clear previous error
  delete errors[field]

  const value = formData[field].trim()

  // Check if field is empty
  if (!value) {
    errors[field] = 'Ce champ est obligatoire'
    return
  }

  // Email validation
  if (field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      errors.email = 'Veuillez entrer une adresse email valide'
      return
    }
  }

  // Phone validation (French format)
  if (field === 'phone') {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    if (!phoneRegex.test(value)) {
      errors.phone = 'Veuillez entrer un numéro de téléphone valide'
      return
    }
  }
}

/**
 * Validates all form fields
 * @returns True if form is valid, false otherwise
 */
function validateForm(): boolean {
  // Clear all errors
  Object.keys(errors).forEach((key) => delete errors[key as keyof FormErrors])

  let isValid = true

  // Validate all fields
  Object.keys(formData).forEach((key) => {
    validateField(key as keyof FormData)
    if (errors[key as keyof FormErrors]) {
      isValid = false
    }
  })

  return isValid
}

/**
 * Handles form submission
 */
async function handleSubmit(): Promise<void> {
  // Si le honeypot est rempli, c'est un bot
  if (honeypot.value) {
    console.log('Bot détecté')
    return
  }

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitSuccess.value = false

  try {
    const response = await fetch('https://atelierm-renovation.fr/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    // Afficher l'erreur complète dans la console
    console.log('Réponse du serveur:', data)

    if (data.success) {
      submitSuccess.value = true

      setTimeout(() => {
        Object.keys(formData).forEach((key) => {
          formData[key as keyof FormData] = ''
        })
        submitSuccess.value = false
      }, 3000)
    } else {
      // Afficher les détails de validation s'il y en a
      if (data.errors) {
        console.error('Erreurs de validation:', data.errors)
      }
      errors.project = data.message || 'Une erreur est survenue. Veuillez réessayer.'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    errors.project =
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

.FormContact-group:has(.FormContact-errorMessage) .FormContact-textarea {
  border-color: var(--forms-error);
}

.honeypot {
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
