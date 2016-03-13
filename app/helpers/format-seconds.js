import Ember from 'ember';

export function formatSeconds([seconds]) {
  var h = Math.floor(seconds/60/60),
      m = Math.floor((seconds - (h * 60 * 60))/60),
      s = Math.round(seconds - (h * 60 * 60) - (m * 60));
  return m + ':' + ((s < 10) ? '0' + s : s);
}

export default Ember.Helper.helper(formatSeconds);
