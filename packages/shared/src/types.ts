export interface Artwork {
  id: string
  title: string
  artist?: string
  imageUrl?: string
  description?: string
  metId?: string
  aiAnalysis?: string
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'user'
}