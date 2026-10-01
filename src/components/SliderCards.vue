<script lang="ts" setup>
import { ref, onMounted, onUnmounted, type Component } from 'vue'
import BaseModal from './BaseModal.vue'

const showModal = ref(false)
const selectedModalContent = ref<any>(null)

const openModal = (data: any) => {
  selectedModalContent.value = data
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedModalContent.value = null
}

/**
 * Interface representing a slide item with a component and its props
 */
interface SlideItem {
  component: Component
  props: Record<string, any>
}

/**
 * Props definition for the slider
 */
interface Props {
  /**
   * Array of slide items containing components and their props
   */
  items: SlideItem[]
  viewportClass?: string
  navigationClass?: string
}

const props = defineProps<Props>()

/**
 * Reference to the viewport container element
 */
const viewportRef = ref<HTMLDivElement | null>(null)

/**
 * Index of the currently active slide
 */
const currentIndex = ref<number>(0)

/**
 * Current horizontal position of the slider in pixels
 */
const position = ref<number>(0)

/**
 * Flag indicating if the user is currently dragging
 */
let isDragging = false

/**
 * X coordinate where the drag started
 */
let startX = 0

/**
 * Position of the slider when drag started
 */
let startPosition = 0

/**
 * Current X coordinate during drag
 */
let currentX = 0

/**
 * Animation frame ID for smooth drag updates
 */
let animationFrame: number | null = null

/**
 * Width of each panel in pixels (80% of viewport width)
 */
function getPanelWidth(index: number): number {
  if (!viewportRef.value) return 0
  const panels = viewportRef.value.querySelectorAll('.SliderCards-panel')
  if (!panels[index]) return 0
  return (panels[index] as HTMLElement).offsetWidth
}

/**
 * Minimum drag distance in pixels to trigger a slide change
 */
const THRESHOLD = 40

/**
 * Handles the start of a drag operation (mouse or touch)
 * @param event - Mouse or touch event that initiated the drag
 */
function onDragStart(event: MouseEvent | TouchEvent): void {
  isDragging = true

  if (event.type === 'mousedown') {
    startX = (event as MouseEvent).clientX
  } else {
    const touch = (event as TouchEvent).touches[0]
    if (!touch) return
    startX = touch.clientX
  }

  startPosition = position.value
  currentX = startX

  if (viewportRef.value) {
    viewportRef.value.style.cursor = 'grabbing'
  }

  // Add event listeners
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
  document.addEventListener('touchmove', onDragMove)
  document.addEventListener('touchend', onDragEnd)
}

/**
 * Handles the drag movement, updating slider position in real-time
 * @param event - Mouse or touch move event
 */
function onDragMove(event: Event): void {
  if (!isDragging) return

  event.preventDefault()
  const e = event as MouseEvent | TouchEvent

  if (e.type === 'mousemove') {
    currentX = (e as MouseEvent).clientX
  } else {
    const touch = (e as TouchEvent).touches[0]
    if (!touch) return
    currentX = touch.clientX
  }

  const deltaX = currentX - startX

  // Update position in real-time
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
  }

  animationFrame = requestAnimationFrame(() => {
    position.value = startPosition - deltaX
  })
}

/**
 * Handles the end of a drag operation
 * Determines which dot should be active based on scroll position
 */
function onDragEnd(): void {
  if (!isDragging) return

  isDragging = false

  if (viewportRef.value) {
    viewportRef.value.style.cursor = 'grab'
  }

  // Remove event listeners
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
  document.removeEventListener('touchmove', onDragMove)
  document.removeEventListener('touchend', onDragEnd)

  // Calculer la largeur totale du slider
  const panels = viewportRef.value?.querySelectorAll('.SliderCards-panel')
  let totalWidth = 0

  if (panels) {
    panels.forEach((panel) => {
      totalWidth += (panel as HTMLElement).offsetWidth
    })
  }

  const viewportWidth = window.innerWidth
  const firstPanelMargin = panels?.[0]
    ? parseFloat(getComputedStyle(panels[0] as HTMLElement).marginLeft)
    : 0
  const lastPanelMargin = panels?.[panels.length - 1]
    ? parseFloat(getComputedStyle(panels[panels.length - 1] as HTMLElement).marginRight)
    : 0

  const maxScroll = Math.max(0, totalWidth + firstPanelMargin + lastPanelMargin - viewportWidth)

  // Limiter la position actuelle entre 0 et maxScroll
  const clampedPosition = Math.max(0, Math.min(position.value, maxScroll))

  // Calculer quel dot devrait être actif en fonction de la position
  const totalSlides = props.items.length - 1
  const progressRatio = maxScroll > 0 ? clampedPosition / maxScroll : 0
  const closestIndex = Math.round(progressRatio * totalSlides)

  // Animate to final position
  moveTo(closestIndex)
}

