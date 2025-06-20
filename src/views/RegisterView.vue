<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import BaseInput from '@/components/Base/BaseInput.vue';
import BaseButton from '@/components/Base/BaseButton.vue';
import { useUserStore } from '@/stores/user.ts';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const formData = reactive({
  username: '',
  password: '',
});
const repeatPassword = ref('');
const isValid = computed(() => formData.username
  && formData.password
  && repeatPassword.value
  && formData.password === repeatPassword.value);
const showErrors = ref(false);
watch(isValid, value => {
  if (value) showErrors.value = false;
});
const onSubmit = async () => {
  if (!isValid.value) showErrors.value = true;
  if (isValid.value) userStore.register(formData).then(() => {
    router.push({ name: 'home' });
  });
}
</script>

<template>
  <div class="register-view pa-20 pa-40-sm-up">
    <div class="login-view__header bigger-title mb-32 text-center text-upper">
      Зарегистрируйтесь
    </div>
    <div class="register-view__form">
      <BaseInput v-model="formData.username" label="Имя пользователя" class="mb-20" />
      <BaseInput v-model="formData.password" label="Пароль" type="password" class="mb-20" />
      <BaseInput v-model="repeatPassword" label="Повторите пароль" type="password" class="mb-20" />
      <div v-if="showErrors" class="register-view__error mb-20">Error</div>
      <BaseButton title="Зарегистрироваться" wide class="mt-8" @click="onSubmit" />
    </div>

    <div class="login-view__footer mt-24">
      <span class="note-color mr-4">или</span>
      <BaseButton :to="{ name: 'login' }" theme="secondary" mode="plain" size="small">
        Войдите
      </BaseButton>
    </div>
  </div>
</template>