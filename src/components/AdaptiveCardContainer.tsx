import React, { useEffect, useRef } from 'react';
// import * as AdaptiveCardsAPI from 'adaptivecards';
import * as AC from "adaptivecards";
import * as ACData from "adaptivecards-templating";
import card1 from '../example-cards/card.json';
import { CustomDateInput } from '../card-objects/CustomDateInput';
import { DateInput } from '../card-objects/DateInput';
import { SubmitAction } from '../card-objects/SubmitAction';
import { ProgressBar } from '../card-objects/ProgressBar';
import { config } from '../hostConfig';

export const AdaptiveCardContainer = (props) => {
    const element = useRef(null);
    useEffect(() => {
        let elementRegistry = new AC.CardObjectRegistry<AC.CardElement>();

        // Populate it with the default set of elements
        AC.GlobalRegistry.populateWithDefaultElements(elementRegistry);

        // Register the custom ProgressBar element
        elementRegistry.register(CustomDateInput.JsonTypeName, CustomDateInput);
        elementRegistry.register(DateInput.JsonTypeName, DateInput);
        elementRegistry.register(ProgressBar.JsonTypeName, ProgressBar);

        // Parse a card payload using the custom registry
        let serializationContext = new AC.SerializationContext();
        serializationContext.setElementRegistry(elementRegistry);

        // Create a custom registry for actions
        let actionRegistry = new AC.CardObjectRegistry<AC.Action>();

        // Populate it with the default set of actions
        AC.GlobalRegistry.populateWithDefaultActions(actionRegistry);
        // Register the custom AlertAction type
        actionRegistry.register(SubmitAction.JsonTypeName, SubmitAction);

        // Parse a card payload using the custom registry
        serializationContext.setActionRegistry(actionRegistry);

        const data = {
            title: "test title",
            name: "Alex Hidinger",
            profileImage: "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis",
            createdUtc: "2024-08-14T06:08:39Z",
            progress: 50
        }
        const template = new ACData.Template(card1);

        var cardPayload = template.expand({
            $root: data
        });

        // OPTIONAL: Render the card (requires that the adaptivecards library be loaded)
        var adaptiveCard = new AC.AdaptiveCard();
        adaptiveCard.hostConfig = new AC.HostConfig(config);
        adaptiveCard.onExecuteAction = (action) => {
            console.log("onExecuteAction. ", action);
            alert(`enter! title: ${action.title}}`);
        }

        adaptiveCard.parse(cardPayload, serializationContext);
        console.log("current:", element.current);
        if (element.current.hasChildNodes()) {

            element.current.replaceChild(adaptiveCard.render(), element.current.firstChild);
        } else {
            element.current.appendChild(adaptiveCard.render());
        }

    }, []);
    return (
        <div ref={element} style={{ maxWidth: "600px" }} />
    );
}
