import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { createContext } from './context'

async function startServer() {
  const app = express()
  
  // Force development mode for now
  process.env.NODE_ENV = 'development'
  console.log('🚀 Starting server in development mode with mock data')
  
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }))
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
    introspection: true,
    debug: true,
    formatError: (error) => {
      console.error('GraphQL Error:', error)
      return error
    }
  })

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  const PORT = process.env.PORT || 4000

  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
  })

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🔍 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

startServer().catch(error => {
  console.error('❌ Error starting server:', error)
  process.exit(1)
})