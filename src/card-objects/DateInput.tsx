import * as React from "react";
import * as AC from "adaptivecards";
import { DatePickerComp } from "../components/DatePicker";
import { reactDomRender } from "./shared";

export class DateInput extends AC.DateInput {
    static readonly JsonTypeName = "Input.Date";

    // For form submission
    private _value;
    public get value(): any {
        return this._value;
    }
    public isSet(): any {
        return this._value ? true : false;
    }
    protected onChange(newValue) {
        console.log("onChange:", newValue);
        this._value = newValue?.toString();
    }

    render(): HTMLElement | undefined {
        return reactDomRender(this.renderElement());
    }

    private renderElement() {
        console.log("DateInput-value:", this.getValue(AC.DateInput.valueProperty));
        console.log("DateInput-label:", this.getValue(AC.DateInput.idProperty));;
        switch (this.id) {
            default:
                return <DatePickerComp label="Due date" onChangeHandler={(e) => this.onChange(e)} />;
        }
    }
}
