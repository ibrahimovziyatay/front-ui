<template>
  <div
    class="w-full mx-auto max-w-6xl min-h-[500px] flex flex-col gap-y-6 justify-center items-center p-6"
  >
    <!-- Welcome Box -->
    <div
      class="h-20 mx-auto rounded-xl w-full bg-primary text-background text-2xl font-semibold text-center flex justify-center items-center gap-3 shadow-lg"
    >
      <LucideHome class="w-7 h-7" />
      <h1>Welcome to the Dashboard Panel</h1>
    </div>

    <div
      class="w-full bg-card border text-card-foreground rounded-xl p-6 shadow-md flex flex-col gap-4"
    >
      <p class="text-lg leading-relaxed">
        This application has two main parts: <br />
        <span class="font-semibold text-primary">Public Side</span> and
        <span class="font-semibold text-primary">Dashboard</span>.
      </p>
      <p>
        To access the <span class="font-semibold text-primary">Dashboard</span>,
        please log in with an admin account.
      </p>

      <!-- Example Accounts -->
      <div class="bg-muted rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-2">Example Accounts</h2>
        <ul class="space-y-1 text-sm">
          <li>
            <span class="font-medium">Username:</span> admin1 |
            <span class="font-medium">Password:</span> 123
          </li>
          <li>
            <span class="font-medium">Username:</span> user1 |
            <span class="font-medium">Password:</span> 123
          </li>
          <li>
            <span class="font-medium">Username:</span> mentor1 |
            <span class="font-medium">Password:</span> 123
          </li>
        </ul>
      </div>

      <!-- Login Redirect -->
      <RouterLink
        to="/auth/login"
        class="bg-primary w-full text-background px-4 py-2 rounded-md text-center border border-transparent font-medium hover:text-primary hover:bg-background hover:border-primary transition-all duration-300"
      >
        Go to Login
      </RouterLink>
    </div>

    <!-- Dashboard Preview Image -->
    <div class="w-full rounded-xl overflow-hidden shadow-lg">
      <img
        src="/dashboard1.png"
        alt="Dashboard Preview Light"
        class="w-full h-auto object-cover"
      />
    </div>
    <div class="w-full rounded-xl overflow-hidden shadow-lg">
      <img
        src="/dashboard2.png"
        alt="Dashboard Preview Dark"
        class="w-full h-auto object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
