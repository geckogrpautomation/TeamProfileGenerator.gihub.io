// Dependencies
const http = require('http');
const fs = require('fs');
const path = require('path');

// Set our port to 8080
const PORT = 8080;

// Create a function for handling the requests and responses coming into our server
const handleRequest = (req, res) => {

  // Here we use the fs package to read our index.html file

  const path = req.url;
  console.log(path);

  // Depending on the URL, display a different HTML file.
  switch (path) {
    case '/orgchart':
      return dispRoot(res);

    default:
      return display404(path, res);
  }
};



// Create our server
const server = http.createServer(handleRequest);

// Starts our server
server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

const dispRoot = (res) => {

  let dirPath = path.join(__dirname, "/orgChart.JSON");

  let data = fs.readFile(dirPath, "utf8", (err, data) => {

    if (err) {

      console.log(err);

      // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
      res.writeHead(200, { 'Content-Type': 'text/html' });

      // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
      res.end("Could not read in the correct Organisation chart file. Please contact your site administrator");

    } else {

      const myHTML = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Organisation Chart</title>
            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
            <script type="text/javascript">
            google.charts.load('current', {packages:["orgchart"]});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');
                data.addColumn('string', 'ToolTip');

                // For each orgchart box, provide the name, manager, and tooltip to show.
                data.addRows(${data});

                // Create the chart.
                var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
                // Draw the chart, setting the allowHtml option to true for the tooltips.
                chart.draw(data, {'allowHtml':true});
            }
            </script>
        </head>
        <body>
            <div id="chart_div"></div>
        </body>
        </html>`;

      // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
      res.writeHead(200, { 'Content-Type': 'text/html' });

      // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
      res.end(myHTML);
    }
  });


};


const display404 = (path, res) => {
  const myHTML = `
    <html>
      <body>
        <h1>Error Page Not Found</h1>                
      </body>
    </html>`;

  // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
  res.writeHead(404, { 'Content-Type': 'text/html' });
  console.log(path);
  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
  res.end(myHTML);
};