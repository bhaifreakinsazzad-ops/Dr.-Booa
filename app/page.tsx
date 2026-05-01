"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { workItems } from "./lib/work-data";

function WorkCard({ id, image, label }: { id: number; image: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${id}`}>
      <div
        className="w-full h-60 relative mt-2 overflow-hidden cursor-pointer shadow-md"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={image}
          alt={label}
          fill
          className={`object-cover transition ease-linear ${
            hovered ? "scale-[1.1]" : ""
          }`}
        />
        <div
          className={`absolute w-full h-full bg-black bg-opacity-75 transition ease-linear text-white flex justify-center items-center ${
            hovered ? "translate-y-[0]" : "translate-y-[-100%]"
          }`}
        >
          <p>{label}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="pb-4">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid lg:grid-cols-3 gap-4">
          {workItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <WorkCard id={item.id} image={item.image} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
