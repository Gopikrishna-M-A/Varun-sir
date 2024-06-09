import React from "react";
import { LinkedinFilled, GithubOutlined } from "@ant-design/icons";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-5 pr-32 pl-24 bg-white">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold cursor-pointer">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <div className="flex gap-5 justify-end">
          <Link href="https://www.linkedin.com/in/gopikrishna6003">
            <LinkedinFilled
              className=" cursor-pointer hover:-translate-y-1 transition-all"
              style={{ fontSize: "24px", color: "#000" }}
            />
          </Link>
          <Link href="https://github.com/Gopikrishna-M-A">
            <GithubOutlined
              className=" cursor-pointer hover:-translate-y-1 transition-all"
              style={{ fontSize: "24px", color: "#000" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
