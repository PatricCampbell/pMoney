class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if (string) {
      this.elements.forEach((element) => {
        element.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.elements.forEach((element) => {
      element.innerHTML = '';
    });
  }

  append (args) {
    this.elements.forEach((element) => {
      if (typeof args === 'string') {
        element.innerHTML += args;
      } else if (args instanceof HTMLElement) {
        element.innerHTML += args.outerHTML;
      } else {
        Array.from(args.elements).forEach((arg) => {
          element.innerHTML += arg.outerHTML;
        });
      }
    });
  }

  attr(key, value) {
    if (value) {
      this.elements.forEach((element) => {
        element.setAttribute(key, value);
      });
    } else {
      return this.elements[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.elements.forEach((element) => {
      element.classList.add(className);
    });
  }

  removeClass(className) {
    this.elements.forEach((element) => {
      element.classList.remove(className);
    });
  }

  children() {
    let finalKids = [];

    this.elements.forEach((element) => {
      const elementChildren = Array.from(element.children);
      finalKids = finalKids.concat(elementChildren);
    });

    return new DOMNodeCollection(finalKids);
  }

  parent() {
    return new DOMNodeCollection(this.elements[0].parentNode);
  }

  find(selector) {
    const found = [];
    let finalFound = [];

    this.elements.forEach((element) => {
      const queryString = element.localName + ' ' + selector;
      const foundArr = Array.from(document.querySelectorAll(queryString));
      finalFound = found.concat(foundArr);
    });

    return new DOMNodeCollection(finalFound);
  }

  remove() {
    this.elements.forEach((element) => {
      element.remove();
    });
  }

  on(action, callback) {
    this.elements.forEach((element) => {
      element.addEventListener(action, callback);
      element.callback = callback;
    });
  }

  off(action) {
    this.elements.forEach((element) => {
      const callback = $p(element).attr('callback');
      elements.removeEventListener(action, elements.callback);
    });
  }

}

module.exports = DOMNodeCollection;