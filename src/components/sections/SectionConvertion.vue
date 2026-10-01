<script lang="ts" setup>
import TagBase from '@/components/TagBase.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import LogotypeBgIcon from '@/components/icons/LogotypeBgIcon.vue'
import paintLarge from '@/assets/images/paint-large.png'
</script>

<template>
  <div class="SectionConvertion section" id="convertion">
    <div class="content">
      <div class="section-header section-header--standalone">
        <TagBase text="Discutons de votre projet" />
        <div>
          <h2 class="section-title">
            Un projet de rénovation intérieure à Montpellier ou dans sa région
          </h2>
          <h3 class="section-subtitle">
            Atelier M vous accompagne de la première réflexion jusqu’à la livraison finale, avec un
            suivi personnalisé et des solutions sur mesure adaptées à votre mode de vie.
          </h3>
        </div>
        <div class="SectionConvertion-contentAction">
          <ButtonBase
            anchor="#work"
            text="Nos réalisations"
            :style="'outlined'"
            button-type="negative"
            variant="outlined"
          />
          <ButtonBase anchor="#contact" text="Demandez un devis" button-type="negative" />
        </div>
      </div>
    </div>

    <figure class="separator">
      <img :src="paintLarge" alt="" data-nosnippet />
    </figure>

    <LogotypeBgIcon class="right" />
    <LogotypeBgIcon class="left" />
  </div>
</template>

<style lang="scss" scoped>
.SectionConvertion {
  position: relative;
  background-color: var(--brand-primary);
  color: var(--brand-tertiary);
  overflow: hidden;
}

.SectionConvertion-contentAction {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
    gap: 40px;
  }
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
