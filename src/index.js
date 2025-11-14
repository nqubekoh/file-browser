const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function start() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(
            `GraphQL server ready at http://0.0.0.0:${port}${server.graphqlPath}`
        );
    });
}

start().catch(err => {
    console.error(err);
    process.exit(1);
});