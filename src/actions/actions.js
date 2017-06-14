export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const UPDATE_TIME_REMAINING = 'UPDATE_TIME_REMAINING';
export const UPDATE_TIME_INTERVAL = 'UPDATE_TIME_INTERVAL';
export const RESET_TIMER = 'RESET_TIMER';


export function startTimer(){
    return {
        type:START_TIMER
    };
};

export function stopTimer(){
    return {
        type:STOP_TIMER
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
