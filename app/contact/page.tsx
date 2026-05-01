"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="px-4 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl text-xs font-thin mx-auto mt-10 lg:mt-24 shadow-lg px-6 rounded-md pt-4 pb-6 bg-white"
      >
        <form>
          <h2 className="text-sm mb-4">Ready To Start?</h2>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              placeholder="Example: Decore"
              className="border-b w-full focus:outline-none text-gray-500"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              placeholder="Example: BassamFoaud@gmail.com"
              className="border-b w-full focus:outline-none text-gray-500"
              type="email"
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              placeholder="Example: +971552289194"
              className="border-b w-full focus:outline-none text-gray-500"
              type="tel"
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="font-bold" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Dear Laddy Santa"
              className="shadow-lg h-40 focus:outline-none p-2"
            />
          </div>

          <input
            type="submit"
            value="Send"
            className="bg-[#333333] pl-4 pr-6 py-1 text-white cursor-pointer"
          />
        </form>
      </motion.div>
    </div>
  );
}
