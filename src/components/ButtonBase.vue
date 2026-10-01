<script lang="ts" setup>
import { computed } from 'vue'

type ButtonStyle = 'outlined' | 'full'
type ButtonVariant = 'primary' | 'secondary' | 'negative' | 'card'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    anchor?: string
    variant?: ButtonStyle
    text?: string
    buttonType?: ButtonVariant
    type?: ButtonType
  }>(),
  {
    anchor: '',
    variant: 'full',
    text: 'Button',
    buttonType: 'primary',
    type: 'button',
  },
)

// Computed property qui retourne un tableau des deux valeurs
const getClasses = computed(() => {
  return [props.variant, props.buttonType]
})
</script>

<template>
  <button v-if="!anchor" :class="getClasses" :type="props.type">
    <span>{{ props.text }}</span>
  </button>
  <a v-else :href="props.anchor" :class="getClasses" :type="props.type">{{ props.text }}</a>
</template>

<style lang="scss" scoped>
// ----------------------
// General style
// ----------------------

button,
a {
  display: inline-block;
  padding-inline: 4rem;
  padding-block: 1.8rem;
  line-height: 1;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  transition:
    color 0.2s,
    background-color 0.2s,
    border 0.2s;
  transition-timing-function: ease-in-out;
  border: 2px solid transparent;
  outline: 2px solid transparent;
  border-radius: 4rem;
  cursor: pointer;

  // TODO for accessibility but the style is actually not good like this
  // &:focus-within {
  //   outline-color: var(--black);
  // }

  span {
    display: block;
    top: -2px;
    position: relative;
  }
}

// ----------------------
// Outlined style
// ----------------------

.outlined {
  border-color: var(--black);
  color: var(--black);
  background-color: transparent;

  &:disabled {
    color: var(--forms-disabled);
    border-color: var(--forms-disabled);
  }
}

.outlined:where(.primary) {
  border-color: var(--brand-primary);
  color: var(--brand-primary);

  &:hover,
  &:focus-visible {
    color: var(--brand-tertiary);
    background-color: var(--brand-primary);
  }
}

.outlined:where(.secondary) {
  border-color: var(--brand-secondary);
  color: var(--brand-secondary);

  &:hover,
  &:focus-visible {
    color: var(--brand-tertiary);
    background-color: var(--brand-secondary);
  }
}

.outlined:where(.negative) {
  border-color: var(--brand-tertiary);
  color: var(--brand-tertiary);

  &:hover,
  &:focus-visible {
    color: var(--brand-primary);
    background-color: var(--brand-tertiary);
  }
}

// ----------------------
// Full style
// ----------------------

.full {
  background-color: var(--black);
  color: var(--white);

  &:disabled {
    color: var(--white);
    background-color: var(--forms-disabled);
  }
}

.full:where(.primary) {
  background-color: var(--brand-primary);
  color: var(--brand-tertiary);

  &:hover,
  &:focus-visible {
    color: var(--accent-tertiary);
    background-color: var(--accent-primary);
  }
}

.full:where(.secondary) {
  background-color: var(--accent-primary);
  color: var(--accent-tertiary);

  &:hover,
  &:focus-visible {
    color: var(--brand-tertiary);
    background-color: var(--brand-primary);
  }
}

.full:where(.negative) {
  background-color: var(--brand-tertiary);
  color: var(--brand-primary);

  &:hover,
  &:focus-visible {
    color: var(--brand-tertiary);
    background-color: var(--brand-secondary);
  }
}

.outlined:is(.card) {
  border-color: var(--brand-tertiary);
  color: var(--brand-tertiary);
  padding: 12px 16px;

  &:hover,
  &:focus-visible {
    color: var(--brand-primary);
    background-color: var(--brand-tertiary);
  }
}
</style>
