import { Sequelize } from "sequelize";
import UserModel from "./user.js";
import ItemModel from "./item.js";
import PurchaseModel from "./purchase.js";

// Configuração do banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/app/data/database.sqlite",
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Inicializar modelos
const User = UserModel(sequelize);
const Item = ItemModel(sequelize);
const Purchase = PurchaseModel(sequelize);

// Definir associações
User.hasMany(Purchase, { 
  foreignKey: "userId", 
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Purchase.belongsTo(User, { 
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Item.hasMany(Purchase, { 
  foreignKey: "itemId", 
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Purchase.belongsTo(Item, { 
  foreignKey: "itemId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export { sequelize, User, Item, Purchase };