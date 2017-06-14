import * as actions from '../actions/actions.js';


const initalState = {
  inProgress:false,
  timeInterval:600,
  timeRemaining:600
};

function appReducer(state=initalState,action){

  switch(action.type){
      case actions.START_TIMER:
        return Object.assign({},state,{inProgress:true});
      case actions.STOP_TIMER:
        return Object.assign({},state,{inProgress:false});
      case actions.UPDATE_TIME_INTERVAL:
        if(state.inProgress){
          return Object.assign({},state,{timeInterval:action.timeInterval});
        }
        return Object.assign({},state,{timeInterval:action.timeInterval,timeRemaining:action.timeInterval});
      case actions.UPDATE_TIME_REMAINING:
        return Object.assign({},state,{timeRemaining:action.timeRemaining});
      case actions.RESET_TIMER:
        return Object.assign({},state,{timeRemaining:initalState.timeRemaining});
  }

  return state;
};

export default appReducer;
