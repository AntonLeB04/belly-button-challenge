const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){
    console.log(date);
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
    makeDemographics(entry_1);
    });
};

function makeBarGraph(sample) {
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        let results = sample_data.filter(id => id.id == sample);
        let first_results = results[0];
        console.log(first_result);

        let sample_values = first_results.sample_values.slice(0,10);
        let otu_ids = first_results.otu_ids.slice(0,10);
        let otu_labels = first_results.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        let bar_trace = {
            x:sample_values.reverse(),
            y: otu_ids.map(item => ``)
        }
    })
}
