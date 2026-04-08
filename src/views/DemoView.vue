<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { demos } from "@/data/demos";
import VideoPlayer from "@/components/VideoPlayer.vue";
import ChatPanel from "@/components/ChatPanel.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const chatPanelRef = ref<InstanceType<typeof ChatPanel> | null>(null);

const video = computed(() => demos.find((v) => v.id === props.id));

function goBack() {
  router.push({ path: "/", hash: "#demo-grid" });
}

const leftPanelWidth = ref(55); // percentage
const isDragging = ref(false);

function startDrag(e: MouseEvent | TouchEvent) {
  // Prevent default handling and use the event to start drag
  if (e) e.preventDefault();
  isDragging.value = true;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('touchend', stopDrag);
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return;
  
  let clientX;
  if ('touches' in e) {
    clientX = e.touches[0].clientX;
  } else {
    clientX = e.clientX;
  }

  const container = document.getElementById('demo-container');
  if (container) {
    const rect = container.getBoundingClientRect();
    let newWidth = ((clientX - rect.left) / rect.width) * 100;
    // Constrain width between 30% and 70%
    if (newWidth < 30) newWidth = 30;
    if (newWidth > 75) newWidth = 75;
    leftPanelWidth.value = newWidth;
  }
}

function stopDrag() {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
}

// OCR bbox management — supports both "key": "[bbox]" and <label>key<label><bbox>[bbox]<bbox> formats
const ocrEntries = computed(() => {
  if (!video.value || video.value.type !== "ocr" || !video.value.questions.length) return [];
  const answer = video.value.questions[0].answer;
  const entries: Array<{ id: string; text: string; bbox: string; rawLine: string }> = [];

  // Format 1: "text": "[bbox]"
  const regex1 = /"([^"]+)":\s*"(\[[^\]]+\])"/g;
  let match;
  while ((match = regex1.exec(answer)) !== null) {
    entries.push({ id: `e${entries.length}`, text: match[1], bbox: match[2], rawLine: `"${match[1]}": "${match[2]}"` });
  }

  // Format 2: <label>text<label><bbox>[bbox]<bbox>
  if (entries.length === 0) {
    const regex2 = /<label>([^<]+)<label><bbox>(\[[^\]]+\])<bbox>/g;
    while ((match = regex2.exec(answer)) !== null) {
      entries.push({ id: `e${entries.length}`, text: match[1], bbox: match[2], rawLine: `<label>${match[1]}<label><bbox>${match[2]}<bbox>` });
    }
  }

  return entries;
});

const activeBboxKeys = ref(new Set<string>());

function toggleBbox(id: string) {
  const newSet = new Set(activeBboxKeys.value);
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  activeBboxKeys.value = newSet;
}

const activeBboxes = computed(() => {
  return ocrEntries.value
    .filter(entry => activeBboxKeys.value.has(entry.id))
    .map(entry => ({ text: entry.text, bbox: entry.bbox }));
});
</script>

<template>
  <div v-if="!video" class="flex h-[80vh] items-center justify-center">
    <div class="text-center">
      <p class="mb-4 text-lg text-emerald-800">Video not found</p>
      <button
        class="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
        @click="goBack"
      >
        Back to gallery
      </button>
    </div>
  </div>

  <div v-else class="flex h-[calc(100vh-80px)] items-center justify-center p-4 lg:p-8">
    <!-- Increased width to 80vw, constrained by max-width if needed -->
    <div 
      id="demo-container" 
      class="flex w-[85vw] min-w-[1000px] flex-col lg:flex-row bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-emerald-200 overflow-hidden" 
      style="height: 85vh; max-height: 900px;"
      :style="isDragging ? 'cursor: col-resize; user-select: none;' : ''"
    >
      
  <!-- Image or Multi-Image: Just Chat Panel full width -->
  <div v-if="video.type === 'image' || video.type === 'multi-image'" class="flex h-full w-full flex-col relative">
    <div class="px-5 pt-5 sm:px-8 sm:pt-8 pb-4 shrink-0 flex items-center z-10 bg-white/40">
      <button
        class="flex w-fit items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-800 bg-white/50 px-4 py-2 rounded-full border border-emerald-100 hover:bg-white hover:shadow-md"
        @click="goBack"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        Back to gallery
      </button>
    </div>

    <!-- Chat Container without the extra wrapping block -->
    <div class="flex-1 overflow-hidden w-full flex flex-col bg-white/40">
      <ChatPanel ref="chatPanelRef" :questions="video.questions" :auto-start="true" />
    </div>
  </div>

        <!-- Video: Split layout with Player and Chat -->
        <div v-else class="flex h-full w-full flex-col lg:flex-row">
          <!-- Left: Video Panel -->
          <div 
            class="flex flex-col border-b border-emerald-100 lg:border-b-0 bg-emerald-50/30"
            :style="{ width: `${leftPanelWidth}%` }"
          >
            <div class="flex-1 overflow-y-auto p-5 lg:p-8 flex flex-col">
              <!-- Back to gallery button at the very top -->
              <div class="mb-6 flex shrink-0">
                <button
                  class="flex w-fit items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-800 bg-white/50 px-4 py-2 rounded-full border border-emerald-100 hover:bg-white hover:shadow-md"
                  @click="goBack"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to gallery
                </button>
              </div>

              <!-- Centered Video Player or OCR Image Viewer -->
              <div class="flex-1 flex flex-col justify-center">
              <VideoPlayer
                :src="video.type === 'ocr' ? (video.imageUrl || '') : (video.videoUrl || '')"
                :poster="video.thumbnailUrl || ''"
                :title="video.title"
                :type="video.type"
                :activeBboxes="video.type === 'ocr' ? activeBboxes : undefined"
              />
              </div>

              <!-- Caption and Tags at the bottom -->
              <div class="mt-8 shrink-0">
                <p class="text-base leading-relaxed text-gray-700">
                  {{ video.description }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="tag in video.tags"
                    :key="tag"
                    class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Resizer Split Line -->
          <div 
            class="hidden lg:flex w-1.5 shrink-0 cursor-col-resize flex-col items-center justify-center bg-emerald-100 hover:bg-emerald-300 active:bg-emerald-400 transition-colors z-10"
            @mousedown.prevent="startDrag"
            @touchstart.prevent="startDrag"
          >
            <!-- Visual handle indicator -->
            <div class="h-10 w-0.5 rounded-full bg-emerald-400/50 pointer-events-none"></div>
          </div>

          <!-- Right: Chat Panel -->
          <div class="flex min-h-0 flex-1 flex-col bg-white/40">
            <ChatPanel
              :questions="video.questions"
              :welcomeLabel="video.type === 'ocr' ? 'Ask the Image' : undefined"
              :ocrEntries="video.type === 'ocr' ? ocrEntries : undefined"
              :activeBboxKeys="video.type === 'ocr' ? activeBboxKeys : undefined"
              @bboxToggle="toggleBbox"
            />
          </div>
        </div>
    </div>
  </div>
</template>
