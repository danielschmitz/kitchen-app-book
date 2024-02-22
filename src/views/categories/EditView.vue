<script setup lang="ts">
import router from '@/router'
import { CategoryService, type Category } from '@/services/CategoryService'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const form = ref<Category>({
  id: 0,
  name: ''
})

const route = useRoute()
const loading = ref<boolean>(false)

onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const category = await CategoryService.get(id)
    form.value.id = category.id
    form.value.name = category.name
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

const save = async () => {
  try {
    loading.value = true
    const result = await CategoryService.update(form.value)
    console.log('category created', result)
    loading.value = false
    router.push('/categories')
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
      await CategoryService.delete(form.value.id)
      router.push('/categories')
    } catch (error) {
      console.log(error)      
    } finally {
      loading.value = false
    }
  }
}

</script>
<template>
  <h5>Edit Category</h5>
  <form>
    <input type="hidden" name="id" v-model="form.id" />
    <label>
      Name
      <input name="name" type="text" v-model="form.name" placeholder="Category Name" required />
    </label>
  </form>
  <div style="display: flex;justify-content: center;">
    <button :aria-busy="loading" :disabled="loading" @click="remove()" class="outline secondary">Delete</button>
  </div>
  <footer>
    <router-link to="/categories"><button class="outline">Back</button></router-link>
    <button :aria-busy="loading" :disabled="loading" @click="save()">Save</button>
  </footer>
</template>
