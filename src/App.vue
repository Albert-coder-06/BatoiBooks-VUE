<script setup>
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import BooksCart from './components/BooksCart.vue';
import BookForm from './components/BookForm.vue';
import AppAbout from './components/AppAbout.vue';
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
      <BooksList />
      <BookForm />
      <BooksCart />
      <AppAbout />
    </main>


    <footer>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Albert Danga Vicol</p>
    </footer>
  </div>
</template>

<style scoped>
</style>
