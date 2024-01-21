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
    //makeBubbleGraph(entry_1);
    makeMetaData(entry_1);
    });
};

function makeBarGraph(sample) {
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        let results = sample_data.filter(id => id.id == sample);
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
    makeMetaData(value);
};

init();