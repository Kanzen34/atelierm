<script lang="ts" setup>
import AccordionBase from '@/components/AccordionBase.vue'
import AccordionGroup from '@/components/AccordionGroup.vue'
import TagBase from '@/components/TagBase.vue'
import paintLarge from '@/assets/images/paint-large.png'

import { ref, onMounted, onUnmounted } from 'vue'

const isDesktop = ref(false)

let mediaQuery: MediaQueryList

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 600px)')
  isDesktop.value = mediaQuery.matches

  const handler = (e: MediaQueryListEvent) => {
    isDesktop.value = e.matches
  }

  mediaQuery.addEventListener('change', handler)

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handler)
  })
})
</script>

<template>
  <div class="SectionFAQ section" id="faq">
    <div class="content">
      <div class="section-header">
        <TagBase text="Vous avez des questions" type="dark" />
        <div>
          <h2 class="section-title">Rénovation d’intérieur à Montpellier</h2>
          <h3 class="section-subtitle">
            Tout savoir sur la rénovation d’intérieur à Montpellier : travaux, budget, délais et
            accompagnement
          </h3>
        </div>
      </div>

      <AccordionGroup>
        <!-- accordeon 1 -->
        <AccordionBase
          :id="1"
          :defaultOpen="isDesktop"
          title="Quels types de travaux de rénovation intérieure propose Atelier M à Montpellier ?"
        >
          Atelier M accompagne les particuliers et professionnels dans tous leurs projets de
          <strong>rénovation intérieure à Montpellier</strong> et dans l’Hérault. Cela inclut la
          rénovation complète d’appartements ou de maisons, la réfection de cuisines et salles de
          bain, l’optimisation des espaces, les travaux de peinture, sols, cloisons. L’approche
          d’Atelier M est globale : chaque projet est pensé pour améliorer le confort, la
          fonctionnalité et la valeur du bien, tout en respectant le style architectural local et
          les contraintes techniques existantes.
        </AccordionBase>
        <!-- accordeon 2 -->
        <AccordionBase :id="2" title="Combien coûte une rénovation d’intérieur à Montpellier ?">
          Le budget d’une <strong>rénovation intérieure à Montpellier</strong> dépend de plusieurs
          facteurs : surface, état du logement, nature des travaux, choix des matériaux et niveau de
          finition. En moyenne, une rénovation partielle débute autour de 500 €/m², tandis qu’une
          rénovation complète peut aller de 900 à 1 500 €/m². Atelier M propose systématiquement un
          devis détaillé et transparent, adapté au projet et aux attentes du client, afin d’éviter
          toute mauvaise surprise et d’optimiser chaque poste de dépense.
        </AccordionBase>
        <!-- accordeon 3 -->
        <AccordionBase
          :id="3"
          title="Pourquoi faire appel à une entreprise locale comme Atelier M ?"
        >
          Faire appel à Atelier M,
          <strong>entreprise de rénovation intérieure basée à Montpellier</strong>, garantit une
          parfaite connaissance du marché local, des normes en vigueur et des spécificités
          architecturales de la région Occitanie. Cette proximité permet également une meilleure
          réactivité, un suivi de chantier rigoureux et une coordination efficace des artisans.
          Atelier M privilégie un accompagnement personnalisé et une relation de confiance,
          essentielle pour mener à bien des travaux de rénovation dans les délais et le budget
          définis.
        </AccordionBase>
        <!-- accordeon 4 -->
        <AccordionBase :id="4" title="Atelier M propose-t-il un accompagnement de A à Z ?">
          Oui, Atelier M propose un accompagnement global pour chaque projet de
          <strong>rénovation intérieure</strong>. De la première visite conseil à la réception
          finale des travaux, l’entreprise prend en charge la conception, le chiffrage, la
          planification et le suivi de chantier. Cet accompagnement clé en main simplifie le projet
          pour le client, tout en garantissant une cohérence esthétique et technique. À Montpellier,
          cette approche est particulièrement appréciée pour sécuriser les projets complexes ou de
          grande ampleur.
        </AccordionBase>
        <!-- accordeon 5 -->
        <AccordionBase :id="5" title="Faut-il un architecte d’intérieur pour une rénovation ?">
          Un architecte d’intérieur n’est pas obligatoire, mais il apporte une réelle valeur ajoutée
          à un projet de <strong>rénovation intérieure</strong>. Atelier M intègre une réflexion
          architecturale et fonctionnelle afin d’optimiser les volumes, la lumière et la
          circulation. Cette expertise permet de concevoir des espaces durables, esthétiques et
          adaptés au mode de vie des occupants, tout en respectant les contraintes techniques et
          réglementaires propres aux logements de l’Hérault.
        </AccordionBase>
        <!-- accordeon 6 -->
        <AccordionBase :id="6" title="Comment se déroule la demande de devis chez Atelier M ?">
          La demande de devis de <strong>rénovation intérieure chez Atelier M</strong> débute par un
          premier échange pour comprendre les besoins et contraintes du projet. Une visite sur site
          à Montpellier ou dans les environs permet ensuite d’analyser l’existant. Atelier M remet
          alors un devis clair, détaillé et personnalisé, incluant les différentes phases de
          travaux, les matériaux et les délais. Cette transparence est essentielle pour instaurer
          une relation de confiance dès le départ.
        </AccordionBase>
        <!-- accordeon 7 -->
        <AccordionBase :id="7" title="Peut-on rénover un logement occupé ?">
          Oui, il est possible de réaliser une <strong>rénovation intérieure</strong> dans un
          logement occupé, à condition d’une organisation rigoureuse. Atelier M planifie les travaux
          par phases afin de limiter les nuisances et maintenir un maximum de confort pour les
          occupants. Cette solution est fréquemment choisie à Montpellier pour les résidences
          principales, lorsque le relogement temporaire n’est pas envisageable.
        </AccordionBase>
        <!-- accordeon 8 -->
        <AccordionBase
          :id="8"
          title="Quels sont les avantages d’une rénovation intérieure bien pensée ?"
        >
          Une <strong>rénovation intérieure</strong> bien conçue améliore le confort de vie,
          optimise l’espace et valorise le bien immobilier. À Montpellier, où le marché immobilier
          est dynamique, une rénovation de qualité peut significativement augmenter la valeur d’un
          logement. Atelier M conçoit des projets durables, fonctionnels et esthétiques, en tenant
          compte des usages actuels et futurs, afin d’offrir un véritable retour sur investissement.
        </AccordionBase>
        <!-- accordeon 9 -->
        <AccordionBase :id="9" title="Atelier M intervient-il uniquement à Montpellier ?">
          Atelier M intervient principalement à Montpellier, mais également dans l’ensemble de
          l’Hérault et plus largement en Occitanie. Cette couverture géographique permet
          d’accompagner des projets variés, aussi bien en centre-ville que dans les communes
          alentours. La proximité reste un atout majeur pour assurer un suivi de chantier efficace
          et une grande disponibilité.
        </AccordionBase>
      </AccordionGroup>
    </div>

    <figure class="separator">
      <img :src="paintLarge" alt="" data-nosnippet />
    </figure>
  </div>
</template>

<style lang="scss" scoped>
.SectionFAQ {
  position: relative;
}
</style>
