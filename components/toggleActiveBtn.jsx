"use client";

import clsx from "clsx";
import { Power, PowerOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAdminStore } from "@/store/useAdminData";

const ToggleActiveBtn = ({ userId,isActive }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/toggle-active", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || `Failed to ${isActive ? "deactivate" : "activate"} account, please try again`);
        return;
      }

      toast.success(`User account ${isActive ? "deactivated" : "activated"} successfully`);
      router.refresh();
      useAdminStore.getState().fetchData();
    } catch (error) {
      toast.error(`Failed to ${isActive ? "deactivate" : "activate"} account, please try again`);
    } finally {
      setLoading(false);
    }
  };

  const confirmToggle = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to {isActive ? "deactivate" : "activate"} this user?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t)}
              className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t);
                handleToggle();
              }}
              className="text-xs px-2 py-1 rounded bg-foreground text-background cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
      }
    );
  };

  return (
    <button
      onClick={confirmToggle}
      className={clsx(
        "text-foreground flex items-center gap-1 rounded-sm p-2 space-x-2 cursor-pointer",
        loading ? "bg-muted opacity-50" : ""
      )}
      disabled={loading}
    >
      {isActive ? <PowerOff size={14} /> :  <Power size={14} />}
      <span className="text-sm font-medium">{isActive ? "Deactivate" : "Activate"}</span>
    </button>
  );
};

export default ToggleActiveBtn;
