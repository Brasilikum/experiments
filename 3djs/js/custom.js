$(document).ready(function (){
  var data = [4, 8, 15, 16, 23, 10];

  console.log('Running d3');
  // Update…
  var chart = d3.select(".chart").selectAll("div")
    .data(data);

  // Enter…
  chart.enter().append("div")
    .attr("class", "progress")
    .append("div")
      .attr("class", "progress-bar progress-bar-waring")
      .attr("role", "progress-bar")
      .attr("aria-valuenow", function(d){ return d})
      .attr("aria-valuemin", "0")
      .attr("aria-valuemax", "100")
      .style("width", function(d) { return d + "%"; })
      .text(function(d) { return d; });
  // Exit…
  chart.exit().remove();
});