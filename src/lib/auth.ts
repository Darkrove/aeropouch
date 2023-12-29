import client from "@/lib/commerce";
import { setCustomer } from "@store/actions/authenticateActions";

export type User = {
  id: string;
  external_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  meta: {
    utm_campaign: string;
  };
  created: number;
  updated: number;
};

export const signIn = async (
  email: string,
  callbackUrl: string
): Promise<string> => {
  try {
    // Call the Commerce.js authentication API to sign in
    const token = await client.customer.login(email, callbackUrl);

    // Return the authentication token after successful sign-in
    return token;
  } catch (error) {
    // Handle authentication error
    console.error("Authentication error:", error);
    throw error;
  }
};

export const getToken = async (token: string | null): Promise<string> => {
  try {
    const jwt = await client.customer.getToken(token);
    return jwt;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export const verifyAuth = async (): Promise<string> => {
  try {
    const isLogged = await client.customer.isLoggedIn();
    return isLogged;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const user = await client.customer.about();
    return user;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};
