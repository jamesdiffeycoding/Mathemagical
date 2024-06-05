# Mathemagical
![MathemagicalShot3](https://github.com/jamesdiffeycoding/Mathemagical/assets/139918141/eb3893ff-09df-4924-8c85-d4d1f0fea9d3)

## Inspiration
When we think of art, nature, or great design, we seldom think of maths. Even so, maths underlies a lot of basic geometric forms. With a little manipulation, simple equations can create visually captivating forms. 

## What it does
Mathemagical uses HTML's canvas feature along with React's state management and rendering system to dynamically display captivating equations. Two graphs I made are included, along with a third interactive resource that you can use to reproduce the first two, or to create your own design.

The design is responsive to screen width..

## How I built it
I built it using HTML's canvas element and React's component and state management systems. For the rainbow colours, I iterate the colour of the line through an array that loops through the colours of the rainbow. I used while loops to generate hard code that smoothly transitions through the colours of the rainbow.

## Challenges I ran into
The first method I used for graph rendering was ineffective. I had tried to use the Array.map method to successively iterate and print all the points in an equation, however there was considerable delay after several hundred points had been rendered, because the program was effectively 're-loading' every single point on the curve, not just the next iteration.

I came across HTML's canvas element which helped to avoid this problem, requesting only 'the next frame' for each equation on each refresh improved the performance of the application significantly.

## What's next for Mathemagical
- Further improving the responsiveness of the design, particularly for narrow phone screens.
- Add a colour picker for the background canvas colour.
- Add trig function graphs for users not familiar with sin, cos and tan graphs.
- Adding a fix for the split second where the default font is loaded rather than custom font.

## Built with
React, HTML, CSS.

## Try it out
[MatheMagical](https://mathemagical.vercel.app/)


## Misc dev notes
- Project initiated with create react app vite
- created with npm create vite@latest
- key media breakpoints at 1400px width
--- this is currently turned off while there is only one graph on the site, check the commented out media query to reinstate it
--- the graph width is 600px, so about 1400px is needed to house two graphs side by side
- to run local server, cd into mathemagical and run npm i + npm run dev



# For later
- a useful document on canvas responsiveness
https://mobiforge.com/design-development/html5-mobile-web-canvas
