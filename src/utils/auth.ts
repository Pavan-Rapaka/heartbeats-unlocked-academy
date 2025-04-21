
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

    // Try to store profile data in a profiles table if it exists
    // If the table doesn't exist yet, we'll just log the error but not fail the registration
    if (authData.user) {
      try {
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

        // Just log the error but don't throw it - the user is still created in Auth
        if (profileError) {
          console.warn('Could not create profile record:', profileError.message);
          console.info('You may need to create the "profiles" table in your Supabase project');
        }
      } catch (profileErr) {
        // Just log the error but continue - Auth registration was successful
        console.warn('Error creating profile:', profileErr);
        console.info('You may need to create the "profiles" table in your Supabase project');
      }
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
