import React from "react";
import UsersTable from "../usersTable"


const UsersTab = ({users}) => {
  return (
    <UsersTable data={users}/>
  );
};

export default UsersTab;
