"use client"
import { Button } from "../components/ui/button"
import Image from "next/image"
import background from "/public/bg.jpg"

import Link from "next/link"
function page() {
  return (
    <div className='flex flex-col'>
      <main className='flex-1'>
        <section className='w-full py-16'>
          <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Coherent Framework for Integrating Systems Engineering And
                Project Management Using Quality Function Deployment
              </h1>
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Research Scholar - Abdulaziz Halawani
              </p>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link
                  href='/calculate'
                  className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  prefetch={false}>
                  Start
                </Link>
              
              </div>
            </div>
            <Image
              src={background}
              width='640'
              height='480'
              alt='Survey and Analytics'
              className='mx-auto aspect-[4/3] overflow-hidden rounded-xl object-contain object-center sm:w-full'
            />
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-muted-foreground'>
          &copy; 2024 All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link
            href='#'
            className='text-xs hover:underline underline-offset-4'
            prefetch={false}>
            Terms of Service
          </Link>
          <Link
            href='#'
            className='text-xs hover:underline underline-offset-4'
            prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default page
