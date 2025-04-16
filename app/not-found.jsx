"use client"

import React from "react";
import { ArrowLeftFromLine, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="bg-neutral-black text-neutral-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="flex items-center gap-4 justify-center mb-4">
            <span className="text-[20rem] leading-[1] font-bold">4</span>
            <Ban size={260} color="#B3261E"/>
            <span className="text-[20rem] leading-[1] font-bold">4</span>
          </div>

          <h1 className="text-2xl mb-12 font-semibold">Oops, this page not found!</h1>

          <Button variant="primary" size="lg" className="bg-neutral-white text-neutral-black">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeftFromLine size={22} />
              <span className="px-4">Go back</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
