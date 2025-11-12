import type { ReactNode } from "react";
import Logo from "../common/Logo";
import bgImage from "../../assets/images/bg-image.svg";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="bg-white grid grid-cols-[538px_1fr] h-screen"
      data-name="AuthLayout"
    >
      {/* Left Panel - Shared across all auth screens */}
      <div
        className="relative box-border content-stretch flex flex-col h-full items-center justify-between overflow-hidden px-0 py-12"
        data-name="LeftPanel"
      >
        <div
          className="absolute h-[1092px] left-[-355px] top-0 w-[1456px]"
          data-name="BackgroundImage"
        >
          <img alt="" className="block max-w-none size-full" src={bgImage} />
        </div>

        <Logo className="h-6 overflow-hidden relative shrink-0 w-[102px] z-10" />

        {/* Copyright */}
        <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none relative shrink-0 text-[#a2a2a2] text-base text-nowrap tracking-[0.024px] z-10">
          <p className="leading-[25.6px] whitespace-pre">
            © {new Date().getFullYear()} Redbiller. All rights reserved
          </p>
        </div>
      </div>

      {/* Right Panel - Content varies by screen */}
      <div
        className="bg-[#181A0E] box-border content-stretch flex flex-col gap-12 h-full items-center justify-center overflow-hidden p-[72px]"
        data-name="RightPanel"
      >
        {children}
      </div>
    </div>
  );
}
