'use client'
import React, { useEffect, useState } from "react";
import { LinkedinFilled, GithubOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Tag } from "antd";
import axios from "axios";



const Nav = () => {
  const [serverStatus, setServerStatus] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    // Send GET request to your Flask server
    axios
      .get(baseURL)
      .then((response) => {
        // If request succeeds, set server status to "Server running"
        setServerStatus(true);
      })
      .catch((error) => {
        // If request fails, set server status to "Server not running"
        setServerStatus(false);
      });
  }, []);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
        <div>
            {serverStatus ? (
              <Tag bordered={false} color="success">
                Server running
              </Tag>
            ) : (
              <Tag bordered={false} color="error">
                Server not running
              </Tag>
            )}
          </div>
        </nav>
      </header>
  );
};

export default Nav;


function MountainIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}
