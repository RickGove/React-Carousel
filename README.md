# Rick Gove's React Carousel

A simple react carousel built as a test task for ScandiWeb

# Navigation

You can navigate from slide to slide by

- clicking the arrows
- swiping on a mobile screen
- swiping with two fingers on a touchpad (like a MacBook pro mouse)
- fly to a certain slide by clicking its corresponding dot
- Clicking and dragging with a mouse

# Demo

<a href="https://rickgove.github.io/#/carousel">demo page</a>

_or_

Download, clone or fork the repo

In terminal run
`npm install && npm start`

# Use

Copy the `Carousel.js` file to your own project

**Run `npm install` if you do not have `Styled-Components` as a dependancy yet**

Import the carousel
`import Carousel from './Carousel'`

Render the carousel with children:

```jsx
<Carousel>
  <div>Hello</div>
  <img src="image.jpeg">
</Carousel>
```

Each one of the children will be given it's own frame in the carousel.
Children can be any valid React component

# Thank you for taking time to have a look
