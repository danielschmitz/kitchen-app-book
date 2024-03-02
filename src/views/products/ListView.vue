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
    <table v-else>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Product</th>
          <th scope="col">Supplier</th>
          <th scope="col">Category</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th>{{ product.id }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.supplier }}</td>
          <td>{{ product.category?.name }}</td>
          <td><router-link :to="`/products/edit/${product.id}`">Edit</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
  <footer>
    <router-link to="/products/create"><button>New</button></router-link>
  </footer>
</template>
