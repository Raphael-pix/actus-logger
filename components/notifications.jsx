"use client"

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className={clsx(
          "p-2 rounded-lg transition-colors relative",
          showNotifications
            ? "bg-neutral-black text-neutral-white"
            : "text-neutral-black bg-transparent"
        )}
      >
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-sm border border-neutral-light-grey overflow-hidden z-50"
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2 text-neutral-black">
                Notifications
              </h3>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#4A4A4A] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {notifications.length === 0 ? (
                  <p className="text-lg font-semibold text-neutral-black text-center py-4">
                    No new notifications
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                    >
                      <div className="w-2 h-2 mt-2 bg-neutral-blatext-neutral-black rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-black">
                          {notification.title}
                        </p>
                        <p className="text-xs text-[#4A4A4A] mb-1">
                          {notification.time}
                        </p>
                        {notification.type === "project_request" && (
                          <div className="mt-2 space-y-2 bg-white p-3 rounded-lg text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">Client:</span>
                              <span className="font-medium text-neutral-black">
                                {notification.details.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">
                                Project Type:
                              </span>
                              <span className="font-medium text-neutral-black">
                                {notification.details.projectType}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">Budget:</span>
                              <span className="font-medium text-neutral-black">
                                {notification.details.budget}
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className="text-[#4A4A4A] block mb-1">
                                Description:
                              </span>
                              <p className="text-neutral-black">
                                {notification.details.description}
                              </p>
                            </div>
                            <div className="mt-2 pt-2 border-t border-[#D0D0D0]">
                              <Link
                                href="/admin/requests"
                                className="text-neutral-black hover:text-[#4A4A4A] text-sm font-medium"
                                onClick={() => setShowNotifications(false)}
                              >
                                View Details →
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
