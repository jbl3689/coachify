import supabase from "./supabase.ts";

export async function getUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}

export async function deleteUser(userId: number) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }

  return data;
}

export async function createUser(newUser: {
  first_name: string;
  last_name: string;
  email: string;
  pos_primary: string;
  pos_secondary: string;
}) {
  const addPlayerRole = {
    ...newUser,
    role: "player",
  };
  const { data, error } = await supabase.from("users").insert([addPlayerRole]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}
