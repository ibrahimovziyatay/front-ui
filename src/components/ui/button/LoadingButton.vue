<script setup>
import { Primitive } from "reka-ui";
import { cn } from "@/libs/utils";
import { buttonVariants } from ".";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  isLoading: { type: Boolean, default: false },
  asChild: { type: Boolean, default: false },
  as: { type: [String, Object, Function], default: "button" },
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="isLoading"
    :class="
      cn(
        buttonVariants({ variant, size }),
        props.class,
        isLoading && 'opacity-70 cursor-not-allowed'
      )
    "
  >
    <!-- Loader replaces slot -->
    <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </Primitive>
</template>
