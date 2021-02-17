<template>
  <div :class="{ active: isActive }" class="sidebar-main">
    <b-button block variant="dark" size="lg" @click="sidebarToggle()">
      <span class="float-left">Menu</span>
      <font-awesome-icon class="fa-lg float-right" icon="bars" />
    </b-button>
    <NuxtLink to="/admin/machine">
      <font-awesome-icon class="mr-1" icon="table" />
      <span>Vending Machine</span>
    </NuxtLink>
    <NuxtLink to="/admin" class="sidebar-logout">
      <font-awesome-icon class="mr-1" icon="power-off" />
      <span>Logout</span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    sidebarToggle() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss">
.sidebar-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  margin-left: -227.5px;
  background-color: $dark;
  overflow-x: hidden;
  transition: 0.5s;
  z-index: 999;

  a {
    text-align: right;
    span {
      display: none;
    }
  }

  &.active {
    position: fixed;
    margin-left: 0;

    a {
      text-align: left;
      span {
        display: inline;
      }
    }
  }

  h4 {
    padding: 1rem;
    color: $white;
  }

  .nuxt-link-active {
    display: block;
    width: 100%;
    padding: 1rem;
    background-color: $primary;
    color: $white;
    text-decoration: none;
  }

  .sidebar-logout {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
