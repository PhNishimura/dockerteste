import express from "express";
import cors from "cors";
import { sequelize, User, Item, Purchase } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Rota raiz para indicar que o backend está rodando
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend está rodando!", 
    endpoints: ["/users", "/items", "/purchases"],
    status: "OK"
  });
});

// Rotas da API
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ include: Purchase });
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ include: [User, Item] });
    res.json(purchases);
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar usuário
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar compra
app.post("/purchases", async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const purchase = await Purchase.create({ userId, itemId, quantity });
    res.status(201).json(purchase);
  } catch (error) {
    console.error("Erro ao criar compra:", error);
    res.status(500).json({ error: error.message });
  }
});

// Função para inicializar dados de exemplo
async function initializeData() {
  try {
    // Verificar se já existem dados
    const userCount = await User.count();
    const itemCount = await Item.count();
    
    if (userCount === 0 && itemCount === 0) {
      console.log("Inicializando dados de exemplo...");
      
      // Criar usuários
      const user1 = await User.create({ name: "Mauro", email: "mauro@email.com" });
      const user2 = await User.create({ name: "Ana", email: "ana@email.com" });

      // Criar itens de papelaria
      const item1 = await Item.create({ name: "Caderno", price: 15.99 });
      const item2 = await Item.create({ name: "Caneta", price: 2.50 });
      const item3 = await Item.create({ name: "Papel", price: 10.90 });
      const item4 = await Item.create({ name: "Acessórios", price: 8.50 });

      // Criar compras
      await Purchase.create({ userId: user1.id, itemId: item1.id, quantity: 1 });
      await Purchase.create({ userId: user2.id, itemId: item2.id, quantity: 3 });

      console.log("✅ Dados de exemplo criados com sucesso!");
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar dados:", error);
  }
}

// Sincroniza banco e inicia servidor
sequelize.sync({ force: false }).then(async () => {
  await initializeData();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Backend rodando em http://localhost:${PORT}`);
    console.log(`🔗 Endpoints disponíveis:`);
    console.log(`   GET  http://localhost:${PORT}/users`);
    console.log(`   GET  http://localhost:${PORT}/items`);
    console.log(`   GET  http://localhost:${PORT}/purchases`);
    console.log(`   POST http://localhost:${PORT}/users`);
    console.log(`   POST http://localhost:${PORT}/purchases`);
  });
}).catch((err) => {
  console.error("❌ Erro ao sincronizar banco:", err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  sequelize.close().then(() => {
    process.exit(0);
  });
});