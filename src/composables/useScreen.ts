import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export const breakpoints = {
  SM: 768,   // 768px
  MD: 1024,   // 1024px
  LG: 1280,   // 1280px
  XL: 1600,  // 1600px
}

export default function useScreen() {
  const width = ref(0);
  const height = ref(0);

  const setScreenSizes = () => {
    width.value = window?.innerWidth ?? 0;
    height.value = window?.innerHeight ?? 0;
  };

  const isMobile = computed(() => width.value < breakpoints.SM);
  const isTablet = computed(() => width.value >= breakpoints.SM && width.value < breakpoints.LG);
  const isDesktop = computed(() => width.value >= breakpoints.LG);
  const isWideScreen = computed(() => width.value >= breakpoints.XL);

  onMounted(() => {
    setScreenSizes();
    if (window) window.addEventListener('resize', setScreenSizes);
  });
  onBeforeUnmount(() => {
    if (window) window.removeEventListener('resize', setScreenSizes);
  });

  return { width, height, isMobile, isTablet, isDesktop, isWideScreen };
}
