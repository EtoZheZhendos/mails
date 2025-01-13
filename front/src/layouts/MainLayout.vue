<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-toolbar-title Моя Почта

      q-input(
        v-model="search"
        class="bg-white"
        outlined
        rounded
        label="Введите поисковое значение"
        dense
        style="width: 400px"
      )

      q-btn(
        :loading="loading[3]"
        color="primary"
        @click="updateMails"
        style="width: 150px; margin-left: 10px"
      ) Обновить

      q-btn(flat label="Отправить письмо" @click="openSendMailDialog")

      q-btn(
        color="negative"
        label="Удалить выбранные"
        @click="deleteSelectedMails"
        :disabled="selectedMails.length === 0"
      )

  q-dialog(v-model="sendMailDialogVisible")
    send-mail-form(@close-form="sendMailDialogVisible = !sendMailDialogVisible")

  q-page-container
    router-view
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useMailStore } from "src/store/mailStore";
import SendMailForm from "src/components/forms/SendMailForm.vue";

const mailStore = useMailStore();
const sendMailDialogVisible = ref(false);
const loading = ref([]);
const search = ref("");

const selectedMails = computed(() => mailStore.getSelectedMails);
const updateMails = async () => {
  await mailStore.fetchIncomingMails();
  await mailStore.fetchOutgoingMails();
};

const openSendMailDialog = () => {
  sendMailDialogVisible.value = !sendMailDialogVisible.value;
};

const deleteSelectedMails = async () => {
  if (selectedMails.value.length > 0) {
    await mailStore.deleteMail(selectedMails.value);
  }
};

watch(
  () => search.value,
  async (value) => {
    if (value === "") {
      await mailStore.resetMails();
    }
    mailStore.searchMails(search.value);
  }
);
</script>
