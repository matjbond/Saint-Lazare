import React from "react";
import Player from "./Player";
import Pedestrian from "./Pedestrian";
import Controls from "./Controls";

export default class GameInstance extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {
        left: 0,
        top: 100
      },
      pedestrians: [{ left: 0, top: 0 }],
      time: 0
    };
    this.updateGame = this.updateGame.bind(this);
  }

  /**
   * Setting a interval to update the game map
   * https://stackoverflow.com/questions/39426083/update-react-component-every-second
   */
  componentDidMount() {
    this.interval = setInterval(() => this.updateGame(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateGame() {
    console.log("update");
    this.setState({
      time: this.state.time + 1
    });
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
    const pedestrians = this.state.pedestrians.map((item, key) => (
      <Pedestrian key={key} left={item.left} top={item.top} />
    ));

    return (
      <div>
        <h1>St Lazare ({this.state.time})</h1>
        {pedestrians}
        <Player left={this.state.player.left} top={this.state.player.top} />
        <Controls move={(x, y) => this.move(x, y)} />
      </div>
    );
  }
}
