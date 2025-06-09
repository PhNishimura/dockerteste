import express from "express";
import cors from "cors";
import { sequelize, User, Item, Purchase } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Concord Supplies Backend API", 
    version: "1.0.0",
    endpoints: {
      users: "/users",
      items: "/items", 
      purchases: "/purchases"
    },
    status: "Running"
  });
});

// API Routes
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ 
      include: {
        model: Purchase,
        include: Item
      }
    });
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: "Email já cadastrado" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [['name', 'ASC']]
    });
    res.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ 
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Item, attributes: ['id', 'name', 'price'] }
      ],
      order: [['id', 'DESC']]
    });
    res.json(purchases);
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/purchases", async (req, res) => {
  try {
    const { userId, itemId, quantity = 1 } = req.body;
    
    if (!userId || !itemId) {
      return res.status(400).json({ error: "userId e itemId são obrigatórios" });
    }

    // Verificar se usuário e item existem
    const user = await User.findByPk(userId);
    const item = await Item.findByPk(itemId);
    
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    const purchase = await Purchase.create({ userId, itemId, quantity });
    
    // Retornar compra com dados relacionados
    const purchaseWithDetails = await Purchase.findByPk(purchase.id, {
      include: [User, Item]
    });
    
    res.status(201).json(purchaseWithDetails);
  } catch (error) {
    console.error("Erro ao criar compra:", error);
    res.status(500).json({ error: error.message });
  }
});

// Função para inicializar dados
async function initializeData() {
  try {
    const userCount = await User.count();
    const itemCount = await Item.count();
    
    if (userCount === 0 && itemCount === 0) {
      console.log("🔄 Inicializando dados de exemplo...");
      
      // Criar usuários
      const users = await User.bulkCreate([
        { name: "Mauro Silva", email: "mauro@email.com" },
        { name: "Ana Costa", email: "ana@email.com" },
        { name: "João Santos", email: "joao@email.com" }
      ]);

      // Criar itens
      const items = await Item.bulkCreate([
        { name: "Caderno Universitário", price: 15.99 },
        { name: "Caneta Azul", price: 2.50 },
        { name: "Papel A4 500 folhas", price: 10.90 },
        { name: "Acessórios Diversos", price: 8.50 },
        { name: "Fichário", price: 25.90 },
        { name: "Envelope Carta", price: 0.50 }
      ]);

      // Criar algumas compras de exemplo
      await Purchase.bulkCreate([
        { userId: users[0].id, itemId: items[0].id, quantity: 2 },
        { userId: users[1].id, itemId: items[1].id, quantity: 5 },
        { userId: users[0].id, itemId: items[2].id, quantity: 1 },
        { userId: users[2].id, itemId: items[3].id, quantity: 3 }
      ]);

      console.log("✅ Dados de exemplo criados com sucesso!");
      console.log(`📊 Criados: ${users.length} usuários, ${items.length} itens, 4 compras`);
    } else {
      console.log("📋 Dados já existem no banco");
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar dados:", error);
  }
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Erro não tratado:", error);
  res.status(500).json({ 
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint não encontrado",
    path: req.path,
    method: req.method
  });
});

// Inicializar servidor
async function startServer() {
  try {
    console.log("🔄 Conectando ao banco de dados...");
    await sequelize.authenticate();
    console.log("✅ Conexão com banco estabelecida");

    console.log("🔄 Sincronizando modelos...");
    await sequelize.sync({ force: false });
    console.log("✅ Modelos sincronizados");

    await initializeData();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Backend rodando em http://0.0.0.0:${PORT}`);
      console.log(`🔗 Endpoints disponíveis:`);
      console.log(`   GET  http://localhost:${PORT}/health`);
      console.log(`   GET  http://localhost:${PORT}/users`);
      console.log(`   GET  http://localhost:${PORT}/items`);
      console.log(`   GET  http://localhost:${PORT}/purchases`);
      console.log(`   POST http://localhost:${PORT}/users`);
      console.log(`   POST http://localhost:${PORT}/purchases`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🔄 SIGTERM recebido, encerrando graciosamente...');
  try {
    await sequelize.close();
    console.log('✅ Conexão com banco fechada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fechar conexão:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('🔄 SIGINT recebido, encerrando graciosamente...');
  try {
    await sequelize.close();
    console.log('✅ Conexão com banco fechada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fechar conexão:', error);
    process.exit(1);
  }
});

startServer();