<script lang="ts" setup>
import { ref, provide } from 'vue'
import ButtonBase from '@/components/ButtonBase.vue'

const openAccordionId = ref<number | null>(null)
const isExpanded = ref(false)

provide('openAccordionId', openAccordionId)

function toggle() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="AccordionGroup">
    <div class="AccordionGroup-content" :class="{ 'is-expanded': isExpanded }">
      <slot></slot>
    </div>

    <div class="AccordionGroup-action">
      <ButtonBase :text="isExpanded ? 'Voir moins' : 'Voir plus'" @click="toggle" />
    </div>

    <div class="AccordionGroup-gradient" :class="{ 'is-hidden': isExpanded }"></div>
  </div>
</template>

<style lang="scss">
.AccordionGroup {
  position: relative;
}

.AccordionGroup-action {
  display: flex;
  justify-content: center;
}

.AccordionGroup-gradient {
  position: absolute;
  bottom: 60px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%);
  transition: opacity 1s ease-in-out;
  pointer-events: none;

  &.is-hidden {
    opacity: 0;
  }
}

.AccordionGroup-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 500px;
  border-radius: 40px;
  overflow: hidden;
  margin-bottom: 40px;
  transition: max-height 1s ease-in-out;

  &.is-expanded {
    max-height: 5000px;
  }

  > div {
    width: 100%;
  }

  .Accordion {
    flex-shrink: 0;
  }
}
</style>
