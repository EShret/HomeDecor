<template>
  <div class="crumbs">
    <nuxt-link to="/">
      <span>Главная ></span>
    </nuxt-link>

    <nuxt-link
      v-if="this.action === 'catalogs'"
      :to="`/${catalogs.catalogURL}`"
    >
      <span>{{ catalogs.catalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[0] != null
          ? catalogs.subCatalogsName[0]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[0].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[1] != null
          ? catalogs.subCatalogsName[1]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[1].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[2] != null
          ? catalogs.subCatalogsName[2]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[2].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[3] != null
          ? catalogs.subCatalogsName[3]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[3].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[4] != null
          ? catalogs.subCatalogsName[4]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[4].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[5] != null
          ? catalogs.subCatalogsName[5]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[5].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[6] != null
          ? catalogs.subCatalogsName[6]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[6].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[7] != null
          ? catalogs.subCatalogsName[7]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[7].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[8] != null
          ? catalogs.subCatalogsName[8]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[8].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[9] != null
          ? catalogs.subCatalogsName[9]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[9].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[10] != null
          ? catalogs.subCatalogsName[10]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[10].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[11] != null
          ? catalogs.subCatalogsName[11]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[11].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[12] != null
          ? catalogs.subCatalogsName[12]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[12].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[13] != null
          ? catalogs.subCatalogsName[13]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[13].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[14] != null
          ? catalogs.subCatalogsName[14]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[14].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[15] != null
          ? catalogs.subCatalogsName[15]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[15].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[16] != null
          ? catalogs.subCatalogsName[16]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[16].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[17] != null
          ? catalogs.subCatalogsName[17]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[17].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[18] != null
          ? catalogs.subCatalogsName[18]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[18].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link
      to=""
      v-if="
        $route.params.id ===
        (catalogs.subCatalogsName[19] != null
          ? catalogs.subCatalogsName[19]._id
          : '')
      "
    >
      <span>> {{ catalogs.subCatalogsName[19].subcatalogTitle }}</span>
    </nuxt-link>

    <nuxt-link to="" v-if="this.action === 'set'">
      <span>> {{ set.titleSets }} </span>
    </nuxt-link>

    <nuxt-link to="" v-if="this.action === 'cart'">
      <span>> Корзина</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    catalogs: {
      type: Object,
      default: () => {},
    },

    set: {
      type: Object,
      // type: Array,
      default: () => {},
    },

    action: {
      type: String,
      default: "",
    },
  },
};
</script>