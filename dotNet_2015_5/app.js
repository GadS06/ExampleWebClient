var InitialData = (function () {
    function InitialData() {
    }
    ;
    return InitialData;
})();
function GetInitialDataFromTheSite(data) {
    data.PointX = $("#point_X").val();
    data.PointY = $("#point_Y").val();
    data.NumOfStepsTime = $("#numOfSteps_Time").val();
    data.StepLengthTime = $("#stepLength_Time").val();
    data.NumOfStepsX = $("#numOfSteps_X").val();
    data.StepLengthX = $("#stepLength_X").val();
    data.NumOfStepsY = $("#numOfSteps_Y").val();
    data.StepLengthY = $("#stepLength_Y").val();
    data.ZeroFunc = $("#zeroFunc").val();
    data.BorderFunc = $("#borderFunc").val();
}
function ExampleFill() {
    $("#point_X").val("0.5");
    $("#point_Y").val("0.5");
    $("#numOfSteps_Time").val("10");
    $("#stepLength_Time").val("0.001");
    $("#numOfSteps_X").val("1000");
    $("#stepLength_X").val("0.001");
    $("#numOfSteps_Y").val("1000");
    $("#stepLength_Y").val("0.001");
    $("#zeroFunc").val("x*(1-x)*y*(1-y)");
    $("#borderFunc").val("0");
}
function StartCount() {
    var data;
    data = new InitialData();
    GetInitialDataFromTheSite(data);
    $.ajax({
        url: "http://localhost:9000/api/count",
        type: "PUT",
        dataType: "json",
        data: data,
        success: function (result) {
            GetResult();
        }
    });
}
function GetResult() {
    $.getJSON("http://localhost:9000/api/count", function (data) {
        DrawGraph(data);
    });
}
google.load('visualization', '1', { packages: ['corechart', 'line'] });
google.setOnLoadCallback(DrawEmptyGraph);
function DrawEmptyGraph() {
    var pairs = new Array();
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'time');
    data.addColumn('number', 'value');
    data.addRows(pairs);
    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Value'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
function DrawGraph(nums) {
    var pairs = new Array();
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'time');
    data.addColumn('number', 'value');
    nums.forEach(function (item, i, arr) {
        if ($.isNumeric(item))
            pairs.push([i, item]);
    });
    data.addRows(pairs);
    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Value'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
//# sourceMappingURL=app.js.map