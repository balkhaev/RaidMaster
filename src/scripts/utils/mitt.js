export default function mitt(all) {
  all = all || {};

  function list(type) {
    var t = type.toLowerCase();
    return all[t] || (all[t] = []);
  }

  return {
    on: function(type, handler) {
      list(type).push(handler);
    },
    off: function(type, handler) {
      var e = list(type),
        i = e.indexOf(handler);
      if (~i) e.splice(i, 1);
    },
    emit: function(type, event) {
      list('*').concat(list(type)).forEach( f => { f(event); });
    }
  };
}
