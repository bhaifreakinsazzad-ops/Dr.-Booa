"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type ContactFormData = {
  subject: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialFormData: ContactFormData = {
  subject: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Unable to submit contact form.");
      }

      setStatus("success");
      setFormData(initialFormData);
      setStatusMessage(
        result.message ?? "Thanks. Your message has been sent successfully.",
      );
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="px-4 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl text-xs font-thin mx-auto mt-10 lg:mt-24 shadow-lg px-6 rounded-md pt-4 pb-6 bg-white"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-sm mb-4">Ready To Start?</h2>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              placeholder="Example: Decor consultation"
              className="border-b w-full focus:outline-none text-gray-500"
              type="text"
              required
              minLength={3}
              maxLength={120}
              value={formData.subject}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, subject: event.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              placeholder="Example: name@email.com"
              className="border-b w-full focus:outline-none text-gray-500"
              type="email"
              required
              maxLength={254}
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              placeholder="Example: +971552289194"
              className="border-b w-full focus:outline-none text-gray-500"
              type="tel"
              maxLength={40}
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="font-bold" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Tell us what you need help with..."
              className="shadow-lg h-40 focus:outline-none p-2"
              required
              minLength={10}
              maxLength={4000}
              value={formData.message}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, message: event.target.value }))
              }
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, website: event.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#333333] pl-4 pr-6 py-1 text-white cursor-pointer disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-green-700 text-sm">{statusMessage}</p>
          )}

          {status === "error" && (
            <p className="mt-4 text-red-700 text-sm">
              {statusMessage || "We could not send your message. Please try again."}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
