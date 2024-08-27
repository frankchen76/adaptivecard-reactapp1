import React from "react";
// import * as ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';

export const reactDomRender = (reactElement: React.ReactElement): HTMLElement | undefined => {
    const div = document.createElement("div");
    ReactDOM.createRoot(div).render(reactElement);
    //ReactDOM.render(reactElement, div);
    // div.innerHTML = `<div>test</div>`;
    return div;
};
