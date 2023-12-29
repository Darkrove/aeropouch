"use server";

import client from "@lib/commerce";
import { z } from "zod";

export async function actionSignUpUser(email: string, callbackUrl: string) {
  try {
    const token = await client.customer.login(email, callbackUrl);
    return token;
  } catch (error) {
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
