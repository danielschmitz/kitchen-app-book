<script setup lang="ts">
import router from '@/router'
import { ProductService, type Product } from '@/services/ProductService'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Category, CategoryService } from '../../services/CategoryService';

const form = ref<Product>({
  id: 0,
  name: '',
  supplier: '',
  categoryId: 0
})

const route = useRoute()
const loading = ref<boolean>(false)
const categories = ref<Category[]>([])


onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const product = await ProductService.get(id)
    form.value.id = product.id
    form.value.name = product.name
    form.value.supplier = product.supplier
    form.value.categoryId = product.categoryId
    categories.value = await CategoryService.getAll()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

const save = async () => {
  try {
    loading.value = true
    const result = await ProductService.update(form.value)
    console.log('product updated', result)
    loading.value = false
    router.push('/products')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const remove = async () => {
  if (confirm("Remove?")) {
    try {
      loading.value = true
      await ProductService.delete(form.value.id)
      router.push('/products')
    } catch (error) {
      console.log(error)      
    } finally {
      loading.value = false
    }
  }
}

</script>
<template>
  <h5>Edit Product</h5>
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
  <div style="display: flex;justify-content: center;">
    <button :aria-busy="loading" :disabled="loading" @click="remove()" class="outline secondary">Delete</button>
  </div>
  <footer>
    <router-link to="/products"><button class="outline">Back</button></router-link>
    <button :aria-busy="loading" :disabled="loading" @click="save()">Save</button>
  </footer>
</template>
