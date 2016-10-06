$(document).ready(function() {
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').hide();
	$('#year7').hide();
	$('#year8').hide();
	$('#year9').hide();
	$('#year10').hide();
	$('#gcses').hide();
});

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
   	while (predictedGrades.length > 1) {
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
	let dropdown;

	if (yearAsNum == 10 || yearAsNum == 11) {
    	dropdown = document.getElementById("choose-grade-format-ks4");		
	} else {
		dropdown = document.getElementById("choose-grade-format-ks3");	
	}

    const gradeFormat = dropdown.options[dropdown.selectedIndex].value;

    switch(gradeFormat) {
    	case "numbers":
    		return predictNumbers(yearAsNum, targetGrade);
    		break;
    	case "sublevels":
    	    return predictSublevels(yearAsNum, targetGrade);
    		break;
    	case "letters":
    	    return predictLetters(targetGrade);
    		break;
    	case "percentages":
    	    return predictPercentages(yearAsNum, targetGrade);
    		break;
    	default:
    		console.log("grade format invalid");
    }
}

function predictNumbers(year, grade) {
	let predictions = [];
	while (year < 10) {
		console.log(year);
		grade = predictedNumberGrade(year.toString(), grade);
		predictions.push(grade);
		year++;
	}
	return predictions;

}

function predictSublevels(year, grade) {
	let predictions = [];
	while (year < 9) {
		year++;
		grade = predictedSublevelsGrade(grade);
		predictions.push(grade);
	}
	predictions.push(convertSublevelToGCSEGrade(grade));
	return predictions;
}
 
function predictPercentages(year, grade) {
	let predictions = [];
	while (year < 9) {
		year++;
		grade = predictedPercentageGrade(grade);
		predictions.push(grade + '%');
	}
	predictions.push(convertPercentageToGCSEGrade(grade));
	return predictions;
}

//year10 only 
function predictLetters(grade) {
	let predictions = [];
	predictions.push(predictedGCSEGradeY10Letter(grade));
	return predictions;
}

// Show relevant form fields for each year group
function y7showform() {
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').show();
	$("#year7").show();
	$("#year8").show();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y8showform() {
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').show();
	$("#year7").hide();
	$("#year8").show();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y9showform() {
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').show();
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y10showform() {
	$('#choose-grade-format-ks3').hide();
	$('#choose-grade-format-ks4').show();
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").hide();
	$("#year10").show();
	$("#gcses").show();
}

function y11showform() {
	$('#choose-grade-format-ks3').hide();
	$('#choose-grade-format-ks4').show();
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").hide();
	$("#year10").hide();
	$("#gcses").show();
}