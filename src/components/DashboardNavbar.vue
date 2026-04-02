<template>
  <header
    class="w-full z-20 px-6 py-3 flex items-center justify-between bg-card border-b shadow-sm sticky top-0"
  >
    <!-- Left: Sidebar Toggle + Title -->
    <div class="flex items-center gap-3">
      <button
        @click="setOpen(!isOpen)"
        class="p-2 rounded-lg border bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary hover:ring-2 hover:ring-primary transition"
        :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'"
        :title="isOpen ? 'Click to close sidebar' : 'Click to open sidebar'"
      >
        <LayoutDashboardIcon class="size-5 text-primary focus:outline-none" />
      </button>

      <h1 class="text-lg font-semibold text-primary">
        {{ props.title }}
      </h1>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-3">
      <ThemeToggleButton />

      <UserButton v-if="user" :routes="filteredPages" :user="user" />
    </div>
  </header>
</template>

<script setup>
import { validateRequest } from "@/libs/auth";
import {
  ChartSplineIcon,
  Home,
  LayoutDashboardIcon,
  ShoppingBasketIcon,
} from "lucide-vue-next";
import { computed } from "vue";
import ThemeToggleButton from "./ThemeToggleButton.vue";
import UserButton from "./UserButton.vue";
import { useSidebar } from "./ui/sidebar";

const { open: isOpen, setOpen } = useSidebar();
const props = defineProps({
  title: {
    type: String,
    default: "Admin Dashboard",
  },
});
const user = validateRequest();

const pages = [
  {
    name: "Home",
    src: "/",
    icon: Home,
    needUser: false,
  },
  {
    name: "Products",
    src: "/dashboard/products",
    icon: ShoppingBasketIcon,
    needUser: false,
  },
  {
    name: "Monthly analysis",
    src: "/dashboard/monthly-analysis",
    icon: ChartSplineIcon,
    needUser: false,
  },
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
