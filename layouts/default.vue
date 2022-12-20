<template>
  <v-app dark>
    <Menu class="pt-10 px-2 pb-2"></Menu>
    <v-main class="pt-10">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Menu from '~/components/menu/menu.vue';

export default Vue.extend({
  name: "DefaultLayout",
  components: {
    Menu,
  },
  data() {
    return {
      title: "Constellation",
      userName: "",
      menuItems: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Filas",
          url: "/queue",
          permission: "administrator",
        },
        {
          title: "Grupos",
          url: "/groups",
          permission: "administrator",
        },
        {
          title: "Usuarios",
          url: "/users",
          permission: "administrator",
        },
      ],
      loader: false,
    };
  },
  created() {
  },
  methods: {

  },
});
</script>
