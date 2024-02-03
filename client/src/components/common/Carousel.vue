<template>
  <Swiper
    :slidesPerView="1"
    :spaceBetween="10"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    :breakpoints="{
      '700': {
        slidesPerView: 2,
      },
      '1050': {
        slidesPerView: 3,
      },
      '1400': {
        slidesPerView: 4,
      },
    }"
    class="carousel"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index" class="carousel-slide"><img :src="image" /></SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  zelda,
  assassinsCreed,
  bioshock,
  deusEx,
  eldenRing,
  gtaV,
  spiderMan,
  godOfWar,
  theWitcher,
} from "@/assets/images";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const modules = [Autoplay, Pagination, Navigation];
const images = [zelda, assassinsCreed, bioshock, deusEx, eldenRing, gtaV, spiderMan, godOfWar, theWitcher];
</script>
<style lang="scss" scoped>
.carousel {
  height: 400px;
  width: 90%;
  &-slide {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    & img {
      height: 250px;
      width: auto;
      text-align: center;
    }
  }
}
</style>
