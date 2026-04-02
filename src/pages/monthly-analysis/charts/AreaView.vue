<script setup>
import AreaChart from "@/components/ui/chart-area/AreaChart.vue";

const data = [
  {
    name: "Yanvar",
    total: 10,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Fevral",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mart",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <div
    class="w-full bg-card ring ring-primary rounded-xl flex flex-col items-center p-6 gap-6 shadow-lg"
  >
    <!-- Chart Title -->
    <h2 class="text-3xl font-bold text-muted-foreground text-center">
      Monthly Sales vs Predicted Areas
    </h2>

    <AreaChart :data="data" index="name" :categories="['total', 'predicted']" />
  </div>
</template>
