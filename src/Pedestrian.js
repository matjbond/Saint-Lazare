import React from "react";

export default class Pedestrian extends React.Component {
  render() {
    return (
      <div
        style={{
          marginLeft: this.props.left + "px",
          marginTop: this.props.top + "px"
        }}
      >
        Pedestrian
      </div>
    );
  }
}
