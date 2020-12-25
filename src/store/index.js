import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rankCategory: null, //排名分类数据
    chapter: null, //章节
  },
  mutations: {
    updateRankCategory(state, payload) {
      state.rankCategory = payload;
    },
    updateChapter(state, payload) {
      state.chapter = payload;
    },
  },
  actions: {},
  modules: {},
});
