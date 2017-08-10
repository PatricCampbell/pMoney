const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (element) {
  if (element instanceof HTMLElement) {
    return new DOMNodeCollection([element]);
  } else {
    const selector = [].slice.call(document.querySelectorAll(element));
    return new DOMNodeCollection(selector);
  }
};
