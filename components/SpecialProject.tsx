import React from "react";
// import AdminpanelIMG from "../public/adminpanelimg.avif"
// import OnlineShop from "../public/OnlineShop.avif"
const topProjects = [
  {
    title: "فروشگاه آنلاین حرفه‌ای",
    description:
      "یک فروشگاه اینترنتی کامل با امکانات پیشرفته شامل سبد خرید، پنل مدیریت، درگاه پرداخت و طراحی واکنش‌گرا. این پروژه با Next.js و TailwindCSS ساخته شده و تجربه کاربری عالی دارد.",
    imageUrl: "/OnlineShop.avif",
    link: "#",
  },
  {
    title: "پنل مدیریت پیشرفته",
    description:
      "یک پنل مدیریت کامل برای کنترل کاربران، سفارشات و محتوا با طراحی مدرن و UX عالی. این پروژه با React و TypeScript ساخته شده و کاملا قابل توسعه است.",
    imageUrl: "/adminpanelimg.avif",
    link: "#",
  },
];

export default function FeaturedProjects() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen gap-6 p-6 ">
      {topProjects.map((project) => (
        <div
          key={project.title}
          className="flex flex-col justify-center items-center p-12 w-full md:w-1/2 bg-gray-50 rounded-3xl shadow-lg relative overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          {/* تصویر پروژه با opacity کم */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-10 rounded-3xl"
          />

          {/* محتوای روی کارت */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center">
            <h3 className="text-4xl font-semibold mb-6 text-gray-900">{project.title}</h3>
            <p className="text-lg mb-6 leading-relaxed text-gray-700">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              مشاهده آنلاین
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
