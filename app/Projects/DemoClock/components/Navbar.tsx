import { TextAlignStart, User } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      {/* ===== Top Row ===== */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Right Side (Logo) */}
          <div className="flex items-center">
            <Image
              src={Logo}
              width={80}
              height={80}
              alt="Logo"
              className="object-contain"
            />
          </div>

          {/* Left Side (Contact + Login) */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-right leading-tight">
              <p className="text-gray-600">نیاز به مشاوره داری؟</p>
              <span className="font-semibold text-gray-900">021-3456899</span>
            </div>

            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all duration-300 text-sm">
              ورود | ثبت نام
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ===== Bottom Row ===== */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ul className="flex items-center justify-center md:justify-start gap-8 py-4 text-sm font-medium">
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
    </nav>
  );
}
