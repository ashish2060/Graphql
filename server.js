import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";

async function init() {
  const app = express();

  const typeDefs = `
    type User{
        id:ID!
        name:String
        phone:String
    }

    type Query{
        getAllUser:[User]
    }
  `;

  const resolvers = {
    Query: {
      getAllUser: () => [
        { id: 1, name: "ashish", phone: "1111111111" },
        { id: 2, name: "shivam", phone: "2222222222" },
      ],
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(express.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.use("/", (req, res) => {
    res.send("Your are at the home page and Graphql is running at /graphql");
  });
  app.listen(4000, () => {
    console.log("Server Running at port 4000");
  });
}

init();
