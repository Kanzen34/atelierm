<script lang="ts" setup>
import TagBase from '@/components/TagBase.vue'
import LogotypeBgIcon from '@/components/icons/LogotypeBgIcon.vue'
import paintLarge from '@/assets/images/paint-large.png'
import ButtonBase from '../ButtonBase.vue'
</script>

<template>
  <div class="SectionAboutUs section" id="aboutus">
    <div class="content">
      <div class="section-header section-header--standalone">
        <TagBase text="Notre philosophie" />
        <div>
          <h2 class="section-title">L’art de transfomer l’ordinaire en extraodinaire</h2>
          <h3 class="section-subtitle">
            Notre philosophie repose sur l’écoute, la créativité et l’excellence. Chaque espace
            mérite une attention particulière, une vision unique qui transcende les tendances pour
            créer un lieu intemporel et profondément personnel
          </h3>
        </div>
      </div>

      <div class="SectionAboutUs-contentAction">
        <ButtonBase anchor="#contact" text="Contactez-nous" button-type="negative" />
      </div>
    </div>

    <figure class="separator">
      <img :src="paintLarge" alt="" data-nosnippet />
    </figure>

    <LogotypeBgIcon class="right" />
    <LogotypeBgIcon class="left" />
  </div>
</template>

<style lang="scss">
.SectionAboutUs {
  position: relative;
  background-color: var(--brand-primary);
  color: var(--brand-tertiary);
  overflow: hidden;
}

.SectionAboutUs-contentAction {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
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

  @media only screen and (max-width: 600px) {
    display: none;
  }
}

.left {
  left: -150px;
  top: 0;
  transform: rotate(180deg);

  @media only screen and (max-width: 600px) {
    display: none;
  }
}
</style>
