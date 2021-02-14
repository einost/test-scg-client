<template>
  <div :class="{ active: isActive }" class="sidebar-main">
    <h4 @click="sidebarToggle()">Dashboard</h4>
    <NuxtLink to="/admin/vendingmachine">Vending Machine</NuxtLink>
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
  margin-left: -250px;
  background-color: $dark;
  overflow-x: hidden;
  transition: 0.5s;
  z-index: 999;

  &.active {
    position: fixed;
    margin-left: 0;
  }

  // @media (min-width: 768px) {
  //   margin-left: -320px;
  //   &.active {
  //     margin-left: 320px;
  //   }
  // }

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
}
</style>
