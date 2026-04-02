<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout, validateRequest } from "@/libs/auth";
import { cn } from "@/libs/utils";
import { Check, LogOutIcon, Monitor, Moon, Sun } from "lucide-vue-next";
import { computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import UserAvatar from "./UserAvatar.vue";

const router = useRouter();
const route = useRoute();

defineProps({
  className: { type: String, default: "" },
  routes: {
    type: Array,
    default: () => [],
  },
});

const store = useStore();
const theme = computed(() => store.getters["theme/theme"]);

function changeTheme(selectedTheme) {
  if (theme.value !== selectedTheme) {
    store.dispatch("theme/onChangeTheme", selectedTheme);
  }
}

const logoutFN = async () => {
  logout();
  if (route.path === "/") {
    window.location.reload();
    return;
  }
  router.push("/");
};

const user = validateRequest();

const alignment = "end";
</script>

<template>
  <DropdownMenu>
    <!-- Trigger -->
    <DropdownMenuTrigger as-child>
      <button
        :class="
          cn(
            'flex items-center gap-2 rounded-full border-[3px] border-primary/60 bg-card p-1 shadow-sm transition-all hover:brightness-105',
            className
          )
        "
      >
        <UserAvatar :avatar-url="user?.avatar || ''" :size="40" />
      </button>
    </DropdownMenuTrigger>

    <!-- Content -->
    <DropdownMenuContent class="w-[220px] bg-background" :align="alignment">
      <!-- User info -->
      <div class="mb-2 flex items-center gap-3 border-b border-muted pb-2">
        <UserAvatar :avatar-url="user?.avatar || ''" :size="35" />
        <div v-if="user">
          <p class="text-sm font-medium">@{{ user.username }}</p>
          <p class="text-xs text-muted-foreground">Logged in</p>
        </div>
        <RouterLink v-else to="/auth/login">
          <p class="text-sm font-medium">You need to sign in</p>
        </RouterLink>
      </div>

      <!-- Routes -->
      <RouterLink v-for="route in routes" :key="route.src" :to="route.src">
        <DropdownMenuItem class="rounded-lg py-2 flex items-center gap-2">
          <component :is="route.lucideIcon" class="size-4" />
          <p :to="route.src">{{ route.name }}</p>
        </DropdownMenuItem>
      </RouterLink>

      <DropdownMenuSeparator />

      <!-- Theme Submenu -->
      <DropdownMenuSub>
        <DropdownMenuSubTrigger class="rounded-lg py-2 flex items-center gap-2">
          <Monitor class="size-4" /> Theme
        </DropdownMenuSubTrigger>

        <DropdownMenuSubContent class="rounded-lg bg-background py-2">
          <DropdownMenuItem
            class="rounded-lg py-2 flex items-center gap-2"
            @click="changeTheme('light')"
          >
            <Sun class="size-4" /> Light
            <Check v-if="theme === 'light'" class="ms-2 size-4" />
          </DropdownMenuItem>

          <DropdownMenuItem
            class="rounded-lg py-2 flex items-center gap-2"
            @click="changeTheme('dark')"
          >
            <Moon class="size-4" /> Dark
            <Check v-if="theme === 'dark'" class="ms-2 size-4" />
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuItem
        class="rounded-lg py-2 flex items-center gap-2 text-destructive hover:bg-destructive/10"
        @click="logoutFN"
      >
        <LogOutIcon class="size-4" /> Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
