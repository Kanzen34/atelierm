<script lang="ts" setup>
import CardIcon from '@/components/cards/CardIcon.vue'
import { AVAILABLE_CARD_ICONS } from '@/consts'
import type { IconName } from '@/consts'

const props = defineProps({
  iconName: {
    type: String,
    validator(value: IconName) {
      return AVAILABLE_CARD_ICONS.includes(value.toLowerCase() as IconName)
    },
    default: 'box',
  },
  text: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="CardService">
    <CardIcon :name="props.iconName as IconName" />

    <div class="CardService-content">
      <h3 class="title-small">{{ title }}</h3>
      <p class="para" v-html="text"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.CardService {
}

.CardService-content {
  margin-top: 20px;
}

h3 {
  margin-bottom: 6px;
}
</style>
