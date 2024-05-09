import { createClient } from "@supabase/supabase-js";
import { randomUsernameElements } from "../constants";
import { json } from "body-parser";
import supabase from "../config/supabaseClient";
import express, { Request } from "express";
import session, { Session, SessionData } from "express-session";

interface mySessionData extends Session {
  username?: string;
}

const createUsername = async (request: Request) => {
  const newUsername = generateRandomUsername();
  const storedUsername = await getUsernames();

  // Find if usename matches and create recursion if there is a duplicate
  if (findUsername(storedUsername, newUsername)) {
    await createUsername(request);
  } else {
    const sessionData = request.session as mySessionData;
    sessionData.username = newUsername;
  }
};

const findUsername = (storedUsername: any, newUsername: string) => {
  return storedUsername.includes(newUsername);
};

const getRandomElement = (array: string[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const generateRandomUsername = () => {
  const wordElement1 = getRandomElement(randomUsernameElements.adjectives);
  const wordElement2 = getRandomElement(randomUsernameElements.colours);
  const wordElement3 = getRandomElement(randomUsernameElements.animals);

  const username = wordElement1.concat(wordElement2, wordElement3);

  return username;
};

const getUsernames = async () => {
  try {
    const { data, error } = await supabase.from("user").select("username");
    return data;
  } catch (error) {
    throw error;
  }
};

export default createUsername;
