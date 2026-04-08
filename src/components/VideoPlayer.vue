<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  src: string;
  poster: string;
  title: string;
  type?: "video" | "image" | "multi-image";
  imageUrls?: string[];
}>();

const currentImageIndex = ref(0);

function setImage(index: number) {
  currentImageIndex.value = index;
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-emerald-200 bg-black shadow-lg flex flex-col">
    <!-- Single Image -->
    <img
      v-if="type === 'image'"
      :src="src"
      :alt="title"
      class="aspect-video w-full bg-black object-contain"
    />
    <!-- Multi Image Slider -->
    <div v-else-if="type === 'multi-image' && imageUrls && imageUrls.length > 0" class="relative aspect-video w-full bg-black flex-1 min-h-0">
      <img
        :src="imageUrls[currentImageIndex]"
        :alt="title"
        class="absolute inset-0 h-full w-full object-contain"
      />
      <!-- Dots container -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        <button
          v-for="(_, index) in imageUrls"
          :key="index"
          @click="setImage(index)"
          class="h-2 w-2 rounded-full transition-all"
          :class="index === currentImageIndex ? 'bg-emerald-400 scale-125 shadow-md' : 'bg-white/60 hover:bg-white/90'"
          :aria-label="'Show image ' + (index + 1)"
        />
      </div>
    </div>
    <!-- Video -->
    <video
      v-else
      :src="src"
      :poster="poster || undefined"
      controls
      preload="metadata"
      class="aspect-video w-full bg-black object-contain"
    >
      Your browser does not support the video tag.
    </video>
    <div class="border-t border-emerald-100 bg-white px-5 py-4 shrink-0">
      <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
    </div>
  </div>
</template>
