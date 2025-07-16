"use client";

import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("exam")) {
    return <></>;
  }

  return (
    <footer className="w-full flex items-center justify-center flex-col py-3">
      <div>Copyright &copy; CNCD. All rights reserved</div>
      <div>
        <Link className="" href="/terms">
          Điều khoản
        </Link>
        {" - "}
        <Link href="contact">Liên hệ</Link>
      </div>
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://heroui.com?utm_source=next-app-template"
        title="heroui.com homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">HeroUI</p>
      </Link>
    </footer>
  );
};
