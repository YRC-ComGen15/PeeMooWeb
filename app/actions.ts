"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const BotCode = formData.get("BotCode")?.toString();
  const confirmPassword = formData.get("cPassword")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !username) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email, password and username are required"
    );
  }

  if (password !== confirmPassword) {
    console.log("password: " + password);
    console.log("confirm password: " + confirmPassword);
    return encodedRedirect(
      "error",
      "/sign-up",
      "Password and confirm password do not match"
    );
  }

  // ตรวจสอบว่า BotCode มีอยู่จริงในฐานข้อมูลหรือไม่
  if (!BotCode) {
    return encodedRedirect("error", "/sign-up", "BotCode is required");
  }

  // log ไว้ดูค่าที่ได้จริง ๆ
  console.log("Received BotCode from form:", BotCode);

  // กรอง BotCode ที่ตรงกับค่าที่ผู้ใช้กรอก
  let { data: botuser, error } = await supabase
    .from("bot")
    .select("*")
    .eq("b_code", BotCode); // ✅ เปิดใช้การกรองตรงนี้

  if (error) {
    console.error("Supabase error while checking BotCode:", error.message);
    return encodedRedirect("error", "/sign-up", "Error while checking BotCode");
  }

  // เช็คว่าไม่มีข้อมูลที่ตรงกับ BotCode
  if (!botuser || botuser.length === 0) {
    console.warn("Invalid BotCode. No match found in database.");
    return encodedRedirect(
      "error",
      "/sign-up",
      "Invalid BotCode. Please try again."
    );
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      // @ts-ignore (if boxCode is custom metadata, you may need to handle it in Supabase edge function)
      data: {
        username,
        boxCode: BotCode,
      },
    },
  });

  if (signUpError) {
    console.error(signUpError.code + " " + signUpError.message);
    return encodedRedirect("error", "/sign-up", signUpError.message);
  }

  return encodedRedirect("success", "/sign-up", "ขอบคุณสำหรับสมัครสมาชิก!");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const callbackUrl = formData.get("callbackUrl")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !username) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Email and username are required"
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const supabase = await createClient();

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/reset-password",
    "Password updated"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const updatePassword = async (formData: FormData) => {
  const supabase = await createClient();

  const cn_password = formData.get("cn_password") as string;
  const n_password = formData.get("n_password") as string;
  const o_password = formData.get("o_password") as string;

  if (n_password !== cn_password) {
    return encodedRedirect("error", "/setting", "รหัสผ่านไม่ตรงกัน");
  }

  // ดึง user ปัจจุบัน
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return encodedRedirect("error", "/sign-in", "กรุณาเข้าสู่ระบบอีกครั้ง");
  }

  // ยืนยันรหัสผ่านเก่า โดย sign in อีกครั้ง
  const {
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: o_password,
  });

  if (signInError) {
    return encodedRedirect("error", "/setting", "รหัสผ่านเดิมไม่ถูกต้อง");
  }

  // เปลี่ยนรหัสผ่านใหม่
  const { error: updateError } = await supabase.auth.updateUser({
    password: n_password,
  });

  if (updateError) {
    return encodedRedirect("error", "/setting", updateError.message);
  }

  return redirect("/setting");
};
