const DOMNodeCollection = require('./dom_node_collection');

const queue = [];
window.$p = function (element) {

  if (element instanceof HTMLElement) {
    return new DOMNodeCollection([element]);
  } else if (element instanceof Function) {
    if (document.readyState === 'complete') {
      element();
      queue.forEach(func => {
        func();
      });
    } else {
      queue.push(element);
    }
  } else {
    const selector = [].slice.call(document.querySelectorAll(element));
    return new DOMNodeCollection(selector);
  }
};

$p.extend = function (firstObj, ...restObjs) {
    return Object.assign({}, firstObj, ...restObjs);
  };

$p.ajax = function (options) {
  const defaults = {
    success: () => console.log('success'),
    error: (err) => console.log(err),
    url: '/',
    method: 'get',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const finalOptions = $p.extend(defaults, options);
  return fetch(finalOptions.url, {
    method: finalOptions.method
  }).then(response => response.json())
    .catch(err => err);
};

document.addEventListener('DOMContentLoaded', () => {
  queue.forEach(queuedFunction => queuedFunction());
});