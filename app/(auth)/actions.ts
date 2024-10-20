"use server";

import { InputParseError } from "@/src/entities/errors/common";
import { redirect } from "next/navigation";
import { SignInInput } from "./signin/page";
import { signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { Cookie } from "lucia";
import { cookies } from "next/headers";

export async function signIn(data: SignInInput) {
  const { email, password } = data;
  let sessionCookie: Cookie;
  try {
    const result = await signInController({
      email,
      password,
    });
    sessionCookie = result.cookie;
  } catch (error) {
    console.log(error);
    if (error instanceof InputParseError) {
      return {
        error:
          "Invalid data. Make sure the Password and Confirm Password match.",
      };
    }
    return {
      error: (error as Error).message,
    };
  }
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect("/dashboard");
}
