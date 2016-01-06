import Ember from 'ember';

export function formatSeconds([seconds]) {
  var hours = Math.floor(seconds/60/60),
      minutes = Math.floor((seconds - (hours * 60 * 60))/60),
      seconds = Math.round(seconds - (hours * 60 * 60) - (minutes * 60));
  return minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
}

export default Ember.Helper.helper(formatSeconds);
