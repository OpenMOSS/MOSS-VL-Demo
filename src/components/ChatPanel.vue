<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, watch } from "vue";
import { marked } from "marked";
import type { DemoQuestion } from "@/data/demos";
import QuestionButton from "@/components/QuestionButton.vue";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const props = defineProps<{
  questions: DemoQuestion[];
}>();

const messages = ref<ChatMessage[]>([]);
const isTyping = ref(false);
const chatContainer = ref<HTMLDivElement>();
const currentQuestions = ref<DemoQuestion[]>([]);
const hasStarted = ref(false);
const activeQuestion = ref<DemoQuestion | null>(null);
let typeTimer: ReturnType<typeof setInterval> | null = null;

watch(() => props.questions, () => {
  resetChat();
}, { immediate: true });

function resetChat() {
  messages.value = [];
  isTyping.value = false;
  hasStarted.value = false;
  activeQuestion.value = null;
  currentQuestions.value = [...props.questions];
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
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
  return marked.parse(text, { async: false }) as string;
}

function askQuestion(question: DemoQuestion) {
  if (isTyping.value) return;

  hasStarted.value = true;
  activeQuestion.value = question;
  // Hide current questions immediately
  currentQuestions.value = [];

  messages.value.push({
    role: "user",
    content: question.text,
  });

  scrollToBottom();

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
      finishTyping(reactiveMsg, question);
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
    lastMsg.content = activeQuestion.value.answer;
    finishTyping(lastMsg, activeQuestion.value);
    scrollToBottom();
  }
}

function finishTyping(msg: ChatMessage, question: DemoQuestion) {
  msg.isTyping = false;
  isTyping.value = false;
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }
  if (question.followUps && question.followUps.length > 0) {
    currentQuestions.value = [...question.followUps];
  }
}

onBeforeUnmount(() => {
  if (typeTimer) clearInterval(typeTimer);
});

defineExpose({ askQuestion });
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Messages area -->
    <div
      ref="chatContainer"
      class="flex-1 space-y-6 overflow-y-auto px-5 py-6 bg-white/50 backdrop-blur-sm"
    >
      <!-- Welcome message -->
      <div
        v-if="messages.length === 0"
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
          <h3 class="mb-2 font-bold text-gray-800">Ask the Video</h3>
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
        <div v-if="msg.role === 'user'" class="flex justify-end">
          <div
            class="max-w-[85%] rounded-3xl rounded-tr-md bg-emerald-600 px-5 py-3 text-base font-medium text-white shadow-md border border-emerald-500/50"
          >
            {{ msg.content }}
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
            <div
              class="prose-sm prose max-w-none rounded-3xl rounded-tl-md border border-emerald-100 bg-white/90 px-6 py-4 text-base leading-relaxed text-gray-800 shadow-sm"
              v-html="renderMarkdown(msg.content)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Action Area (Questions & Controls) floating at the bottom -->
    <div class="border-t border-emerald-100 bg-white/70 backdrop-blur-md px-5 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] min-h-[96px] flex flex-col justify-center">
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

        <!-- Right: Stop/Clear Buttons -->
        <div v-if="hasStarted" class="flex shrink-0 gap-2 items-end justify-end mt-2 sm:mt-0">
          <button
            v-if="isTyping"
            @click="stopTyping"
            class="flex items-center gap-1.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-100 hover:shadow"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="2" /></svg>
            Stop
          </button>
          <button
            v-if="!isTyping"
            @click="resetChat"
            class="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Clear
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.prose-sm :deep(h1),
.prose-sm :deep(h2),
.prose-sm :deep(h3) {
  color: #111827;
  margin-top: 0.75em;
  margin-bottom: 0.25em;
  font-weight: 700;
}
.prose-sm :deep(h1) { font-size: 1.1em; }
.prose-sm :deep(h2) { font-size: 1.05em; }
.prose-sm :deep(h3) { font-size: 1em; }

.prose-sm :deep(p) {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-sm :deep(strong) {
  color: #1f2937;
  font-weight: 700;
}

.prose-sm :deep(ul),
.prose-sm :deep(ol) {
  padding-left: 1.5em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-sm :deep(li) {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}

.prose-sm :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5em 0;
  font-size: 0.9em;
}

.prose-sm :deep(th),
.prose-sm :deep(td) {
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 0.5em 0.75em;
  text-align: left;
}

.prose-sm :deep(th) {
  background: rgba(16, 185, 129, 0.1);
  font-weight: 700;
  color: #065f46;
}

.prose-sm :deep(code) {
  background: rgba(16, 185, 129, 0.08);
  padding: 0.15em 0.4em;
  border-radius: 0.3em;
  font-size: 0.9em;
  font-family: "JetBrains Mono", monospace;
  color: #047857;
}

.prose-sm :deep(pre) {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.75em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 0.5em 0;
}

.prose-sm :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}
</style>
