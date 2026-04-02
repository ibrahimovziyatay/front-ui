export default {
  namespaced: true,
  state: () => ({
    theme: localStorage.getItem("theme") || "light",
  }),
  getters: {
    theme: (state) => state.theme,
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.setItem("theme", theme);

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    },
  },
  actions: {
    onChangeTheme({ commit }, theme) {
      commit("SET_THEME", theme);
    },
  },
};
