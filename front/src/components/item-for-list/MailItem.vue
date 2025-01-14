<template lang="pug">
  q-card
    q-card-section.row.items-center.q-pb-none.justify-between
      div.text-h6.col-10.text-primary Информация о письме
      q-btn(icon="close" flat round color="negative" @click="closeFn")

    q-card-section
      div.text-h6 Тема: {{ !!data.theme ? data.theme : "" }}
      .q-pa-md
      div.text-subtitle2.text-data От: {{ data.from }}
      div.text-subtitle2 {{ data.date }}

    q-card-section
      div.q-pa-md.text-subtitle2.text-data
        div.message-bubble Сообщение: {{ data.text }}
  </template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["close"]);

const closeFn = () => {
  emit("close");
};
</script>
<style scoped>
.message-bubble {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  max-width: 100%;
  word-wrap: break-word;
}
</style>
