<script lang="ts" setup>
import kanzenLogo from './icons/kanzenLogo.vue'
</script>

<template>
  <div class="BaseFooter">
    <a class="para" href="/">Mention légales</a>
    <span>&#x2022;</span>
    <span class="para">Site réalisé par : </span><kanzenLogo />
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

  a,
  span {
    color: var(--accent-tertiary);
  }

  a {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--accent-secondary);
    }
  }
}
</style>
