<script setup lang="ts">
import { onMounted, ref } from 'vue';

const categories = ref()

onMounted(async () => {
    categories.value = await fetch("http://localhost:3000/categories").then((r) => r.json())
})

</script>
<template>
    <div>
        <ul>
            <li v-for="category in categories" :key="category.id">
                {{ category.name }} 
            </li>
        </ul>
    </div>    
</template>