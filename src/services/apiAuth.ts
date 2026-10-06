import supabase from "./supabase";
import { publicSignupEnabled } from "@/config/features";

export interface LoginProps {
  email: string;
  password: string;
}

export interface SignupProps {
  full_name: string;
  email: string;
  password: string;
}

export async function signup({ full_name, email, password }: SignupProps) {
  if (!publicSignupEnabled) {
    throw new Error("Public signup is currently closed");
  }

  const { data: user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: full_name,
      },
    },
  });

  // Handle errors
  let authError = null;
  if (user.user && user.user.identities && !user.user.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }
  if (authError) throw new Error(authError.message);

  return user;
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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
