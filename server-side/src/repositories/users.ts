import supabase from "../config/supabaseClient";

const getUser = async () => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("id, username, createdAt");
    return data;
  } catch (error) {
    throw error;
  }
};

const createUser = async (id: string, username: string) => {
  const timestamp = new Date();
  const formattedTimestamp = timestamp.toISOString();

  try {
    const { error } = await supabase
      .from("user")
      .insert({ id: id, username: username, createdAt: formattedTimestamp });

    if (error) {
      throw new Error(error.message);
    }

    console.log("New user record created: " + id, " " + username);
  } catch (error) {
    console.error(error);
  }
};

const getUserOverview = async () => {
  try {
    const { data, error } = await supabase.from("userOverview").select();
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {}
};

export { getUser, createUser, getUserOverview };
