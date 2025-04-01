
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminProfile({ size = "lg" }) {
  // Conditional styling based on size prop
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
      <button
        onClick={() => console.log("user profile")}
        className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-lg w-full"
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
            Admin
          </motion.p>
          <motion.p
            animate={{ opacity: 1, width: "auto" }}
            className="text-xs font-medium whitespace-nowrap"
          >
            admin
          </motion.p>
        </motion.div>
      </button>
    </div>
  );
}
