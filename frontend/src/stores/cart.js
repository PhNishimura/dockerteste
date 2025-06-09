import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const addItem = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ 
        ...product, 
        quantity: 1,
        image: product.image || '/imagens/products-paper.png'
      })
    }
    
    // Salvar no localStorage
    saveToLocalStorage()
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item && quantity > 0) {
      item.quantity = quantity
      saveToLocalStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    }
  }

  // Carregar dados do localStorage ao inicializar
  loadFromLocalStorage()

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadFromLocalStorage
  }
})