interface Artwork {
  id: string
  title: string
  artist?: string
  description?: string
}

// Mock AI responses for development
const MOCK_AI_ANALYSES = [
  "This artwork demonstrates masterful use of color and composition, with swirling brushstrokes that create a sense of movement and energy. The contrast between warm and cool tones adds depth and emotional resonance.",
  "The piece showcases exceptional technical skill in its realistic portrayal while maintaining an air of mystery. The lighting and shadows create a dramatic effect that draws the viewer's attention.",
  "A remarkable example of the artist's unique style, combining traditional techniques with innovative approaches. The symbolism and metaphorical elements invite deeper contemplation.",
  "The composition demonstrates perfect balance and harmony, with each element carefully placed to guide the viewer's eye through the narrative of the piece.",
  "This work represents a significant moment in art history, showcasing the evolution of artistic expression and the artist's mastery of their chosen medium."
]

export const aiService = {
  async analyzeArtwork(artwork: Artwork): Promise<string> {
    try {
      // For development, return mock analysis
      if (process.env.NODE_ENV === 'development' || process.env.USE_LOCAL_AI === 'true') {
        console.log(`🤖 Generating mock AI analysis for: ${artwork.title}`)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Return a random mock analysis
        const randomIndex = Math.floor(Math.random() * MOCK_AI_ANALYSES.length)
        return `AI Analysis of "${artwork.title}" by ${artwork.artist}: ${MOCK_AI_ANALYSES[randomIndex]}`
      }

      // Production OpenAI code
      const { Configuration, OpenAIApi } = require('openai')
      
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
      
      const openai = new OpenAIApi(configuration)
      
      const prompt = `Analyze this artwork: "${artwork.title}" by ${artwork.artist}. Description: ${artwork.description}. Provide insights about the artistic techniques, historical context, and emotional impact.`
      
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 200,
        temperature: 0.7,
      })
      
      return response.data.choices[0]?.text?.trim() || 'Analysis unavailable'
    } catch (error) {
      console.error('Error analyzing artwork:', error)
      return 'AI analysis temporarily unavailable'
    }
  }
}