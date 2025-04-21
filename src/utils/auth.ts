
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

// Create the Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export type UserRole = 'student' | 'admin';

export const handleRegistration = async (
  email: string,
  password: string,
  role: UserRole,
  additionalData: { name: string; institution?: string }
) => {
  try {
    // Check if supabase client is initialized
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please check your environment variables.');
    }

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name: additionalData.name,
          ...(role === 'student' && { institution: additionalData.institution }),
        },
      },
    });

    if (authError) throw authError;

    // Additional profile data can be stored in a profiles table if needed
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email,
            name: additionalData.name,
            role,
            ...(role === 'student' && { institution: additionalData.institution }),
          },
        ]);

      if (profileError) throw profileError;
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
