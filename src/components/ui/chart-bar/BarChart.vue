<script setup>
import { cn } from "@/libs/utils";
import { Axis, GroupedBar, StackedBar } from "@unovis/ts";
import {
  VisAxis,
  VisGroupedBar,
  VisStackedBar,
  VisXYContainer,
} from "@unovis/vue";
import { computed, ref } from "vue";
import { ChartCrosshair, ChartLegend, defaultColors } from "../chart";

// Props (JS version - no withDefaults)
const props = defineProps({
  data: { type: Array, required: true },
  categories: { type: Array, required: true },
  index: { type: String, required: true },

  colors: { type: Array, default: undefined },
  margin: {
    type: Object,
    default: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  },
  filterOpacity: { type: Number, default: 0.2 },
  xFormatter: { type: Function, default: null },
  yFormatter: { type: Function, default: null },
  showXAxis: { type: Boolean, default: true },
  showYAxis: { type: Boolean, default: true },
  showTooltip: { type: Boolean, default: true },
  showLegend: { type: Boolean, default: true },
  showGridLine: { type: Boolean, default: true },
  type: { type: String, default: "grouped" }, // "stacked" | "grouped"
  customTooltip: { type: Object, default: null },
  roundedCorners: { type: Number, default: 0 },
});

// Emits
const emit = defineEmits(["legendItemClick"]);

// Computed
const index = computed(() => props.index);
const colors = computed(() =>
  props.colors?.length ? props.colors : defaultColors(props.categories.length)
);

const legendItems = ref(
  props.categories.map((category, i) => ({
    name: category,
    color: colors.value[i],
    inactive: false,
  }))
);


function handleLegendItemClick(d, i) {
  emit("legendItemClick", d, i);
}

const VisBarComponent = computed(() =>
  props.type === "grouped" ? VisGroupedBar : VisStackedBar
);

const selectorsBar = computed(() =>
  props.type === "grouped" ? GroupedBar.selectors.bar : StackedBar.selectors.bar
);
</script>

<template>
  <div
    :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')"
  >
    <ChartLegend
      v-if="showLegend"
      v-model:items="legendItems"
      @legend-item-click="handleLegendItemClick"
    />

    <VisXYContainer :data="data" class="w-full h-full" :margin="margin">
      <ChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :custom-tooltip="customTooltip"
        :index="index"
      />

      <VisBarComponent
        :x="(d, i) => i"
        :y="categories.map((category) => (d) => d[category])"
        :color="colors"
        :rounded-corners="roundedCorners"
        :bar-padding="0.05"
        :attributes="{
          [selectorsBar]: {
            opacity: (d, i) => {
              const pos = i % categories.length;
              return legendItems[pos]?.inactive ? filterOpacity : 1;
            },
          },
        }"
      />

      <VisAxis
        v-if="showXAxis"
        type="x"
        :tick-format="xFormatter ?? ((v) => data[v]?.[index])"
        :grid-line="false"
        :tick-line="false"
        tick-text-color="hsl(var(--vis-text-color))"
      />

      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-line="false"
        :tick-format="yFormatter"
        :domain-line="false"
        :grid-line="showGridLine"
        :attributes="{
          [Axis.selectors.grid]: { class: 'text-muted' },
        }"
        tick-text-color="hsl(var(--vis-text-color))"
      />

      <slot />
    </VisXYContainer>
  </div>
</template>
