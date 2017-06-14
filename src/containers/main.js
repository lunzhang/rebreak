import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = function(state){
  return {
      state:state
  };
};

class Main extends Component{

  constructor(props){
    super(props);
    this.timer;
    this.updateTimeInterval = this.updateTimeInterval.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  render(){
    return(
      <div id="main">
        <div>
          <span style={{paddingRight:'10px'}}> Break Interval (minutes) : </span>
          <input value={this.props.state.timeInterval/60} onChange={this.updateTimeInterval}
            type="number" maxLength="200" />
        </div>
        <div style={{padding:'25px 0px 10px 0px'}}>
          {
            this.props.state.inProgress ?
            <button className="btn" onClick={this.stopTimer}>
              Stop
            </button>
            :
            <button className="btn" onClick={this.startTimer}>
              Start
            </button>
          }
          <button className="btn" onClick={this.resetTimer} style={{marginLeft:'50px'}}>
            Reset
          </button>
        </div>
        <div>
          <span style={{paddingRight:'10px'}}>
            Time until next break :
          </span>
          <h1 style={{width:'100px'}}>
            {
                this.parseTime(this.props.state.timeRemaining)
            }
          </h1>
        </div>

      </div>
    );
  }

  updateTimeInterval(e){
      this.props.dispatch(actions.updateTimeInterval(parseInt(e.currentTarget.value)*60));
  }

  startTimer(){
    this.props.dispatch(actions.startTimer());
    this.timer = setInterval(()=>{
      if(this.props.state.timeRemaining <= 0){
          window.alert('TAKE A BREAK!');
          this.resetTimer();
      }
      else{
        this.props.dispatch(actions.updateTimeRemaining(this.props.state.timeRemaining - 1));
      }
    },1000);
  }

  stopTimer(){
    this.props.dispatch(actions.stopTimer());
    clearInterval(this.timer);
  }

  resetTimer(){
      this.props.dispatch(actions.resetTimer());
  }

  parseTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {seconds = "0"+seconds;}

    return minutes+':'+seconds;
  }

};

export default connect(mapStateToProps)(Main);
