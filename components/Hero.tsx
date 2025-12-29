import Image from "next/image";
import Arrow from "../public/icons/Bottom Alignment.svg";
import GithubIcon from "../public/icons/github.svg";
import Linkedin from "../public/icons/linkedin.svg";
import Twitter from "../public/icons/twitter.svg";

export default function Hero() {
  return (
    <div>
      <h1 className="text-[46px]">Masoud Jafari</h1>
      <h2 className="text-[22px] text-[#A3ABB2]">Software Engineer </h2>
      <div className="flex flex-row  gap-3">
        <Image src={GithubIcon} width={34} height={34} alt="Github icon " />
        <Image src={Linkedin} width={34} height={34} alt="Linkedin icon " />
        <Image src={Twitter} width={34} height={34} alt="Linkedin icon " />
      </div>
      <p>3 Years of work experience</p>
      <p>0 Completed projects</p>
      <p>2 Satisfied customers</p>
      <div className="flex flex-row gap-4">
        <button className="w-60 h-15 hover:cursor-pointer bg-[#FFE071] text-black rounded-2xl hover:text-[#A3ABB2] flex flex-row justify-center items-center p-2">
          Download CV
          <Image src={Arrow} width={34} height={34} alt="Linkedin icon " />
        </button>
        <button className="w-60 h-15 hover:cursor-pointer bg-[#171F26]  rounded-2xl hover:text-[#A3ABB2] p-2">
          Contact me
        </button>

        <button></button>
      </div>
    </div>
  );
}
