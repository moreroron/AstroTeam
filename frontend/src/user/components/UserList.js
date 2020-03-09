import React from 'react'
import UserItem from './UserItem';
import './UserList.scss';

const UserList = (props) => {

    const { users } = props;

    const usersList = users.map((user, index) =>
        <div key={index}>
            <div className="list-menu-item is-active" href="#">
                <UserItem user={user} />
            </div>
        </div>
    )

    return (
        <div>{usersList}</div>
    )
}

export default UserList