
export const state = () => ({
    catalogs: "",
    cart: [],
});

export const mutations = {
    setCatalogs(state, message) {
        state.catalogs = message;
    },

    SET_CART: (state, data) => {
        if (state.cart.lenth) {
            let isProductExists = false;
            state.cart.map(function (item) {
                if (item._id === data._id) {
                    isProductExists = true;
                    item.quantity++;
                }
            })
            if (!isProductExists) {
                state.cart.push(data)
            }
        } else {
            state.cart.push(data)
        }

        // state.cart.push(data)
    },

    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index, 1)
    }
};

export const actions = {
    async nuxtServerInit({ commit, dispatch }) {
        await dispatch("getCatalogs");
    },

    async getCatalogs({ commit }) {
        const { data } = await this.$axios.get(`/api/catalogs`);
        commit("setCatalogs", data);
    },

    ADD_TO_CART({ commit }, data) {
        commit('SET_CART', data);
    },

    DELETE_FROM_CART({ commit }, index) {
        commit('REMOVE_FROM_CART', index);
    }
};

export const getters = {
    CART(state) {
        return state.cart;
    }
};

