$("#calcButton").click(function() {
  const rows = $("#gradeEntry").find("tr");
  rows.each(function(index, row) {
    const inputs = $(row).find("input");
    let subject = "null";
    let targetGrade;
    if (inputs.length) {
    	subject = inputs[0].name;
    	targetGrade = inputs[0].value;
    };
    const dropdown = document.getElementById("choose-year");
    const yearGroup = dropdown.options[dropdown.selectedIndex].value;
    
    let yearAsNum = convertYearGroupToNum(yearGroup);
    let predictedGrades = predictGrades(yearAsNum, targetGrade);
    console.log(predictedGrades);

    //Set correlating year group box to predicted grade for that year
   	$(`#${yearGroup}`).find(`.${subject}`).find('.targetData').text(targetGrade);

   	//Calculate predicted grades for subsequent years and populate form
   	let yearCounter = yearAsNum;
   	while (predictedGrades.length > 2) {
   		yearCounter++;
   		let newYearGroup = convertNumToYearGroup(yearCounter);
   		$(`#${newYearGroup}`).find(`.${subject}`).find('.targetData').text(predictedGrades.shift());
   	}

   	$("#gcses").find(`.${subject}`).find('.targetData').text(predictedGrades.shift());

  });
});

function convertYearGroupToNum(yearGroup) {
	let year;

	switch(yearGroup) {
    case "year7":
    	year = 7;
    	break;
    case "year8":
    	year = 8;
    	break;
    case "year9":
    	year = 9;
    	break;
    case "year10":
    	year = 10;
    	break;
    case "gcses":
    	year = 11;
    	break;
    default:
    	console.log("year group invalid");
    }

    return year;

}

function convertNumToYearGroup(yearGroup) {
	let year;

	switch(yearGroup) {
    case 7:
    	year = "year7";
    	break;
    case 8:
    	year = "year8";
    	break;
    case 9:
    	year = "year9";
    	break;
    case 10:
    	year = "year10";
    	break;
    case 11:
    	year = "gcses";
    	break;
    default:
    	console.log("number invalid");
    }

    return year;

}



function predictGrades(yearAsNum, targetGrade) {
    const dropdown = document.getElementById("choose-grade-format");
    const gradeFormat = dropdown.options[dropdown.selectedIndex].value;

    switch(gradeFormat) {
    	case "numbers":
    		return predictNumbers(yearAsNum, targetGrade);
    		break;
    	// case "sublevels":
    	//     return predictSublevels(yearAsNum, targetGrade);
    	// 	break;
    	// case "letters":
    	//     return predictLetters(yearAsNum, targetGrade);
    	// 	break;
    	// case "percentages":
    	//     return predictPercentages(yearAsNum, targetGrade);
    	// 	break;
    	default:
    		console.log("grade format invalid");
    }
}

function predictNumbers(year, grade) {
	const predictions = [];
	while (year <= 10) {
		predictions.push(predictedNumberGrade(year.toString(), grade));
		grade = predictedNumberGrade(year.toString(), grade);
		year++;
	}
	return predictions;

}
 
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
