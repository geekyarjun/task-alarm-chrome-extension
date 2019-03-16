import React, {useState} from 'react';
import ScheduleAlarmContainer from './ScheduleAlarmContainer';
import BottomNavigation from './BottomNavigation';
import TasksContainer from './TasksContainer';

const App = () => {
    const [showAlarmsList, setAlarmView] = useState('Set Alarm');
    console.log('showAlarmsList', showAlarmsList);

    return (
        <div className="container">
            {
                showAlarmsList === 'Set Alarm'
                    ?   
                        <ScheduleAlarmContainer />
                    :
                        <TasksContainer />
            }
            <BottomNavigation 
                links={['Set Alarm', '|', 'Show Tasks']}
                className="bottomNavigation"
                onClick={setAlarmView}
                active={showAlarmsList}
            />
            <div id="snackbar">Alarm set</div>
        </div>
    );
};

export default App;