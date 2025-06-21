<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import RatingUser from './RatingUser.vue';
import { useGameStore } from '@/stores/game';
import BaseLoader from '../Base/BaseLoader.vue';
import { useUserStore } from '@/stores/user';
import BaseTabsPanel from '../Base/BaseTabsPanel.vue';
import type { RatedUser } from '@/model/user.model';
import BaseModal from '../Base/BaseModal.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue']);

const gameStore = useGameStore();
interface RatedUsersList {
  active: RatedUser[];
  done: RatedUser[];
}
const fakeUser = { username: 'fake', progress: { opened: 11, total: 11 } };
const list = computed<RatedUsersList>(() => {
  return [...gameStore.rating, fakeUser].reduce((acc, item) => {
    if (!item.username || !item.progress.opened) return acc;
    if (item.progress.opened === item.progress.total) acc.done.push(item);
    else acc.active.push(item);
    return acc;
  }, { active: [], done: [] } as RatedUsersList);
});
const userStore = useUserStore();
const me = computed(() => userStore.user);
const isLoading = ref(false);
watch(() => props.modelValue, value => {
  if (value) {
    isLoading.value = true;
    gameStore.getRating().finally(() => isLoading.value = false);
  }
}, { immediate: true });
const tabs = computed(() => {
  const tabsList = [] as { title: string; key: keyof RatedUsersList }[];
  if (list.value.active.length) tabsList.push({ title: 'Активные', key: 'active' });
  if (list.value.done.length) tabsList.push({ title: 'Закончили', key: 'done' });
  return tabsList;
});
const activeTab = ref<keyof RatedUsersList>('active');
watch(tabs, value => {
  if (value.length) activeTab.value = value[0].key;
})
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    class="rating-list"
    title="Рейтинг"
    picture="/pics/trophy.png"
    @update:model-value="val => emits('update:modelValue', val)">
    <template #headerAfter>
      <BaseTabsPanel
        v-if="tabs.length > 1"
        :list="tabs"
        v-model="activeTab" />
    </template>
    <div class="rating-list__content">
      <Transition name="fade" mode="out-in">
        <BaseLoader v-if="isLoading" class="big-title primary-color" />
        <div v-else class="rating-list__list pt-16 px-4">
          <RatingUser
            v-for="(user, i) in list[activeTab]"
            :key="user.username"
            :user="user"
            :rank="i + 1"
            :active="activeTab === 'active'"
            class="rating-list__user mt-8"
            :class="{ active: user.username === me?.username }" />
        </div>
      </Transition>
    </div>
  </BaseModal>
</template>

<style lang="styl" scoped>
.rating-list {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__list {
    width: 100%;
  }

  &__user.active {
    box-shadow: 0 0 4px 2px darken($color-light-blue.lighten-1, 10%);
    border: 1px solid $color-light-blue.lighten-1;
    border-radius: $border-radius-big;
  }
}
</style>