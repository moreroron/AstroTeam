import React from 'react'
import UserItem from './UserItem';
import './UserList.scss';
import EmployeeOfMonth from './EmployeeOfMonth';

const UserList = (props) => {

    const { users } = props;

    const usersList = users.map(user =>
        <UserItem key={user._id} user={user} />
    )

    return (
        <>
            <div>
                <EmployeeOfMonth />
            </div>
            <table className="table table is-fullwidth">
                <thead>
                    <tr className="table-head">
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
        </>
    )
}

export default UserList