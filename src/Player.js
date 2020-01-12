import React from "react";

export default class Player extends React.Component {
  render() {
    let image = "female_player.png";

    if (!this.props.female) {
      image = "male_player.png";
    }

    return (
      <div
        className="player"
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
