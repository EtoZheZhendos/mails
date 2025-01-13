<template lang="pug">
q-list(bordered separator)
  mail-item-list(
    @open-message="selectMail"
    v-for="element in items"
    :key="element.id"
    :data="element"
    is-incoming-mail
    @sendDraft="handleSendDraft"
  )

q-banner.bg-grey-2.text-black(v-if="items.length === 0")
  | Нет писем

q-banner.bg-negative.text-white(v-if="error")
  | {{ error }}

q-spinner.q-mt-xl(v-if="loading" size="50px")
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMailStore } from "src/store/mailStore";
import MailItemList from "components/lists/MailItemList.vue";

const mailStore = useMailStore();
const {
  changeDraftToOutgoing,
  incomingEmails,
  fetchIncomingMails,
  loading,
  error,
} = mailStore;

const emit = defineEmits(["visibleMessage"]);

const items = computed(() => mailStore.getIncomingEmails);

const selectMail = async (id) => {
  const { data } = await mailStore.fetchMailById(id);
  emit("visibleMessage", data);
};

const handleSendDraft = async (id) => {
  try {
    await mailStore.changeDraftToOutgoing(id);
  } catch (error) {
    console.error("Ошибка при отправке черновика:", error);
  }
};

onMounted(async () => {
  await fetchIncomingMails();
});
</script>
