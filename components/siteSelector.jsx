"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const SiteSelector = ({ row, getValue, options }) => {
  const [selectedSites, setSelectedSites] = useState(getValue() || []);

  const toggleSite = (site) => {
    let updatedSites = [];
    if (selectedSites.includes(site)) {
      updatedSites = selectedSites.filter((s) => s !== site);
    } else {
      updatedSites = [...selectedSites, site];
    }
    setSelectedSites(updatedSites);
    onUpdate(row.original.id, updatedSites);
  };

  const formatButtonLabel = () => {
    if (selectedSites.length === 0) return "Assign Sites";
    return selectedSites.join(", ");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {formatButtonLabel()} <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((site) => (
          <DropdownMenuCheckboxItem
            key={site}
            checked={selectedSites.includes(site)}
            onCheckedChange={() => toggleSite(site)}
            className="capitalize"
          >
            {site}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteSelector;
