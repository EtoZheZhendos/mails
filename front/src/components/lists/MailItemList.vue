<template lang="pug">
q-item(clickable @click="openMessageById")
  q-item-section
    q-item-label {{ data.theme }}
    q-item-label(caption) {{ data.from }}
    q-item-label {{ data.date }}
    q-item-label(v-if="!isIncomingMail")
      | {{ !!data.draft ? "Черновик" : "Отправлено" }}

  q-item-section(side class="row")
    q-checkbox(
      v-model="isChecked"
      @update:model-value="handleCheckboxChange"
      color="primary"
    )

    q-btn(
      icon="send"
      color="positive"
      label="Отправить"
      dense
      @click.stop="sendDraftFn"
      v-if="data.draft"
    )
</template>

<script setup>
import { ref, watch } from "vue";
import { useMailStore } from "src/store/mailStore";

const mailStore = useMailStore();
const emit = defineEmits(["openMessage", "sendDraft"]);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  isIncomingMail: {
    type: Boolean,
    default: false,
  },
});

const isChecked = ref(false);

const handleCheckboxChange = (value) => {
  if (value) {
    mailStore.addSelectedMail(props.data.id);
  } else {
    mailStore.removeSelectedMail(props.data.id);
  }
};

const openMessageById = () => {
  emit("openMessage", props.data.id);
};

const sendDraftFn = () => {
  emit("sendDraft", props.data.id);
};
</script>
