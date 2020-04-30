import React from "react";
import UserItem from "./UserItem";
import "./UserList.scss";
import ExelEmployee from "./ExcelEmployee";

const UserList = (props) => {
  const { users } = props;

  const usersList = users.map((user) => <UserItem key={user._id} user={user} />);

  return (
    <>
      <div>
        <ExelEmployee />
      </div>
      <table className="table table is-fullwidth">
        <thead>
          <tr className="table-head">
            <th></th>
            <th>NAME</th>
            <th>LOGIN EMAIL</th>
            <th>COUNTRY</th>
            <th>TEAMS</th>
            <th>CLOSED TASKS</th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
    </>
  );
};

export default UserList;
