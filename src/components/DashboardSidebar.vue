<script setup>
import NavMain from "@/components/NavMain.vue";
import NavProjects from "@/components/NavProject.vue";
import NavUser from "@/components/NavUser.vue";
import TeamSwitcher from "@/components/TeamSwitcher.vue";
import {
  AudioWaveform,
  Frame,
  GalleryVerticalEnd,
  Laptop,
  Map,
  PieChart,
} from "lucide-vue-next";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { validateRequest } from "@/libs/auth";
import { computed } from "vue";

const user = validateRequest();

const props = defineProps({
  side: { type: String, required: false },
  variant: { type: String, required: false },
  collapsible: { type: String, required: false, default: "icon" },
  class: { type: null, required: false },
});
const data = computed(() => ({
  user: {
    name: user.username || process.env.VUE_APP_TITLE || "Vue-Test",
    email: user.role || "Visiter",
    avatar: "/avatar-placeholder.png",
  },
  teams: [
    {
      name: `${process.env.VUE_APP_TITLE || "Vue-Test"} Inc`,
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: `${process.env.VUE_APP_TITLE || "Vue-Test"} Corp`,
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Pages",
      url: "#",
      icon: Laptop,
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Monthly Analysis",
          url: "/dashboard/monthly-analysis",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}));
</script>

<template>
  <Sidebar class="bg-card border-r border-muted-foreground/50" v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
