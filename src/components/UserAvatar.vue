<template>
  <img
    :src="avatarSource"
    :alt="'User avatar'"
    :width="props.size"
    :height="props.size"
    :class="
      cn(
        'aspect-square h-fit flex-none rounded-full bg-secondary object-cover',
        props.className
      )
    "
  />
</template>

<script setup>
import { cn } from "@/libs/utils";
import { computed } from "vue";

// Props
const props = defineProps({
  avatarUrl: {
    type: [String, null],
    default: null,
  },
  size: {
    type: Number,
    default: 48,
  },
  className: {
    type: String,
    default: "",
  },
});

// Computed source logic
const avatarSource = computed(() => {
  if (!props.avatarUrl || props.avatarUrl.trim() === "")
    return "/avatar-placeholder.png";
  return props.avatarUrl;
});
</script>
