# How to test the pages
---
1. Open index.html in the browser of your choice (Google Chrome recommended)
2. Click the link to Cam's Pizzeria
3. Scroll down the site to observe the background pizzas moving
4. Move the slider to change the size of the pizzas


# How I optimized the website
---
## Cameron's Home Page
##### index.html
1. Removed the google web fonts call and added ajax.googleapis font loader at the bottom of the body to get the necessary fonts
2. Made the google analytics script calls 'async'
3. Inlined the CSS needed for displaying the page correctly, including all of style.css
4. Made sure to use minimized .css and .js files
5. Moved .js scripts to the end of the body
6. Added media attribute to print.css

##### style.css
1. Commented out all the code that was inlined into index.html

## Pizzeria Page
##### pizza.html
1. Made sure to use minimized .css and .js files
2. Added viewport
##### main.js
1. Replaced instances of 'querySelector()' with 'getElementById()'
2. Replaced instances of 'querySelectorAll()' with 'getElementsByClassName()'
2. Refactored changePizzaSizes() and stopped using determineDx(). Original version was repeatedly re-querying all the pizzas very inefficiently
3. Refactored updatePositions(). Original version was repeatedly re-calculating the same 5 values over and over for moving the background pizzas (some help from https://discussions.udacity.com/t/project-4-how-do-i-optimize-the-background-pizzas-for-loop/36302)
4. Reduced the number of background pizzas based on the size of the window (help from https://github.com/uncleoptimus/udacityP4/blob/gh-pages/views/js/main.js)


## Finishing Touches
##### Using gulp:
1. Minified all .css and .js files
2. Used imagemin function to reduce the size of our images as much as possible
3. Changed all entries in html files to use minimized css files instead of the regular ones
