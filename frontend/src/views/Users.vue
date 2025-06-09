<template>
  <main>
    <div class="users-container">
      <h1>Painel Administrativo</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Carregando dados...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <h3>❌ Erro ao carregar dados</h3>
        <p>{{ error }}</p>
        <button @click="loadData" class="retry-button">Tentar Novamente</button>
      </div>
      
      <div v-else class="data-sections">
        <!-- Seção de Usuários -->
        <div class="section">
          <h2>👥 Usuários Cadastrados ({{ users.length }})</h2>
          <div v-if="users.length === 0" class="no-data">
            Nenhum usuário encontrado
          </div>
          <div v-else class="cards-grid">
            <div v-for="user in users" :key="user.id" class="user-card">
              <div class="card-header">
                <h3>{{ user.name }}</h3>
                <span class="user-id">#{{ user.id }}</span>
              </div>
              <p class="user-email">📧 {{ user.email }}</p>
              <div class="user-stats">
                <span class="purchase-count">
                  🛒 {{ user.Purchases ? user.Purchases.length : 0 }} compra{{ (user.Purchases?.length || 0) !== 1 ? 's' : '' }}
                </span>
                <span class="join-date">
                  📅 {{ formatDate(user.createdAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção de Produtos -->
        <div class="section">
          <h2>📦 Produtos Disponíveis ({{ items.length }})</h2>
          <div v-if="items.length === 0" class="no-data">
            Nenhum produto encontrado
          </div>
          <div v-else class="cards-grid">
            <div v-for="item in items" :key="item.id" class="item-card">
              <div class="card-header">
                <h3>{{ item.name }}</h3>
                <span class="item-price">R$ {{ item.price.toFixed(2) }}</span>
              </div>
              <div class="item-stats">
                <span class="item-id">#{{ item.id }}</span>
                <span class="item-date">📅 {{ formatDate(item.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção de Compras -->
        <div class="section">
          <h2>🛍️ Histórico de Compras ({{ purchases.length }})</h2>
          <div v-if="purchases.length === 0" class="no-data">
            Nenhuma compra encontrada
          </div>
          <div v-else class="purchases-list">
            <div v-for="purchase in purchases" :key="purchase.id" class="purchase-card">
              <div class="purchase-header">
                <span class="purchase-id">#{{ purchase.id }}</span>
                <span class="purchase-date">{{ formatDate(purchase.createdAt) }}</span>
              </div>
              <div class="purchase-details">
                <div class="purchase-user">
                  👤 <strong>{{ purchase.User?.name || 'Usuário não encontrado' }}</strong>
                </div>
                <div class="purchase-item">
                  📦 {{ purchase.quantity }}x <strong>{{ purchase.Item?.name || 'Item não encontrado' }}</strong>
                </div>
                <div v-if="purchase.Item?.price" class="purchase-total">
                  💰 Total: <strong>R$ {{ (purchase.quantity * purchase.Item.price).toFixed(2) }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo Estatístico -->
        <div class="section stats-section">
          <h2>📊 Estatísticas</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ users.length }}</div>
              <div class="stat-label">Usuários</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ items.length }}</div>
              <div class="stat-label">Produtos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ purchases.length }}</div>
              <div class="stat-label">Compras</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">R$ {{ totalRevenue.toFixed(2) }}</div>
              <div class="stat-label">Receita Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const items = ref([])
const purchases = ref([])
const loading = ref(true)
const error = ref(null)

const totalRevenue = computed(() => {
  return purchases.value.reduce((total, purchase) => {
    if (purchase.Item?.price) {
      return total + (purchase.quantity * purchase.Item.price)
    }
    return total
  }, 0)
})

const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível'
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const loadData = async () => {
  try {
    loading.value = true
    error.value = null

    console.log('🔄 Carregando dados do backend...')

    const [usersResponse, itemsResponse, purchasesResponse] = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/items'),
      axios.get('/api/purchases')
    ])

    users.value = usersResponse.data
    items.value = itemsResponse.data
    purchases.value = purchasesResponse.data

    console.log('✅ Dados carregados com sucesso:', {
      users: users.value.length,
      items: items.value.length,
      purchases: purchases.value.length
    })
  } catch (err) {
    console.error('❌ Erro ao carregar dados:', err)
    error.value = `Erro ao conectar com o backend: ${err.message}`
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.users-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.users-container h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  padding: 4rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f4a261;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 10px;
  margin: 2rem 0;
}

.error h3 {
  color: #c33;
  margin-bottom: 1rem;
}

.retry-button {
  background: #f4a261;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.retry-button:hover {
  background: #e76f51;
}

.data-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 3px solid #f4a261;
  padding-bottom: 0.5rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.user-card, .item-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #f4a261;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover, .item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  color: #333;
  margin: 0;
  font-size: 1.2rem;
}

.user-id, .item-price {
  background: #f4a261;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
}

.user-email {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.user-stats, .item-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}

.purchase-count {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
}

.purchases-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.purchase-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #28a745;
}

.purchase-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.purchase-id {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-weight: bold;
}

.purchase-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.purchase-user, .purchase-item, .purchase-total {
  font-size: 1rem;
}

.purchase-total {
  color: #f4a261;
  font-weight: bold;
}

.stats-section {
  background: linear-gradient(135deg, #f4a261 0%, #e76f51 100%);
  color: white;
}

.stats-section h2 {
  color: white;
  border-bottom-color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

.no-data {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .users-container {
    padding: 1rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .purchase-details {
    font-size: 0.9rem;
  }
}
</style>