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

// POST new User record
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

// GET User attempt records
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

// GET top user
const getTopUser = async () => {
  try {
    const { data, error } = await supabase
      .from("userOverview")
      .select("username")
      .order("totalPoints", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export { getUser, createUser, getUserOverview, getTopUser };
