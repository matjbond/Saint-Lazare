import React from "react";
import Player from "./Player";
import Controls from "./Controls";

export default class GameInstance extends React.Component {
  constructor() {
    super();
    this.state = {
      left: 0,
      top: 0
    };
  }

  move(x, y) {
    this.setState({
      left: this.state.left + x,
      top: this.state.top + y
    });
  }

  render() {
    return (
      <div>
        <Player left={this.state.left} top={this.state.top} />
        <Controls move={(x, y) => this.move(x, y)} />
      </div>
    );
  }
}
