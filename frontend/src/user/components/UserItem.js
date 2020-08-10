import React, { useEffect, useState } from "react";
import axios from "axios";

const UserItem = ({ user }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    user.teams.forEach(async (teamId) => {
      const team = await axios.get(`http://localhost:3001/teams/${teamId}`);
      setTeams((teams) => [...teams, team.data.title]);
    });
  }, [user]);

  const teamsWithTags = teams.map((team, index) => (
    <span key={index} className="tag m-r-xs">
      {team}
    </span>
  ));

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
      <td>{teamsWithTags}</td>
      <td>{user.closedTasksCounter}</td>
    </tr>
  );
};

export default UserItem;
