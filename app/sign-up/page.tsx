import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../(auth-pages)/smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="bg-[#ffffffb9] rounded-2xl shadow-lg p-8 w-full max-w-md">
        <form className="flex flex-col">
          <h1 className="text-2xl font-medium mb-2">สมัครสมาชิก</h1>
          <p className="text-sm text-foreground mb-6">
            คุณมีบัญชีอยู่แล้ว?{" "}
            <Link
              className="text-primary font-medium underline"
              href="/sign-in"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
          <div className="flex flex-col gap-4">
            {/* username */}
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              ชื่อผู้ใช้
            </Label>
            <Input
              name="username"
              placeholder="username"
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

            {/* bot code */}
            <Label
              htmlFor="botCode"
              className="text-sm font-medium text-gray-700"
            >
              รหัสบอทของคุณ
            </Label>
            <Input
              name="BotCode"
              placeholder="botID"
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />


            {/* Email */}
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              อีเมล
            </Label>
            <Input
              name="email"
              placeholder="you@gmail.com"
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

            {/* Password */}
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="รหัสผ่านของคุณ"
              minLength={6}
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

            {/* Confirm Password */}
            <Label
              htmlFor="cPassword"
              className="text-sm font-medium text-gray-700"
            >
              ยืนยันรหัสผ่าน
            </Label>
            <Input
              name="cPassword"
              placeholder="ยืนยันรหัสผ่านคุณอีกครั้ง"
              minLength={6}
              type="password"
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

            <SubmitButton
              formAction={signUpAction}
              pendingText="Signing up..."
              className="mt-4 bg-primary text-black rounded-xl py-2 px-4 shadow-md hover:bg-primary/90 transition"
            >
              สมัครสมาชิก
            </SubmitButton>

            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
