var data = [
    { "str_lab": "Cars and Vans", "num": 48 },
    { "str_lab": "Heavy Freight Vehicles", "num": 16 },
    { "str_lab": "Medium Freight Vehicles", "num": 9 },
    { "str_lab": "International Shipping", "num": 10 },
    { "str_lab": "International Aviation", "num": 6 },
    { "str_lab": "Bus", "num": 6 },
    { "str_lab": "Domestic Aviation", "num": 5 },
    { "str_lab": "Rail", "num": 1 }
];

var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2;

var outerRadius = radius - 10,
    innerRadius = radius - 100;

var color = d3.scale.ordinal()
    .range(["#239FDD", "#094AA1", "#269C37", "#83BD23", "#FAC700", "#EF7019", "#E32031", "#D946A0"]);

var arc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) { return d.num; });

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Center text
var centerText = svg.append('text')
    .attr('dy', '0.2em')
    .attr('class', 'center-text')
    .attr('text-anchor', 'middle')
    .style('fill', '#000000')
    .style('font-size', '64px')
    .style('font-weight', 'bold')
    .text("%");

// Add chart segments
var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

g.append("path")
    .attr("d", arc)
    .style("fill", function (d) { return color(d.data.str_lab); })
    .attr("class", function (d) {
        return d.data.str_lab.toLowerCase().replace(/\s+/g, '-');
    })
    .style("cursor", "pointer")
    .on("mouseover", function (d) {
        // Highlight the hovered segment
        g.selectAll("path").style("opacity", 0.3);
        d3.select(this).style("opacity", 1);

        // Update center text
        centerText.text("")
            .append("tspan")
            .style("font-size", "64px")
            .style("font-weight", "bold")
            .text(d.data.num);

        centerText
            .append("tspan")
            .style("font-size", "64px")
            .style("font-weight", "bold")
            .text("%");

        centerText
            .append("tspan")
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dy", "1.2em")
            .text(d.data.str_lab);
    })
    .on("mouseout", function () {
        // Reset segment opacity
        g.selectAll("path").style("opacity", 1);
        // Reset center text
        centerText.text("%");
    });

// Add hover interaction for legend
d3.selectAll(".legend li")
    .on("mouseover", function () {
        var hoveredClass = d3.select(this).select("span").attr("class").split(' ')[1];

        // Highlight corresponding chart segment
        svg.selectAll("path").style("opacity", 0.3);
        svg.select("." + hoveredClass).style("opacity", 1);

        var hoveredData = data.find(function (d) {
            return d.str_lab.toLowerCase().replace(/\s+/g, '-') === hoveredClass;
        });

        if (hoveredData) {
            centerText.text("")
                .append("tspan")
                .style("font-size", "64px")
                .style("font-weight", "bold")
                .text(hoveredData.num);

            centerText
                .append("tspan")
                .style("font-size", "64px")
                .style("font-weight", "bold")
                .text("%");

            centerText
                .append("tspan")
                .style("font-size", "14px")
                .attr("x", 0)
                .attr("dy", "1.2em")
                .text(hoveredData.str_lab);
        }
    })
    .on("mouseout", function () {
        svg.selectAll("path").style("opacity", 1);
        centerText.text("%");
    });
