"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { title: "Projects", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#333333] text-white py-2">
      <div className="lg:hidden">
        <div className="w-full h-full py-2">
          <div className="fixed w-full h-8 lg:px-0 z-[9] top-0 bg-[#333333] pt-1 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <p>NavbarMobile</p>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  aria-label="Toggle menu"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`fixed w-screen h-screen bg-[#333333] z-[1] transition duration-300 ease-linear ${
              open ? "translate-y-0" : "translate-y-[-120%]"
            }`}
          >
            <div className="flex flex-col items-center gap-8 justify-center w-full mt-24">
              {navLinks.map((item) => (
                <div className="relative" key={item.href}>
                  {pathname === item.href && (
                    <motion.span
                      id="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-0 block h-[1px] w-full bg-white"
                    />
                  )}
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-2xl text-center">Yusra mam-Gogh</h4>
            <div className="flex items-center gap-8 justify-center w-full">
              {navLinks.map((item) => (
                <div className="relative" key={item.href}>
                  {pathname === item.href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute top-full left-0 block h-[1px] w-full bg-white"
                    />
                  )}
                  <Link href={item.href}>{item.title}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
