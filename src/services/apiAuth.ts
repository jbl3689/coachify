import supabase from "./supabase";

interface loginProps {
  email: string;
  password: string;
}
export async function login({ email, password }: loginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log(data, error);

  if (error) throw new Error(error.message);

  return data;
}
