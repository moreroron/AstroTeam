import React from 'react'
import UserItem from './UserItem';
import './UserList.scss';

const UserList = (props) => {

    const { users } = props;

    const usersList = users.map(user =>
        <UserItem key={user._id} user={user} />
    )

    return (
        <table className="table table is-fullwidth">
            <thead>
                <tr class="table-head">
                    <th></th>
                    <th>NAME</th>
                    <th>LOGIN EMAIL</th>
                    <th>COUNTRY</th>
                    <th>TASKS SUBMITED</th>
                </tr>
            </thead>
            <tbody>
                {usersList}
            </tbody>
        </table>
    )
}

export default UserList