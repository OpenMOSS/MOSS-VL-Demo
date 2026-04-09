<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, watch } from "vue";
import { marked } from "marked";
import type { DemoQuestion } from "@/data/demos";
import QuestionButton from "@/components/QuestionButton.vue";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
  images?: string[];
}

const props = defineProps<{
  questions: DemoQuestion[];
  autoStart?: boolean;
  ocrEntries?: Array<{ id: string; text: string; bbox: string; rawLine: string }>;
  activeBboxKeys?: Set<string>;
  welcomeLabel?: string;
}>();

const emit = defineEmits<{
  (e: "bboxToggle", id: string): void;
}>();

const lightboxImg = ref<string | null>(null);
const messages = ref<ChatMessage[]>([]);
const isTyping = ref(false);
const chatContainer = ref<HTMLDivElement>();
const currentQuestions = ref<DemoQuestion[]>([]);
const hasStarted = ref(false);
const activeQuestion = ref<DemoQuestion | null>(null);
const usedQuestionIds = ref(new Set<string>());
let typeTimer: ReturnType<typeof setInterval> | null = null;

watch(() => props.questions, () => {
  resetChat();
}, { immediate: true });

function resetChat() {
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }
  isTyping.value = false;
  hasStarted.value = false;
  activeQuestion.value = null;
  usedQuestionIds.value.clear();
  currentQuestions.value = [...props.questions];

  if (props.autoStart && props.questions.length > 0) {
    // For auto-start, instantly render all questions and answers statically
    const initialMessages: ChatMessage[] = [];
    props.questions.forEach(q => {
      usedQuestionIds.value.add(q.id);
      initialMessages.push({
        role: "user",
        content: q.text,
        images: q.images
      });
      initialMessages.push({
        role: "assistant",
        content: q.answer,
        isTyping: false
      });
    });
    messages.value = initialMessages;
    hasStarted.value = true;
    currentQuestions.value = [];
  } else {
    messages.value = [];
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

function renderMarkdown(text: string): string {
  return marked.parse(text, { async: false, breaks: true }) as string;
}

function askQuestion(question: DemoQuestion, instant: boolean = false) {
  if (isTyping.value) return;

  usedQuestionIds.value.add(question.id);
  hasStarted.value = true;
  activeQuestion.value = question;
  // Hide current questions immediately
  currentQuestions.value = [];

  messages.value.push({
    role: "user",
    content: question.text,
    images: question.images
  });

  scrollToBottom();

  if (instant) {
    messages.value.push({
      role: "assistant",
      content: question.answer,
      isTyping: false,
    });
    currentQuestions.value = props.questions.filter((q) => !usedQuestionIds.value.has(q.id));
    scrollToBottom();
    return;
  }

  messages.value.push({
    role: "assistant",
    content: "",
    isTyping: true,
  });
  // Get the reactive proxy reference — mutating this triggers Vue re-renders
  const reactiveMsg = messages.value[messages.value.length - 1];
  isTyping.value = true;

  let charIndex = 0;
  const answer = question.answer;
  const CHAR_DELAY_MS = 25;

  typeTimer = setInterval(() => {
    if (charIndex < answer.length) {
      let step = 1;
      if (answer[charIndex] === "\n") step = 2;
      reactiveMsg.content = answer.slice(0, charIndex + step);
      charIndex += step;
      scrollToBottom();
    } else {
      finishTyping(reactiveMsg);
    }
  }, CHAR_DELAY_MS);
}

function stopTyping() {
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }
  const lastMsg = messages.value[messages.value.length - 1];
  if (lastMsg && lastMsg.isTyping && activeQuestion.value) {
    lastMsg.isTyping = false;
    isTyping.value = false;
    
    currentQuestions.value = props.questions.filter((q) => !usedQuestionIds.value.has(q.id));
  }
}

function finishTyping(msg: ChatMessage) {
  msg.isTyping = false;
  isTyping.value = false;
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }
  currentQuestions.value = props.questions.filter((q) => !usedQuestionIds.value.has(q.id));
}

onBeforeUnmount(() => {
  if (typeTimer) clearInterval(typeTimer);
});

