// Simple test to verify our resolvers work
import { resolvers } from './resolvers'

async function testResolvers() {
  console.log('🧪 Testing resolvers...')
  
  try {
    const artworks = await resolvers.Query.artworks({}, { limit: 3 })
    console.log('✅ Artworks resolver test passed:', artworks)
    
    const artwork = await resolvers.Query.artwork({}, { id: '1' })
    console.log('✅ Artwork resolver test passed:', artwork)
    
  } catch (error) {
    console.error('❌ Resolver test failed:', error)
  }
}

testResolvers()