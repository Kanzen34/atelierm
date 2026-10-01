<script lang="ts" setup>
import LogoIcon from '@/components/icons/LogoIcon.vue'
import image404 from '@/assets/images/404.webp'
import ButtonBase from '@/components/ButtonBase.vue'
import BaseFooter from '@/components/BaseFooter.vue'
</script>

<template>
  <div class="NotFoundView section">
    <div class="content">
      <div class="NotFoundView-logoContainer">
        <LogoIcon />
        <h1>Rénovation d'intérieur à montpellier</h1>
      </div>
      <img :src="image404" alt="La page que vous recherchez n'existe pas" data-nosnippet />
      <p class="section-subtitle">
        La page que vous recherchez n’existe pas. rénovez votre demande ou cliquer sur le lien
        ci-dessous pour aller à l'accueil
      </p>
      <ButtonBase href="atelierm-renovation.fr" text="Aller à la page d’accueil" />
    </div>
    <BaseFooter />
  </div>
</template>

<style lang="scss" scoped>
.NotFoundView {
  min-height: calc(100dvh);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  padding-top: 40px;

  img {
    max-width: 450px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding-bottom: 40px;
  }
}

.NotFoundView-logoContainer {
  svg {
    width: 320px;
  }
  img {
    max-width: 500px;
  }
  h1 {
    font-weight: 300;
  }
}

.BaseFooter {
  width: 100%;
}
</style>
