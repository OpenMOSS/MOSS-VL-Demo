<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

defineProps<{
  src: string;
  poster: string;
  title: string;
  type?: "video" | "image" | "multi-image" | "ocr";
  imageUrls?: string[];
  activeBboxes?: Array<{ text: string; bbox: string }>;
}>();

const currentImageIndex = ref(0);
function setImage(index: number) {
  currentImageIndex.value = index;
}

// Directly measure the img element's rendered position relative to the container
const imgRef = ref<HTMLImageElement>();
const containerRef = ref<HTMLDivElement>();
const imgRenderRect = ref({ left: 0, top: 0, width: 0, height: 0 });

function updateImgRect() {
  if (!imgRef.value || !containerRef.value) return;
  const ir = imgRef.value.getBoundingClientRect();
  const cr = containerRef.value.getBoundingClientRect();
  imgRenderRect.value = {
    left: ir.left - cr.left,
    top: ir.top - cr.top,
    width: ir.width,
    height: ir.height,
  };
}

function onImgLoad() {
  updateImgRect();
}

const overlayStyle = computed(() => {
  const { left, top, width, height } = imgRenderRect.value;
  if (!width || !height) return { display: "none" };
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  };
});

// Coords are normalized to 1000x1000 in [xmin, ymin, xmax, ymax] format
function getBBoxStyle(bboxStr: string) {
  try {
    const coords = JSON.parse(bboxStr);
    if (!Array.isArray(coords) || coords.length !== 4) return {};
    const [xmin, ymin, xmax, ymax] = coords;
    return {
      left: `${(xmin / 1000) * 100}%`,
      top: `${(ymin / 1000) * 100}%`,
      width: `${((xmax - xmin) / 1000) * 100}%`,
      height: `${((ymax - ymin) / 1000) * 100}%`,
    };
  } catch {
    return {};
  }
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => updateImgRect());
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-emerald-200 bg-black shadow-lg flex flex-col relative group h-full">
    <!-- OCR Image with bbox overlay -->
    <div v-if="type === 'ocr'" ref="containerRef" class="relative w-full flex-1 bg-black flex items-center justify-center min-h-0 overflow-hidden">
      <img
        ref="imgRef"
        :src="src"
        :alt="title"
        class="max-h-full max-w-full object-contain"
        @load="onImgLoad"
      />
      <!-- BBox overlay positioned exactly over the rendered image -->
      <div
        v-if="activeBboxes && activeBboxes.length > 0"
        class="absolute pointer-events-none"
        :style="overlayStyle"
      >
        <div
          v-for="(item, idx) in activeBboxes"
          :key="idx"
          class="absolute border-2 border-emerald-500"
          :style="getBBoxStyle(item.bbox)"
        >
          <span class="bg-emerald-50 text-emerald-800 text-xs font-bold px-1 whitespace-nowrap absolute left-[-2px] top-0 -translate-y-full border-2 border-emerald-500 border-b-0 leading-tight shadow-sm">
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
    <!-- Single Image -->
    <img
      v-else-if="type === 'image'"
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
