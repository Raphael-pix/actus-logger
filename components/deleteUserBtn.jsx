"use client";

import clsx from "clsx";
import { Delete } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAdminStore } from "@/store/useAdminData";

const DeleteUserBtn = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to delete user");
        return;
      }

      toast.success("User deleted successfully");
      router.refresh();
      useAdminStore.getState().fetchData();
    } catch (error) {
      toast.error("Failed to delete user, please try again");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this user?</p>
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
                handleDelete();
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
      onClick={confirmDelete}
      className={clsx(
        "text-destructive flex items-center gap-1 rounded-sm p-2 space-x-2 cursor-pointer",
        loading ? "bg-muted opacity-50" : ""
      )}
      disabled={loading}
    >
      <Delete size={14} />
      <span className="text-sm font-medium">Delete</span>
    </button>
  );
};

export default DeleteUserBtn;
