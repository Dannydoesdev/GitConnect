// Create elements easier, take in 3 parameters - 
// the type (or element name) as string + the attributes as an object + the children as an array of elements
// return a new element to append where you've called the fn
// think of this as (element type, attributes, childrenToAppend)
export function makeAnEl(type, attrs, children) {
  const el = document.createElement(type);
  if (attrs) Object.keys(attrs).forEach((attr) => {

    // if the attribute is a class add to classlist of element
    if (attr == 'class' || attr == 'className') {
      el.classList.add(attrs[attr])
    }
    // if a style object is used - 
    // loop through object and convert the keys with camelcase to dashcase for CSS
    // set the value of the value to be element.style.key = value
    else if (attr == 'style') {
      Object.keys(attrs[attr]).forEach((key) => {
        el.style[key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())] = attrs[attr][key];
      })
    }
    // if the attribute is a data attribute -
    // convert the key to dashcase (html standard)
    // set the value of the value to be element.dataset.key = value
    else if (attr == 'data') {
      Object.keys(attrs[attr]).forEach((key) => {
        el.dataset[key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())] = attrs[attr][key];
      })
    } else {
      // set the attribute on the element as is
      el[attr] = attrs[attr]
    }
  })

  // using a third parameter of children - you can pass in an array of elements
  // and append them to the element - note each element is appended separately and requires the function itself to be called - see syntax below
  if (children) children.forEach((child) => el.append(child));
  return el;
}

// simple version of makeAnEl - takes in a string and returns a new element
const h1 = makeAnEl('h1', {
  class: 'header',
  textContent: 'h1'
});

let main = document.getElementById('id-im-appending-to')
// main.append(h1)


// full version:

// create a variable - call the function with first paramater of type (required)
// second parameter is an object of attributes (optional)
// this can contain a style object or data object to apply these directly (recommend using CSS for styling though)
const section = makeAnEl('section', {
    name: 'test-section',
    id: 'test-section',
    innerText: 'hello there',
    className: 'test-section',
    style: {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '20px',
    },
    data: {
      test: 'test',
    },
},
  // third paramter is an array of children to auto append, call the same function each time to use
  [
    makeAnEl('h1', {
      innerText: 'test this h1',
      className: 'test-section-h1',
    }),
    makeAnEl('p', {
      innerText: 'test this p',
      className: 'test-section-p',
      style: {
        color: 'blue',
        fontSize: '20px',
      },
      data: {
        test: 'test-p',
      }
    }),
  ]
);


// append the new element to the dom
//main.appendChild(section)