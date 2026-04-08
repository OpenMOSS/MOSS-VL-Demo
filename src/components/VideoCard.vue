<script setup lang="ts">
import type { DemoVideo } from "@/data/demos";

defineProps<{
  video: DemoVideo;
}>();
</script>

<template>
  <router-link
    :to="{ name: 'demo', params: { id: video.id } }"
    class="group block overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1"
  >
    <div class="relative aspect-video overflow-hidden bg-emerald-900/10">
      <!-- Use video element for thumbnail when no image is provided -->
      <video
        v-if="!video.thumbnailUrl"
        :src="video.videoUrl"
        preload="metadata"
        muted
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <img
        v-else
        :src="video.thumbnailUrl"
        :alt="video.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute inset-0 flex items-center justify-center bg-emerald-900/0 transition-all duration-300 group-hover:bg-emerald-900/20"
      >
        <div
          class="flex h-14 w-14 scale-0 items-center justify-center rounded-full bg-white/95 text-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-100"
        >
          <svg
            class="ml-1 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="p-5">
      <h3
        class="mb-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-emerald-700"
      >
        {{ video.title }}
      </h3>
      <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
        {{ video.description }}
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in video.tags"
          :key="tag"
          class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100"
        >
          {{ tag }}
        </span>
        <span
          class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200"
        >
          {{ video.questions.length }} questions
        </span>
      </div>
    </div>
  </router-link>
</template>
