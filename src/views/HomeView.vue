<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Stock, StockService } from '../services/StockService';

const isDateLessOneMonth = (date: string) => (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24) > -30

const stockList = ref<Stock[]>([])

onMounted(async () => {
  stockList.value = await StockService.getAll()
})

</script>

<template>
  <main class="container">
    <RouterLink to="/add">Add Stock</RouterLink>
    <br /><br />
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Added</th>
          <th>Expires</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stockList" :key="stock.id">
          <td>
            <RouterLink :to="`/edit/${stock.id}`">{{ stock.product.name }}</RouterLink>
          </td>
          <td>{{ stock.quantity }}</td>
          <td>{{ new Date(stock.added).toLocaleDateString() }}</td>
          <td v-if="isDateLessOneMonth(stock.expires)" class="warning">
            {{ new Date(stock.expires).toLocaleDateString() }}
          </td>
          <td v-else>
            {{ new Date(stock.expires).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>


<style scoped>
.warning {
  color: brown;
  font-weight: bold;
}
</style>
