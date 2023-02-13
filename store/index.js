export const state = () => ({
  catalogs: '',
  banners: '',
  cart: [],
  isTrue: true
})

// MUTATIONS
export const mutations = {
  setCatalogs (state, message) {
    state.catalogs = message
  },

  setBanners (state, message) {
    state.banners = message
  },

  SET_CART: (state, data) => {
    if (state.cart.length) {
      let isProductExists = false
      state.cart.map(function (item) {
        if (
          item.id === data.id &&
          item.title === data.title &&
          item.size === data.size
        ) {
          isProductExists = true
          item.quantity++
        }
      })
      if (!isProductExists) {
        state.cart.push(data)
      }
    } else {
      state.cart.push(data)
    }
  },

  FRAME_SET_CART: (state, data) => {
    if (state.cart.length) {
      let isProductExists = false
      state.cart.map(function (item) {
        if (
          item.id === data.id &&
          item.title === data.title &&
          item.size === data.size
        ) {
          isProductExists = true
          item.quantity = item.quantity + data.quantity
        }
      })
      if (!isProductExists) {
        state.cart.push(data)
      }
    } else {
      state.cart.push(data)
    }
  },

  DECREMENT: (state, index) => {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--
    }
  },

  INCREMENT: (state, index) => {
    state.cart[index].quantity++
  },

  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1)
  },

  ALL_REMOVE_FROM_CART: state => {
    state.cart.splice(0, state.cart.length)
  }
}

// ACTIONS
export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    await dispatch('getCatalogs')
    await dispatch('getBanners')
  },

  async getCatalogs ({ commit }) {
    const { data } = await this.$axios.get(`/api/catalogs`)
    commit('setCatalogs', data)
  },

  async getBanners ({ commit }) {
    const { data } = await this.$axios.get(`/api/banners`)
    commit('setBanners', data)
  },

  ADD_TO_CART ({ commit }, data) {
    commit('SET_CART', data)
  },

  FRAME_ADD_TO_CART ({ commit }, data) {
    commit('FRAME_SET_CART', data)
  },

  DECREMENT_CART_ITEM ({ commit }, index) {
    commit('DECREMENT', index)
  },

  INCREMENT_CART_ITEM ({ commit }, index) {
    commit('INCREMENT', index)
  },

  DELETE_FROM_CART ({ commit }, index) {
    commit('REMOVE_FROM_CART', index)
  },

  ALL_DELETE_FROM_CART ({ commit }) {
    commit('ALL_REMOVE_FROM_CART')
  }
}

// GETTERS
export const getters = {
  CART (state) {
    return state.cart
  }
}
