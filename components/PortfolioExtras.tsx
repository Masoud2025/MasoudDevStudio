import React from "react";
import { SiReact, SiNextdotjs, SiTypescript } from "react-icons/si";

const timeline = [
  { year: "2023", event: "شروع یادگیری برنامه‌نویسی" },
  { year: "2024", event: "ساخت اولین پروژه شخصی" },
  { year: "2025", event: "توسعه پروژه‌های فول‌استک" },
  { year: "2026", event: "ساخت پورتفولیوی حرفه‌ای" },
];

const stats = [
  { label: "پروژه‌ها", value: 12 },
  { label: "سال تجربه", value: 3 },
  { label: "تکنولوژی‌ها", value: 6 },
];

export default function PortfolioExtras() {
  return (
    <div className="flex flex-col items-center w-full  p-8 space-y-20">
      {/* Timeline */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">مسیر حرفه‌ای من</h2>
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="absolute left-1/2 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center md:items-start md:w-1/4 mb-12 md:mb-0 ${
                index % 2 === 0 ? "md:text-right md:pr-6" : "md:text-left md:pl-6"
              }`}
            >
              <div className="bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
                {item.year}
              </div>
              <p className="text-gray-700 text-center md:text-left">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 p-8 rounded-2xl shadow-lg min-w-[120px] hover:scale-105 transition-transform duration-300"
          >
            <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
            <span className="text-gray-600 mt-2">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Personality / Fun Quote */}
      <div className="w-full max-w-4xl text-center bg-gray-50 p-12 rounded-3xl shadow-xl">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900">یه جمله از خودم</h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          من خفن قهرماننه. همیشه دنبال چالش‌های جدید هستم و از هر تجربه‌ای درس می‌گیرم.
          خلاقیت و جسارت همیشه مرا متمایز می‌کند و هیچ چیزی نمی‌تواند انگیزه‌ام را کاهش دهد.
        </p>
        <div className="flex justify-center gap-6 text-4xl text-gray-900">
          <SiReact />
          <SiNextdotjs />
          <SiTypescript />
        </div>
      </div>
    </div>
  );
}