defineExpose({ askQuestion, resetChat });
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Messages area -->
    <div
      ref="chatContainer"
      class="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 bg-white/50 backdrop-blur-sm"
    >
      <!-- Welcome message -->
      <div
        v-if="messages.length === 0 && !props.autoStart"
        class="flex h-full items-center justify-center animate-fade-in"
      >
        <div class="text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 shadow-inner"
          >
            <svg
              class="h-8 w-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 class="mb-2 font-bold text-gray-800">
            {{ props.welcomeLabel || (props.autoStart ? 'Ask the Image' : 'Ask the Video') }}
          </h3>
          <p class="text-sm font-medium text-gray-500">
            Click a question below to see the model's response
          </p>
        </div>
      </div>

      <!-- Chat messages -->
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="animate-slide-up"
      >
        <!-- User message -->
        <div v-if="msg.role === 'user'">
          <!-- Images displayed directly, outside the message bubble -->
          <div v-if="msg.images && msg.images.length > 0" class="flex flex-wrap justify-end gap-3 mb-3">
            <img
              v-for="(img, imgIdx) in msg.images"
              :key="imgIdx"
              :src="img"
              class="max-h-72 max-w-[70%] rounded-2xl shadow-lg object-contain bg-black/5 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all"
              loading="lazy"
              @click="lightboxImg = img"
            />
          </div>
          <div class="flex justify-end">
            <div class="prose-user max-w-[85%]">
              <div
                class="rounded-[1.5rem] rounded-tr-md bg-emerald-600 px-6 py-4 text-[1.05rem] font-medium text-white shadow-md border border-emerald-500/50"
                v-html="renderMarkdown(msg.content)"
              />
            </div>
          </div>
        </div>

        <!-- Assistant message -->
        <div v-else class="flex justify-start">
          <div class="max-w-[95%]">
            <div class="mb-2 flex items-center gap-2">
              <div
                class="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 border border-emerald-200 text-xs font-black text-emerald-700 shadow-sm"
              >
                M
              </div>
              <span class="text-sm font-bold text-gray-600">Model</span>
              <span
                v-if="msg.isTyping"
                class="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"
              />
            </div>

            <!-- OCR interactive mode: raw output with clickable entries -->
            <div
              v-if="ocrEntries && ocrEntries.length > 0 && !msg.isTyping"
              class="prose-assistant max-w-none rounded-[1.5rem] rounded-tl-md border border-emerald-100 bg-white/95 px-7 py-5 text-gray-800 shadow-sm font-mono text-sm leading-loose"
            >
              <div
                v-for="entry in ocrEntries"
                :key="entry.id"
                @click="emit('bboxToggle', entry.id)"
                class="cursor-pointer select-none py-0.5 transition-all hover:font-bold"
                :class="activeBboxKeys?.has(entry.id)
                  ? 'underline decoration-emerald-500 decoration-2 underline-offset-4'
                  : 'italic'"
              >{{ entry.rawLine }}</div>
            </div>

            <!-- Regular markdown rendering (or during typing) -->
            <div
              v-else
              class="prose-assistant max-w-none rounded-[1.5rem] rounded-tl-md border border-emerald-100 bg-white/95 px-7 py-5 text-[1.05rem] leading-[1.8] text-gray-800 shadow-sm"
              v-html="renderMarkdown(msg.content)"
            />

            <div v-if="msg.images && msg.images.length > 0" class="mt-3 flex flex-wrap gap-2">
              <img 
                v-for="(img, imgIdx) in msg.images" 
                :key="imgIdx" 
                :src="img" 
                class="max-h-48 rounded-xl border border-emerald-100 shadow-sm object-contain" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Area (Questions & Controls) floating at the bottom -->
    <div 
      v-if="!props.autoStart"
      class="border-t border-emerald-100 bg-white/70 backdrop-blur-md px-5 py-4 sm:px-8 sm:py-5 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] min-h-[96px] flex flex-col justify-center"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <!-- Left: Questions or Status -->
        <div class="flex-1">
          <div v-if="!hasStarted">
            <p class="mb-3 text-xs font-bold tracking-widest uppercase text-emerald-800/60">
              Suggested questions
            </p>
            <div class="flex flex-wrap gap-2.5">
              <QuestionButton
                v-for="q in currentQuestions"
                :key="q.id"
                :text="q.text"
                :disabled="false"
                :used="false"
                @click="askQuestion(q)"
              />
            </div>
          </div>
          
          <div v-else>
            <div v-if="isTyping" class="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Model is typing...
            </div>
            
            <div v-else-if="currentQuestions.length > 0">
              <p class="mb-3 text-xs font-bold tracking-widest uppercase text-emerald-800/60">
                Follow-up questions
              </p>
              <div class="flex flex-wrap gap-2.5">
                <QuestionButton
                  v-for="q in currentQuestions"
                  :key="q.id"
                  :text="q.text"
                  :disabled="false"
                  :used="false"
                  @click="askQuestion(q)"
                />
              </div>
            </div>
            
            <div v-else class="text-sm font-medium text-gray-500">
              Dialogue complete. Return to the gallery or clear chat to try again.
            </div>
          </div>
        </div>

        <!-- Right: Stop or Clear Button -->
        <div v-if="!props.autoStart" class="flex shrink-0 gap-2 items-end justify-end mt-2 sm:mt-0">
          <button
            v-if="isTyping"
            @click="stopTyping"
            class="flex items-center gap-1.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-100 hover:shadow"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="2" /></svg>
            Stop
          </button>
          <button
            v-else-if="messages.length > 0"
            @click="resetChat"
            class="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
        </div>

      </div>
    </div>

    <!-- Image Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxImg"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
        @click="lightboxImg = null"
      >
        <img
          :src="lightboxImg"
          class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Assistant Message Markdown Styles */
