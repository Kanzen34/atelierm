<script lang="ts" setup>
// Components
import TagBase from '@/components/TagBase.vue'
import CardSlider from '@/components/cards/CardSlider.vue'
import SliderCards from '@/components/SliderCards.vue'
// Images
import revetementSolImage from '@/assets/images/revetement-sol.webp'
import revetementMurImage from '@/assets/images/revetement-muraux.webp'
import amenagementImage from '@/assets/images/amenagement-interieur.webp'
import cuisineImage from '@/assets/images/cuisine-salle-de-bain.webp'
import eclairageImage from '@/assets/images/eclairage-luminaire.webp'
import revetementSolImageXl from '@/assets/images/revetement-sol-xl.webp'
import revetementMurImageXl from '@/assets/images/revetement-muraux-xl.webp'
import amenagementImageXl from '@/assets/images/amenagement-interieur-xl.webp'
import cuisineImageXl from '@/assets/images/cuisine-salle-de-bain-xl.webp'
import eclairageImageXl from '@/assets/images/eclairage-luminaire-xl.webp'

import paintLarge from '@/assets/images/paint-large.png'
import { ref } from 'vue'

const items = ref([
  {
    component: CardSlider,
    props: {
      backgroundImage: revetementSolImage,
      title: 'Revêtements de sol',
      text: 'Des sols haut de gamme alliant esthétisme, durabilité et précision de pose pour sublimer votre rénovation intérieure.',
      modalData: {
        backgroundImageModal: revetementSolImageXl,
        seoTitle: 'Revêtements de sol haut de gamme pour rénovation intérieure à Montpellier',
        description:
          'Le choix du revêtement de sol est essentiel dans un projet de rénovation intérieure. Nous sélectionnons des matériaux durables et élégants, adaptés aux usages de chaque pièce. Chaque pose est précédée d’une préparation minutieuse du support afin de garantir stabilité et longévité. Parquet massif, carrelage grand format ou béton ciré : notre exigence se traduit par une finition irréprochable et une parfaite harmonie avec l’ensemble de votre intérieur.',
        materials: [
          'Parquet massif',
          'Parquet contrecollé',
          'Grès cérame',
          'Pierre naturelle',
          'Béton ciré',
          'Sol vinyle premium',
        ],
        techniques: [
          'Pose collée ou flottante',
          'Pose en chevrons / point de Hongrie',
          'Ragréage du support',
          'Jointoiement technique',
          'Finition huilée ou vitrifiée',
        ],
      },
    },
  },
  {
    component: CardSlider,
    props: {
      backgroundImage: revetementMurImage,
      title: 'Revêtements muraux',
      text: 'Des finitions murales soignées pour structurer vos volumes et révéler le caractère de votre intérieur.',
      modalData: {
        backgroundImageModal: revetementMurImageXl,
        seoTitle: 'Revêtements muraux et finitions décoratives pour rénovation intérieure',
        description:
          'Les murs définissent l’identité d’un espace. Dans chaque rénovation intérieure, nous accordons une attention particulière à la qualité des supports et aux finitions. Peintures premium, enduits décoratifs ou habillages muraux sont sélectionnés pour valoriser la lumière et les volumes. Notre approche garantit un rendu homogène, durable et raffiné.',
        materials: [
          'Peintures écologiques premium',
          'Enduits décoratifs',
          'Tadelakt',
          'Papier peint haut de gamme',
          'Parement pierre',
          'Faïence',
        ],
        techniques: [
          'Préparation et lissage des supports',
          'Application multicouche',
          'Traitement anti-humidité',
          'Effets décoratifs texturés',
        ],
      },
    },
  },
  {
    component: CardSlider,
    props: {
      backgroundImage: amenagementImage,
      title: 'Aménagement intérieur',
      text: 'Optimisation intelligente des volumes pour un agencement sur mesure et parfaitement fonctionnel.',
      modalData: {
        backgroundImageModal: amenagementImageXl,
        seoTitle: 'Optimisation de l’espace et aménagement intérieur sur mesure à Montpellier',
        description:
          'L’optimisation de l’espace est au cœur d’une rénovation réussie. Nous analysons les volumes existants pour améliorer la circulation, maximiser la luminosité et créer des agencements sur mesure. Chaque projet est pensé pour conjuguer esthétique, confort et fonctionnalité durable.',
        materials: [
          'Cloisons haute performance',
          'Verrières sur mesure',
          'Menuiseries intégrées',
          'Portes coulissantes',
          'Rangements personnalisés',
        ],
        techniques: [
          'Restructuration des volumes',
          'Création de cloisons',
          'Ouverture de murs (selon faisabilité)',
          'Conception 3D',
          'Optimisation des circulations',
        ],
      },
    },
  },
  {
    component: CardSlider,
    props: {
      backgroundImage: cuisineImage,
      title: 'Cuisine & salle de bain',
      text: 'Des espaces techniques et élégants conçus pour allier performance, confort et durabilité.',
      modalData: {
        backgroundImageModal: cuisineImageXl,
        seoTitle: 'Rénovation de cuisine et salle de bain à Montpellier',
        description:
          'La rénovation de cuisine ou de salle de bain exige une expertise technique rigoureuse. Nous veillons au respect des normes, à l’étanchéité parfaite et à l’intégration soignée des équipements. Chaque projet associe matériaux résistants, design soigné et optimisation fonctionnelle pour un résultat durable et esthétique.',
        materials: [
          'Plans de travail quartz ou céramique',
          'Carrelage grand format',
          'Robinetterie premium',
          'Meubles sur mesure',
          'Douche à l’italienne',
        ],
        techniques: [
          'Mise aux normes plomberie',
          'Étanchéité spécifique',
          'Installation encastrée',
          'Coordination multi-corps d’état',
        ],
      },
    },
  },
  {
    component: CardSlider,
    props: {
      backgroundImage: eclairageImage,
      title: 'Électricité & éclairage',
      text: 'Des installations sécurisées et des ambiances lumineuses pensées pour valoriser votre intérieur.',
      modalData: {
        backgroundImageModal: eclairageImageXl,
        seoTitle: 'Mise aux normes électriques et conception d’éclairage intérieur',
        description:
          'Une rénovation intérieure de qualité repose sur une installation électrique fiable et conforme. Nous concevons des solutions d’éclairage adaptées aux volumes et aux ambiances souhaitées. L’intégration discrète des équipements garantit sécurité, confort et valorisation architecturale.',
        materials: [
          'Tableaux électriques conformes',
          'Câblage certifié',
          'Spots LED',
          'Suspensions design',
          'Systèmes domotiques',
        ],
        techniques: [
          'Mise aux normes électriques',
          'Intégration encastrée',
          'Scénarios lumineux',
          'Installation connectée',
        ],
      },
    },
  },
  // {
  //   component: CardSlider,
  //   props: {
  //     backgroundImage: salonImage,
  //     title: 'Menuiserie sur mesure',
  //     text: 'Des finitions personnalisées pour une rénovation intérieure haut de gamme et parfaitement intégrée.',
  //     modalData: {
  //       seoTitle: 'Menuiserie intérieure et finitions sur mesure pour rénovation haut de gamme',
  //       description:
  //         'Les finitions sur mesure signent une rénovation intérieure d’exception. Dressings, bibliothèques et aménagements intégrés sont conçus avec précision pour s’harmoniser parfaitement à l’architecture existante. Chaque réalisation allie exigence technique, durabilité et élégance.',
  //       materials: [
  //         'Bois massif',
  //         'MDF haute densité',
  //         'Placage bois noble',
  //         'Laque mate ou satinée',
  //         'Métal thermolaqué',
  //       ],
  //       techniques: [
  //         'Fabrication sur mesure',
  //         'Assemblage traditionnel',
  //         'Ajustement millimétré',
  //         'Finitions artisanales',
  //       ],
  //     },
  //   },
  // },
])
</script>

<template>
  <div class="SectionOurWork section" id="work">
    <div class="content">
      <div class="section-header">
        <TagBase text="Notre savoir-faire" type="dark" />
        <div>
          <h2 class="section-title">Nos réalisations</h2>
          <h3 class="section-subtitle">
            Découvrez, à travers cette sélection de projets à Montpellier et dans l’Hérault, comment
            nous transformons des espaces ordinaires en lieux de vie d’exception.
          </h3>
        </div>
      </div>
    </div>
  </div>

  <div class="SectionOurWork-content">
    <div>
      <SliderCards :items="items" viewport-class="SliderCards-viewport--SectionOurWork" />
    </div>
  </div>

  <div class="SectionOurWork-bottom section">
    <figure class="separator">
      <img :src="paintLarge" alt="" data-nosnippet />
    </figure>
  </div>
</template>

<style lang="scss">
.SectionOurWork {
  padding-bottom: 0;
  .section-header {
    margin-bottom: 0;
  }
}

.SectionOurWork-content {
  > div {
    display: flex;
    gap: 20px;
  }
}

.SectionOurWork-bottom {
  padding-top: 0;
  position: relative;
}
</style>
