<script setup>
import {
  ChartCrosshair,
  ChartLegend,
  defaultColors,
} from "@/components/ui/chart";
import { cn } from "@/libs/utils";
import { Axis, CurveType, Line } from "@unovis/ts";
import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { useMounted } from "@vueuse/core";
import { computed, ref } from "vue";

// Props definition (JS version)
const props = defineProps({
  data: { type: Array, required: true },
  categories: { type: Array, required: true },
  index: { type: String, required: true },
  colors: Array,
  margin: {
    type: Object,
    default: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  },
  filterOpacity: { type: Number, default: 0.2 },
  xFormatter: Function,
  yFormatter: Function,
  showXAxis: { type: Boolean, default: true },
  showYAxis: { type: Boolean, default: true },
  showTooltip: { type: Boolean, default: true },
  showLegend: { type: Boolean, default: true },
  showGridLine: { type: Boolean, default: true },
  customTooltip: Object,
  curveType: { type: String, default: CurveType.MonotoneX },
});

const emits = defineEmits(["legendItemClick"]);

const indexComputed = computed(() => props.index);
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

const isMounted = useMounted();

function handleLegendItemClick(d, i) {
  emits("legendItemClick", d, i);
}
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

    <VisXYContainer
      :margin="{ left: 20, right: 20 }"
      class="w-full h-full "
      :data="data"
      :style="{ height: isMounted ? '100%' : 'auto' }"
    >
      <ChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :index="indexComputed"
        :custom-tooltip="customTooltip"
      />

      <template v-for="(category, i) in categories" :key="category">
        <VisLine
          :x="(d, i) => i"
          :y="(d) => d[category]"
          :curve-type="curveType"
          :color="colors[i]"
          :attributes="{
            [Line.selectors.line]: {
              opacity: legendItems.find((item) => item.name === category)
                ?.inactive
                ? filterOpacity
                : 1,
            },
          }"
        />
      </template>

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
          [Axis.selectors.grid]: {
            class: 'text-muted',
          },
        }"
        tick-text-color="hsl(var(--vis-text-color))"
      />

      <slot />
    </VisXYContainer>
  </div>
</template>
