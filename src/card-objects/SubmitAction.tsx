import * as React from "react";
import * as AC from "adaptivecards";
// import { ButtonComp } from "../components/Button";
import { reactDomRender } from "./shared";
import { PrimaryButton } from "@fluentui/react";

export class SubmitAction extends AC.SubmitAction {
    private internalRenderedElement: any;

    // Get the properites of the action
    static readonly textProperty = new AC.StringProperty(
        AC.Versions.v1_0,
        "text",
        true
    );

    static readonly titleProperty = new AC.StringProperty(
        AC.Versions.v1_0,
        "title",
        true
    );

    static readonly dataProperty = new AC.PropertyDefinition(
        AC.Versions.v1_0,
        "data"
    );

    getTitle(): string | undefined {
        return this.getValue(SubmitAction.titleProperty);
    }

    getText(): string | undefined {
        return this.getValue(SubmitAction.textProperty);
    }

    getData(): string | undefined {
        return this.getValue(SubmitAction.dataProperty);
    }

    getInputs(): any {
        return this.getValue(SubmitAction.associatedInputsProperty);
    }

    getInputValues(): any {
        return this.parent.getAllInputs().map((input) => {
            return { id: input.id, value: input.value };
        });
    }

    get renderedElement(): HTMLElement | undefined {
        return this.internalRenderedElement;
    }

    render() {
        const element = reactDomRender(this.renderElement());
        this.internalRenderedElement = element;
    }

    // Over write the execute function
    execute() {
        //super.execute();
        // Validate the inputs
        const inputs = this.validateInputs();
        console.log(inputs);
        if (inputs.length === 0) {
            console.log("inputs valid");
            const inputValues = this.getInputValues();
            console.log("input values", inputValues);
            // Do some fun API stuff
        } else {
            // Highlight bad fields
            for (const input of inputs) {
                // console.log("input", input);
                console.log("input id", input.id);
                console.log("isValid", input.isValid());
                this.render();
                //console.log("render", input.render());

                //input.render();
            }
        }
    }

    onExecuteAction(action) {
        console.log("onExecuteAction");
        action();
    }

    private renderElement = (): JSX.Element => {
        // TODO: Based on the style of button (i.e. positive/destuctive) may need to render differently
        //return <ButtonComp label={this.title} onClick={() => this.execute()} />;
        return <PrimaryButton text={this.title} onClick={() => this.execute()} />;
    };
}
