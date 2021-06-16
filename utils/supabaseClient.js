import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const updateUserName = async (user, firstName, lastName) => {
  console.log(user);
  console.log(firstName);
  console.log(lastName);
  await supabase
  .from('profiles')
    .insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
    }).eq('id', user.id);;
};

