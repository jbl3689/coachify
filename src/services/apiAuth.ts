import supabase from "./supabase";

export interface LoginProps {
  email: string;
  password: string;
}
export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export const getCurrentUser = async () => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error("Login session error");

  if (!session?.session) return null;

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error("Login user error");

  return user?.user;
};
