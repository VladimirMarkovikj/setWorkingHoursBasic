import React, { Component } from "react";
import classes from "./WorkingDay.css";

class WorkingDay extends Component {
  state = {
    allPosibleWorkingHours: [],
    availableWorkingHoursFirstShiftOpening: [],
    firstShiftOpening: "0:00",
    availableWorkingHoursFirstShiftClosing: [],
    firstShiftClosing: "",
    availableWorkingHoursSecondShiftOpening: [],
    secondShiftOpening: "",
    availableWorkingHoursSecondShiftClosing: [],
    secondShiftClosing: "",
    open: true,
    secondShift: false,
    working247: false
  };

  componentDidMount() {
    this.setAllPossibleAndAvailableFirstShiftWH();
  }

  setAllPossibleAndAvailableFirstShiftWH = () => {
    var arr = [],
      i,
      j;
    for (i = 0; i < 24; i++) {
      for (j = 0; j < 4; j++) {
        arr.push(i + ":" + (j === 0 ? "00" : 15 * j));
      }
    }

    const firstShift = [...arr];
    firstShift.pop();
    this.setState({
      allPosibleWorkingHours: arr,
      availableWorkingHoursFirstShiftOpening: firstShift,
    });
  };

  handleOnChange = (event, shift) => {
    this.setState({ [shift]: event.target.value }, () => {
      this.whichWorkingHours(shift);
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.Hours !== this.props.Hours) {
      console.log(nextProps.Hours);
      if (nextProps.Hours.length === 1) {
        let [firstShiftOpening, firstShiftClosing] =
          nextProps.Hours[0].split(" - ");
        this.setState({
          firstShiftOpening: firstShiftOpening,
          firstShiftClosing: firstShiftClosing,
          secondShiftOpening: "",
          secondShiftClosing: "",
          availableWorkingHoursFirstShiftClosing: [firstShiftClosing],
          availableWorkingHoursSecondShiftOpening: [],
          availableWorkingHoursSecondShiftClosing: [],
          open: true,
          secondShift: false,
        });
      } else if (nextProps.Hours.length === 2) {
        let [firstShiftOpening, firstShiftClosing] =
          nextProps.Hours[0].split(" - ");
        let [secondShiftOpening, secondShiftClosing] =
          nextProps.Hours[1].split(" - ");
        this.setState({
          firstShiftOpening: firstShiftOpening,
          firstShiftClosing: firstShiftClosing,
          secondShiftOpening: secondShiftOpening,
          secondShiftClosing: secondShiftClosing,
          availableWorkingHoursFirstShiftClosing: [firstShiftClosing],
          availableWorkingHoursSecondShiftOpening: [secondShiftOpening],
          availableWorkingHoursSecondShiftClosing: [secondShiftClosing],
          open: true,
          secondShift: true,
        });
      } else if (nextProps.Hours.length === 0) {
        this.setState(
          {
            allPosibleWorkingHours: [],
            availableWorkingHoursFirstShiftOpening: [],
            firstShiftOpening: "0:00",
            availableWorkingHoursFirstShiftClosing: [],
            firstShiftClosing: "",
            availableWorkingHoursSecondShiftOpening: [],
            secondShiftOpening: "",
            availableWorkingHoursSecondShiftClosing: [],
            secondShiftClosing: "",
            open: false,
            secondShift: false,
          },
          () => {
            this.setAllPossibleAndAvailableFirstShiftWH();
          }
        );
      }
    }
  }

  addSecondShift = () => {
    this.setState({ secondShift: true });
  };

  removeSecondShift = () => {
    this.setState(
      { secondShift: false, secondShiftOpening: "", secondShiftClosing: "" },
      () => {
        this.props.SetWorkingHours(
          this.props.day,
          this.state.firstShiftOpening,
          this.state.firstShiftClosing,
          this.state.secondShiftOpening,
          this.state.secondShiftClosing
        );
      }
    );
  };

  whichWorkingHours = (shift) => {
    let leftWorkingHours = [...this.state.allPosibleWorkingHours];

    let index = leftWorkingHours.indexOf(this.state[shift]);

    leftWorkingHours.splice(0, index + 1);

    if (shift === "firstShiftClosing") {
      leftWorkingHours.splice(-1);
    }

    switch (shift) {
      case "firstShiftOpening":
        return this.setState(
          {
            firstShiftClosing: leftWorkingHours[0],
            secondShiftOpening: "",
            secondShiftClosing: "",
            availableWorkingHoursFirstShiftClosing: leftWorkingHours,
            availableWorkingHoursSecondShiftOpening: [],
            availableWorkingHoursSecondShiftClosing: [],
          },
          () => {
            this.props.SetWorkingHours(
              this.props.day,
              this.state.firstShiftOpening,
              this.state.firstShiftClosing,
              this.state.secondShiftOpening,
              this.state.secondShiftClosing
            );
          }
        );
      case "firstShiftClosing":
        return this.setState(
          {
            secondShiftOpening: "",
            secondShiftClosing: "",
            availableWorkingHoursSecondShiftOpening: leftWorkingHours,
            availableWorkingHoursSecondShiftClosing: [],
          },
          () => {
            this.props.SetWorkingHours(
              this.props.day,
              this.state.firstShiftOpening,
              this.state.firstShiftClosing,
              this.state.secondShiftOpening,
              this.state.secondShiftClosing
            );
          }
        );
      case "secondShiftOpening":
        return this.setState(
          {
            secondShiftClosing: leftWorkingHours[0],
            availableWorkingHoursSecondShiftClosing: leftWorkingHours,
          },
          () => {
            this.props.SetWorkingHours(
              this.props.day,
              this.state.firstShiftOpening,
              this.state.firstShiftClosing,
              this.state.secondShiftOpening,
              this.state.secondShiftClosing
            );
          }
        );
      case "secondShiftClosing":
        return this.props.SetWorkingHours(
          this.props.day,
          this.state.firstShiftOpening,
          this.state.firstShiftClosing,
          this.state.secondShiftOpening,
          this.state.secondShiftClosing
        );
      default:
        return null;
    }
  };

  openClose = (status) => {
    if (status === "open") {
      this.setState({ open: true, firstShiftOpening: "0:00" });
    } else {
      this.setState(
        {
          open: false,
          firstShiftOpening: "",
          availableWorkingHoursFirstShiftClosing: [],
          firstShiftClosing: "",
          availableWorkingHoursSecondShiftOpening: [],
          secondShiftOpening: "",
          availableWorkingHoursSecondShiftClosing: [],
          secondShiftClosing: "",
        },
        () => {
          this.props.SetWorkingHours(
            this.props.day,
            this.state.firstShiftOpening,
            this.state.firstShiftClosing,
            this.state.secondShiftOpening,
            this.state.secondShiftClosing
          );
        }
      );
    }
  };

  showingAddRemoveSecondShift = () => {
    switch (this.state.firstShiftClosing) {
      case "23:00":
        return false;
      case "23:15":
        return false;
      case "23:30":
        return false;
      case "23:45":
        return false;
      case "":
        return false;
      default:
        return true;
    }
  };

  render() {
    return (
      <div className={classes.wrap}>
        <div className={classes.showDay}>{this.props.day}</div>
        {this.state.open && (
          <React.Fragment>
            <div className={classes.shiftHead}>First shift</div>
            <div className={classes.selects}>
              <div className={classes.theSelect}>
                <select
                  onChange={(event) =>
                    this.handleOnChange(event, "firstShiftOpening")
                  }
                  value={this.state.firstShiftOpening}
                >
                  {this.state.availableWorkingHoursFirstShiftOpening.map(
                    (hour, i) => {
                      return (
                        <option
                          defaultValue={this.state.firstShiftOpening}
                          key={i}
                        >
                          {hour}
                        </option>
                      );
                    }
                  )}
                </select>

                <span> - </span>

                <select
                  onChange={(event) =>
                    this.handleOnChange(event, "firstShiftClosing")
                  }
                  value={this.state.firstShiftClosing}
                >
                  {this.state.availableWorkingHoursFirstShiftClosing.map(
                    (hour, i) => {
                      return (
                        <option
                          defaultValue={hour && this.state.firstShiftClosing}
                          key={i}
                        >
                          {hour}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>

            {this.state.secondShift
              ? this.showingAddRemoveSecondShift() && (
                  <React.Fragment>
                    <div className={classes.shiftHead}>Second shift</div>
                    <div className={classes.selects}>
                      <div className={classes.theSelect}>
                        <select
                          onChange={(event) =>
                            this.handleOnChange(event, "secondShiftOpening")
                          }
                          value={this.state.secondShiftOpening}
                        >
                          {this.state.availableWorkingHoursSecondShiftOpening.map(
                            (hour, i) => {
                              return (
                                <option
                                  defaultValue={
                                    hour && this.state.secondShiftOpening
                                  }
                                  key={i}
                                >
                                  {hour}
                                </option>
                              );
                            }
                          )}
                        </select>

                        <span> - </span>

                        <select
                          onChange={(event) =>
                            this.handleOnChange(event, "secondShiftClosing")
                          }
                          value={this.state.secondShiftClosing}
                        >
                          {this.state.availableWorkingHoursSecondShiftClosing.map(
                            (hour, i) => {
                              return (
                                <option
                                  defaultValue={
                                    hour && this.state.secondShiftClosing
                                  }
                                  key={i}
                                >
                                  {hour}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                    </div>
                  </React.Fragment>
                )
              : null}

            <div className={classes.wrap}>
              <div className={classes.addRemoveCloseOpenBtnWrap}>
                {this.showingAddRemoveSecondShift() ? (
                  !this.state.secondShift ? (
                    <button onClick={this.addSecondShift}>
                      Add second shift
                    </button>
                  ) : (
                    <button onClick={this.removeSecondShift}>
                      Remove second shift
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </React.Fragment>
        )}

        <div className={classes.wrap}>
          <div className={classes.addRemoveCloseOpenBtnWrap}>
            {this.state.open ? (
              <button onClick={() => this.openClose("close")}>Close</button>
            ) : (
              <button onClick={() => this.openClose("open")}>Open</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkingDay;
