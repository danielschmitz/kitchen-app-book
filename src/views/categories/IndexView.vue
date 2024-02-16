<script setup lang="ts"></script>
<template>
  <article>
    <header>Categories</header>
    <RouterView />
    <footer>
      <router-link to="/categories/create"><button>New</button></router-link>
    </footer>
  </article>
</template>
