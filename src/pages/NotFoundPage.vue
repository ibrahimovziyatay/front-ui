<template>
  <div
    class="w-full min-h-screen flex flex-col justify-center items-center bg-background text-center px-6 space-y-6"
  >
    <div class="fixed top-0 z-10 w-full">
      <PublicNavbar />
    </div>
    <!-- Big 404 -->
    <h1
      class="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 drop-shadow-md"
    >
      404
    </h1>

    <!-- Message -->
    <div class="space-y-2">
      <p class="text-2xl font-semibold text-foreground">Oops! Page not found</p>
      <p class="text-muted-foreground">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
    </div>

    <!-- Actions -->
    <div class="flex gap-4 mt-4">
      <RouterLink
        to="/"
        class="px-5 py-2 rounded-lg bg-primary text-background font-medium shadow hover:opacity-90 transition"
      >
        Back to Home
      </RouterLink>
      <RouterLink
        to="/auth/login"
        class="px-5 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition"
      >
        Go to Login
      </RouterLink>
    </div>

    <!-- Optional illustration / icon -->
    <div class="mt-10 opacity-80">
      <LucideSearchX class="w-24 h-24 text-muted-foreground" />
    </div>
  </div>
</template>

<script setup>
import PublicNavbar from "@/components/PublicNavbar.vue";
import { LucideSearchX } from "lucide-vue-next";
</script>
