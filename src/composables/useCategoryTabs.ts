import type { GameElementOpened } from "@/model/game.model";
import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";

export default function useCategoryTabs(opened: MaybeRefOrGetter<GameElementOpened[]>) {
  const list = computed(() => toValue(opened));
  const ALL = { title: 'Все', key: 'all' };
  const tabs = computed(() => {
    const existing = list.value.reduce((acc, item) => {
      acc.add(item.category);
      return acc;
    }, new Set<string>());
    return [ALL, ...Array.from(existing).map(item => ({ title: item, key: item }))];
  })
  const activeTab = ref(ALL.key);
  const filtered = computed(() => {
    if (activeTab.value === ALL.key) return list.value;
    return list.value.filter(item => item.category === activeTab.value);
  })

  return {
    tabs,
    filtered,
    activeTab,
  }
}