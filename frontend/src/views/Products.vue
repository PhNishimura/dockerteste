<template>
  <main>
    <section class="products-title-container">
      <h1>Nossos Produtos</h1>
      <p>Explore a variedade de office supplies categorizados para sua conveniência.</p>
    </section>
    
    <section class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-card__imagem">
        <h3 class="product-card__title">{{ product.name }}</h3>
        <p class="product-card__preco">R$ {{ product.price.toFixed(2) }}</p>
        <button @click="addToCart(product)" class="product-card__button">
          Adicionar ao Carrinho
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

const products = ref([
  {
    id: 1,
    name: 'Papel A4',
    price: 10.90,
    image: '/imagens/products-paper.png'
  },
  {
    id: 2,
    name: 'Acessórios',
    price: 8.50,
    image: '/imagens/products-materials.png'
  },
  {
    id: 3,
    name: 'Refil',
    price: 12.70,
    image: '/imagens/products-filling.png'
  },
  {
    id: 4,
    name: 'Fichários',
    price: 11.30,
    image: '/imagens/products-binders.png'
  },
  {
    id: 5,
    name: 'Envelopes',
    price: 15.90,
    image: '/imagens/products-envelopes.png'
  },
  {
    id: 6,
    name: 'Cadernos',
    price: 18.60,
    image: '/imagens/products-boards.png'
  }
])

const addToCart = (product) => {
  cartStore.addItem(product)
  alert(`${product.name} adicionado ao carrinho!`)
}
</script>

<style scoped>
.products-title-container {
  text-align: center;
  padding: 2rem 0;
  background-color: #f8f9fa;
}

.products-title-container h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.products-title-container p {
  font-size: 1.1rem;
  color: #666;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.product-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-card__imagem {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.product-card__title {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-card__preco {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f4a261;
  margin-bottom: 1rem;
}

.product-card__button {
  background-color: #f4a261;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.product-card__button:hover {
  background-color: #e76f51;
}
</style>