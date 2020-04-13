import React from "react";
export default function Title({ name, title }) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-title">
                <h1 className="row text-capitalize font-weight-bold">
                    {name} {title}
                </h1>
                <div className="title-underline" />
            </div>
        </div>
    );
}