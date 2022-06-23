// takes in width and height - returns a random HD img of that size
export function makeAnImg(width, height) {
  let randNum = Math.floor(Math.random() * 1000)
  return `https://picsum.photos/${width}/${height}?random=${randNum}`
}


// Inspired and refactored from Jens Adria's createAnElement fn

// Create elements easier, take in 3 parameters - 
// the type (or element name) as string + the attributes as an object + the children as an array of elements
// return a new element to append where you've called the fn think of this as (element type, attributes, childrenToAppend)
export function makeAnEl(type, attrs, children) {
  const el = document.createElement(type);
  if (attrs) Object.keys(attrs).forEach((attr) => {

    // if the attribute is a class add to classlist of element
    if (attr == 'class' || attr == 'className') {
      
      // refactored so multiple classes can be added (like class: ['class1', 'class2']) esp helpful for bootstrap
      // detect if array (js sees 'object') and add the classlist for each element in that arr
      if (typeof attrs[attr] == 'object') {
        let classArray = attrs[attr];     
        classArray.forEach(att => el.classList.add(att))
      }
      else {
        el.classList.add(attrs[attr])
      }
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
    // set the value of the value to be element.dataset.key = value
    else if (attr == 'data') {
      Object.keys(attrs[attr]).forEach((key) => {
        el.dataset[key] = attrs[attr][key];
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
const h1 = makeAnEl('h1')

//or

const h3 = makeAnEl('h3', {
  textContent: 'this is a h3',
  id: 'h3',
})

//or

const h1Div = makeAnEl('div', {
  id: 'h1-div',
}, [
  makeAnEl('h1', {
    textContent: 'hello there',
    id: 'this-h1',
    class: ['class1', 'class2'],
    data: {
      darkmode: 'yes'
    },
  })
]
)

// examples without makeanEl
const h2 = document.createElement('h2')
h2.textContent = 'hello there'
h2.id = 'this-h2'
h2.classList.add('class1')
h2.classList.add('class2')
h2.dataset.darkmode = 'yes';



// let main = document.getElementById('results')
// main.appendChild(h1Div)
// main.appendChild(h2)

// console.log(main)


// full version:

// create a variable - call the function with first paramater of type (required)
// second parameter is an object of attributes (optional)
// this can contain a style object or data object to apply these directly (recommend using CSS for styling though)
const section = makeAnEl('section', {
    name: 'test-section',
    id: 'test-section',
    innerText: 'hello there',
    class: ['test-section', 'dark-mode', 'large-font'],
    style: {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '20px',
    },
    data: {
      test: 'test',
      id: '1234',
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
      className: ['test-section-p', 'dark-mode'],
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
// main.appendChild(section)