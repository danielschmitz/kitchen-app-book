<script setup lang="ts">
import router from '@/router'
import { ProductService, type Product } from '@/services/ProductService'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const form = ref<Product>({
  id: 0,
  name: '',
  supplier: '',
  categoryId: 0
})

const route = useRoute()
const loading = ref<boolean>(false)

onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const product = await ProductService.get(id)
    form.value.id = product.id
    form.value.name = product.name
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
    console.log('product created', result)
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
    <input type="hidden" name="id" v-model="form.id" />
    <label>
      Name
      <input name="name" type="text" v-model="form.name" placeholder="Product Name" required />
    </label>
  </form>
  <div style="display: flex;justify-content: center;">
    <button :aria-busy="loading" :disabled="loading" @click="remove()" class="outline secondary">Delete</button>
  </div>
  <footer>
    <router-link to="/products"><button class="outline">Back</button></router-link>
    <button :aria-busy="loading" :disabled="loading" @click="save()">Save</button>
  </footer>
</template>
