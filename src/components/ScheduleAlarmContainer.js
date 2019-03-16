import React, {useState} from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Logger from '../Utils/Logger';
import InputSelect from './InputSelect';

const ScheduleAlarmContainer = () => {
    const [task, setTask] = useState('');
    const [day, setDay] = useState('Today');
    const [time, setTime] = useState('');
    const [inputValue, inputOnchange] = useState('');
    const [selectValue, selectOnchange] = useState('s');
    const [showWarning, setWarning] = useState(false);

    const taskFieldRef = React.createRef();
    const timeFieldRef = React.createRef();

    const refs = {
        taskFieldRef,
        timeFieldRef
    };

    const handleSetAlarmbutton = () => {
        console.log('inputValue, selectValue', inputValue, selectValue);
        // chrome.alarms.clearAll();
        if (day === 'Today' || day === 'Tomorrow') {
            if (!task || !time) {
                const state = {
                    'taskFieldRef': task,
                    'timeFieldRef': time
                };
    
                Object.keys(state).map(key => {
                    if (!state[key]) {
                        let existingClasses = refs[key].current.className;
                        const classArray = existingClasses.split(' ');
                        if (classArray.indexOf('warning-vibration-animation') >= 0) {
                            classArray[classArray.indexOf('warning-vibration-animation')] = 'warning-vibration-animation-toggle';
                            // classArray.splice(classArray.indexOf('warning-vibration-animation'), 0, 'warning-vibration-animation-toggle');
                            Logger('classArray', classArray);
                            refs[key].current.className = `${classArray.join(' ')}`;
                        } else if (classArray.indexOf('warning-vibration-animation-toggle') >= 0) {
                            classArray[classArray.indexOf('warning-vibration-animation-toggle')] = 'warning-vibration-animation';
                            // classArray.splice(classArray.indexOf('warning-vibration-animation-toggle'), 0, 'warning-vibration-animation');
                            Logger('classArray', classArray);
                            refs[key].current.className = `${classArray.join(' ')}`;
                        } else {
                            refs[key].current.className = `${classArray.join(' ')} warning-vibration-animation`;
                        }
                    }
                })
                setTimeout(() => {
                    taskFieldRef.current.className = 'taskInputField';
                    timeFieldRef.current.className = 'inputTime';
                    console.log("Removed");
                }, 1000);
                return;
            } else if(day === 'Today') {
                let stringNewDate = String(new Date()); // it will return date as e.g Tue Feb 27 2019 11:10:45 GMT+0530 (India Standard Time)

                // to be made a function
                stringNewDate = stringNewDate.slice(0, stringNewDate.indexOf(new Date().getFullYear()) + 5) + time + ':00' + ' ' + stringNewDate.slice(stringNewDate.indexOf('GMT'));
                console.log('stringNewDate', stringNewDate);
                if(new Date(stringNewDate).getTime() < new Date().getTime()) {
                    console.log("Dfdsfdsfdsfdsf");
                    return;
                }
            }
        } else if (day === 'Recurring') {
            console.log("timeFieldRef.current", timeFieldRef.current);
            if (!task) {
                taskFieldRef.current.className = 'taskInputField warning-vibration-animation';
                setTimeout(() => {
                    taskFieldRef.current.className = 'taskInputField';
                    console.log("Removed");
                }, 1000);
                return;
            }

            if (!inputValue) {
                timeFieldRef.current.className = 'inputSelect warning-vibration-animation';
                setTimeout(() => {
                    timeFieldRef.current.className = 'inputSelect';
                    console.log("Removed");
                }, 1000);
                return;
            }

            if (inputValue < 5 && selectValue === 's') {
                setWarning(true);

                setTimeout(() => {
                    setWarning(false);
                }, 2000);

                return;
            }

        }

        switch (day) {

            case 'Today':

                let stringNewDate = String(new Date()); // it will return date as e.g Tue Feb 27 2019 11:10:45 GMT+0530 (India Standard Time)

                // to be made a function
                stringNewDate = stringNewDate.slice(0, stringNewDate.indexOf(new Date().getFullYear()) + 5) + time + ':00' + ' ' + stringNewDate.slice(stringNewDate.indexOf('GMT'));

                console.log('newDate', stringNewDate);

                chrome.alarms.create(task, {
                    when: new Date(stringNewDate).getTime()
                })
                break;

            case 'Tomorrow':
                let stringNextDayDate = String(new Date(Date.now() + 86400000)); // it will return date as e.g Tue Feb 27 2019 11:10:45 GMT+0530 (India Standard Time)

                // to be made a function
                stringNextDayDate = stringNextDayDate.slice(0, stringNextDayDate.indexOf(new Date().getFullYear()) + 5) + time + ':00' + ' ' + stringNextDayDate.slice(stringNextDayDate.indexOf('GMT'));

                console.log('nextDayDate', stringNextDayDate);
                chrome.alarms.create(task, {
                    when: new Date(stringNextDayDate).getTime()
                })
                break;

            case 'Recurring':
                // console.log('selectValue', selectValue, inputValue, typeof inputValue);
                if (selectValue === 'm') {
                    chrome.alarms.create(task, {
                        periodInMinutes: Number(inputValue)
                    })
                } else {
                    chrome.alarms.create(task, {
                        periodInMinutes: inputValue/60
                    })
                }

                break;

                /*
                case 'Everyday':
                    chrome.alarms.create({
        
                    })
                break; */

        }
        function showSnackBar() {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
        }

        showSnackBar();
    }

    return (
        <div className="scheduleAlarmContainer">
            <Input 
                type="text"
                placeholder="Task"
                name="task"
                value={task}
                onChange={setTask}
                ref={taskFieldRef}
                className="taskInputField"
            />
            <Select 
                name="day"
                options={["Today", "Tomorrow", "Recurring"]}
                value={day}
                onChange={setDay}
                className="daySelect"
            />
            {
                day === 'Recurring'
                    ?
                        <InputSelect 
                            inputValue={inputValue}
                            inputOnchange={inputOnchange} 
                            inputPlaceHolder="Time"
                            selectValue={selectValue}
                            selectOnchange={selectOnchange}
                            ref={timeFieldRef}
                        />
                    :
                        <Input 
                            type="time"
                            name="time"
                            value={time}
                            onChange={setTime}
                            className="inputTime"
                            ref={timeFieldRef}
                        />
            }
            {
                showWarning 
                    ?  
                        <div className="warningMessage">Time should be greater than 5 Seconds</div>
                    : 
                        <div className="warningMessage"></div>
            }
            <Button 
                name="setAlarmButton"
                value="Set Alarm"
                className="setAlarmButton"
                onClick={handleSetAlarmbutton}
            />
        </div>
    )
}

export default ScheduleAlarmContainer;