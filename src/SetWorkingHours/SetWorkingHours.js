import React, { Component } from "react";
import WorkingDay from "./WorkingDay/WorkingDay";
import classes from "./SetWorkingHours.css";
//TODO: set for all with one click (parent constrols child's state)
class SetWorkingHours extends Component {
  state = {
    setGlobal: [],
    Global: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  //   componentDidUpdate(previousProps, previousState) {
  //     if (previousState !== this.previousState) {

  //     }
  // }

  setDayWorkingHours = (
    day,
    firstShiftOpening,
    firstShiftClosing,
    secondShiftOpening,
    secondShiftClosing
  ) => {
    let arr = [];

    if (
      firstShiftOpening !== "" &&
      firstShiftClosing !== "" &&
      secondShiftOpening !== "" &&
      secondShiftClosing !== ""
    ) {
      const firstShift = `${firstShiftOpening} - ${firstShiftClosing}`;
      const secondShift = `${secondShiftOpening} - ${secondShiftClosing}`;
      arr.push(firstShift, secondShift);
      this.setState({ [day]: arr });
      return;
    }

    if (
      firstShiftOpening !== "" &&
      firstShiftClosing !== "" &&
      (secondShiftOpening === "" || secondShiftClosing === "")
    ) {
      const firstShift = `${firstShiftOpening} - ${firstShiftClosing}`;
      arr.push(firstShift);
      this.setState({ [day]: arr });
      return;
    }

    if (
      secondShiftOpening === "" &&
      secondShiftClosing === "" &&
      (secondShiftOpening !== "" || secondShiftClosing !== "")
    ) {
      const firstShift = `${firstShiftOpening} - ${firstShiftClosing}`;
      arr.push(firstShift);
      this.setState({ [day]: arr });
      return;
    }
    if (
      secondShiftOpening === "" &&
      secondShiftClosing === "" &&
      secondShiftOpening === "" &&
      secondShiftClosing === ""
    ) {
      this.setState({ [day]: arr });
      return;
    }
  };

  globalSetAll = () => {
    const theSetGlobal = [...this.state.Global];
    this.setState({
      setGlobal: theSetGlobal,
      Monday: theSetGlobal,
      Tuesday: theSetGlobal,
      Wednesday: theSetGlobal,
      Thursday: theSetGlobal,
      Friday: theSetGlobal,
      Saturday: theSetGlobal,
      Sunday: theSetGlobal,
    });
  };

  render() {

    const workingDayClasses = (day) => {
      let classesObj = classes.workingDay
      if(day === "Global"){
        classesObj=classes.workingDayGlobal
      }
      return classesObj
    }

    return (
      <React.Fragment>
        <div>
          {Object.entries(this.state).map((day, i) => {
            if (day[0] === "setGlobal") {
              return null;
            }
            return (
              <div className={workingDayClasses(day[0])} key={i}>
                <div className={classes.wrap} >
                  <WorkingDay
                    Hours={this.state.setGlobal}
                    day={day[0]}
                    SetWorkingHours={this.setDayWorkingHours}
                  />
                  {day[0] === "Global" && (
                    <div className={classes.center}>
                      <button onClick={this.globalSetAll}>
                        Set all working hours as "Global" working hours
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default SetWorkingHours;
