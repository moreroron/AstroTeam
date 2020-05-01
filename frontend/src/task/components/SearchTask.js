import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import moment from "moment";

// date picker
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

const SearchTask = (props) => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState();

  const [filteredByKeyword, setFilteredByKeyword] = useState([]);
  const [filteredByStatus, setFilteredByStatus] = useState([]);
  const [filteredByDate, setFilteredByDate] = useState([]);
  const [isKeywordEmpty, setIsKeywordEmpty] = useState(true);
  const [isAllStatuses, setIsAllStatuses] = useState(true);
  const [isAllDates, setIsAllDates] = useState(true);

  const [filteredTasks, setFilteredTasks] = useState([]);

  const [calToggle, setCalToggle] = useState("");
  const [cal, setCal] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [hideCancelFilterBtn, setHideCancelFilterBtn] = useState("is-hidden");

  useEffect(() => {
    const reverseOrder = props.tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTasks(reverseOrder);
    setFilteredTasks(reverseOrder);
  }, [props.tasks]);

  // finalCut
  useEffect(() => {
    const finalFilteredTasks = tasks.filter((task) => {
      let taskByKeyword = filteredByKeyword.find((t) => t._id === task._id);
      let taskByStatus = filteredByStatus.find((t) => t._id === task._id);
      let taskByDate = filteredByDate.find((t) => t._id === task._id);

      // console.log("taskByKeyword", taskByKeyword);
      // console.log("taskByStatus", taskByStatus);
      // console.log("taskByDate", taskByDate);

      let taskIdByKeyword = taskByKeyword === undefined ? 0 : taskByKeyword._id;
      let taskIdByStatus = taskByStatus === undefined ? 0 : taskByStatus._id;
      let taskIdByDate = taskByDate === undefined ? 0 : taskByDate._id;

      // console.log("filteredIdByKeyword", taskByKeyword);
      // console.log("taskIdByKeyword", task._id);

      console.log("isKeywordEmpty", isKeywordEmpty);
      console.log("isAllStatuses", taskIdByStatus === task._id || isAllStatuses);
      console.log("isAllDates", isAllDates);

      return (taskIdByKeyword === task._id || isKeywordEmpty) && (taskIdByStatus === task._id || isAllStatuses) && (taskIdByDate === task._id || isAllDates);
    });

    setFilteredTasks(finalFilteredTasks);
    console.log("finalFilteredTasks", finalFilteredTasks);
  }, [filteredByKeyword, filteredByStatus, filteredByDate, isKeywordEmpty, isAllStatuses, isAllDates]);

  const handleChange = (e) => {
    // empty search box - return all tasks
    const filteredByKeyword = e.target.value === "" ? [...tasks] : [...tasks.filter((task) => task.title.includes(e.target.value))];
    setFilteredByKeyword([...filteredByKeyword]);
    // word entered - return users contains the word in their username
    const isKeywordEmpty = e.target.value === "" ? true : false;
    setIsKeywordEmpty(isKeywordEmpty);
  };

  const handleStatusChange = (e) => {
    // 'All' is selected - return all tasks
    const filteredByStatus = e.target.value === "all" ? [...tasks] : [...tasks.filter((task) => task.status === e.target.value)];
    setFilteredByStatus([...filteredByStatus]);
    // word entered - return users contains the word in their username
    const isAllStatuses = e.target.value === "" ? true : false;
    setIsAllStatuses(isAllStatuses);
  };

  const handleDateChange = (e) => {
    let filteredTasks = tasks.sort((a, b) => {
      if (e.target.value === "new") return new Date(b.date) - new Date(a.date);
      else if (e.target.value === "old") return new Date(a.date) - new Date(b.date);
    });
    setDate(e.target.value);
    // setTasks(filteredTasks);
  };

  const handleCal = (item) => {
    setCal([item.selection]);
    const start = item.selection.startDate;
    const end = item.selection.endDate;

    const filteredByDate = tasks.filter((task) => moment(task.deadline).isBetween(start, end));
    setFilteredByDate(filteredByDate);
    setIsAllDates(false);

    if (filteredByDate.length) setHideCancelFilterBtn("");
  };

  const handleCalToggle = () => {
    if (!calToggle) setCalToggle("is-active");
    else setCalToggle("");
  };

  return (
    <>
      <div className="box">
        <div className="columns">
          <div className="column is-narrow">
            <div className="field">
              <label className="label">Search Task</label>
              <div className="control has-icons-right">
                <input onChange={handleChange} className="input" type="text" placeholder="find task" />
                <span className="icon is-right">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="column is-narrow">
            <label className="label">By Status</label>
            <div className="select">
              <select onChange={handleStatusChange}>
                <option value="all">ALL</option>
                <option value="open">OPEN</option>
                <option value="bug">BUG</option>
                <option value="closed">CLOSED</option>
              </select>
            </div>
          </div>

          <div className="column is-narrow">
            <div className="label">
              <div className="level">
                <div className="level-left">By Deadline</div>
                <div className="level-right">
                  <button
                    onClick={() => {
                      setFilteredByDate(tasks);
                      setHideCancelFilterBtn("is-hidden");
                    }}
                    className={hideCancelFilterBtn}
                    style={{ paddingRight: "0.2em", paddingLeft: "0.2em", cursor: "pointer" }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-times"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className={calToggle + " dropdown is-right"}>
              <div className="dropdown-trigger">
                <button onClick={handleCalToggle} className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                  <span>Pick Dates</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <DateRange editableDateInputs={false} onChange={handleCal} moveRangeOnFirstSelection={false} ranges={cal} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-narrow">
            <label className="label">Order</label>
            <div className="select">
              <select value={date} onChange={handleDateChange}>
                <option value="new">NEW</option>
                <option value="old">OLD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <TaskList tasks={filteredTasks} />
    </>
  );
};

export default SearchTask;
