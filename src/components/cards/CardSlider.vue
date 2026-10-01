<script lang="ts" setup>
import { computed, ref } from 'vue'
import ButtonBase from '../ButtonBase.vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Lorem Ipsum',
  },
  title: {
    type: String,
    default: 'title',
  },
  backgroundImage: {
    type: String,
    default: '',
  },
  modalContent: {
    type: Object,
    default: {},
  },
})

const emit = defineEmits(['open'])

// const handleClick = () => {
//   emit('open', props.modalContent)
// }

const getBackgroundImageStyle = computed(() => {
  return { 'background-image': `url(${props.backgroundImage})` }
})

const startX = ref<number>(0)
const startY = ref<number>(0)
const isDragging = ref<boolean>(false)
const MOVE_THRESHOLD = 5 // pixels

const handleMouseDown = (event: MouseEvent) => {
  startX.value = event.clientX
  startY.value = event.clientY
  isDragging.value = false
}

const handleMouseUp = (event: MouseEvent) => {
  const deltaX = Math.abs(event.clientX - startX.value)
  const deltaY = Math.abs(event.clientY - startY.value)

  if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
    isDragging.value = true
    // Prevent the click event from firing if significant movement occurred
    event.preventDefault()
    // event.stopImmediatePropagation()
  } else {
    isDragging.value = false
  }
}

const handleClick = () => {
  if (!isDragging.value) {
    console.log('Click registered')
    emit('open', props.modalContent)
    // Handle actual click logic here
  }
}
</script>

<template>
  <div
    class="CardSlider"
    :style="getBackgroundImageStyle"
    @click="handleClick"
    :lazy="true"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="CardSlider-content">
      <h3 class="CardSlider-title title-small">{{ title }}</h3>
      <p class="CardSlider-para para">{{ text }}</p>
      <ButtonBase class="CardSlider-button" text="+" button-type="card" variant="outlined" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.CardSlider {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 700px;
  min-width: 90vw;
  max-width: 90vw;
  border-radius: 30px;
  color: var(--brand-tertiary);
  overflow: hidden;
  // cursor: pointer;
  box-shadow: 0 0 0 #ddd;
  transition: box-shadow 1s ease-in-out;

  &:hover {
    box-shadow: 0 0 30px #ddd;
    @media only screen and (min-width: 1200px) {
      box-shadow: 0 0 80px #ddd;
    }
  }

  // Image de fond avec effet de zoom
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--brand-tertiary);
    background-image: inherit;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    filter: grayscale(0);
    transform: scale(1);
    transition:
      transform 1s ease-in-out,
      filter 1s ease-in-out;
    z-index: 1;
  }

  @media only screen and (min-width: 600px) {
    width: 450px;
    height: 700px;
    min-width: 450px;
    max-width: 700px;

    &:hover::before {
      transform: scale(1.1);
      filter: grayscale(0.5);
    }
  }
}

/* =========================
   BOUTON
========================= */

.CardSlider-button {
  opacity: 1;
  position: static;
  transform: translateY(0);
  transition:
    opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s; // arrive après le paragraphe

  @media only screen and (min-width: 600px) {
    opacity: 0;
    transform: translateY(20px);
  }

  .CardSlider:hover & {
    @media only screen and (min-width: 600px) {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.45s; // délai plus long que le para
    }
  }
}

/* =========================
   CONTENU
========================= */

.CardSlider-content {
  position: relative;
  padding: 120px 40px 40px 40px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.65) 0%,
    // rgba(0, 0, 0, 0.45) 35%,
    rgba(0, 0, 0, 0.2) 55%,
    rgba(0, 0, 0, 0) 75%
  );
  transform: translateY(0); // pousse vraiment le contenu en bas
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  border-radius: 30px;

  @media only screen and (min-width: 600px) {
    transform: translateY(120px);
  }

  .CardSlider:hover & {
    transform: translateY(0);
    @media only screen and (min-width: 600px) {
      transform: translateY(0);
    }
  }
}

/* =========================
   TITRE
========================= */

.CardSlider-title {
  margin-bottom: 1rem;
  transform: translateY(0);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @media only screen and (min-width: 600px) {
    transform: translateY(0);
  }

  .CardSlider:hover & {
    @media only screen and (min-width: 600px) {
      transform: translateY(0);
    }
  }
}

/* =========================
   TEXTE
========================= */

.CardSlider-para {
  color: var(--brand-tertiary);
  margin-bottom: 1rem;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.12s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media only screen and (min-width: 600px) {
    opacity: 0;
    transform: translateY(20px);
  }

  .CardSlider:hover & {
    @media only screen and (min-width: 600px) {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.3s;
    }
  }
}
</style>
