// utils/supabaseClient.js
// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jhfkergtxqgycrazkabf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDY5MjMwNywiZXhwIjoxOTUwMjY4MzA3fQ.phbT1aFaStdrfBIxqkrV4RJml4qMo0v7v-yCyLUC8vs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)