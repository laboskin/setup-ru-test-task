import React from "react";
import {useModal} from "../Modal/Modal";

function FloatingAddButton() {
    const showModal = useModal();

    return (
        <div className="fixed-action-btn" onClick={() => showModal()}>
            <div className="btn-floating btn-large deep-purple darken-4">
                <i className="large material-icons">add</i>
            </div>
        </div>
    );
}

export default FloatingAddButton;
