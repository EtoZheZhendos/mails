<template lang="pug">
q-page
  q-list(bordered)
    mail-item-list(
      v-for="mail in outgoingMails"
      :key="mail.id"
      :data="mail"
      @open-message="selectMail"
      @send-draft="sendDraftFn"
    )

  q-banner(v-if="outgoingMails.length === 0" class="bg-grey-2 text-black")
    | Нет исходящих писем
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMailStore } from "src/store/mailStore";
import MailItemList from "./MailItemList.vue";

const emit = defineEmits(["visibleMessage", "send-draft"]);

const mailStore = useMailStore();

const outgoingMails = computed(() => mailStore.getOutgoingEmails);

onMounted(async () => {
  await mailStore.fetchOutgoingMails();
});

const selectMail = async (id) => {
  const { data } = await mailStore.fetchMailById(id);
  emit("visibleMessage", data);
};

const sendDraftFn = async (id) => {
  try {
    await mailStore.changeDraftToOutgoing(id);
    emit("send-draft", id);
  } catch (error) {
    console.error("Ошибка при отправке черновика:", error);
  }
};
</script>
