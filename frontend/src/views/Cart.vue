<template>
  <main>
    <div class="cart-title-container">
      <h1>Carrinho de Compras</h1>
      <p>Revise seus itens antes de finalizar a compra</p>
    </div>

    <div class="cart-container" v-if="cartStore.items.length > 0">
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">{{ item.name }}</h4>
            <p class="cart-item-price">R$ {{ item.price.toFixed(2) }}</p>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-button" @click="decreaseQuantity(item)">-</button>
                <input 
                  type="number" 
                  class="quantity-input" 
                  :value="item.quantity" 
                  @change="updateQuantity(item, $event)"
                  min="1"
                >
                <button class="quantity-button" @click="increaseQuantity(item)">+</button>
              </div>
              <button class="remove-item" @click="cartStore.removeItem(item.id)">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Resumo do Pedido</h3>
        <div class="summary-details">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>R$ {{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Frete:</span>
            <span>R$ {{ shipping.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>R$ {{ (cartStore.totalPrice + shipping).toFixed(2) }}</span>
          </div>
        </div>
        <button class="checkout-button" @click="checkout">
          Finalizar Compra
        </button>
        <router-link to="/products" class="continue-shopping">
          Continuar Comprando
        </router-link>
      </div>
    </div>

    <div v-else class="cart-empty">
      <i>🛒</i>
      <p>Seu carrinho está vazio</p>
      <router-link to="/products" class="button">
        Ir às Compras
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const shipping = computed(() => {
  return cartStore.items.length > 0 ? 15.00 : 0
})

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}

const updateQuantity = (item, event) => {
  const newQuantity = parseInt(event.target.value)
  if (newQuantity > 0) {
    cartStore.updateQuantity(item.id, newQuantity)
  }
}

const checkout = () => {
  alert('Compra finalizada com sucesso!')
  cartStore.clearCart()
  router.push('/thanks')
}
</script>