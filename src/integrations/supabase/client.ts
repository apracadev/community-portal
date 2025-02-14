
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://lsmyxaztgymsxxakdwqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbXl4YXp0Z3ltc3h4YWtkd3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMzg3MTUsImV4cCI6MjA1NDkxNDcxNX0.tPxFes9FL9xFbeDm0-gb5T0hQxt3rCmhwXu5ePf3R2c';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
