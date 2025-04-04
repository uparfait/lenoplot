# Lenoplot

`Lenoplot:` is a Node.js charting library built on top of `Plotly.js` to make it easier for `Node.js Developers` and `Machine Learning Lookies` to develop and visualize their works without the need for switching between the Node environment and browsers.

## Before Getting Started: What is `Plotly.js`?

`Plotly.js:` is a powerful and feature-rich charting library that comes with over 40 chart types. It includes 3D charts, statistical graphs, and SVG maps, making it a versatile tool for data visualization.

### Features of `Plotly.js`:
- Over 40 different types of charts.
- Interactive 3D charts.
- Statistical graphs, including histograms, scatter plots, and box plots.
- Customizable and interactive maps with SVG support.
- Responsive and capable of being embedded into web applications.

### Why Use Lenoplot?
While `Plotly.js` is a popular charting library, it primarily targets browsers. Lenoplot bridges that gap for Node.js developers, allowing them to create and visualize charts directly within their Node.js environment.

## Installation

To get started, simply install Lenoplot using npm:

```bash
npm install lenoplot --save
```
### Example Usages

**Note**: With a help of `Plotly.js` nothing had changed except different envirnoment.
means nothing new to learn just learn `Plotly.js` and start to use it in a node.js envirnoment 👍.

`Thanks to W3Schools for these examples`

# Installation

```
npm install lenoplot --save
```

After installation you can go through these examples and view your results.
you can adjust it as much as you want.

# EXAMPLE 1:

`Scatter Plots: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
let yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

// Define Data
let data = [
  {
    x: xArray,
    y: yArray,
    mode: "markers",
    type: "scatter",
  },
];

// Define Layout
let layout = {
  xaxis: { range: [40, 160], title: "Square Meters" },
  yaxis: { range: [5, 16], title: "Price in Millions" },
  title: "House Prices vs. Size",
};

//Plot a Scatter
plt.plot(data, layout);
```
Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_scatter.png" alt="Alt text" width="100%" height="500">

# EXAMPLE 2:

`Line Graphs: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
let yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

// Define Data
let data = [
  {
    x: xArray,
    y: yArray,
    mode: "lines",
    type: "scatter",
  },
];

// Define Layout
let layout = {
  xaxis: { range: [40, 160], title: "Square Meters" },
  yaxis: { range: [5, 16], title: "Price in Millions" },
  title: "House Prices vs Size",
};

//Plot a Line Graphs
plt.plot(data, layout);
```

Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_line.png" alt="Alt text" width="100%" height="500">

# EXAMPLE 3:

`Linear Graphs: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let exp = "x + 17";

// Generate values
let xValues = [];
let yValues = [];
for (let x = 0; x <= 10; x += 1) {
  yValues.push(eval(exp));
  xValues.push(x);
}

// Define Data
let data = [
  {
    x: xValues,
    y: yValues,
    mode: "lines",
  },
];

// Define Layout
let layout = { title: "y = " + exp };
//Plot a Linear Graphs
plt.plot(data, layout);
```

Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_linear.png" alt="Alt text" width="100%" height="500">

# EXAMPLE 4:

`Multiple Lines: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let exp1 = "x";
let exp2 = "1.5*x";
let exp3 = "1.5*x + 7";

// Generate values

let x1Values = [];
let x2Values = [];
let x3Values = [];
let y1Values = [];
let y2Values = [];
let y3Values = [];

for (let x = 0; x <= 10; x += 1) {
  x1Values.push(x);
  x2Values.push(x);
  x3Values.push(x);
  y1Values.push(eval(exp1));
  y2Values.push(eval(exp2));
  y3Values.push(eval(exp3));
}

// Define Data
let data = [
  { x: x1Values, y: y1Values, mode: "lines" },
  { x: x2Values, y: y2Values, mode: "lines" },
  { x: x3Values, y: y3Values, mode: "lines" },
];

// Define Layout
let layout = { title: "[y=" + exp1 + "] [y=" + exp2 + "] [y=" + exp3 + "]" };

//Plot a Multiple Lines
plt.plot(data, layout);
```

Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_multlines.png" alt="Alt text" width="100%" height="500">

# EXAMPLE 5:

`Bar Charts: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
let yArray = [55, 49, 44, 24, 15];

let data = [
  {
    x: xArray,
    y: yArray,
    type: "bar",
  },
];
let layout = { title: "World Wide Wine Production" };
//Plot a Bar Charts
plt.plot(data, layout);
```

Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_bar.png" alt="Alt text" width="100%" height="500">

# EXAMPLE 6:

`Horizontal Bar Charts: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let xArray = [55, 49, 44, 24, 15];
let yArray = ["Italy", "France", "Spain", "USA", "Argentina"];

let data = [
  {
    x: xArray,
    y: yArray,
    type: "bar",
    orientation: "h",
  },
];

let layout = { title: "World Wide Wine Production" };
//Plot a Horizontal Bar Charts
plt.plot(data, layout);
```
Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_barhorizontal.png" alt="Alt text" width="100%" height="500">

# EXAMPLE 7:

`Pie Charts: `

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot

let xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
let yArray = [55, 49, 44, 24, 15];

let layout = { title: "World Wide Wine Production" };

let data = [{ labels: xArray, values: yArray, type: "pie" }];
//Plot a Pie Charts
plt.plot(data, layout);
```
Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_pie.png" alt="Alt text" width="100%" height="500">


# EXAMPLE 8:

`Plotting Equations`

```js
import { Lenoplot as plt } from "lenoplot"; // for s6 module
//const plt = require("lenoplot").Lenoplot


var exp = "Math.sin(x)";
// Generate values
let xValues = [];
let yValues = [];
for (let x = 0; x <= 10; x += 0.2) {
  yValues.push(eval(exp));
  xValues.push(x);
}

// Display using Plotly
let data = [{ x: xValues, y: yValues, mode: "markers" }];
let layout = { title: "y = " + exp };

//Plot a Plotting Equations
plt.plot(data, layout);
```
Output:

<img src="https://lenoplot-images.onrender.com/lenoplot_examples_sine.png" alt="Alt text" width="100%" height="500">

```Now```

Welcome to the **[Lenoplot](https://github.com/uparfait/lenoplot)** repository!

# What About me

Now I'm  **Uwayo Parfait**, a passionate **Software Developer** and a **Machine Learning Rookie**. I'm very interest in the intersection of technology and artificial intelligence, and aims to create impactful, intelligent systems. With experience in various programming languages and frameworks, Parfait is focused on improving and expanding skills in machine learning, AI, and backend development.

### A Little More About Me:

- **Profession**: Software Developer
- **Specialization**: Machine Learning, Backend Development
- **Passion**: Building intelligent systems, learning new technologies
- **Current Focus**: Exploring and learning advanced machine learning algorithms, AI principles, and the latest technologies in the software development world.

### Find Me on GitHub:

You can check out more of Parfait’s projects on GitHub:  
[Uwayo parfait's](https://github.com/uparfait)

## About the Project

The **Lenoplot** is a result of **Uwayo Parfait's** exploration and experimentation with [Javascript/Electron/Plotly.js]. This project aims to ***Help developers to visualize their graphs without browsers*** and serves as both a learning tool and a functional solution for [Node.js] developers.

## Contributions

If you’d like to contribute to this project, feel free to open an issue or submit a pull request. Your feedback and contributions are highly appreciated.