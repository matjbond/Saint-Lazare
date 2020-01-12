import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
/*
Uses https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it/46123962
*/
export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
  }

  /**
   * Handle a keypress and activate the relevant controll
   * @param {*} event
   */
  keyPress(event) {
    if (event.key === "ArrowLeft" || event.key === "a") {
      this.props.move(-10, 0);
    } else if (event.key === "ArrowUp" || event.key === "w") {
      this.props.move(0, -10);
    } else if (event.key === "ArrowRight" || event.key === "d") {
      this.props.move(10, 0);
    } else if (event.key === "ArrowDown" || event.key === "s") {
      this.props.move(0, 10);
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress, false);
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button variant="light" onClick={e => this.props.move(-10, 0)}>
            Left
          </Button>
          <Button variant="light" onClick={e => this.props.move(10, 0)}>
            Right
          </Button>
          <Button variant="light" onClick={e => this.props.move(0, -10)}>
            Up
          </Button>
          <Button variant="light" onClick={e => this.props.move(0, 10)}>
            Down
          </Button>
          <Button variant="light" onClick={e => this.props.toggleMF()}>
            M/F
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}
