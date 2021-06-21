import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const updateUserSignUp = async (user, name) => {
  await supabase
    .from('users')
    .update({
      full_name: name,
      avatar_url: "https://res.cloudinary.com/city-of-bounce/image/upload/v1557940124/no-profile-pic.png"
    })
    .eq('id', user.id);
};

