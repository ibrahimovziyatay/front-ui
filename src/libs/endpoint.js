const backendURL = process.env.VUE_APP_API_URL;

export const endpoints = {
  login: `${backendURL}/login`,
  items: `${backendURL}/products`,
  depts: `${backendURL}/depts`,
  deptsChartMOnthly: `${backendURL}/depts-chart-monthly`,
};
