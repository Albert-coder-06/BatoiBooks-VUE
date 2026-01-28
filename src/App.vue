<script setup>
import { RouterView } from 'vue-router';
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
</script>

<template>
  <div>
    <header>
      <img src="https://www.cipfpbatoi.es/wp-content/uploads/2020/05/logo-batoi.png" alt="Batoi Logo">
      <h1>BatoiBooks</h1>
      <AppMenu />
    </header>

    <main>
      <AppMessages />
      <RouterView />
    </main>

    

    <footer>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Albert Danga Vicol</p>
    </footer>
  </div>
</template>

<style scoped>
footer {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  padding: 20px;
  background-color: black;
  color: white;
}
</style>
