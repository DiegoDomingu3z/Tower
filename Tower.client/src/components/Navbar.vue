<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link
      class="navbar-brand d-flex"
      :to="{ name: 'Home' }"
      title="Main Page"
    >
      <h1>Tower</h1>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <button
      type="button"
      class="btn btn-info"
      data-bs-toggle="modal"
      data-bs-target="#create-event"
    >
      Create Event
    </button>
  </nav>
</template>

<script>
import { towerService } from '../services/TowerService';
export default {
  setup() {
    return {
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
