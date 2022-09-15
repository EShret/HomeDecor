
export const state = () => ({
    catalogs: "",
});

export const actions = {
    async nuxtServerInit({ commit, dispatch }) {
        await dispatch("getCatalogs");
    },

    async getCatalogs({ commit }) {
        const { data } = await this.$axios.get(`/api/catalogs`);
        commit("setCatalogs", data);
    },
};

export const getters = {};

export const mutations = {
    setCatalogs(state, message) {
        state.catalogs = message;
    },
};
