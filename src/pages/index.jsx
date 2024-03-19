import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [helloMsg, setHelloMsg] = useState("");
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

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
                    onChange={(e) => {
                        setMsg(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            setMessages((msgs) => [...msgs, msg]);
                        }
                    }}
                />
                <div
                    className=" mx-4 btn btn-error btn-outline"
                    onClick={() => {
                        setMessages([
                            ...messages.slice(0, messages.length - 1),
                        ]);
                    }}
                >
                    Refresh State
                </div>
            </div>
            <div className="flex flex-col">
                <AnimatePresence>
                    {messages.map((message, index) => {
                        return (
                            <motion.div
                                className="m-2 bg-primary rounded-xl p-2 max-w-fit"
                                layout
                                key={index}
                                initial={{ x: 100 }}
                                animate={{ x:0 }}
                                exit={{ x: -200 }}
                            >
                                {message}{" "}
                                <div
                                    className=" btn-sm btn btn-error text-white"
                                    onClick={() => {
                                        const temp = messages;
                                        temp.splice(index, 1);
                                        setMessages([...temp]);
                                    }}
                                >
                                    x
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
