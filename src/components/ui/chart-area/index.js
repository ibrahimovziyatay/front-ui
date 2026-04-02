export { default as AreaChart } from "./AreaChart.vue";

/**
 * @typedef {Object} BaseChartProps
 * @property {Array<Object>} data - The source data, each entry is an object.
 * @property {Array<string>} categories - Select the categories from your data. Used for legend and tooltip.
 * @property {string} index - Key to map the data to the axis.
 * @property {Array<string>} [colors] - Change the default colors.
 * @property {Object} [margin] - Margin of the container.
 * @property {number} [filterOpacity=0.2] - Opacity of non-selected fields.
 * @property {(tick: number|Date, i: number, ticks: Array<number|Date>) => string} [xFormatter] - Function to format X label.
 * @property {(tick: number|Date, i: number, ticks: Array<number|Date>) => string} [yFormatter] - Function to format Y label.
 * @property {boolean} [showXAxis=true] - Controls visibility of X axis.
 * @property {boolean} [showYAxis=true] - Controls visibility of Y axis.
 * @property {boolean} [showTooltip=true] - Controls visibility of tooltip.
 * @property {boolean} [showLegend=true] - Controls visibility of legend.
 * @property {boolean} [showGridLine=true] - Controls visibility of gridline.
 */

/**
 * @param {BaseChartProps} props
 */
export function createBaseChartProps(props) {
  const {
    data,
    categories,
    index,
    colors,
    margin,
    filterOpacity = 0.2,
    xFormatter,
    yFormatter,
    showXAxis = true,
    showYAxis = true,
    showTooltip = true,
    showLegend = true,
    showGridLine = true,
  } = props;

  return {
    data,
    categories,
    index,
    colors,
    margin,
    filterOpacity,
    xFormatter,
    yFormatter,
    showXAxis,
    showYAxis,
    showTooltip,
    showLegend,
    showGridLine,
  };
}
