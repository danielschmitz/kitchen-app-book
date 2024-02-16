<script setup lang="ts">
import router from '@/router';
import { CategoryService, type Category } from '@/services/CategoryService'
import { ref } from 'vue'

const form = ref<Category>({
  name: ''
})

const save = async () => {
    //console.log(form.value)
    const result = await CategoryService.create(form.value)
    console.log("category created", result)
    router.push("/categories");
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
    <button @click="save()">Save</button>
  </footer>
</template>
