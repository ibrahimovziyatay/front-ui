export { default as BarChart } from "./BarChart.vue";

/**
 * @typedef {Object} BaseChartProps
 * @property {Array<Object>} data - The source data, each entry is a dictionary.
 * @property {string[]} categories - Select the categories from your data. Used to populate the legend and tooltip.
 * @property {string} index - The key to map the data to the axis.
 * @property {string[]} [colors] - Change the default colors.
 * @property {Object} [margin] - Margin of the container.
 * @property {number} [filterOpacity=0.2] - Opacity of the non-selected field.
 * @property {(tick: number|Date, i: number, ticks: Array<number|Date>) => string} [xFormatter] - Function to format X label.
 * @property {(tick: number|Date, i: number, ticks: Array<number|Date>) => string} [yFormatter] - Function to format Y label.
 * @property {boolean} [showXAxis=true] - Controls visibility of the X axis.
 * @property {boolean} [showYAxis=true] - Controls visibility of the Y axis.
 * @property {boolean} [showTooltip=true] - Controls visibility of tooltip.
 * @property {boolean} [showLegend=true] - Controls visibility of legend.
 * @property {boolean} [showGridLine=true] - Controls visibility of gridline.
 */
