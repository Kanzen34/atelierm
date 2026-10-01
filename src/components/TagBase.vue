<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Tag',
  },
  type: {
    type: String,
    validator(value: string) {
      // The value must match one of these strings
      return ['light', 'dark'].includes(value)
    },
    default: 'light',
  },
})

// Computed property qui retourne le type de Tag
const getClasses = computed(() => {
  return props.type === 'light' ? 'light' : 'dark'
})
</script>

<template>
  <div class="Tag" :class="[getClasses]">{{ props.text }}</div>
</template>

<style lang="scss" scoped>
.Tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  line-height: 1;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 10px;
}

.Tag:where(.light) {
  background-color: var(--brand-secondary);
  color: var(--brand-tertiary);
}

.Tag:where(.dark) {
  background-color: var(--brand-tertiary);
  color: var(--brand-primary);
}
</style>
