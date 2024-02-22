<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProductService, type Product } from '../../services/ProductService'

const products = ref<Product[]>()
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true;
  products.value = await ProductService.getAll()
  loading.value = false;
})
</script>
<template>
  <div>
    <progress v-if="loading" />  
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        <router-link :to="`/products/edit/${product.id}`">{{ product.name }}</router-link>
      </li>
    </ul>
  </div>
  <footer>
    <router-link to="/products/create"><button>New</button></router-link>
  </footer>
</template>
