var data = {"labels": ["12 December", "13 December", "14 December", "15 December", "16 December", "17 December", "18 December"], "datasets": [{"languages": [[], [], [], [], [], ["Python", "Other"], ["Python", "JavaScript", "Bash"]], "pointHighlightFill": "#fff", "fillColor": "rgba(151,187,205,0.2)", "pointHighlightStroke": "rgba(151,187,205,1)", "time": [" 0 secs", " 0 secs", " 0 secs", " 0 secs", " 0 secs", "53 mins", "2 hrs 21 mins"], "pointColor": "rgba(151,187,205,1)", "strokeColor": "rgba(151,187,205,1)", "pointStrokeColor": "#fff", "data": [0.0, 0.0, 0.0, 0.0, 0.0, 0.8852777777777778, 2.3561111111111113], "label": "Dataset"}]};
var totalTime = "3 hours 14 minutes";
var languages = ["Python", "JavaScript", "Bash"];
var ctx = document.getElementById("chart").getContext("2d");
var myLineChart = new Chart(ctx).Line(data, {
  tooltipTemplate: function(valuesObject){
    var label = valuesObject.label;
    var idx = data.labels.indexOf(label);
    var result = data.datasets[0].time[idx];
    if (data.datasets[0].languages[idx].length !== 0)
      result += " [" + data.datasets[0].languages[idx].join(", ") + "]"
    return result;
  }
});
document.getElementById("summary").innerHTML = "I have written code for " + totalTime + " in the last week in mostly " + languages.join(", ") + ".";
