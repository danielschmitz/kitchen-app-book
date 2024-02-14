<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <nav>
      <ul>
        <li><strong>Kitchen App</strong></li>
      </ul>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Categories</a></li>
      </ul>
    </nav>
    <RouterView />
  </div>
</template>
