<script setup lang="ts">
import SectionHeader from '@/components/sections/SectionHeader.vue'
import SectionServices from '@/components/sections/SectionServices.vue'
import SectionConvertion from '@/components/sections/SectionConvertion.vue'
import SectionFAQ from '@/components/sections/SectionFAQ.vue'
import SectionAboutUs from '@/components/sections/SectionAboutUs.vue'
import SectionOurWork from '@/components/sections/SectionOurWork.vue'
import SectionTestimonials from '@/components/sections/SectionTestimonials.vue'
import SectionContact from '@/components/sections/SectionContact.vue'
import BaseFooter from '@/components/BaseFooter.vue'
</script>

<template>
  <main>
    <SectionHeader />
    <SectionServices />
    <SectionConvertion />
    <SectionOurWork />
    <SectionAboutUs />
    <SectionFAQ />
    <SectionTestimonials />
    <SectionContact />
    <BaseFooter />
  </main>
</template>

<style lang="scss"></style>
