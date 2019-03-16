import React, { useState, useEffect } from 'react';

const TasksContainer = () => {
    // let alarms = [];

    const [alarms, setAlarmsList] = useState([]);

    useEffect(() => console.log("IN COMPONENT DID MOUNT"));

    chrome.alarms.getAll((alarmsList) => {
        console.log('lalarms', alarmsList);
        // alarms = alarmsList;

        if (JSON.stringify(alarmsList) != JSON.stringify(alarms)) {
            setAlarmsList(alarmsList);
        }
    })

    const removeAlarm = (name) => {
        if (alarms.length) {
            setAlarmsList(alarms.filter(alarm => alarm.name !== name));
            chrome.alarms.clear(name);
        }
    }

    return (
        <div className="tasks-container">
            <ul>
               {
                    alarms.length
                        ?
                            alarms.map((alarm, index) => {
                                let scheduledTimeInMillS = alarm.scheduledTime;
                                let date = String(new Date(scheduledTimeInMillS));

                                return (
                                    <>
                                        <li key={index}>
                                            {alarm.name} at {date.slice(date.indexOf(new Date().getFullYear()) + 5, date.indexOf('GMT') - 1)}
                                            <img src="../delete.svg" onClick={(e) => {e.preventDefault(); removeAlarm(alarm.name)}} className="cross-button"/>
                                            {/* <span onClick={(e) => {e.preventDefault(); removeAlarm(alarm.name)}} className="cross-button">X</span> */}
                                        </li>
                                    </>
                                )
                            })
                        :
                            ''
               } 
            </ul>
        </div>
    );
};

export default TasksContainer;