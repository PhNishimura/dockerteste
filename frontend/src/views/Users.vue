<template>
  <main>
    <div class="users-container">
      <h2>Usuários do Sistema</h2>
      <div v-if="loading" class="loading">Carregando dados...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="users-section">
          <h3>Usuários Cadastrados</h3>
          <div v-if="users.length === 0" class="no-data">Nenhum usuário encontrado</div>
          <ul v-else class="users-list">
            <li v-for="user in users" :key="user.id" class="user-item">
              <strong>{{ user.name }}</strong> - {{ user.email }}
              <span v-if="user.Purchases && user.Purchases.length > 0" class="purchase-count">
                ({{ user.Purchases.length }} compra{{ user.Purchases.length > 1 ? 's' : '' }})
              </span>
            </li>
          </ul>
        </div>

        <div class="items-section">
          <h3>Produtos Disponíveis</h3>
          <div v-if="items.length === 0" class="no-data">Nenhum produto encontrado</div>
          <ul v-else class="items-list">
            <li v-for="item in items" :key="item.id" class="item-item">
              <strong>{{ item.name }}</strong> - R$ {{ item.price.toFixed(2) }}
            </li>
          </ul>
        </div>

        <div class="purchases-section">
          <h3>Histórico de Compras</h3>
          <div v-if="purchases.length === 0" class="no-data">Nenhuma compra encontrada</div>
          <ul v-else class="purchases-list">
            <li v-for="purchase in purchases" :key="purchase.id" class="purchase-item">
              <strong>{{ purchase.User?.name || 'Usuário não encontrado' }}</strong> 
              comprou {{ purchase.quantity }}x 
              <strong>{{ purchase.Item?.name || 'Item não encontrado' }}</strong>
              <span v-if="purchase.Item?.price" class="purchase-total">
                - Total: R$ {{ (purchase.quantity * purchase.Item.price).toFixed(2) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const items = ref([])
const purchases = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    // Fazer requisições para o backend através do proxy
    const [usersResponse, itemsResponse, purchasesResponse] = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/items'),
      axios.get('/api/purchases')
    ])

    users.value = usersResponse.data
    items.value = itemsResponse.data
    purchases.value = purchasesResponse.data

    console.log('Dados carregados:', { users: users.value, items: items.value, purchases: purchases.value })
  } catch (err) {
    console.error('Erro ao carregar dados:', err)
    error.value = `Erro ao carregar dados: ${err.message}`
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.users-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.users-section, .items-section, .purchases-section {
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.users-list, .items-list, .purchases-list {
  list-style: none;
  padding: 0;
}

.user-item, .item-item, .purchase-item {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.5rem;
}

.user-item:last-child, .item-item:last-child, .purchase-item:last-child {
  border-bottom: none;
}

.purchase-count {
  color: #666;
  font-size: 0.9rem;
}

.purchase-total {
  color: #f4a261;
  font-weight: bold;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.no-data {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

h2, h3 {
  color: #333;
  margin-bottom: 1rem;
}

h2 {
  text-align: center;
  font-size: 2rem;
}

h3 {
  font-size: 1.3rem;
  border-bottom: 2px solid #f4a261;
  padding-bottom: 0.5rem;
}
</style>