import React from "react";

import * as AC from "adaptivecards";
//import { DatePickerComp } from "../components/DatePicker";
import { DatePicker, DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
import { reactDomRender } from "./shared";

export class CustomDateInput extends AC.CardElement {
    static readonly JsonTypeName = "CustomDateInput";

    static readonly titleProperty = new AC.StringProperty(AC.Versions.v1_0, "title", true);
    static readonly valueProperty = new AC.StringProperty(AC.Versions.v1_0, "value");

    protected internalRender(): HTMLElement | undefined {
        console.log(`DateInput init:${this.value}; data type: ${typeof this.value}`);
        const d1 = new Date(Date.parse(this.value));
        //const d2 = Date.;
        console.log(`d1: ${d1.toLocaleDateString()};`);
        console.log(`test: ${new Date(2024, 7, 1).toLocaleDateString()}`)

        const ret = reactDomRender(
            <div>
                {/* <div>test date picker</div> */}
                <DatePicker firstDayOfWeek={DayOfWeek.Sunday}
                    placeholder="Select a date..."
                    ariaLabel="Select a date"
                    strings={defaultDatePickerStrings}
                    value={d1}
                    label={this.title}
                    onSelectDate={(e) => this.onChange(e)} />
            </div>

        );
        console.log("ret", ret);
        return ret;
    }
    getJsonTypeName(): string {
        //throw new Error("Method not implemented.");
        return CustomDateInput.JsonTypeName;
    }

    // For form submission
    private _value;
    //@AC.property(CustomDateInput.valueProperty)
    @AC.property(new AC.StringProperty(AC.Versions.v1_0, "value", true))
    public get value(): any {
        //return this._value;
        console.log("get value", this.getValue(CustomDateInput.valueProperty));
        return this.getValue(CustomDateInput.valueProperty);
    }
    set value(value: Date) {
        console.log("set value:", value);
        let adjustedValue = value;

        if (this.value !== adjustedValue) {
            this.setValue(CustomDateInput.valueProperty, adjustedValue);

            this.updateLayout();
        }
    }

    public isSet(): any {
        return this._value ? true : false;
    }
    protected onChange(newValue) {
        //this._value = newValue?.toString();
        this.value = newValue;
    }
    //@AC.property(CustomDateInput.titleProperty)
    @AC.property(new AC.StringProperty(AC.Versions.v1_0, "title", true))
    get title(): string | undefined {
        return this.getValue(CustomDateInput.titleProperty);
    }

    set title(value: string) {
        if (this.title !== value) {
            this.setValue(CustomDateInput.titleProperty, value);

            this.updateLayout();
        }
    }


    // render(): HTMLElement | undefined {
    //     return reactDomRender(this.renderElement());
    // }

    // private renderElement() {
    //     switch (this.id) {
    //         default:
    //             //return <DatePickerComp label="Date" onChange={(e) => this.onChange(e)} />;
    //             return <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder="Select a date..." ariaLabel="Select a date" strings={defaultDatePickerStrings} />
    //     }
    // }
}
