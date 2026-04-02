<template>
  <div class="min-h-screen space-y-2 bg-background flex flex-col">
    <PublicNavbar />
    <router-view />
  </div>
</template>

<script setup>
import PublicNavbar from "@/components/PublicNavbar.vue";
</script>
