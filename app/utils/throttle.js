export const throttle = function(func, delay) {
  var context, result, args, prevArgs, argsChanged;
  var previous = 0;
  return function() {
    var now, remaining;
    if (delay) {
      now = Date.now();
      remaining = delay - (now - previous);
    }
    context = this;
    argsChanged = JSON.stringify(arguments) !== JSON.stringify(prevArgs);
    prevArgs = arguments;
    if (argsChanged || delay && (remaining <= 0 || remaining > delay)) {
      if (delay) {
        previous = now;
      }
      result = func.apply(context, arguments);
      context = args = null;
    }
    return result;
  }

};