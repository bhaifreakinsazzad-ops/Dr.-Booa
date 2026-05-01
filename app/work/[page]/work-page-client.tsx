"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { workDescription, workItems } from "../../lib/work-data";

function OtherWork() {
  return (
    <div className="container mx-auto">
      <h4 className="my-4 pl-10 text-lg font-semibold">Other Work</h4>
      <Swiper
        effect="coverflow"
        centeredSlides
        slidesPerView={1}
        loop
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {workItems.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/work/${item.id}`}>
              <div className="relative h-[40vh]">
                <Image src={item.image} fill alt={item.label} className="object-cover" />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function WorkDetails({ currentPage }: { currentPage: number }) {
  const item = workItems[currentPage];
  if (!item) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 lg:p-0">
      <div className="grid lg:grid-cols-2 gap-4 lg:mt-24">
        <div className="flex items-center lg:pl-12 relative">
          <div className="flex flex-col gap-2">
            <Link href="/">
              <button
                type="button"
                className="absolute top-0 bg-[#333333] text-white pl-4 pr-9 py-1 text-sm"
              >
                Back
              </button>
            </Link>
            <h4 className="text-lg font-semibold">{item.label.toUpperCase()}</h4>
            <p className="text-sm leading-6 text-justify lg:pr-20">{workDescription}</p>
          </div>
        </div>
        <div className="relative w-full h-[70vh] shadow-lg">
          <Image src={item.image} fill className="object-cover" alt={item.label} />
        </div>
      </div>
    </div>
  );
}

export default function WorkPageClient({ currentPage }: { currentPage: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="mb-20">
        <WorkDetails currentPage={currentPage} />
      </div>
      <OtherWork />
    </motion.div>
  );
}
