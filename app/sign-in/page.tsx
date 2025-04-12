import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="bg-[#ffffffb9] rounded-2xl shadow-lg p-8 w-full max-w-md">
        <form className="flex flex-col">
          <h1 className="text-2xl font-medium mb-2">เข้าสู่ระบบ</h1>
          <p className="text-sm text-foreground mb-6">
            ยังไม่มีบัญชี?{" "}
            <Link
              className="text-primary font-medium underline"
              href="/sign-up"
            >
              สมัครสมาชิก
            </Link>
          </p>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              อีเมล
            </Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

            {/* Password */}
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                รหัสผ่าน
              </Label>
              <Link
                className="text-xs text-gray-600 underline"
                href="/forgot-password"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="รหัสผ่านของคุณ"
              required
              className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

            <SubmitButton
              pendingText="เข้าสู่ระบบ..."
              formAction={signInAction}
              className="mt-4 text-white bg-black rounded-xl py-2 px-4 shadow-md hover:bg-primary/90 transition"
            >
              เข้าสู่ระบบ
            </SubmitButton>

            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
