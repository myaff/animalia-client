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
  <div class="register-view">
    <BaseInput v-model="formData.username" label="UserName" />
    <BaseInput v-model="formData.password" label="Password" type="password" />
    <BaseInput v-model="repeatPassword" label="Repeat password" type="password" />
    <div v-if="showErrors" class="register-view__error">Error</div>
    <BaseButton title="Submit" @click="onSubmit" />
  </div>
</template>