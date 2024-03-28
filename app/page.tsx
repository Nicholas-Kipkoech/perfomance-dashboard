import Image from "next/image";

import Picture from "./assets/picture.jpg";
import Login from "./UI/Components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center gap-2 p-[10px] ">
      <Image src={Picture} alt="image" className="h-[500px] w-1/3" />
      <Login />
    </main>
  );
}
