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
                <button class="quantity-button" @click="decreaseQuantity(item)">
                  <font-awesome-icon :icon="['fas', 'minus']" />
                </button>
                <input 
                  type="number" 
                  class="quantity-input" 
                  :value="item.quantity" 
                  @change="updateQuantity(item, $event)"
                  min="1"
                >
                <button class="quantity-button" @click="increaseQuantity(item)">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
              </div>
              <button class="remove-item" @click="cartStore.removeItem(item.id)">
                <font-awesome-icon :icon="['fas', 'trash']" />
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
      <div class="empty-icon">🛒</div>
      <h2>Seu carrinho está vazio</h2>
      <p>Adicione alguns produtos para começar suas compras</p>
      <router-link to="/products" class="button">
        Ir às Compras
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart.js'
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

<style scoped>
.cart-title-container {
  text-align: center;
  padding: 2rem 0;
  background-color: #f8f9fa;
}

.cart-title-container h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.cart-title-container p {
  font-size: 1.1rem;
  color: #666;
}

.cart-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.cart-items {
  flex: 2;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.cart-item-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-title {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.cart-item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #f4a261;
  margin-bottom: 1rem;
}

.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.quantity-button {
  background: #f8f9fa;
  border: none;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.quantity-button:hover {
  background: #e9ecef;
}

.quantity-input {
  width: 60px;
  height: 35px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.remove-item {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.remove-item:hover {
  background: #f8d7da;
}

.cart-summary {
  flex: 1;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-summary h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f4a261;
  padding-bottom: 0.5rem;
}

.summary-details {
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.3rem;
  color: #f4a261;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}

.checkout-button {
  width: 100%;
  background: #f4a261;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
}

.checkout-button:hover {
  background: #e76f51;
}

.continue-shopping {
  display: block;
  text-align: center;
  color: #f4a261;
  text-decoration: none;
  font-weight: bold;
}

.continue-shopping:hover {
  text-decoration: underline;
}

.cart-empty {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.cart-empty h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.cart-empty p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.button {
  display: inline-block;
  background: #f4a261;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: #e76f51;
}

@media (max-width: 768px) {
  .cart-container {
    flex-direction: column;
  }
  
  .cart-summary {
    position: static;
  }
  
  .cart-item {
    flex-direction: column;
    text-align: center;
  }
  
  .cart-item-image {
    align-self: center;
  }
}
</style>