.prose-assistant :deep(h1),
.prose-assistant :deep(h2),
.prose-assistant :deep(h3) {
  color: #111827;
  margin-top: 0.75em;
  margin-bottom: 0.25em;
  font-weight: 700;
}
.prose-assistant :deep(h1) { font-size: 1.1em; }
.prose-assistant :deep(h2) { font-size: 1.05em; }
.prose-assistant :deep(h3) { font-size: 1em; }

.prose-assistant :deep(p) {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-assistant :deep(strong) {
  color: #1f2937;
  font-weight: 700;
}

.prose-assistant :deep(ul),
.prose-assistant :deep(ol) {
  padding-left: 1.5em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-assistant :deep(li) {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}

.prose-assistant :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5em 0;
  font-size: 0.9em;
}

.prose-assistant :deep(th),
.prose-assistant :deep(td) {
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 0.5em 0.75em;
  text-align: left;
}

.prose-assistant :deep(th) {
  background: rgba(16, 185, 129, 0.1);
  font-weight: 700;
  color: #065f46;
}

.prose-assistant :deep(code) {
  background: rgba(16, 185, 129, 0.08);
  padding: 0.15em 0.4em;
  border-radius: 0.3em;
  font-size: 0.9em;
  font-family: "JetBrains Mono", monospace;
  color: #047857;
}

.prose-assistant :deep(pre) {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.75em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 0.5em 0;
}

.prose-assistant :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

/* User Message Markdown Styles */
.prose-user :deep(h1),
.prose-user :deep(h2),
.prose-user :deep(h3) {
  color: #ffffff;
  margin-top: 0.75em;
  margin-bottom: 0.25em;
  font-weight: 700;
}
.prose-user :deep(h1) { font-size: 1.1em; }
.prose-user :deep(h2) { font-size: 1.05em; }
.prose-user :deep(h3) { font-size: 1em; }

.prose-user :deep(p) {
  margin-top: 0;
  margin-bottom: 0;
}

.prose-user :deep(p:not(:last-child)) {
  margin-bottom: 0.5em;
}

.prose-user :deep(strong) {
  color: #ffffff;
  font-weight: 800;
}

.prose-user :deep(ul),
.prose-user :deep(ol) {
  padding-left: 1.5em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-user :deep(li) {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}

.prose-user :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5em 0;
  font-size: 0.9em;
}

.prose-user :deep(th),
.prose-user :deep(td) {
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5em 0.75em;
  text-align: left;
}

.prose-user :deep(th) {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 700;
  color: #ffffff;
}

.prose-user :deep(code) {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.15em 0.4em;
  border-radius: 0.3em;
  font-size: 0.9em;
  font-family: "JetBrains Mono", monospace;
  color: #ffffff;
}

.prose-user :deep(pre) {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 0.5em 0;
}

.prose-user :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

/* Make OCR markdown output look distinct */
.prose-assistant :deep(pre) {
  background: rgba(16, 185, 129, 0.05);
  border: 1px dashed rgba(16, 185, 129, 0.3);
}

.prose-assistant :deep(code) {
  color: #065f46;
}
</style>
