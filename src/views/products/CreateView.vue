<script setup lang="ts">
import router from '@/router'
import { ProductService, type Product } from '@/services/ProductService'
import { ref, reactive, onMounted } from 'vue'
import { Category, CategoryService } from '../../services/CategoryService';

const form = ref<Product>({
  name: '',
  supplier: '',
  categoryId: 0
})


const loading = ref<boolean>(false)
const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await CategoryService.getAll()
})

const save = async () => {
  loading.value = true
  const result = await ProductService.create(form.value)
  console.log('product created', result)
  loading.value = false
  router.push('/products')
}
</script>
<template>
  <h5>Create Product</h5>
  <form>
    <div class="grid">
      <div>
        <label>
          Name
          <input name="name" type="text" v-model="form.name" placeholder="Product Name" required />
        </label>
      </div>
      <div>
        <label>
          Supplier
          <input name="name" type="text" v-model="form.supplier" placeholder="Supplier Name" required />
        </label>
      </div>
    </div>
    <div>
      <label>
        Category
      <select name="categories" aria-label="Select category..." v-model="form.categoryId" required>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </label>
    </div>
  </form>
  <footer>
    <router-link to="/products"><button class="outline">Back</button></router-link>
    <button :aria-busy="loading" :disabled="loading" @click="save()">Save</button>
  </footer>
</template>
