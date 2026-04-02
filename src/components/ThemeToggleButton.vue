<template>
  <Button variant="outline" @click="changeTheme" size="icon">
    <Sun v-if="theme === 'light'" class="size-5" />
    <Moon v-else class="size-5" />
  </Button>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Button from "./ui/button/Button.vue";
import { Moon, Sun } from "lucide-vue-next";

const store = useStore();
const theme = computed(() => store.getters["theme/theme"]);
function changeTheme() {
  store.dispatch("theme/onChangeTheme", theme.value === "light" ? "dark" : "light");
}
</script>
