<script lang="ts" setup>
import { ref, inject, watch, type Ref } from 'vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'

interface Props {
  title: string
  id: number
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
})

const isOpen = ref(props.defaultOpen)
const openAccordionId = inject<Ref<number | null>>('openAccordionId', ref(null))

const toggle = () => {
  openAccordionId.value = isOpen.value ? !isOpen.value : props.id
}

// Synchronise avec le groupe
watch(openAccordionId, (newId) => {
  if (newId !== null) {
    isOpen.value = newId === props.id
  }
})
</script>

<template>
  <div class="Accordion" :class="{ 'Accordion--active': isOpen }" @click="toggle">
    <button class="Accordion-header" :aria-expanded="isOpen">
      <span class="title-small">{{ title }}</span>
      <span class="Accordion-icon" :class="{ 'is-open': isOpen }"> <ArrowDownIcon /> </span>
    </button>

    <transition name="Accordion">
      <div v-show="isOpen" class="Accordion-content">
        <div class="Accordion-body">
          <div class="para">
            <slot>
              <p>Contenu par défaut</p>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.Accordion {
  width: 100%;
  padding: 20px;
  overflow: hidden;
  transition: background-color 0.2s;
  cursor: pointer;
  border-radius: 10px;

  &:hover:not(.Accordion--active) {
    background-color: rgba(var(--brand-tertiary-rgb), 50%);
  }

  @media only screen and (min-width: 600px) {
    padding: 30px 40px;
  }
}

.Accordion--active {
  background-color: color-mix(in srgb, var(--brand-tertiary) 95%, var(--brand-primary) 5%);
}

.Accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  text-align: left;

  @media only screen and (min-width: 600px) {
    gap: 20px;
  }

  svg {
    width: 16px;
    color: var(--brand-primary);
  }
}

.Accordion-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--brand-secondary);
}

.Accordion-icon.is-open {
  transform: rotate(180deg);
}

.Accordion-content {
  overflow: hidden;
}

/* Transitions */
.Accordion-enter-active,
.Accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.Accordion-enter-from,
.Accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.Accordion-body {
  padding-top: 20px;
}
</style>
