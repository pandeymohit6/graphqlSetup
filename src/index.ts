// @ts-ignore -- Express typings are not installed in this project.
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
const app = express();
const port = (globalThis as any).process?.env?.PORT || 5000;

const gqlServer = new ApolloServer({
  typeDefs: `
       type Query {
         hello:String
         say(name:String): String
       }
  `,
  resolvers: {
    Query: {
      hello: () => `Hey there i am server`,
      say:(_, {name}: {name:String}) => `hey my name is ${name}`
    },
  },
});

//START gqlServer
async function init() {
  await gqlServer.start();
  app.use(express.json());
  app.get("/", (req: any, res: any) => {
    console.log("ruing");
  });
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(port, () => {
    console.log(`server is runing on port ${port}`);
  });
}

init();
