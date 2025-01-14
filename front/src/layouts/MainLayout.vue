<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar.q-pa-md.row
        q-toolbar-title.text-h4.title-style.col-4 Моя Почта
        .q-pa-md
        q-input.search-input.bg-white(
          v-model="search"
          outlined
          rounded
          label="Введите поисковое значение"
          dense
          style="width: 400px"
        )
        .q-pa-md.row.col-1
        q-btn(
          :loading="loading[3]"
          color="primary"
          @click="updateMails"
          style="width: 150px; margin-left: 10px"
        ) Обновить
        .q-pa-md
        q-btn(flat label="Отправить письмо" @click="openSendMailDialog")
        .q-pa-md
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
<style scoped>
.title-style {
  color: white;
  font-weight: bold;
  text-shadow: hsl(from color h s l);
  margin-left: 20px;
}
.search-input {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  transition: all 0.3s ease;
}
</style>
