# Example Project
A demo of pMoney can be found at [FoodMe](https://github.com/PatricCampbell/FoodMe). To use it, clone the repository and open index.html in your browser.

# pMoney

pMoney is a DOM manipulation library inspired by jQuery written in vanilla JavaScript. It contains the following functionality:

* Select DOM elements by their class, id, or tag
* Traverse the DOM by finding an element's children or parent
* Ability to add or remove innerHTML, empty an element or append one element to another
* Add or remove event handlers
* Easily make AJAX requests that return a promise that can be chained onto

# Using pMoney

1. Download or clone this library into your project
1. Add the pMoney.js file in a script tag in the header of your project
1. Utilize pMoney's $p function in your JavaScript code

# API

## $p

The $p variable is a wrapper for all of pMoney's functionality. It has four main uses.

#### Selecting Elements
$p can be used to select elements based on their CSS selectors. It can find them based on their class, id, or tag and returns a DOMNodeCollection custom object that can then be used to call other pMoney functions. An example to find an element with the id 'pMoney-rules':
``` javascript
$p('#pMoney-rules');
```

#### Creating a new DOMNodeCollection Object
$p can also be used to create a new DOMNodeCollection from HTMLElement objects. This will allow the HTMLElements to use all of the pMoney functions.

#### Building new HTMLElements
HTMLElement objcts can be wrapped in $p. This will create a DOMNodeCollection object that contains the HTMLElement object.

#### Building a Queue of Functions to Run Once the DOM is Loaded
Lastly, adding an anonymous function inside $p will run the function when the DOM has been completely loaded. Anything in the function is queued until this time.

## DOM Manipulation
Once a DOMNodeCollection is created, there are six functions for DOM Manipulation that can be called on it.

#### html( [innerHTML] )
If html contains no argument, it will return the innerHTML contents of the first node within the DOMNodeCollection. Giving html an argument will change the innerHTML of ALL nodes within the DOMNodeCollection.

#### empty()
This will clear the content from ALL nodes within the DOMNodeCollection.

#### append( [string || HTML element| $p()] )
Accepts a string, HTML element, or a $p wrapped element and appends the outerHTML of each element in the argument to the innerHTML of ALL nodes within the DOMNodeCollection.

#### attr(key, [value])
Accepts a key and optional value. If the value exists, it will add that value and key to ALL nodes within the DOMNodeCollection. If there is no value, it will return the value corresponding to the given key of the first node.

#### addClass(className)
Adds a class attritube to ALL nodes within the DOMNodeCollection.

#### removeClass(className)
Remove a class attritube to ALL nodes within the DOMNodeCollection.

## DOM Traversal

#### children()
Returns a DOMNodeCollection of ALL children of ALL nodes within the DOMNodeCollection.

#### parent()
Returns a DOMNodeCollection of the parent of ALL nodes within the DOMNodeCollection.

#### find(selector)
Returns a DOMNodeCollection of all the nodes that match the argument that are children of the DOMNodeCollection nodes.

#### remove()
Removes the element from the DOM as well as the DOMNodeCollection it is in.

## Event Handling

#### on(action, callback)
Takes in an action type and a callback function and adds an event listener to the DOMNodeCollection with that action and callback.

#### off(action)
Removes an event listener from the DOMNodeCollection with the action type it is given.

## AJAX Calls
pMoney contains an easy to use ajax function to make ajax requests. This returns a promise object that can be used to perform more functions when the request comes back. It contains the following defaults:
```javascript
    success: () => console.log('success'),
    error: (err) => console.log(err),
    url: '/',
    method: 'get',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
```
