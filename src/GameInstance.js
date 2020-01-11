import React from "react";
import Player from "./Player";
import Controls from "./Controls";

export default class GameInstance extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {
        left: 0,
        top: 0
      }
    };
  }

  move(x, y) {
    this.setState({
      player: {
        // Load the initial player data with the spread operaton (more info: https://learn.co/lessons/react-updating-state)
        ...this.state.player,
        // Then overwrite the location
        left: this.state.player.left + x,
        top: this.state.player.top + y
      }
    });
  }

  render() {
    return (
      <div>
        <h1>St Lazare</h1>
        <Player left={this.state.player.left} top={this.state.player.top} />
        <Controls move={(x, y) => this.move(x, y)} />
      </div>
    );
  }
}
