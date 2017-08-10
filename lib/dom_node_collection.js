class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if (string) {
      this.elements.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.elements.forEach((el) => {
      el.innerHTML = '';
    });
  }

  append (args) {
    this.elements.forEach((el) => {
      if (typeof args === 'string') {
        el.innerHTML += args;
      } else if (args instanceof HTMLElement) {
        el.innerHTML += args.outerHTML;
      } else {
        Array.from(args.elements).forEach((arg) => {
          el.innerHTML += arg.outerHTML;
        });
      }
    });
  }

  attr(key, value) {
    if (value) {
      this.elements.forEach((el) => {
        el.setAttribute(key, value);
      });
    } else {
      return this.elements[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.elements.forEach((el) => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.elements.forEach((el) => {
      el.classList.remove(className);
    });
  }

  children() {
    const kidsCage = [];
    let finalKids = [];

    this.elements.forEach((el) => {
      const childrenArr = Array.from(el.children);
      finalKids = kidsCage.concat(childrenArr);
    });

    return new DOMNodeCollection(finalKids);
  }

  parent() {
    return new DOMNodeCollection(this.elements[0].parentNode);
  }

  find(selector) {
    const found = [];
    let finalFound = [];

    this.elements.forEach((el) => {
      const queryString = el.localName + ' ' + selector;
      const foundArr = Array.from(document.querySelectorAll(queryString));
      finalFound = found.concat(foundArr);
    });

    return new DOMNodeCollection(finalFound);
  }

  remove() {
    this.elements.forEach((el) => {
      el.remove();
    });
  }
}

module.exports = DOMNodeCollection;
