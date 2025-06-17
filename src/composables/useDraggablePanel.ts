import { useDraggable } from "@vueuse/core";
import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";

interface DraggablePanelConfig {
  height: MaybeRefOrGetter<number>;
  offset: MaybeRefOrGetter<number>;
}

export default function useDraggablePanel(config: DraggablePanelConfig) {
  const height = computed(() => toValue(config.height));
  const offset = computed(() => toValue(config.offset));
  const panelEl = ref();
  const panelTop = ref(height.value - offset.value);
  const panelDragging = ref(false);
  const panelActive = computed(() => panelTop.value === 0);

  const setPanelActive = (value: boolean) => {
    panelTop.value = value ? 0 : height.value - offset.value;
  }

  useDraggable(panelEl, {
    preventDefault: true,
    axis: 'y',
    onMove: (position) => {
      panelDragging.value = true;
      if (position.y >= offset.value && position.y <= height.value) {
        panelTop.value = position.y - offset.value;
      }
    },
    onEnd: (position) => {
      panelDragging.value = false;
      setPanelActive(position.y < height.value / 2);
    },
  });

  return {
    panelEl,
    panelTop,
    panelDragging,
    panelActive,
    setPanelActive,
  }
}