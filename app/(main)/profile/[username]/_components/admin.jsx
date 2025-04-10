"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import UsersTab from "./admin-tabs/users";
import ReportsTab from "./admin-tabs/reports";
import LocationsTab from "./admin-tabs/locations";
import clsx from "clsx";

const AdminTab = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin-data", {
          method: "GET",
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  {
    if (!loading && !data) {
      return (
        <p className="text-sm text-muted-foreground">No data available.</p>
      );
    }
  }

  return (
    <div className="bg-background rounded-lg overflow-hidden">
      <div className="flex items-center gap-4 justify-between">
        <h1 className="text-lg font-medium">Your controls</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 capitalize bg-foreground text-background hover:bg-foreground hover:text-background"
            >
              {activeTab} <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["users", "reports", "sites"].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setActiveTab(option)}
                className={clsx(
                  "capitalize ",
                  option === activeTab && "bg-foreground text-background"
                )}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <main className="">
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {activeTab === "users" && <UsersTab users={data.users} />}

            {activeTab === "reports" && <ReportsTab reports={data.reports} />}

            {activeTab === "sites" && <LocationsTab sites={data.locations} />}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminTab;
