import { DatePicker } from "@fluentui/react";
import * as React from "react";

interface IDatePickerCompProps {
    label: string;
    onChangeHandler: (newValue) => void;
}
export const DatePickerComp = (props: IDatePickerCompProps) => {
    const { onChangeHandler } = props;
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        console.log("DatePickerComp: handleChange", newValue);
        setValue(newValue);
        if (onChangeHandler) onChangeHandler(newValue); // Pass state info to implementer
    };

    return (
        <DatePicker
            {...props}
            value={value}
            onSelectDate={handleChange}
        />
    );
};
