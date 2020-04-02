import React from "react";

const UserItem = props => {
  const { user } = props;

  return (
    <tr>
      <th>
        <figure className="image is-32x32">
          <img className="is-rounded" src={user.avatar} alt={user.username} />
        </figure>
      </th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.country}</td>
      <td>{user.closedTasksCounter}</td>
    </tr>
  );
};

export default UserItem;
