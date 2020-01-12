import React from "react";

export default class Pedestrian extends React.Component {
  render() {
    return (
      <div
        className="pedestrian"
        style={{
          left: this.props.left + "px",
          top: this.props.top + "px",
          height: this.props.height + "px",
          width: this.props.width + "px"
        }}
      />
    );
  }
}
