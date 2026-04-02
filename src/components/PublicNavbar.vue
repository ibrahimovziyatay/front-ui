<template>
  <header
    class="w-full z-10 p-4 flex flex-row bg-card justify-between items-center border-b sticky top-0"
  >
    <div
      class="text-primary flex justify-center items-center gap-2 bg-secondary text-lg border rounded-lg px-4 py-2 text-center"
    >
      <Users class="size-5" />
      <p>
        {{ props.title }}
      </p>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <ThemeToggleButton />

      <UserButton :routes="filteredPages" />
    </div>
  </header>
</template>

<script setup>
import { validateRequest } from "@/libs/auth";
import { Banknote, Home, Settings, UserCheck, Users } from "lucide-vue-next";
import { computed } from "vue";
import ThemeToggleButton from "./ThemeToggleButton.vue";
import UserButton from "./UserButton.vue";

const props = defineProps({
  title: {
    type: String,
    default: process.env.VUE_APP_TITLE || "Vue test app",
  },
});
const user = validateRequest();

const pages = [
  { name: "Home", src: "/", icon: Home, needUser: false },
  { name: "Depts", src: "/depts", icon: Banknote, needUser: false },
  { name: "Sign in", src: "/auth/login", icon: UserCheck, needUser: user },
  ...(user && ["admin", "manager"].includes(user.role?.toLowerCase())
    ? [
        {
          name: "Dashboard",
          src: "/dashboard/products",
          icon: Settings,
          needUser: true,
        },
      ]
    : []),
];

const filteredPages = computed(() =>
  pages
    .filter((f) => !f.needUser || !!user)
    .map((a) => ({
      name: a.name,
      src: a.src,
      lucideIcon: a.icon,
    }))
);
</script>
