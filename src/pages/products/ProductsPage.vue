<script setup>
import { MoveRight } from "lucide-vue-next";
import AreaView from "../monthly-analysis/charts/AreaView.vue";
import ProductsTable from "./ProductsTable.vue";
</script>

<template>
  <main
    class="flex flex-col items-center justify-center gap-4 space-y-2 w-full max-w-6xl mx-auto"
  >
    <div
      class="grid p-4 bg-card rounded-lg border grid-cols-1 space-y-4 items-center w-full"
    >
      <div
        class="flex items-center justify-center w-full rounded-lg bg-primary h-12 text-lg text-background font-semibold"
      >
        <p>Products</p>
      </div>
      <ProductsTable />
    </div>
    <div
      class="grid p-4 bg-card rounded-lg border grid-cols-1 space-y-4 items-center w-full"
    >
      <div
        class="grid grid-cols-3 items-center w-full rounded-lg bg-primary h-12 px-4 text-lg font-semibold text-background"
      >
        <!-- Left empty space (can be used for icon or button later) -->
        <div></div>

        <!-- Center title -->
        <p class="text-center truncate">Sales vs Predicted</p>

        <!-- Right link -->
        <RouterLink
          to="/dashboard/monthly-analysis"
          class="ml-auto flex items-center gap-1 text-sm hover:underline"
        >
          Click to see more analysis
          <MoveRight class="w-4 h-4" />
        </RouterLink>
      </div>

      <AreaView />
    </div>
  </main>
</template>
