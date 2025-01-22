// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    metadata = data.metadata;
    // Filter the metadata for the object with the desired sample number
    desiredSample = metadata.filter(function(el){return el.id == sample;})
    info = desiredSample[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    metadataSlot = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    metadataSlot.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for(const property in info){
      metadataSlot.append('div').text(property +": " + info[property] ).attr("id",property)
    }
    console.log(data)
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    field =data.samples;

    // Filter the samples for the object with the desired sample number
    desiredSample = field.filter(function(el){return el.id == sample;})[0]

    // Get the otu_ids, otu_labels, and sample_values
    console.log(desiredSample)
    otu_ids = desiredSample.otu_ids
    otu_labels = desiredSample.otu_labels
    sample_values = desiredSample.sample_values
    console.log(otu_ids)
    // Build a Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode:'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
      }
    }

    let bubbleData = [bubbleTrace];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {
        title:"OTU ID",
      },
      yaxis:
      {
        title:"Number of Bacteria",
      },
    }
    // Render the Bubble Chart
    Plotly.newPlot("bubble",bubbleData,bubbleLayout)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    slicedId = otu_ids.slice(0,10);
    slicedValue = sample_values.slice(0,10);
    console.log(slicedId)
    slicedId.reverse()
    slicedValue.reverse()
    let stringed = [slicedId.length]
    for(i=0;i<slicedId.length;i++){
      stringed[i] = slicedId[i].toString();
    }
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barTrace = {
      x: slicedValue,
      yticks: slicedId,
      text: stringed,
      type: 'bar',
      orientation: "h",
      
    };
    let barData = [barTrace]
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
    };
    // Render the Bar Chart
    Plotly.newPlot("bar", barData,barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    dropdown = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for(i=0;i<names.length;i++){
      dropdown.append("option").text(names[i]);
    }

    // Get the first sample from the list
    firstName = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstName)
    buildMetadata(firstName)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
