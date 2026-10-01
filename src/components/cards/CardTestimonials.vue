<script lang="ts" setup>
import QuoteIcon from '../icons/QuoteIcon.vue'

const props = defineProps({
  author: {
    type: String,
    default: 'John Doe',
  },
  testimonial: {
    type: String,
    default: 'lorem ipsum',
  },
})
</script>

<template>
  <div class="CardTestimonials">
    <figure class="CardTestimonials-container">
      <QuoteIcon class="CardTestimonials-icon" />
      <blockquote>
        <p class="para">{{ testimonial }}</p>
      </blockquote>

      <div class="CardTestimonials-footer">
        <div class="CardTestimonials-separator"></div>

        <figcaption>
          <cite>{{ author }}</cite>
        </figcaption>
      </div>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
.CardTestimonials {
  min-width: 90vw;
  max-width: 90vw;
  padding: 30px;
  border-radius: 30px;
  background-color: rgba(var(--brand-secondary-rgb), 0.3);
  transition: background-color 0.2s;

  .active & {
    background-color: rgba(var(--brand-secondary-rgb), 1);
  }

  @media only screen and (min-width: 600px) {
    width: 370px;
    height: 340px;
    min-width: 370px;
    max-width: 340px;
  }
}

.CardTestimonials-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 20px;

  .para {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--brand-tertiary);
  }
}

.CardTestimonials-separator {
  height: 1px;
  background-color: var(--brand-tertiary);
  margin-bottom: 20px;
  opacity: 0.5;
}

.CardTestimonials-icon {
  width: 50px;
}

cite {
  display: block;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: right;
}

.author {
}
</style>
