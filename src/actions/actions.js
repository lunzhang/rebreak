export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const UPDATE_TIME_REMAINING = 'UPDATE_TIME_REMAINING';
export const UPDATE_TIME_INTERVAL = 'UPDATE_TIME_INTERVAL';
export const RESET_TIMER = 'RESET_TIMER';
export const UPDATE_LOGS = 'UPDATE_LOGS';
export const TAKE_BREAK = 'TAKE_BREAK';

export function startTimer(){
    return {
        type:START_TIMER,
        log:"Timer started at " + (new Date).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})
    };
};

export function stopTimer(){
    return {
        type:STOP_TIMER,
        log:"Timer stopped at " + (new Date).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})
    };
};

export function updateTimeInterval(timeInterval){
  return {
      type:UPDATE_TIME_INTERVAL,timeInterval
  };
};

export function updateTimeRemaining(timeRemaining){
    return {
        type:UPDATE_TIME_REMAINING,timeRemaining
    };
};

export function resetTimer(){
    return {
        type:RESET_TIMER
    };
};

export function updateLogs(log){
    return {
      type:UPDATE_LOGS,
      log
    };
};

export function takeBreak(log){
    return {
        type:TAKE_BREAK,
        log
    };
};
