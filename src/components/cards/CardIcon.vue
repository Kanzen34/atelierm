<script lang="ts" setup>
import { computed, type Component } from 'vue'

import BoxIcon from '@/components/icons/BoxIcon.vue'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import MailIcon from '@/components/icons/MailIcon.vue'
import PhoneIcon from '@/components/icons/PhoneIcon.vue'
import QuoteIcon from '@/components/icons/QuoteIcon.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'

// Ajout du type IconName
type IconName = 'box' | 'home' | 'mail' | 'phone' | 'quote' | 'stars' | 'users'
type IconColor = 'primary' | 'accent' | 'negative'

// Modification : utiliser defineProps avec TypeScript
const props = withDefaults(
  defineProps<{
    name?: IconName
    color?: IconColor
  }>(),
  {
    name: 'box',
    color: 'primary',
  },
)

const getTagName = computed<Component>(() => {
  const iconMap: Record<IconName, Component> = {
    box: BoxIcon,
    home: HomeIcon,
    mail: MailIcon,
    phone: PhoneIcon,
    quote: QuoteIcon,
    stars: StarsIcon,
    users: UsersIcon,
  }

  return iconMap[props.name]
})

const getComputedStyle = computed<String>(() => {
  return `CardIcon-${props.color}`
})
</script>

<template>
  <div class="CardIcon" :class="getComputedStyle">
    <component :is="getTagName" />
  </div>
</template>

<style lang="scss" scoped>
.CardIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  border-radius: 16px;
  background-color: var(--brand-tertiary);
  color: var(--brand-primary);

  svg {
    width: 48px;
  }
}

.CardIcon-negative {
  background-color: var(--negative-tertiary);
  color: var(--negative-primary);
}
</style>
