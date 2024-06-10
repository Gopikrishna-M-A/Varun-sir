"use client";
import { Button } from "../components/ui/button";
import Image from "next/image";
import taxi from "/public/Frame 2.png";
import train from "/public/Frame 3.png";
import aircraft from "/public/Frame 4.png";
import bike from "/public/Frame 5.png";
import { Steps } from "antd";

const steps = [
  {
    title: "Step 1",
    content: "content",
  },
  {
    title: "Step 2",
    content: "content",
  },
  {
    title: "Step 3",
    content: "content",
  },
  {
    title: "Step 4",
    content: "content",
  },
  {
    title: "Step 5",
    content: "content",
  },
  {
    title: "Step 6",
    content: "content",
  },
  {
    title: "Step 7",
    content: "content",
  }
];

const items = steps.map((item) => ({
  key: item.title,
  title: item.title,
}));

import Link from "next/link";
function page() {
  return (
    <div className="w-full flex flex-col h-screen  p-36 gap-10">
      <div className="flex w-full">
        <div className="flex flex-col gap-2 w-1/2 h-full">
          <div className="hero-text text-3xl text-gray-700">
          <span className="">C</span>oherent Framework for <br />{" "}
          <span className="">I</span>ntegrating Systems Engineering <br />
          <span className="">A</span>nd Project Management Using Quality Function Deployment

          </div>
          <div className="hero-desc text-lg text-gray-500">
          Research Scholar - Abdulaziz Halawani
          </div>
          <Link href="/calculate" className="mt-5">
            <Button className="w-3/4" size="lg">Calculate</Button>
          </Link>
        </div>

        <div className="w-1/2 flex relative h-full items-center justify-center mt-20">
          <Image
            className="absolute right-80 top-0 transform rotate-2 cursor-pointer tras hover:translate-y-10 transition-all ease-in-out"
            src={taxi}
            alt="card"
            width={176}
          />
          <Image
            className="absolute right-52 top-7 transform rotate-2 cursor-pointer hover:translate-y-3 transition-all ease-in-out"
            src={train}
            alt="card"
            width={176}
          />
          <Image
            className="absolute right-28 top-0 transform rotate-12 cursor-pointer hover:translate-y-3 transition-all ease-in-out"
            src={aircraft}
            alt="card"
            width={176}
          />
          <Image
            className="absolute right-0 top-9 transform -rotate-12 cursor-pointer hover:translate-y-3 transition-all ease-in-out"
            src={bike}
            alt="card"
            width={176}
          />
        </div>
      </div>

      <div className="w-full flex  justify-between items-end">
      <div className=" text-muted-foreground mt-10 w-1/2">
      Follow the 10-step process for a comprehensive report on sustainability goals and passenger requirements
      <Steps
        className="my-2.5 w-full"
        type="inline"
        current={0}
        items={items}

      />
      </div>
      <Link href="mailto:gopikrishna6003@gmail.com"><Button variant='outline'>Contact Support</Button></Link>
      </div>

    </div>
  );
}

export default page;
