import { supabase } from './lib/supabase'

export function createContext() {
  return {
    supabase,
  }
}