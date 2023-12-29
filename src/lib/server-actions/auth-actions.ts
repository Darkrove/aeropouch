"use server";

import client from "@lib/commerce";
import { z } from "zod";

export async function actionSignUpUser(email: string, callbackUrl: string) {
  try {
    const token = await client.customer.login(email, callbackUrl);
    return token;
  } catch (error) {
    console.error("SignUp error:", error);
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: "Unable to logged in using this email. Please try again.",
          error: error.issues,
        },
      };
    }
    return {
      error: {
        message: "Internal Server Error. Please try again.",
      },
    };
  }
}

export async function actionExchangeToken(token: string) {
  try {
    const jwt = await client.customer.getToken(token);
    return jwt;
  } catch (error) {
    console.error("Exchange Token error:", error);
    if (error instanceof z.ZodError) {
      return {
        error: {
          message:
            "Unable to exchange token using this email. Please try again.",
          error: error.issues,
        },
      };
    }
    return {
      error: {
        message: "Internal Server Error. Please try again.",
      },
    };
  }
}

export async function actionVerifyAuth() {
  try {
    const isLogged = await client.customer.isLoggedIn();
    return isLogged;
  } catch (error) {
    console.error("Verify Auth error:", error);
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: "Unable to logged in using this email. Please try again.",
          error: error.issues,
        },
      };
    }
    return {
      error: {
        message: "Internal Server Error. Please try again.",
      },
    };
  }
}

export async function actionGetUser() {
  try {
    const user = await client.customer.about();
    return user;
  } catch (error) {
    console.error("Get User error:", error);
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: "Unable to logged in using this email. Please try again.",
          error: error.issues,
        },
      };
    }
    return {
      error: {
        message: "Internal Server Error. Please try again.",
      },
    };
  }
}

export async function actionLogOut() {
  try {
    await client.customer.logout();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
