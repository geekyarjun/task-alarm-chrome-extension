import React, {forwardRef} from 'react';
import Input from './Input';
import Select from './Select';

const InputSelect = forwardRef(({inputPlaceHolder, inputValue, inputOnchange, selectValue, selectOnchange }, ref) => (
    <div className="inputSelect" ref={ref}>
        <Input 
            type="number"
            placeholder={inputPlaceHolder}
            name="minsecTime"
            value={inputValue}
            onChange={inputOnchange}
        />
        <Select 
            name="minsec"
            options={["s", "m"]}
            value={selectValue}
            onChange={selectOnchange}
        />
    </div>
));

export default InputSelect;