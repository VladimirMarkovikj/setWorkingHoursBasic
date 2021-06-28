import React, { Component } from "react";
import SetWorkingHours from "./SetWorkingHours/SetWorkingHours";
import classes from "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.getWorkingHours = React.createRef();
  }

  state = {
    workingHours: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  };

  setMainWorkingHours = () => {
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } =
      this.getWorkingHours.current.state;
    const newWorkingHours = {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
    };
    this.setState({ workingHours: newWorkingHours });
  };

  render() {
    return (
      <div className={classes.wrap}>
        <div className={classes.main}>
          <div className={classes.btnWH}>
            <button className={classes.btnGlobalSetAll} >
              Get Working hours
            </button>
          </div>
          <SetWorkingHours ref={this.getWorkingHours} />
        </div>
      </div>
    );
  }
}

export default App;
