import { UserState } from "@/types/types.ts";
import supabase from "./supabase.ts";

export async function getUser() {
  const { data: userAccount, error: userAccountError } =
    await supabase.auth.getUser();

  if (userAccountError) {
    console.error(userAccountError);
    throw new Error("Authenticated user could not be loaded");
  }

  let { data: user, error: userTableError } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", userAccount.user.id)
    .single();

  if (userTableError) {
    console.error(userTableError);
    throw new Error("A matching user could not be found with your user id!");
  }

  if (user === undefined || user === null) {
    throw new Error("User data is undefined");
  }

  return user as UserState;
}

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

export async function getTeamUsers(selectedTeamId: number) {
  let { data: userIds, error: userIdsError } = await supabase
    .from("team_members")
    .select("user_id")
    .eq("team_id", selectedTeamId);

  if (userIdsError) {
    console.error(userIdsError);
    throw new Error("User ids could not be loaded");
  }

  // Extract the list of user IDs
  const userIdList = userIds?.map((item) => item.user_id);

  if (!userIdList || userIdList.length === 0) {
    return []; // Return an empty array if the team has no associated users
  }

  // Fetch only the users that have an id in the userIdList
  let { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .in("id", userIdList);

  if (usersError) {
    console.error(usersError);
    throw new Error("Users could not be loaded");
  }

  return users as UserState[];
}
