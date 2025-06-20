import { metService } from './services/metService'
import { aiService } from './services/aiService'

export const resolvers = {
  Query: {
    artworks: async (_: any, { limit = 10 }: { limit?: number }) => {
      console.log('🔍 GraphQL Query: artworks called with limit:', limit)
      try {
        const result = await metService.getArtworks(limit)
        console.log('✅ Successfully fetched artworks:', result.length)
        return result
      } catch (error) {
        console.error('❌ Error in artworks resolver:', error)
        throw error
      }
    },
    artwork: async (_: any, { id }: { id: string }) => {
      console.log('🔍 GraphQL Query: artwork called with id:', id)
      try {
        const result = await metService.getArtwork(id)
        console.log('✅ Successfully fetched artwork:', result?.title)
        return result
      } catch (error) {
        console.error('❌ Error in artwork resolver:', error)
        throw error
      }
    },
  },
  Mutation: {
    analyzeArtwork: async (_: any, { id }: { id: string }) => {
      console.log('🔍 GraphQL Mutation: analyzeArtwork called with id:', id)
      try {
        const artwork = await metService.getArtwork(id)
        if (artwork) {
          const analysis = await aiService.analyzeArtwork(artwork)
          return { ...artwork, aiAnalysis: analysis }
        }
        throw new Error('Artwork not found')
      } catch (error) {
        console.error('❌ Error in analyzeArtwork resolver:', error)
        throw error
      }
    },
  },
}