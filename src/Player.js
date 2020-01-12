import React from "react";

export default class Player extends React.Component {
  render() {
    return (
      <div
        className="player"
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
