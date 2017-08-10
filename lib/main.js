const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (element) {
  const queue = [];

  if (element instanceof HTMLElement) {
    return new DOMNodeCollection([element]);
  } else if (element instanceof Function) {
    if (document.readyState === 'complete') {
      element();
      queue.forEach((func) => {
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
