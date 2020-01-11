import React from "react";
import Player from "./Player";
import Pedestrian from "./Pedestrian";
import Controls from "./Controls";

// The most pedestrians to allow in the game at one time
const TOTAL_MAX_NO_OF_PEDESTRIANS = 30;
// How wide the street is
const STREET_WIDTH = 500;

const MAX_HEIGHT = 500;

export default class GameInstance extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {
        left: 0,
        top: 100
      },
      pedestrians: [this.newPedestrian()],
      time: 0,
      score: 0,
      max_number_of_pedestrians: 3
    };
    this.updateGame = this.updateGame.bind(this);
    this.movePedestrians = this.movePedestrians.bind(this);
    this.removePedestrian = this.removePedestrian.bind(this);
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

  newPedestrian() {
    return { left: Math.floor(Math.random() * STREET_WIDTH), top: 0 };
  }

  updateGame() {
    console.log("update");
    this.setState({
      time: this.state.time + 1,
      score: (this.state.score += 5)
    });

    // We want to make the game harder as time goes on!
    if (
      this.state.time % 7 === 0 &&
      this.state.pedestrians.length <= TOTAL_MAX_NO_OF_PEDESTRIANS
    ) {
      this.setState({
        max_number_of_pedestrians: this.state.max_number_of_pedestrians + 1
      });
    }

    this.movePedestrians();

    if (this.state.max_number_of_pedestrians > this.state.pedestrians.length) {
      this.setState({
        pedestrians: [...this.state.pedestrians, this.newPedestrian()]
      });
    }
  }

  removePedestrian(pedestrians, index) {
    pedestrians.splice(index, 1);
    this.setState({
      score: (this.state.score += 60)
    });
    return pedestrians;
  }

  movePedestrians() {
    let updated_pedestrians = this.state.pedestrians;

    for (let i = 0; i < updated_pedestrians.length; i++) {
      if (updated_pedestrians[i].top >= MAX_HEIGHT) {
        updated_pedestrians = this.removePedestrian(updated_pedestrians, i);
      }

      updated_pedestrians[i].top = updated_pedestrians[i].top + 1;
    }

    this.setState({
      pedestrians: updated_pedestrians
    });

    console.log(this.state.pedestrians);
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
        <h1>St Lazare (score: {this.state.score})</h1>
        {pedestrians}
        <Player left={this.state.player.left} top={this.state.player.top} />
        <Controls move={(x, y) => this.move(x, y)} />
      </div>
    );
  }
}
