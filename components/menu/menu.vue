<template>
  <v-navigation-drawer app permanent class="transparent">
    <v-list dense>
      <div style="float: right">
        <v-list-item v-for="menu in menuItems" :key="menu.title" :to="menu.url">
          <template v-if="hasRole(menu.permission)" >
            <!-- <v-list-item-icon></v-list-item-icon> -->

            <v-list-item-content>
              <v-list-item-title>
                  {{ menu.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { authStore } from "~/types/authStore";

export default defineComponent({
  name: "Menu",
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
    const session = this.$store.state as { auth: authStore };
    if (session.auth.user) {
      this.userName = session.auth.user.name;
    }
  },
  methods: {
    logout() {
      this.loader = true;
      this.$store.dispatch("auth/removeSession").then(() => {
        this.$router.push("/");
      });
    },
    hasRole(role: string | undefined) {
      const session = this.$store.state as { auth: authStore };
      if (session.auth.user?.role == role) {
        return true;
      }
      if (!role) {
        return true;
      }
      return false;
    },
  },
});
</script>
  