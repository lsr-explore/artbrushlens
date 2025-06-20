import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'your-service-key'

export const supabase = createClient(supabaseUrl, supabaseKey)