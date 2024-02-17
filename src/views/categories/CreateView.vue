<script setup lang="ts">
import router from '@/router';
import { CategoryService, type Category } from '@/services/CategoryService'
import { ref } from 'vue'

const form = ref<Category>({
  name: ''
})

const loading = ref<boolean>(false)

const save = async () => {
    //console.log(form.value)
    loading.value = true
    const result = await CategoryService.create(form.value)
    console.log("category created", result)
    loading.value = false
    router.push("/categories")
}

</script>
<template>
  <h5>Create Category</h5>
  <form>
    <label>
      Name
      <input name="name" type="text" v-model="form.name" placeholder="Category Name" />
    </label>
  </form>
  <footer>
    <router-link to="/categories"><button class="outline">Back</button></router-link>
    <button 
    :aria-busy="loading"
    :disabled="loading"
    @click="save()">Save</button>
  </footer>
</template>
