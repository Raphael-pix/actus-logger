import react, { useState } from "react";
import { getUsersColumns, usersColumns } from "@/components/ui/columns";
import { UsersDataTable } from "@/components/ui/users-table";

export default function UsersTable({ data }) {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="container mx-auto py-4">
      <UsersDataTable columns={getUsersColumns(editOpen,setEditOpen)} data={data} />
    </div>
  );
}
