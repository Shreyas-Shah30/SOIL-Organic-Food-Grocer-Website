const express = require("express");
const cors = require("cors");
const db = require("./src/database");
const { ApolloServer } = require('apollo-server-express'); //Apollo Server for GraphQL
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const typeDefs = require("./src/admin_GraphQL/types");
const resolvers = require("./src/admin_GraphQL/resolvers");
const http = require('http');

// Database will be sync'ed in the background.
db.sync();

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe
}, {
  server: httpServer,
  path: '/graphql',
});

const server = new ApolloServer({
  schema,
  context: () => ({ db }),
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  }],
});


(async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  const PORT = 4001;
  httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql`));
})();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());
app.use(express.urlencoded({ extended: true }));

require("./src/routes/user.routes.js")(express, app);
require("./src/routes/product.routes.js")(express, app);
require("./src/routes/shoppingCart.routes.js")(express, app);
require("./src/routes/cartItem.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);

// Set port, listen for requests.
db.sequelize.sync().then(() => {
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
});

module.exports = app; // Export the app for testing
