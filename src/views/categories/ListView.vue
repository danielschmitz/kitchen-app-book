<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CategoryService, type Category } from '../../services/CategoryService'

const categories = ref<Category[]>()

onMounted(async () => {
  categories.value = await CategoryService.getAll()
})
</script>
<template>
  <div>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </div>
  <footer>
    <router-link to="/categories/create"><button>New</button></router-link>
  </footer>
</template>
