import Image from "next/image";

import Picture from "./assets/picture.jpg";
import Login from "./UI/Components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center gap-2 p-[10px]">
      <Image src={Picture} alt="image" className="h-[550px] w-1/2" />
      <Login />
    </main>
  );
}
