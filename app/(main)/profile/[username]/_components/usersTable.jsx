
import { usersColumns } from "@/components/ui/columns";
import { UsersDataTable } from "@/components/ui/users-table";


export default function UsersTable({data}) {

  return (
    <div className="container mx-auto py-4">
      <UsersDataTable columns={usersColumns} data={data} />
    </div>
  );
}
