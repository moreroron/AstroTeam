import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const EmployeeOfMonth = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchedData = async () => {
            const { data } = await axios('http://localhost:3001/tasks');
            const filteredTasks = data.filter(task => {
                // only tasks which closed in current month
                return moment(task.closedDate).isSame(new Date(), 'month');
            });
            // find the user which his teams tasks closed the most
            // count for each user
            // ron: 3, coral: 4
            setTasks(filteredTasks);
        }

        fetchedData();
    }, []);

    console.log(tasks);

    return (<>aa</>)
}

export default EmployeeOfMonth