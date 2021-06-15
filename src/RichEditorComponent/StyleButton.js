import React from "react";

export  class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <button type="button" className={className + " btn btn-light btn-sm"} onMouseDown={this.onToggle}>
                {this.props.label}
            </button>
        );
    }
}