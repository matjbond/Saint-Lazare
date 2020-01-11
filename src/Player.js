import React from "react";

export default class Player extends React.Component {
  render() {
    return (
      <div
        style={{
          marginLeft: this.props.left + "px",
          marginTop: this.props.top + "px"
        }}
      >
        Thing
      </div>
    );
  }
}
