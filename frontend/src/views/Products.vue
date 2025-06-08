  ```vue
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
          <button @click="addToCart(product)">Comprar</button>
        </div>
      </section>
    </main>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { useCartStore } from '../stores/cart'

  const cartStore = useCartStore()

  interface Product {
    id: number
    name: string
    price: number
    image: string
  }

  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Papel',
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

  const addToCart = (product: Product) => {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    })
  }
  </script>
  ```