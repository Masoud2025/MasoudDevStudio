import React from "react";

export default function AboutMe() {
  return (
    <div className="flex justify-center items-center h-[45em] p-4">
      <div className="relative border-2 border-gray-400 rounded-2xl p-12 max-w-3xl w-full">
        {/* علامت نقل قول بالا */}
        <span className="text-8xl text-gray-300 absolute -top-10 -left-10">“</span>

        {/* متن */}
        <p className="text-lg text-gray-800 leading-relaxed  text-right">
          م. همیشه به دنبال مسیرهای جدید هستم و هیچ چیزی نمی‌توان
          جلوی انگیزه و انرژی من را بگیرد. مهارت‌های زیادی دارم و هر روز تلاش می‌کنم
          بهتر شوم. کار تیمی و رهبری از ویژگی‌های اصلی من است. عاشق یادگیری سریع
          و حل مشکلات پیچیده هستم. وقتی هدفی دارم، تا رسیدن به آن متوقف نمی‌شوم.
          خلاقیت و جسارت همیشه مرا متمایز می‌کند. از هر تجربه‌ای درس می‌گیرم و
          همیشه آماده‌ی چالش‌های جدید هستم. هیچ چیز نمی‌تواند اشتیاق من را کاهش دهد.
          من خفن قهرماننه و هیچ وقت دست از تلاش برنمی‌دارم.
        </p>

        {/* علامت نقل قول پایین */}
        <span className="text-8xl text-gray-300 absolute -bottom-10 -right-10">”</span>
      </div>
    </div>
  );
}
