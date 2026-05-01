"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const testimonials = [
  {
    title: "Speechless with how easy this was to integrate",
    lines: [
      "I recently got my hands on Flowbite Pro, and holy crap, Im speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme.",
      "Flowbite has code in one place and I am not joking when I say it took me a matter of minutes to copy the code, customize it and integrate within a Laravel + Vue application.",
      "If you care for your time, I hands down would go with this.",
    ],
  },
  {
    title: "Life Changing",
    lines: [
      "Legit Gave her 5000 DEEERHAMS , and she moved one book from one shelf and put it in the middle of THE SAME SHELF",
      "changed my life",
      "If you care for your time, I hands down would go with this.",
    ],
  },
];

function ScrollDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      className="w-10 h-10 stroke-slate-500 hover:opacity-80 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function AboutTop() {
  return (
    <div className="px-4 lg:px-0 mx-auto pt-2">
      <div className="grid lg:grid-cols-2">
        <div className="w-full pt-[85%] relative">
          <Image
            src="/images/yusra.jpeg"
            alt="about-me"
            fill
            className="object-cover"
          />
        </div>
        <div className="lg:px-10 py-6 lg:py-24 max-w-2xl relative">
          <div className="flex flex-col">
            <p className="text-xl font-bold">Yusra Ismail</p>
            <p className="mb-2 text-base font-thin text-gray-500">
              Art & Decor consultant
            </p>
            <Link href="/contact">
              <button
                type="button"
                className="w-fit bg-[#333333] pl-4 pr-8 text-white mb-3"
              >
                Hire Me
              </button>
            </Link>
            <div className="lg:pr-40 flex flex-col gap-2 mb-6">
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
                sequi ex repudiandae dignissimos suscipit quasi unde autem at,
                sunt quis. Odit soluta voluptatum earum totam nesciunt excepturi,
                tempore consequatur illo?
              </p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
                sequi ex repudiandae dignissimos suscipit quasi unde autem at,
                sunt quis. Odit soluta voluptatum earum totam nesciunt excepturi,
                tempore consequatur illo?
              </p>
            </div>
            <div className="flex gap-4 text-xs font-semibold font-sans text-gray-400 mb-12">
              <p>#one</p>
              <p>#one</p>
              <p>#one</p>
              <p>#one</p>
              <p>#one</p>
              <p>#one</p>
            </div>
            <p className="mb-1">Contact</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:Yusra.m.ismael@gmail.com">
                <p className="italic hover:opacity-80 transition">
                  Yusra.m.ismael@gmail.com
                </p>
              </a>
              <a
                href="https://www.linkedin.com/in/yusra-ismael-49a154208/?originalSubdomain=ae"
                className="inline-flex w-fit bg-[#333333] text-white px-4 py-2 text-sm hover:opacity-90"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <motion.a
              href="#test"
              initial={{ y: -100, x: -200 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute right-0 translate-y-[-50%] translate-x-[-300%] bottom-0"
            >
              <ScrollDownIcon />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      id="test"
      className="bg-white"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-2xl tracking-tight font-bold text-gray-900">
            Testimonials
          </h2>
          <p className="mb-8 font-light text-gray-500 lg:mb-16">
            What people say about Meet Yusra
          </p>
        </div>
        <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
          {testimonials.map((item, itemIndex) => (
            <figure
              key={`${item.title}-${itemIndex}`}
              className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r"
            >
              <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                {item.lines.map((line, lineIndex) => (
                  <p className="my-4" key={`${item.title}-${lineIndex}`}>
                    {line}
                  </p>
                ))}
              </blockquote>
            </figure>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/contact"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <AboutTop />
      <Testimonials />
    </motion.div>
  );
}
