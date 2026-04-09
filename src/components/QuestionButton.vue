<script setup lang="ts">
defineProps<{
  text: string;
  disabled: boolean;
  used: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    :disabled="disabled"
    :title="text"
    :class="[
      'rounded-2xl border px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2',
      'max-w-full sm:max-w-[400px] truncate text-left',
      used
        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-default shadow-none'
        : disabled
          ? 'border-emerald-200 bg-emerald-50/50 text-emerald-400 cursor-not-allowed'
          : 'border-emerald-300 bg-white text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 hover:-translate-y-0.5 hover:shadow cursor-pointer active:translate-y-0',
    ]"
    @click="!used && $emit('click')"
  >
    {{ text }}
  </button>
</template>
