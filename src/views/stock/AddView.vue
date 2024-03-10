<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Stock, StockService } from '../../services/StockService';
import { Product, ProductService } from '../../services/ProductService';
import router from '../../router';

const form = ref<Stock>({
  productId: 0,
  price: 0,
  expires: '',
  quantity: 0,
  added: new Date().toISOString().slice(0,10)
})
const products = ref<Product[]>([])
const loading = ref<boolean>(false)

onMounted(async () => {
  products.value = await ProductService.getAll()
})

const save = async ($event) => {
  $event.preventDefault()
  loading.value = true
  try {
    await StockService.create(form.value)
    router.push('/')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit="save">
    <article>
      <header>Add Stock!</header>
      <div class="grid m-10">
        <div>
          <label>Product</label>
          <select id="productId" name="productId" v-model="form.productId">
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }} ({{ product.supplier }})
            </option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input required class="input" v-model="form.quantity" type="number" min="0" id="quantity" name="quantity"
            placeholder="Quantity" />
        </div>
      </div>
      <div class="grid m-10">
        <div>
          <label>Expires</label>
          <input required class="input" v-model="form.expires" type="date" id="expires" name="expires"
            placeholder="Expires at" />
        </div>
        <div>
          <label>Price</label>
          <input required class="input" v-model="form.price" type="float" id="price" name="price" placeholder="Price" />
        </div>
      </div>
      <footer>
        <button :disabled="loading" type="submit">Add</button>
      </footer>
    </article>
    <RouterLink to="/"><a class="button is-light">Back</a></RouterLink>
  </form>
</template>

<style scoped>
form>div {
  margin: 20px;
}

.m-10 {
  margin: 10px;
}

footer {
  display: flex;
  justify-content: center;
}

footer>button {
  max-width: 200px;
  margin: 0px;
}
</style>