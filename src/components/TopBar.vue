<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-emerald-200/50 bg-white/60 px-8 backdrop-blur-md shadow-sm"
  >
    <div
      class="flex cursor-pointer items-center gap-4"
      @click="router.push('/')"
    >
      <span class="text-2xl font-extrabold tracking-tight text-emerald-800">
        MOSS-VL
      </span>
      <span
        class="ml-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 shadow-sm"
      >
        Demo
      </span>
    </div>
    <a
      href="https://github.com/OpenMOSS/MOSS-VL"
      target="_blank"
      rel="noopener"
      class="text-base font-semibold text-emerald-700 transition hover:text-emerald-900"
    >
      GitHub
    </a>
  </header>
</template>
