"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {useUserProfile} from "@/store/useUserProfile"


const AdminProfile = ({ size = "lg" }) => {
  const {profile} = useUserProfile();
  const router = useRouter();
 
  const profileSizes = {
    sm: {
      imageSize: 30,
      imageClass: "w-6 h-6",
      textSize: "text-sm",
    },
    lg: {
      imageSize: 40,
      imageClass: "w-8 h-8",
      textSize: "text-lg",
    },
  };

  const { imageSize, imageClass, textSize } =
    profileSizes[size] || profileSizes.lg;

  return (
    <div className="mt-auto mb-2">
      {profile ? (
        <button
          onClick={() => router.push(`/profile/${profile.username}?tab=profile`)}
          className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-lg w-full cursor-pointer"
        >
          <Image
            src="/assets/images/profile.jpg"
            alt="Admin Profile"
            width={imageSize}
            height={imageSize}
            className={`${imageClass} rounded-full object-cover`}
          />
          <motion.div className="text-left">
            <motion.p
              animate={{ opacity: 1, width: "auto" }}
              className={`font-semibold ${textSize} whitespace-nowrap`}
            >
              {profile.username}
            </motion.p>
            <motion.p
              animate={{ opacity: 1, width: "auto" }}
              className="text-xs text-muted-foreground lowercase font-light whitespace-nowrap"
            >
              {profile.role === "Admin" ? "admin" : "" }
            </motion.p>
          </motion.div>
        </button>
      ) : (
        <Button variant="default" size="sm" onClick={()=>router.push("/sign-in")} className="cursor-pointer">
          Login
        </Button>
      )}
    </div>
  );
};

export default AdminProfile;
