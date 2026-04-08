<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { demos } from "@/data/demos";
import VideoGrid from "@/components/VideoGrid.vue";

const isScrolling = ref(false);

function smoothScrollTo(targetPosition: number, duration: number = 500) {
  const container = document.getElementById("scroll-container");
  if (!container) return;

  const startPosition = container.scrollTop;
  const distance = targetPosition - startPosition;
  let start: number | null = null;

  isScrolling.value = true;

  function animation(currentTime: number) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // easeInOutQuad function for smooth acceleration and deceleration
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    container!.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      setTimeout(() => {
        isScrolling.value = false;
      }, 50); // slight debounce before allowing next scroll
    }
  }
  requestAnimationFrame(animation);
}

function scrollToGrid() {
  const grid = document.getElementById("demo-grid");
  if (grid && !isScrolling.value) {
    smoothScrollTo(grid.offsetTop, 500); // 0.5s duration
  }
}

function scrollToTop() {
  if (!isScrolling.value) {
    smoothScrollTo(0, 500); // 0.5s duration
  }
}

function handleWheel(e: WheelEvent) {
  const container = document.getElementById("scroll-container");
  const grid = document.getElementById("demo-grid");
  const videoGridContainer = document.getElementById("video-grid-container");
  
  if (!container || !grid || isScrolling.value) {
    e.preventDefault();
    return;
  }

  // Handle nested scrolling inside the video grid container
  if (videoGridContainer && videoGridContainer.contains(e.target as Node)) {
    if (e.deltaY < 0 && videoGridContainer.scrollTop > 0) {
      return; // allow default inner scroll
    }
    if (e.deltaY > 0 && Math.ceil(videoGridContainer.scrollTop) < videoGridContainer.scrollHeight - videoGridContainer.clientHeight) {
      return; // allow default inner scroll
    }
  }

  const threshold = window.innerHeight * 0.2; // 20% of screen height
  const isAtTop = container.scrollTop < threshold;
  
  // If we are at the top and the user scrolls down, auto-scroll to grid
  if (e.deltaY > 0 && isAtTop) {
    e.preventDefault();
    scrollToGrid();
  } 
  // If we are at the grid and the user scrolls up, auto-scroll to top
  else if (e.deltaY < 0 && container.scrollTop <= grid.offsetTop + 10) {
    e.preventDefault();
    scrollToTop();
  }
}

let touchStartY = 0;
function handleTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e: TouchEvent) {
  const container = document.getElementById("scroll-container");
  const grid = document.getElementById("demo-grid");
  const videoGridContainer = document.getElementById("video-grid-container");
  
  if (!container || !grid || isScrolling.value) {
    if (isScrolling.value) e.preventDefault();
    return;
  }

  const touchEndY = e.touches[0].clientY;
  const deltaY = touchStartY - touchEndY; // positive means scrolling down
  
  // Handle nested scrolling inside the video grid container
  if (videoGridContainer && videoGridContainer.contains(e.target as Node)) {
    if (deltaY < 0 && videoGridContainer.scrollTop > 0) {
      touchStartY = touchEndY; // update start position
      return; // allow default inner scroll
    }
    if (deltaY > 0 && Math.ceil(videoGridContainer.scrollTop) < videoGridContainer.scrollHeight - videoGridContainer.clientHeight) {
      touchStartY = touchEndY;
      return; // allow default inner scroll
    }
  }

  const threshold = window.innerHeight * 0.2;
  const isAtTop = container.scrollTop < threshold;

  // High threshold for touch to prevent accidental swipes
  if (Math.abs(deltaY) > 30) {
    if (deltaY > 0 && isAtTop) {
      e.preventDefault();
      scrollToGrid();
      touchStartY = touchEndY; // reset
    } else if (deltaY < 0 && container.scrollTop <= grid.offsetTop + 10) {
      e.preventDefault();
      scrollToTop();
      touchStartY = touchEndY;
    }
  }
}

onMounted(() => {
  const container = document.getElementById("scroll-container");
  if (container) {
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
  }
});

onUnmounted(() => {
  const container = document.getElementById("scroll-container");
  if (container) {
    container.removeEventListener('wheel', handleWheel);
    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchmove', handleTouchMove);
  }
});
</script>

<template>
  <div id="scroll-container" class="h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar">
    <!-- Hero Section -->
    <div class="relative flex h-full flex-col items-center justify-center px-4">
      <div class="z-10 flex flex-col items-center text-center animate-fade-in -mt-20">
        <!-- Logo enlarged -->
        <img 
          src="/moss-vl-logo-textless.png" 
          alt="MOSS-VL" 
          class="mb-6 w-[70%] max-w-2xl min-w-[350px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
        />
        <!-- Text styled with artistic green gradient, with padding-bottom to prevent letters like 'g' from being cut off -->
        <h1 class="pb-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-900 drop-shadow-sm">
          The latest Video Understanding VLM
        </h1>
      </div>

      <!-- Floating down arrow -->
      <div 
        class="absolute bottom-16 flex cursor-pointer flex-col items-center text-emerald-800 transition hover:text-emerald-950 z-20 animate-bounce"
        @click="scrollToGrid"
      >
        <span class="mb-1 text-sm font-bold uppercase tracking-widest">Demo</span>
        <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>

    <!-- Video Grid Section -->
    <div id="demo-grid" class="mx-auto w-[90%] max-w-none px-4 py-20 sm:px-6 lg:px-8 h-full flex items-center">
      <div class="w-full mt-10">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-emerald-900 sm:text-5xl">
            Interactive Demos
          </h2>
          <p class="mx-auto max-w-3xl text-lg leading-relaxed text-emerald-800 font-medium">
            Select a video below to explore our model's capabilities. Ask predefined
            questions and see detailed, context-aware responses generated by the
            model.
          </p>
        </div>
        <div id="video-grid-container" class="max-h-[60vh] overflow-y-auto rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl p-6 hide-scrollbar">
          <VideoGrid :videos="demos" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
