# Chart feature for the nordic child theme

This is the wip chart feature that was supposed to be implemented as a gutenberg block. I didn't get too far with it; mostly only got to try out the chart.js library, but the file I've worked is located in `assets/src/js/frontend/charts.js`

It works by extracting csv data from a published Google sheet. The first column will be the x axis, and any following axes are plotted over the x axis as different data sets. The script can be included as a module in a html file containing two empty `<div>` elemets with `id="chartRender"` and `id="chartConfig"` respectively. An example vite index file could look like the following: 

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="chartRender"></div>
    <div id="chartConfig"></div>
    <script type="module" src="charts.js"></script>
  </body>
</html>
```
