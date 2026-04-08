<script setup lang="ts">
import type { DemoVideo } from "@/data/demos";

defineProps<{
  video: DemoVideo;
}>();
</script>

<template>
  <router-link
    :to="{ name: 'demo', params: { id: video.id } }"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1"
  >
    <div class="relative aspect-video overflow-hidden bg-emerald-900/10">
      <!-- Image type -->
      <img
        v-if="video.type === 'image' || video.type === 'ocr'"
        :src="video.thumbnailUrl || video.imageUrl"
        :alt="video.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Multi-image type -->
      <img
        v-else-if="video.type === 'multi-image' && video.imageUrls && video.imageUrls.length > 0"
        :src="video.thumbnailUrl || video.imageUrls[0]"
        :alt="video.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Explicit thumbnail for video -->
      <img
        v-else-if="video.thumbnailUrl"
        :src="video.thumbnailUrl"
        :alt="video.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Video fallback -->
      <video
        v-else
        :src="video.thumbnailTime !== undefined ? `${video.videoUrl}#t=${video.thumbnailTime}` : video.videoUrl"
        preload="metadata"
        muted
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 flex items-center justify-center bg-emerald-900/0 transition-all duration-300 group-hover:bg-emerald-900/20"
      >
        <div
          class="flex h-14 w-14 scale-0 items-center justify-center rounded-full bg-white/95 text-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-100"
        >
          <svg
            v-if="!video.type || video.type === 'video'"
            class="ml-1 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg
            v-else-if="video.type === 'image' || video.type === 'ocr'"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <svg
            v-else-if="video.type === 'multi-image'"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3
        class="mb-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-emerald-700"
      >
        {{ video.title }}
      </h3>
      <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
        {{ video.description }}
      </p>
      <div class="mt-auto flex items-end justify-between gap-2">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in video.tags"
            :key="tag"
            class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100"
          >
            {{ tag }}
          </span>
        </div>
        <span
          class="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800 border border-emerald-200"
          :title="`${video.questions.length}个示例问题`"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ video.questions.length }}
        </span>
      </div>
    </div>
  </router-link>
</template>
