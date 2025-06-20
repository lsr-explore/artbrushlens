import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Artwork {
    id: ID!
    title: String!
    artist: String
    imageUrl: String
    description: String
    metId: String
    aiAnalysis: String
  }

  type Query {
    artworks(limit: Int): [Artwork!]!
    artwork(id: ID!): Artwork
  }

  type Mutation {
    analyzeArtwork(id: ID!): Artwork
  }
`