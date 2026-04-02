<script setup>
import { computed } from "vue";
import "vue-sonner/style.css";
import { useStore } from "vuex";
import { Toaster } from "./components/ui/sonner";

const store = useStore();
const theme = computed(() => store.getters["theme/theme"]);

const toastStyle = computed(() => ({
  background: theme.value === "light" ? "#ffffff" : "#0d0a0a",
  border: theme.value === "light" ? "1px solid #f2f2f2" : "1px solid #262626",
  opacity: 1,
  zIndex: 1000,
}));
</script>

<template>
  <router-view />
  <Toaster :toastOptions="{ style: toastStyle }" position="top-right" />
</template>
