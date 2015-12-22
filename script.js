var data = {"labels": ["16 December", "17 December", "18 December", "19 December", "20 December", "21 December", "22 December"], "datasets": [{"languages": [[], ["Python", "Other"], ["Python", "JavaScript", "HTML"], ["Java", "XML", "Other"], ["Python", "JavaScript", "C++"], ["Python"], ["JavaScript"]], "pointHighlightFill": "#fff", "fillColor": "rgba(151,187,205,0.2)", "pointHighlightStroke": "rgba(151,187,205,1)", "time": [" 0 secs", "53 mins", "3 hrs 3 mins", "1 hr 13 mins", "2 hrs 24 mins", "3 mins", "37 mins"], "pointColor": "rgba(151,187,205,1)", "strokeColor": "rgba(151,187,205,1)", "pointStrokeColor": "#fff", "data": [0.0, 0.8852777777777778, 3.069722222222222, 1.2344444444444445, 2.4077777777777776, 0.06277777777777778, 0.6186111111111111], "label": "Dataset"}]};
var totalTime = "8 hours 16 minutes";
var languages = ["Python", "JavaScript", "Java"];
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

