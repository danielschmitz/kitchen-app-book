<script setup lang="ts">
import router from '@/router'
import { CategoryService, type Category } from '@/services/CategoryService'
import { ref, reactive } from 'vue'

const form = ref<Category>({
  name: ''
})

interface FormValidation {
  valid: boolean
  name: {
    valid: boolean
    empty: boolean
    minLength: boolean
  }
}

// fv = formValidation
const fv = ref<FormValidation>({
  valid: true,
  name: {
    valid: true,
    empty: false,
    minLength: false
  }
})

const loading = ref<boolean>(false)

const validate = () => {
  fv.value.valid = true
  fv.value.name.valid = true
  fv.value.name.empty = false
  fv.value.name.minLength = false
  if (form.value.name === '') {
    fv.value.valid = false
    fv.value.name.valid = false
    fv.value.name.empty = true
  }
  if (form.value.name.trim() === '') {
    fv.value.valid = false
    fv.value.name.valid = false
    fv.value.name.empty = true
  }
  if (fv.value.valid && form.value.name.length<2){
    fv.value.valid = false
    fv.value.name.valid = false
    fv.value.name.minLength = true
  }
  return fv.value.valid
}

const save = async () => {
  if (validate()) {
    loading.value = true
    const result = await CategoryService.create(form.value)
    console.log('category created', result)
    loading.value = false
    router.push('/categories')
  }
}
</script>
<template>
  <h5>Create Category</h5>
  <form>
    <label>
      Name
      <input
        name="name"
        type="text"
        v-model="form.name"
        placeholder="Category Name"
        required
        :aria-invalid="!fv.name.valid||undefined"
      />
      <small v-if="fv.name.empty"> Can't be empty </small>
      <small v-if="fv.name.minLength"> Too short! </small>
    </label>
  </form>
  <footer>
    <router-link to="/categories"><button class="outline">Back</button></router-link>
    <button :aria-busy="loading" :disabled="loading" @click="save()">Save</button>
  </footer>
</template>
