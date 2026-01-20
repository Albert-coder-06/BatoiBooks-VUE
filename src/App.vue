<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import BooksCart from './components/BooksCart.vue';
import BookForm from './components/BookForm.vue';
</script>

<template>
  <header>
    <div class="container mt-4">
      <AppMenu />
      <BooksCart></BooksCart>
      <AppMessages></AppMessages>
      <BooksList></BooksList>
      <BookForm></BookForm>
    </div>
  </header>

  

</template>

<style scoped>
</style>
