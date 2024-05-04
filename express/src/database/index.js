const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
// exapamples below
// db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.products = require("./models/products.js")(db.sequelize, DataTypes);

// Relate the models
// example of post and user below.
// db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  // below is an example of adding a user

  // const argon2 = require("argon2");

  // let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  // await db.user.create({ username: "mbolger", password_hash: hash, first_name: "Matthew", last_name : "Bolger" });

  // hash = await argon2.hash("def456", { type: argon2.argon2id });
  // await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra" });
}

module.exports = db;
