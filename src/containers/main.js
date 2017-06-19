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
    this.breakTime = new Date();
    this.updateTimeInterval = this.updateTimeInterval.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  render(){
    return(
      <div id="main">
        <div id="timer-box">
          <div>
            <span style={{paddingRight:'10px'}}> Break Interval (minutes) : </span>
            <input value={this.props.state.timeInterval/60} onChange={this.updateTimeInterval} type="number" />
          </div>
          <div style={{padding:'25px 0px 10px 0px'}}>
            {
              this.props.state.inProgress ?
              <button className="btn" onClick={this.stopTimer} style={{backgroundColor:'#F44336',
                color:'white',border:'1px solid #D32F2F'}}>
                Stop
              </button>
              :
              <button className="btn" onClick={this.startTimer} style={{backgroundColor:'#2196F3',
                color:'white',border:'1px solid #1976D2'}}>
                Start
              </button>
            }
            <button className="btn" onClick={this.resetTimer} style={{marginLeft:'50px',
             backgroundColor:'#4CAF50', color:'white',border:'1px solid #388E3C'}} >
              Reset
            </button>
          </div>
          <div>
            <span style={{paddingRight:'10px'}}>
              Time until next break :
            </span>
            <h1 style={{width:'250px'}}>
              {
                  this.parseTime(this.props.state.timeRemaining)
              }
            </h1>
          </div>
        </div>
        <div id="log-box">
          <h2>Logs</h2>
          <div id="log-wrapper">
            {
              this.props.state.logs.map((log,i)=>{
                return(
                  <div className="log" key={i}>
                    {log}
                  </div>
                );
              })
            }
          </div>
          <h5 style={{position:'relative',top:'25px'}}>
            Total Breaks : {this.props.state.breakCount}
          </h5>
        </div>
      </div>
    );
  }

  updateTimeInterval(e){
      let value = parseInt(e.currentTarget.value);
      if(e.currentTarget.value.length < 4 && e.currentTarget.value.length > 0
        && Number.isInteger(value) && value > 0){
        this.props.dispatch(actions.updateTimeInterval(value*60));
      }
  }

  startTimer(){
    this.props.dispatch(actions.startTimer());
    this.timer = setInterval(()=>{
      if(this.props.state.timeRemaining <= 0){
          this.breakTime = new Date();
          window.alert('Time to take a break!');
          let timeNow = new Date();
          let breakTime = (timeNow.getTime() - this.breakTime.getTime())/1000;
          this.props.dispatch(actions.takeBreak("Break from " + this.breakTime.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'}) +
          " to " + timeNow.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'}) +" for " + this.parseTime(breakTime) ));
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
    let seconds = parseInt(time % 60);

    if (seconds < 10) {seconds = "0"+seconds;}

    return minutes+' mins '+seconds+' secs';
  }

};

export default connect(mapStateToProps)(Main);
