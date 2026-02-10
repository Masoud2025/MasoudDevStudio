"use client";

import { useEffect, useState } from "react";

export default function TopAnnouncement() {
  const messages = [
    "کد تخفیف ویژه روز پدر فعال شد — ۲۰٪ تخفیف روی همه محصولات",
    "پیشنهاد خاص روز مادر — ارسال رایگان فقط امروز",
    "جشنواره شب یلدا — تخفیف محدود تا پایان امشب",
    "فروش ویژه ساعت‌های لوکس — موجودی محدود",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-11 bg-rose-400 text-white z-[100] overflow-hidden">
      
      {/* دسکتاپ */}
      <div className="hidden md:flex h-full items-center relative">
        
        {/* متن ثابت سمت چپ */}
        <div className="absolute left-4 font-semibold whitespace-nowrap">
          اطلاعیه‌های مهم
        </div>

        {/* متن متغیر وسط */}
        <div className="w-full flex justify-center px-24">
          <p
            key={index}
            className="text-center transition-all duration-500 ease-in-out"
          >
            {messages[index]}
          </p>
        </div>
      </div>

      {/* موبایل */}
      <div className="flex md:hidden h-full items-center justify-center px-4">
        <p
          key={index}
          className="text-center text-sm transition-all duration-500 ease-in-out"
        >
          {messages[index]}
        </p>
      </div>
    </div>
  );
}
