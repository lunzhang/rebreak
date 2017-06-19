import * as actions from '../actions/actions.js';

const initalState = {
  breakCount:0,
  inProgress:false,
  timeInterval:1200,
  timeRemaining:1200,
  logs:[]
};

function appReducer(state=initalState,action){

  switch(action.type){
      case actions.START_TIMER:
        return Object.assign({},state,{
          inProgress:true,
          logs:state.logs.concat(action.log)
        });
      case actions.STOP_TIMER:
        return Object.assign({},state,{
          inProgress:false,
          logs:state.logs.concat(action.log)});
      case actions.UPDATE_TIME_INTERVAL:
        if(state.inProgress){
          return Object.assign({},state,{timeInterval:action.timeInterval});
        }
        return Object.assign({},state,{timeInterval:action.timeInterval,timeRemaining:action.timeInterval});
      case actions.UPDATE_TIME_REMAINING:
        return Object.assign({},state,{timeRemaining:action.timeRemaining});
      case actions.RESET_TIMER:
        return Object.assign({},state,{
          timeRemaining:state.timeInterval
        });
      case actions.UPDATE_LOGS:
        return Object.assign({},state,{
          logs:state.logs.concat(action.log)
        });
      case actions.TAKE_BREAK:
        return Object.assign({},state,{
          breakCount:state.breakCount+1,
          logs:state.logs.concat(action.log)
        });
  }

  return state;
};

export default appReducer;