/**
 * Navigates to a specific slide index
 * @param index - The index of the slide to navigate to (0-based)
 */
function moveTo(index: number): void {
  currentIndex.value = index

  // Calculer la largeur totale du slider
  const panels = viewportRef.value?.querySelectorAll('.SliderCards-panel')
  let totalWidth = 0

  if (panels) {
    panels.forEach((panel) => {
      totalWidth += (panel as HTMLElement).offsetWidth
    })
  }

  const viewportWidth = window.innerWidth
  const firstPanelMargin = panels?.[0]
    ? parseFloat(getComputedStyle(panels[0] as HTMLElement).marginLeft)
    : 0
  const lastPanelMargin = panels?.[panels.length - 1]
    ? parseFloat(getComputedStyle(panels[panels.length - 1] as HTMLElement).marginRight)
    : 0

  const maxScroll = Math.max(0, totalWidth + firstPanelMargin + lastPanelMargin - viewportWidth)

  // Calculer la position en fonction de l'index (progression linéaire)
  const totalSlides = props.items.length - 1
  const targetPosition = totalSlides > 0 ? (index / totalSlides) * maxScroll : 0

  animateToPosition(targetPosition)
}

/**
 * Animates the slider to a target position with easing
 * @param targetPosition - The target position in pixels
 */
function animateToPosition(targetPosition: number): void {
  const startPos = position.value
  const distance = targetPosition - startPos
  const duration = 500
  const startTime = performance.now()

  /**
   * Animation frame callback for smooth position transition
   * @param currentTime - Current timestamp from requestAnimationFrame
   */
  function animate(currentTime: number): void {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function (easeOutCubic)
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    position.value = startPos + distance * easeProgress

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

/**
 * Lifecycle hook - Initialize slider position
 */
onMounted(() => {
  // Initial position
  position.value = 0
})

/**
 * Lifecycle hook - Cleanup event listeners and animation frames
 */
onUnmounted(() => {
  // Cleanup
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
  document.removeEventListener('touchmove', onDragMove)
  document.removeEventListener('touchend', onDragEnd)

  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="SliderCards">
    <div
      ref="viewportRef"
      class="SliderCards-viewport"
      :class="props.viewportClass"
      @mousedown="onDragStart"
      @touchstart="onDragStart"
    >
      <div class="SliderCards-camera" :style="{ transform: `translateX(${-position}px)` }">
        <div
          v-for="(item, index) in props.items"
          :key="index"
          class="SliderCards-panel"
          :class="{ active: currentIndex === index }"
        >
          <component :is="item.component" v-bind="item.props" @open="openModal(item.props)" />
        </div>
        <BaseModal :show="showModal" :modalContent="selectedModalContent" @close="closeModal" />
      </div>
    </div>

    <div class="SliderCards-navigation" :class="props.navigationClass">
      <button
        v-for="(item, index) in props.items"
        :key="index"
        class="SliderCards-dot"
        :class="{ active: currentIndex === index }"
        @click="moveTo(index)"
        :aria-label="`Aller à la slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SliderCards {
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 20px 0;
  overflow: hidden;
}

.SliderCards-viewport {
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.SliderCards-viewport--SectionOurWork {
  padding-top: 40px;

  @media only screen and (min-width: 600px) {
    padding-top: 80px;
  }
}

.SliderCards-camera {
  display: flex;
  gap: 20px;
  will-change: transform;

  @media only screen and (min-width: 600px) {
    gap: 20px;
  }
}

.SliderCards-panel {
  min-width: auto;
  max-width: none;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.SliderCards-panel:first-child {
  margin-left: calc(50vw - 40vw);
}

.SliderCards-panel:last-child {
  margin-right: calc(50vw - 40vw);
}

.SliderCards-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  &.negative {
    .SliderCards-dot {
      background-color: rgba(var(--brand-tertiary-rgb), 0.3);
      &:hover {
        background-color: rgba(var(--brand-tertiary-rgb), 0.6);
      }
    }
    .SliderCards-dot.active {
      background-color: var(--brand-tertiary);
    }
  }
}

.SliderCards-dot {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.SliderCards-dot::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
}

.SliderCards-dot:hover {
  background-color: var(--brand-secondary);
  transform: scale(1.3);
}

.SliderCards-dot.active {
  background-color: var(--brand-primary);
  width: 32px;
  border-radius: 6px;
}

/* Responsive */
@media (max-width: 768px) {
  .SliderCards-panel {
    min-width: 90vw;
    max-width: 90vw;
  }

  .SliderCards-panel:first-child {
    margin-left: calc(50vw - 45vw);
  }

  .SliderCards-panel:last-child {
    margin-right: calc(50vw - 45vw);
  }
}
</style>
