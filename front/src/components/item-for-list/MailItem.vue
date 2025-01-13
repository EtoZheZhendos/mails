<template lang="pug">
q-card
  q-card-section.row.items-center.q-pb-none.justify-between
    div.text-h6.text-primary Информация о письме
    q-btn(icon="close" flat round color="negative" @click="closeFn")

  q-card-section
    div.text-h6 {{ !!data.theme ? data.theme : "" }}
    div.text-subtitle2 {{ data.from }}
    div.text-subtitle2 {{ data.date }}

  q-card-section
    div.q-pa-sm {{ data.text }}
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
