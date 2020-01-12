import React from "react";
import Player from "./Player";
import Pedestrian from "./Pedestrian";
import Controls from "./Controls";

// The most pedestrians to allow in the game at one time
const TOTAL_MAX_NO_OF_PEDESTRIANS = 100;
// How wide the street is
const MAX_WIDTH = 250;
const MIN_WIDTH = 0;
const MAX_HEIGHT = 400;
const MIN_HEIGHT = 0;
const GAME_OVER_MESSAGES = ["Pardon!", "Excuse Moi!", "Je suis Desole!"];

export default class GameInstance extends React.Component {
  constructor() {
    super();
    this.state = this.newGame();
    this.updateGame = this.updateGame.bind(this);
    this.movePedestrians = this.movePedestrians.bind(this);
    this.removePedestrian = this.removePedestrian.bind(this);
    this.checkForCollision = this.checkForCollision.bind(this);
  }

  /**
   * Setting a interval to update the game map
   * https://stackoverflow.com/questions/39426083/update-react-component-every-second
   */
  componentDidMount() {
    this.interval = setInterval(() => this.updateGame(), 75);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  newGame() {
    return {
      player: this.newPlayer(),
      pedestrians: [
        this.newPedestrian(),
        this.newPedestrian(10),
        this.newPedestrian(25),
        this.newPedestrian(70),
        this.newPedestrian(100),
        this.newPedestrian(150),
        this.newPedestrian(15),
        this.newPedestrian(40),
        this.newPedestrian(75),
        this.newPedestrian(70),
        this.newPedestrian(100),
        this.newPedestrian(150),
        this.newPedestrian(100),
        this.newPedestrian(250),
        this.newPedestrian(170),
        this.newPedestrian(200),
        this.newPedestrian(250),
        this.newPedestrian(150),
        this.newPedestrian(240),
        this.newPedestrian(275),
        this.newPedestrian(270),
        this.newPedestrian(300),
        this.newPedestrian(250)
      ],
      time: 0,
      score: 0,
      max_number_of_pedestrians: 3,
      message: ""
    };
  }

  newPlayer() {
    return {
      left: 0,
      top: MAX_HEIGHT,
      width: 20,
      height: 20,
      female: Math.random() >= 0.5
    };
  }

  newPedestrian(top = 0) {
    return {
      left: Math.floor(Math.random() * MAX_WIDTH),
      top: top,
      width: 20,
      height: 20,
      female: Math.random() >= 0.5
    };
  }

  checkForCollision() {
    for (let i = 0; i < this.state.pedestrians.length; i++) {
      if (
        this.state.player.top <=
          this.state.pedestrians[i].top +
            this.state.pedestrians[i].height / 2 &&
        this.state.player.top >=
          this.state.pedestrians[i].top - this.state.pedestrians[i].height / 2
      ) {
        if (
          this.state.player.left >=
            this.state.pedestrians[i].left -
              this.state.pedestrians[i].width / 2 &&
          this.state.player.left <=
            this.state.pedestrians[i].left + this.state.pedestrians[i].width / 2
        ) {
          this.setState(this.newGame());
          this.setState({
            message:
              GAME_OVER_MESSAGES[
                Math.floor(Math.random() * GAME_OVER_MESSAGES.length)
              ]
          });
        }
      }
    }
  }

  updateGame() {
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

    this.checkForCollision();

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
  }

  move(x, y) {
    let new_y = this.state.player.top + y;
    let new_x = this.state.player.left + x;

    /**
     * Keep the player constraied to the game area
     */

    if (new_y > MAX_HEIGHT) {
      new_y = MAX_HEIGHT;
    }

    if (new_y < MIN_HEIGHT) {
      new_y = MIN_HEIGHT;
    }

    if (new_x > MAX_WIDTH) {
      new_x = MAX_WIDTH;
    }

    if (new_x < MIN_WIDTH) {
      new_x = MIN_WIDTH;
    }

    this.setState({
      player: {
        // Load the initial player data with the spread operaton (more info: https://learn.co/lessons/react-updating-state)
        ...this.state.player,
        // Then overwrite the location
        left: new_x,
        top: new_y
      }
    });

    this.checkForCollision();
  }

  render() {
    const pedestrians = this.state.pedestrians.map((item, key) => (
      <Pedestrian
        key={key}
        height={item.height}
        width={item.width}
        left={item.left}
        top={item.top}
        female={item.female}
      />
    ));

    return (
      <div>
        <h1>St Lazare</h1>
        <h3>Score: {this.state.score}</h3>
        <h3 className="text-danger">{this.state.message}</h3>
        <Controls move={(x, y) => this.move(x, y)} />
        <div
          className="street"
          style={{
            height: MAX_HEIGHT + 20 + "px",
            width: MAX_WIDTH + 20 + "px"
          }}
        >
          {pedestrians}
          <Player
            height={this.state.player.height}
            width={this.state.player.width}
            left={this.state.player.left}
            top={this.state.player.top}
            female={this.state.player.female}
          />
        </div>
      </div>
    );
  }
}
