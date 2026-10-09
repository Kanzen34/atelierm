<script lang="ts" setup>
import ButtonBase from '@/components/ButtonBase.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import MouseIcon from '@/components/icons/MouseIcon.vue'
import paintLarge from '@/assets/images/paint-large.png'
import paintSmall from '@/assets/images/paint-small.png'
import headerBg from '@/assets/images/header-bg.webp'
</script>

<template>
  <header class="SectionHeader" id="header" :style="{ backgroundImage: `url(${headerBg})` }">
    <div class="content">
      <div class="SectionHeader-logoContainer">
        <LogoIcon />
        <h1>Rénovation d'intérieur à montpellier</h1>
      </div>

      <div class="SectionHeader-content">
        <span class="header-title">Transformez votre espace en un lieu d’exception</span>
        <figure>
          <img :src="paintSmall" alt="" data-nosnippet />
        </figure>
        <h2>
          Spécialistes de la <strong>rénovation d’intérieur</strong> haut de gamme dans l’Hérault,
          nous imaginons des espaces de vie d’exception, pensés pour votre art de vivre.
        </h2>

        <div class="SectionHeader-contentAction">
          <ButtonBase
            anchor="#services"
            text="Nos services"
            :variant="'outlined'"
            button-type="negative"
          />
          <ButtonBase anchor="#contact" text="Parlons de votre projet" button-type="negative" />
        </div>
      </div>

      <MouseIcon />
    </div>
    <figure class="separator">
      <img :src="paintLarge" alt="" data-nosnippet />
    </figure>
  </header>
</template>

<style lang="scss" scoped>
.SectionHeader {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100dvh;
  color: var(--white);
  background-color: var(--brand-primary);
  background: linear-gradient(
    45deg,
    rgba(116, 126, 128, 1) 0%,
    rgba(95, 192, 166, 1) 50%,
    rgba(176, 166, 202, 1) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
}

.content {
  min-height: 100dvh;
  justify-content: space-between;
  padding-block: 50px;

  @media only screen and (max-width: 600px) {
    padding-bottom: 80px;
  }
}

.content,
.SectionHeader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.SectionHeader-title {
  margin-bottom: 2.2rem;
}

.SectionHeader-content img {
  margin: 20px auto;

  @media only screen and (max-width: 600px) {
    max-width: 80%;
  }
}

.SectionHeader-contentAction {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
    gap: 40px;
  }
}

.SectionHeader-logoContainer {
  margin-bottom: 40px;
}

h1 {
  font-weight: 100;
}

h2 {
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 200;

  @media only screen and (min-width: 600px) {
    font-size: 2.8rem;
  }
}

.logo {
  max-width: 320px;
  margin-bottom: 10px;
}
</style>
