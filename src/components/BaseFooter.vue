<script lang="ts" setup>
import kanzenLogo from './icons/kanzenLogo.vue'
</script>

<template>
  <div class="BaseFooter">
    <a class="para" href="/">Mention légales</a>
    <span class="dot">&#x2022;</span>
    <div class="kanzen-ad"><span class="para">Site réalisé par : </span><kanzenLogo /></div>
  </div>
</template>

<style lang="scss" scoped>
.BaseFooter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background-color: var(--accent-primary);
  color: var(--accent-tertiary);

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  a,
  span {
    color: var(--accent-tertiary);
  }

  .dot {
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }

  a {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--accent-secondary);
    }
  }

  .kanzen-ad {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
