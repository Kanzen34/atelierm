<script lang="ts" setup>
import CardIcon from '../cards/CardIcon.vue'
import FormContact from '../FormContact.vue'
</script>

<template>
  <div class="SectionContact section" id="contact">
    <div class="content">
      <div class="SectionContact-left">
        <div class="SectionContact-header">
          <h2 class="section-title">Donnons vie à votre vision ensemble</h2>
          <h3 class="section-subtitle">
            Contactez-nous pour une consultation gratuite et recevez un devis personnalisé pour
            votre projet de rénovation
          </h3>
        </div>
        <div class="SectionContact-contact">
          <a href="tel:0787177379" class="SectionContact-contactPhone">
            <CardIcon name="phone" />
            <div>
              <p class="para">Téléphone</p>
              <p class="section-subtitle">07.87.17.73.79</p>
            </div>
          </a>
          <a href="mailto:testa.matthieu.staelens@gmail.com" class="SectionContact-contactMail">
            <CardIcon name="mail" />
            <div>
              <p class="para">Email</p>
              <p class="section-subtitle">testa.matthieu.staelens@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
      <div class="SectionContact-right">
        <div class="SectionContact-form">
          <div class="SectionContact-formHeader">
            <h3 class="section-subtitle">Demandez votre devis gratuit</h3>
            <span class="para">* Champs obligatoires </span>
          </div>
          <FormContact />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SectionContact-left {
  .section-title,
  .section-subtitle {
    text-align: left;
  }
}

.SectionContact-right,
.SectionContact-left {
  width: 100%;
}

.SectionContact-header {
  margin-bottom: 60px;

  .section-title {
    margin-bottom: 20px;
  }
}

.content {
  display: flex;
  gap: 80px;

  @media only screen and (min-width: 1224px) {
    flex-direction: row;
  }
}

.SectionContact-contact {
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: 800px) and (max-width: 1224px) {
    flex-direction: row;
    justify-content: space-between;
    /* Styles pour cette Media Queries */
  }

  .section-subtitle {
    @media only screen and (max-width: 600px) {
      word-break: break-all;
      white-space: normal;
    }
  }
}

.SectionContact-contactPhone,
.SectionContact-contactMail {
  display: flex;
  align-items: center;
  gap: 40px;

  @media only screen and (max-width: 600px) {
    gap: 20px;
  }

  p {
    white-space: nowrap;
    overflow-wrap: break-word;
  }
}

.SectionContact-form {
  box-shadow: 0 0 80px #eee;
  border-radius: 30px;
  overflow: hidden;
}

.SectionContact-formHeader {
  padding: 20px 30px;
  background-color: var(--brand-tertiary);

  span {
    color: var(--accent-primary);
  }

  .section-subtitle {
    text-align: left;
    font-weight: 600;
  }
  @media only screen and (min-width: 1224px) {
    text-align: left;
    font-weight: 600;
  }
}
</style>
