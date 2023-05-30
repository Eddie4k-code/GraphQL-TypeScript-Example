import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { resolvers } from './graphql/resolvers';
import schema from './graphql/schema';

const app = express();

app.listen(4000, () => {
    console.log('Started');
});

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}));