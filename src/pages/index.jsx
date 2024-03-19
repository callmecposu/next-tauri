import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [helloMsg, setHelloMsg] = useState("");
    const [myName, setMyName] = useState('')
    const [greetingMsg, setGreetingMsg] = useState('')

    useEffect(() => {
        invoke("say_hello").then((result) => {
            setHelloMsg(result);
        });
    }, []);

    return (
        <div className="m-4">
            <div className="text-xl mb-8">{helloMsg}</div>
            <div>
                <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                    onChange={(e) => {setMyName(e.target.value)}}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter'){
                        invoke('greet', {name: myName}).then(result => {
                          setGreetingMsg(result)
                        })
                      }
                    }}
                />
            </div>
            <div className="mt-8 w-full text-center text-3xl">{greetingMsg}</div>
        </div>
    );
}
