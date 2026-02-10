"use client";

import { Menu, TextAlignStart, User, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 bg-white relative">
      {/* ===== Top Row ===== */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Right Side (Login Button - moved) */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Login Button */}
            <button className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all duration-300 text-sm">
              ورود | ثبت نام
              <User size={18} />
            </button>
          </div>

          {/* Left Side (Logo - swapped position) */}
          <div>
            <Image
              src={Logo}
              width={70}
              height={70}
              alt="Logo"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* ===== Desktop Menu ===== */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ul className="flex items-center gap-8 py-4 text-sm font-medium">
            <li className="flex items-center gap-2 cursor-pointer hover:text-black text-gray-600 transition">
              دسته بندی
              <TextAlignStart size={18} />
            </li>
            <li className="cursor-pointer hover:text-black text-gray-600 transition">
              خانه
            </li>
            <li className="cursor-pointer hover:text-black text-gray-600 transition">
              فروشگاه
            </li>
            <li className="cursor-pointer hover:text-black text-gray-600 transition">
              بلاگ
            </li>
            <li className="cursor-pointer hover:text-black text-gray-600 transition">
              تماس با ما
            </li>
            <li className="cursor-pointer hover:text-black text-gray-600 transition">
              درباره ما
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Mobile Slide Menu ===== */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 md:hidden z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold">منو</span>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
          <li className="flex items-center gap-2">
            دسته بندی
            <TextAlignStart size={18} />
          </li>
          <li>خانه</li>
          <li>فروشگاه</li>
          <li>بلاگ</li>
          <li>تماس با ما</li>
          <li>درباره ما</li>
        </ul>

        <div className="p-6 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl">
            ورود | ثبت نام
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
}
