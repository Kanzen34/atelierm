<script lang="ts" setup>
import { computed, watch, onUnmounted } from 'vue'
import ButtonBase from '@/components/ButtonBase.vue'

import paintSmall from '@/assets/images/paint-small.png'

const props = defineProps({
  show: Boolean,
  modalContent: Object,
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const getBackgroundImageStyle = computed(() => {
  return { 'background-image': `url(${props.modalContent?.modalData.backgroundImageModal})` }
})

/* =========================
   LOCK SCROLL
========================= */

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  document.body.style.overflow = ''
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      lockScroll()
    } else {
      unlockScroll()
    }
  },
  { immediate: true },
)

// sécurité si le composant est détruit
onUnmounted(() => {
  unlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="BaseModal" @click.self="closeModal">
        <ButtonBase
          class="BaseModal-close"
          text="x"
          button-type="card"
          variant="outlined"
          @click="closeModal"
        />

        <div class="BaseModal-image" :style="getBackgroundImageStyle"></div>

        <div class="BaseModal-content">
          <div>
            <h2 class="BaseModal-title">{{ props.modalContent?.modalData.seoTitle || 'title' }}</h2>
            <p class="para">{{ props.modalContent?.modalData.description || 'text' }}</p>
          </div>

          <!-- <div class="line"></div> -->
          <img :src="paintSmall" alt="" data-nosnippet />

          <div>
            <h3 class="title-small">Matériaux utilisés</h3>
            <ul>
              <li
                class="para"
                v-for="(item, index) in props.modalContent?.modalData.materials || []"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- <div class="line"></div> -->
          <img :src="paintSmall" alt="" data-nosnippet />

          <div>
            <h3 class="title-small">Techniques utilisées</h3>
            <ul>
              <li
                class="para"
                v-for="(item, index) in props.modalContent?.modalData.techniques || []"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <ButtonBase
            class="BaseModal-buttonContact"
            text="Demandez un devis"
            @click="closeModal"
            anchor="#contact"
            buttonType="negative"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.BaseModal {
  flex-direction: column;
  display: flex;
  inset: 0;
  position: fixed;
  width: 100%;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }

  img {
    opacity: 0.3;
  }
}

.BaseModal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--brand-primary);
  color: var(--brand-tertiary);
  box-shadow: -60px 0 80px rgba(0, 0, 0, 0.5);

  @media only screen and (min-width: 600px) {
    padding: 30px;
    width: 500px;
  }

  .para {
    color: rgba(var(--brand-tertiary-rgb), 0.5);
  }

  .line {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  > div h3 {
    margin-bottom: 12px;
  }

  ul,
  li {
    list-style: inside;
  }

  li:not(:last-child) {
    margin-bottom: 10px;
  }
}

.BaseModal-image {
  width: 100%;
  object-fit: contain;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;

  @media only screen and (min-width: 600px) {
    width: 80%;
  }
}

.BaseModal-title {
  font-family: 'Playfair', serif;
  line-height: 1.2;
  font-size: 2.5rem;
  margin-bottom: 12px;

  @media only screen and (min-width: 600px) {
    font-size: 2.8rem;
    width: 80%;
  }
}

.BaseModal-close.outlined {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 30px;
  left: 30px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  font-size: 2rem;
  // font-weight: 300;
  line-height: 1;
  color: var(--brand-primary);
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  border-radius: 30px;
  z-index: 10;
  box-shadow: -0 0 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.BaseModal-buttonContact {
  margin-top: 40px;
}

/* =========================
   MODAL TRANSITION
   Version smooth / premium
========================= */

/* Overlay fade */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

/* =========================
   IMAGE
========================= */

.BaseModal-image {
  transition:
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.6s ease;
}

.modal-enter-from .BaseModal-image {
  transform: translateY(60px) scale(1.08);
  opacity: 0;
}

.modal-enter-to .BaseModal-image {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.modal-leave-to .BaseModal-image {
  transform: translateY(40px) scale(1.04);
  opacity: 0;
}

/* =========================
   CONTENT
========================= */

.BaseModal-content {
  transition:
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.6s ease;
  transition-delay: 0.1s;
}

.modal-enter-from .BaseModal-content {
  transform: translateY(80px);
  opacity: 0;
}

.modal-enter-to .BaseModal-content {
  transform: translateY(0);
  opacity: 1;
}

.modal-leave-to .BaseModal-content {
  transform: translateY(40px);
  opacity: 0;
}

/* =========================
   CLOSE BUTTON
========================= */

.BaseModal-close {
  transition:
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s ease;
  transition-delay: 0.25s;
}

.modal-enter-from .BaseModal-close {
  transform: translateY(-20px);
  opacity: 0;
}

.modal-enter-to .BaseModal-close {
  transform: translateY(0);
  opacity: 1;
}

.modal-leave-to .BaseModal-close {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
