import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const categoryId = params.id;

  const { error } = await supabase
    .from("category")
    .delete()
    .eq("id", categoryId);

  if (error) {
    console.error("Error deleting category:", error.message);
    return new Response("Failed to delete category", { status: 500 });
  }

  return redirect("/category");
}
