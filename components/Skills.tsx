import { GitBranchMinus } from "lucide-react";
import React from "react";
import { FaNodeJs } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiCss3, SiTailwindcss } from "react-icons/si";

const skills = [
  { name: "React", icon: <SiReact className="text-blue-500" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "CSS3", icon: <SiCss3 className="text-blue-700" /> },
  { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
  { name: "Git", icon: <GitBranchMinus className="text-orange-400" /> },

];

export default function Skills() {
  return (
    <div className="flex flex-col items-center h-[40em] p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">مهارت‌ها</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-xl p-8 hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            <div className="text-6xl mb-4">{skill.icon}</div>
            <span className="text-lg font-semibold text-gray-800">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
