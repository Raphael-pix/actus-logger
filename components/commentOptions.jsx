"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const CommentComponent= ({ row, getValue,options,onUpdate }) => {
  const [comment, setComment] = useState(getValue() || '');
  const handleSelectComment = async (selectedComment) => {
    try {  
      setComment(selectedComment);
      onUpdate(row.original.id,selectedComment);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 capitalize">
          {comment} <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleSelectComment(option)}
            className="capitalize"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentComponent;
