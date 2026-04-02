<script>
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full";
</script>

<script setup>
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import DashboardSidebar from "@/components/DashboardSidebar.vue";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <div class="w-full bg-background min-h-screen flex">
      <DashboardSidebar />

      <SidebarInset class="flex flex-col w-full">
        <DashboardNavbar />
        <div class="p-4 flex-1">
          <router-view />
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>
