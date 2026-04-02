<template>
  <div
    class="w-full bg-card ring ring-primary rounded-xl flex flex-col items-center p-6 gap-6 shadow-lg"
  >
    <!-- Chart Title -->
    <h2 class="text-3xl font-bold text-muted-foreground text-center">
      Monthly Sales vs Predicted
    </h2>

    <!-- Bar Chart -->
    <BarChart
      class="w-full text-muted h-[400px] rounded-lg p-4 shadow-md"
      :data="data"
      index="name"
      :categories="['total', 'predicted']"
      :colors="colors"
      :y-formatter="
        (tick) =>
          typeof tick === 'number'
            ? `$ ${new Intl.NumberFormat('us').format(tick)}`
            : ''
      "
      :bar-padding="0.1"
      :rounded-corners="6"
      :show-tooltip="true"
      :show-legend="true"
    />
  </div>
</template>

<script setup>
import BarChart from "@/components/ui/chart-bar/BarChart.vue";

const colors = [
  "hsl(var(--chart-4))", // total
  "hsl(var(--chart-3))", // predicted
];

const data = [
  {
    name: "Yanvar",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
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
