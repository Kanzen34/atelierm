<script lang="ts" setup>
import { ref } from 'vue'
import TagBase from '@/components/TagBase.vue'
import CardTestimonials from '../cards/CardTestimonials.vue'
import LogotypeBgIcon from '@/components/icons/LogotypeBgIcon.vue'
import paintLarge from '@/assets/images/paint-large.png'
import SliderCards from '../SliderCards.vue'

const items = ref([
  {
    component: CardTestimonials,
    props: {
      author: 'Pierre Gretter',
      testimonial:
        'Artisan très professionnel. Il est intervenu chez moi pour la pose de carrelage et pour refaire mes murs qui étaient auparavant en gouttelette. Le travail réalisé est de très grande qualité, soigné et conforme à mes attentes. Je suis très satisfait du résultat. Je recommande sans hésitation',
    },
  },
  {
    component: CardTestimonials,
    props: {
      author: 'Jean-François Damy',
      testimonial:
        'Nous avons fait appel à Atelier M (Matthieu) pour la rénovation (reprise mur et peinture) de notre appartement ancien de 130m2, avec de très grandes hauteurs sous plafond – un vrai défi technique. Le travail réalisé est impeccable : peinture soignée, finitions parfaites, et une vraie attention portée aux détails.C’est un professionnel méticuleux, sérieux et à l’écoute. Nous sommes ravis du résultat et le remercions sincèrement pour son excellent travail. Nous le recommandons sans hésitation !',
    },
  },
  {
    component: CardTestimonials,
    props: {
      author: 'Valentin Gasq',
      testimonial:
        'J’ai recommandé Matthieu à mes parents pour la rénovation d’une chambre (sol et peinture), et ils ont été ravis du résultat. Artisan très professionnel, minutieux et à l’écoute, avec un vrai sens du détail. Je recommande vivement ses services si vous avez des travaux à réaliser sur Montpellier.',
    },
  },
  {
    component: CardTestimonials,
    props: {
      author: 'Guillaume Barlet',
      testimonial:
        'Un artisan super pro, de bons conseils ! Il connaît son métier et gère le temps à merveille. Merci beaucoup Matthieu pour les travaux réalisés. Bonne continuation',
    },
  },
  {
    component: CardTestimonials,
    props: {
      author: 'Yannick Perier',
      testimonial:
        'Entreprise sérieuse. Repond rapidement,travail appliqué et sérieux, lieu laissé très propre. Je recommande.',
    },
  },
])
</script>

<template>
  <div class="SectionTestimonials">
    <div class="section">
      <div class="content">
        <div class="section-header section-header--standalone">
          <TagBase text="Témoignages" />
          <div>
            <h2 class="section-title">Ce qu'ils disent de nous</h2>
            <h3 class="section-subtitle">
              Parce que le meilleur reflet de notre travail, ce sont les sourires et la satisfaction
              de ceux qui vivent aujourd'hui dans leur espace rêvé
            </h3>
          </div>
        </div>
      </div>

      <!-- <LogotypeBgIcon class="right" />
      <LogotypeBgIcon class="left" /> -->
    </div>

    <div class="SectionOurWork-content">
      <div>
        <SliderCards :items="items" navigationClass="negative" />
      </div>
    </div>

    <div class="SectionTestimonials-bottom section">
      <figure class="separator">
        <img :src="paintLarge" alt="" data-nosnippet />
      </figure>
    </div>
  </div>
</template>

<style lang="scss">
.SectionTestimonials {
  position: relative;
  background-color: var(--brand-primary);
  color: var(--brand-tertiary);
  overflow: hidden;
  opacity: 0.8;
  background-image:
    radial-gradient(var(--brand-tertiary) 0.5px, transparent 0.5px),
    radial-gradient(var(--brand-tertiary) 0.5px, var(--brand-primary) 0.5px);
  background-size: 20px 20px;
  background-position:
    0 0,
    10px 10px;
  .section {
    padding-bottom: 40px;
  }
}

.SectionTestimonials-content {
  > div {
    display: flex;
    gap: 20px;
  }
}

.SectionTestimonials-bottom {
  padding-top: 0;
  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}

.LogotypeBgIcon {
  position: absolute;
  height: 100%;
}

.right {
  right: -150px;
  bottom: 0;
}

.left {
  left: -150px;
  top: 0;
  transform: rotate(180deg);
}
</style>
