import supabaseClient from "./supabase.ts";

export async function getUsers() {
  const { data: users, error } = await supabaseClient.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}
