<script lang="ts" setup>
import TagBase from '@/components/TagBase.vue'
import CardService from '@/components/cards/CardService.vue'
import paintLarge from '@/assets/images/paint-large.png'
</script>

<template>
  <div class="Services section" id="services">
    <div class="content">
      <div class="section-header">
        <TagBase text="Notre expertise" type="dark" class="Services-tag" />
        <div>
          <h2 class="section-title">Nos services de rénovation d’intérieur sur mesure</h2>
          <h3 class="section-subtitle">
            L’expertise Atelier M pour des projets haut de gamme à Montpellier et dans l’Hérault
          </h3>
        </div>
      </div>

      <div class="Services-content">
        <CardService
          class="Services-card"
          iconName="home"
          text="Transformation complète de votre intérieur à <strong>Montpellier</strong>, de la conception à la réalisation finale des travaux."
          title="Rénovation d’interieur"
        />
        <CardService
          class="Services-card"
          iconName="stars"
          text="Création d’espaces intérieurs harmonieux et fonctionnels, pensés pour refléter votre personnalité et votre style de vie."
          title="Design d’interieur"
        />
        <CardService
          class="Services-card"
          iconName="box"
          text="Optimisation de l’espace et restructuration pour un agencement sur mesure, fonctionnel et harmonieux."
          title="Architecture d’interieur"
        />
        <CardService
          class="Services-card"
          iconName="users"
          text="Suivi de projet de A à Z par des professionnels dédiés à la réussite et à la satisfaction de votre <strong>rénovation</strong>."
          title="À vos côtés"
        />
      </div>
    </div>

    <figure class="separator">
      <img :src="paintLarge" alt="" data-nosnippet />
    </figure>
  </div>
</template>

<style lang="scss" scoped>
.Services {
  position: relative;
}

// .Services-tag {
//   background-color: var(--negative-tertiary);
//   color: var(--negative-primary);
// }

.Services-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  .Services-card {
    width: calc(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media only screen and (min-width: 600px) {
      align-items: flex-start;
      text-align: left;
      width: calc(50% - 40px);
      /* Styles pour cette Media Queries */
    }

    @media only screen and (min-width: 1224px) {
      width: calc(25% - 40px);
      /* Styles pour cette Media Queries */
    }
  }
}
</style>
