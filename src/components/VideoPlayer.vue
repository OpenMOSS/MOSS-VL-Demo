<script setup lang="ts">
defineProps<{
  src: string;
  poster: string;
  title: string;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-emerald-200 bg-black shadow-lg">
    <video
      :src="src"
      :poster="poster || undefined"
      controls
      preload="metadata"
      class="aspect-video w-full bg-black object-contain"
    >
      Your browser does not support the video tag.
    </video>
    <div class="border-t border-emerald-100 bg-white px-5 py-4">
      <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
    </div>
  </div>
</template>
