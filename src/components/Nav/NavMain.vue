<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import BaseModal from '../Base/BaseModal.vue';
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import BaseStat from '../Base/BaseStat.vue';
import BaseButton from '../Base/BaseButton.vue';
import BaseHeadPic from '../Base/BaseHeadPic.vue';
import BaseProgress from '../Base/BaseProgress.vue';
import BaseRank from '../Base/BaseRank.vue';
import { useRouter } from 'vue-router';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue']);
const userStore = useUserStore();
const gameStore = useGameStore();
gameStore.getRating();
const user = computed(() => userStore.user);
const rank = computed(() => {
  return gameStore.rating.findIndex(item => user.value?.username === item.username) + 1;
});
const router = useRouter();
const reset = () => {
  userStore.restart().then(() => {
    gameStore.reset();
    gameStore.getOpened();
    gameStore.getHints();
    gameStore.getRating();
  })
}
const logout = () => {
  userStore.logout().then(() => {
    router.push({ name: 'login' });
    gameStore.reset();
  });
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    class="nav-main"
    size="small"
    @update:model-value="val => emits('update:modelValue', val)">
      <template v-if="user" #headerAfter>
        <BaseHeadPic :title="user.username" picture="/pics/evolution.png" />
      </template>
      <div class="nav-main__stats pa-16">
        <BaseStat title="Открыто элементов:" class="py-8">
          <BaseProgress :progress="user?.progress" />
        </BaseStat>
        <BaseStat title="Место в рейтинге:" class="py-8">
          <BaseRank :rank="rank" active class="mr-8" />
        </BaseStat>
      </div>
      <div class="nav-main__actions mt-auto pa-8">
        <BaseButton
          icon="refresh"
          wide
          mode="outlined"
          theme="danger"
          @click="reset">
          Сбросить прогресс
        </BaseButton>
        <BaseButton
          icon="logout"
          wide
          theme="danger"
          @click="logout">
          Выйти из аккаунта
        </BaseButton>
      </div>
  </BaseModal>
</template>

<style lang="styl" scoped>
.nav-main {
  &__stats {
    width: 100%;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    +breakpoint(sm-and-up) {
      flex-direction: row;
    }
  }
}
</style>