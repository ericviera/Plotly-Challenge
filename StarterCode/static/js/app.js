function Plots(id) {
    // Fetch the JSON data
    d3.json("data/samples.json").then(function (data) {
        console.log(data);
        const dataPromise = d3.json("data/samples.json");
        console.log(dataPromise);
        // -----------------------------------------------------------------
        //Grab values from the data json object to build the plots
        // filter the samples by ID
        var samples = data.samples.filter(sample => sample.id === id)[0];
        // Top 10 sample values for bar chart
        var sampleVal = samples.sample_values.slice(0, 10).reverse();
        // Top 10 otu_ids for bar chart
        var otuids = (samples.otu_ids.slice(0, 10)).reverse(); 
        // OTU label
        var otu_ids = otuids.map(d => "OTU " + d)
        // Top 10 labels
        var labels = samples.otu_labels.slice(0, 10);
        /* var washfreq = data.metadata.map(dta => dta.washfreq) */
        // -----------------------------------------------------------------
        //create trace and plot Bar Graph
        var trace1 = {
            x: sampleVal,
            y: otu_ids,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        var data1 = [trace1];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };
        Plotly.newPlot("bar", data1, layout);
        // -----------------------------------------------------------------
        // create trace and plot Bubble Chart
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        }
        var data2 = [trace2];

        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        Plotly.newPlot("bubble", data2, layout); 
        // -----------------------------------------------------------------
        // create trace and plot Pie Chart
        var trace3 = {
            labels: otu_ids,
            values:sampleVal,
            type:"pie",
        }
        var data3 = [trace3] 

        Plotly.newPlot("gauge", data3);
        // -----------------------------------------------------------------
        // create trace and plot Guage
/*         var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [0,9],
                        tickmode:"array"
                    },
                    steps: [ 
                    { range: [0, 1], color: "lightgray" },
                    { range: [1, 2], color: "lightgray" },
                    { range: [2, 3], color: "gray" },
                    { range: [3, 4], color: "gray" },
                    { range: [4, 5], color: "gray" },
                    { range: [5, 6], color: "yellow" },
                    { range: [6, 7], color: "orange" },
                    { range: [7, 8], color: "lightgreen" },
                    { range: [8, 9], color: "green" }
                    ],

                }
            }
        ];
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", data, layout); */
        // -----------------------------------------------------------------
    });
};
// -------------------------------------------------------------------------
// create the function for the change event
function optionChanged(id) {
    Plots(id);

}
// -------------------------------------------------------------------------
// Initial Data Render
function init() {
    // Read Data
    d3.json("data/samples.json").then((data)=> {
        // call the functions to display the data and the plots to the page
        Plots(data.names[0]);
    });
}

init();