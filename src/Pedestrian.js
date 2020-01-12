import React from "react";

export default class Pedestrian extends React.Component {
  render() {
    let image = "female_pedestrian.png";

    if (!this.props.female) {
      image = "male_pedestrian.png";
    }

    return (
      <div
        className="pedestrian"
        style={{
          left: this.props.left + "px",
          top: this.props.top + "px",
          height: this.props.height + "px",
          width: this.props.width + "px",
          backgroundImage: "url('" + image + "')"
        }}
      />
    );
  }
}
