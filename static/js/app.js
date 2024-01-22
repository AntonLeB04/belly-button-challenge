const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){
    console.log(data);
});

function init(){
    let dropDownMenu = d3.select('#selDataset');

    d3.json(url).then((data) => {
    let names = data.names;
    console.log(names);
        for (id of names){
            dropDownMenu.append("option").attr("value", id).text(id);
        };
    let entry_1 = names[0];
    console.log(entry_1);
    
    makeBarGraph(entry_1);
    makeBubbleGraph(entry_1);
    makeMetaData(entry_1);
    });
};

function makeBarGraph(sample) {
    d3.json(url).then((data) => {
        let sampleData = data.samples;
        let results = sampleData.filter(result => result.id == sample);
        let first_results = results[0];
        console.log(first_results);

        let sample_values = first_results.sample_values.slice(0,10);
        let otu_ids = first_results.otu_ids.slice(0,10);
        let otu_labels = first_results.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        let trace_bar = {
            x:sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${id}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        let data_bar = [trace_bar];


        let layout = {title: "Top Ten OTUs"};
        Plotly.newPlot("bar", [data_bar], layout);
    });
};

function makeBubbleGraph(sample) {
    d3.json(url).then((data) => {
        let infoSample = data.samples;

        let value = infoSample.filter(result => result.id == sample);

        let dataValue = value[0];

        let otu_ids = dataValue.otu_ids;

        let otu_labels = dataValue.otu_labels;

        let sample_values = dataValue.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let trace_bubble = {
            x: otu_ids,
            y: sample_values,
            text:otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };
        Plotly.newPlot("bubble", [trace_bubble], layout)
    });

};

function makeMetaData(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);

        console.log(value);

        let dataValue = value[0];

        d3.select("#sample-metadata").text("");

        Object.entries(dataValue).forEach(([key, value]) =>{
            console.log(key, value);
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`);
        });
    });
};

function optionChanged(value){

    console.log(value);

    makeBarGraph(value);
    makeBubbleGraph(value);
    makeMetaData(value);
};

init();