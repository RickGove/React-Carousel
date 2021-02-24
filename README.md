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
 
| Prop        | Description | Type | Default |
| ----------- | ----------- | -----|---------|
| arrowColor  | Arrow Color | string| 'black'|
| arrowOffest | Left/Right offset of arrows|string (css value)|'2.2rem'|
| debug|Show state info|boolean|false|
| dotsOffsetFromBottom| Distance from bottom of dots|integer (css %)|5|
|flyTo| Enable clicking of dots to fly to given slide|boolean|true|
|freeWheel| Enable snapping on touchpad two finger swipe |boolean|false|
|openingSlide|Which slide to show on load|integer|0|

Example:

```jsx
<Carousel
 arrowColor="blue"
 flyTo={false}
 openingSlide={2}
 dotsOffsetFromBottom={44}
>
 ...
</Carousel>
```
