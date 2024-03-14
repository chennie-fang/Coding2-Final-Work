# Coding2-Final-Work
## Video Link
https://youtu.be/VuCJ89COhl0
## Play Link
https://editor.p5js.org/fcn2000/sketches/11w98LQ2C

## Inspiration
I made a game about childhood because I spent most of my childhood in my parents' fights, they always drop things in their fights and I often come home to see broken objects all over the floor. So in this little game I made some objects from my childhood, the way to play is to put these objects in the right place, which also symbolizes mending my vacant childhood.

## Process
The pictures in the game were drawn by me in photoshop. The hardest part of the production was the part moving the objects, I used handpose in ml5.js, because the program itself can only recognize the hand and not the hand movements, I wanted to make a holding action 🤏 for picking up the objects when doing this action of holding the thumb will coincide with the forefinger, I thought of it after I did this with my hand, I can Label all the points on the hand with a serial number, the point at the tip of the thumb is point 4 and the point at the tip of the index finger is point 8, check the distance from point 8 to point 4, when the distance is less than 40 it means that the hand has done this action of holding.

How to use the hand to pick up and move the item and how to use the hand to control whether to start the game I use the same method, using point 4 as the main point, when at the same time point 4 appeared in the Designated area and when the point 4 and point 8 distance is less than 40 this two conditions can be moved items.

I made three red boxes, and the items have to be moved to the corresponding boxes to be considered successful. The code I wrote is to judge whether the items are in the correct boxes, and if all three items are in the correct boxes, then we can jump to the success screen.

## Tips
This game can only be run after the“ model ready! ”, the Handpose program is easily disturbed by external factors and needs some preparation time, it is very unstable and it may have some bugs when running.
