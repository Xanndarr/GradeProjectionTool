$("#calcButton").click(function() {
  const rows = $("#gradeEntry").find("tr");
  rows.each(function(index, row) {
    const inputs = $(row).find("input");
    let subject = "null";
    if (inputs.length) {
    	subject = inputs[0].name;
    };
    var dropdown = document.getElementById("choose-year");
    var yearGroup = dropdown.options[dropdown.selectedIndex].value;

    console.log($(`#${yearGroup}`).find(`.${subject}`).find('.targetData').text("TEST"));
    console.log(subject)
  });
});


// Show relevant form fields for each year group
function y7showform() {
	$("#year7").show();
	$("#year8").show();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y8showform() {
	$("#year7").hide();
	$("#year8").show();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y9showform() {
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y10showform() {
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").hide();
	$("#year10").show();
	$("#gcses").show();
}

function y11showform() {
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").hide();
	$("#year10").hide();
	$("#gcses").show();
}
