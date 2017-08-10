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


$l.extend = function (firstObj, ...restObjs) {
    return Object.assign({}, firstObj, ...restObjs);
  };

$l.ajax = function (options) {
  const defaults = {
    success: () => console.log('success'),
    error: (err) => console.log(err),
    url: '/',
    method: 'get',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const finalOptions = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(finalOptions.method, finalOptions.url);
  xhr.onload = function() {
    if (xhr.status === 200) {
    // debugger;
      finalOptions.success(xhr.response);
    } else {
      finalOptions.error();
    }
  };
  xhr.send(finalOptions.data);
};
