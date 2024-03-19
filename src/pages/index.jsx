import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import {invoke} from "@tauri-apps/api/tauri"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [helloMsg, setHelloMsg] = useState('')

  useEffect(() => {
    invoke('say_hello').then(result => {
      setHelloMsg(result)
    })
  }, [])

  return (
    <div className="text-xl">
      {helloMsg}
    </div>
  );
}
