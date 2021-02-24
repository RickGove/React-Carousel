# Rick Gove's React Carousel
 A simple react carousel built as a test task for ScandiWeb
 
# Navigation
 You can naviagte from slide to slide by 
 - clicking the arrows,
 - swiping on a mobile screen,
 - swiping with two fingers on a touchpad (like a MacBook pro)
 - fly to a certain slide by clicking its corresponding dot

# Use
 Download or clone the repo
 
 Copy the `Carousel.js` file to your own project
 
 * Run `npm install` if you do not have `Styled-Components` as a dependancy yet
 
 Import the carousel
 `import Carousel from './Carousel`
 
 Render the carousel with children:
 
 ```jsx
 <Carousel>
   <div>Hello</div>
   <img src="image.jpeg">
 </Carousel>
 ```
 Each one of the children will be given it's own frame in the carousel. 
 Children can be any valid React component
 
# Advanced Use
 The carousel has many features which can be customized using props
 
 Prop   |  Type     |  Function | Default
 -------------------------------
 flyTo|Boolean|Enable or diable clicking on dots to fly to a slide | true
 
