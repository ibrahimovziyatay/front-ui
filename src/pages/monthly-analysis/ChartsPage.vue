<script setup>
import Button from "@/components/ui/button/Button.vue";
import { cn } from "@/libs/utils";
import { LayoutDashboardIcon, Rows3 } from "lucide-vue-next";
import { ref } from "vue";
import AreaView from "./charts/AreaView.vue";
import BarChartView from "./charts/BarChartView.vue";
import LineChart from "./charts/LineChart.vue";

const isLine = ref(false);

function toggleLayout() {
  isLine.value = !isLine.value;
}
</script>

<template>
  <div class="w-full mx-auto max-w-6xl p-6">
    <!-- Toggle layout button -->
    <div class="w-full grid grid-cols-3 items-center gap-4 mb-4">
      <Button variant="outline" size="icon" @click="toggleLayout">
        <LayoutDashboardIcon v-if="!isLine" />
        <Rows3 v-else />
      </Button>
      <div>
        <h2 class="text-3xl font-bold text-muted-foreground text-center">
          Monthly Analysis
        </h2>
      </div>
    </div>

    <!-- Charts container -->
    <div
      :class="cn('w-full gap-4', isLine ? 'flex flex-col' : 'grid grid-cols-2')"
    >
      <LineChart class="w-full" />
      <AreaView class="w-full" />
      <BarChartView class="w-full" />
    </div>
  </div>
</template>
