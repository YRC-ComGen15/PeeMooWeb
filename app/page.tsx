import { signOutAction } from "./actions";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";

export default async function Home() {

  return (
    <>
      <Header />
      <div className="pt-[120px]">
        <h1>Home</h1>
      </div>
    </>
  );
}
