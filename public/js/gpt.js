$(document).ready(function() {
	resetAllFields();
});

let error = 0;
$("#calcButton").click(function() {
	$('.error').html("");
	error = 0;
	const rows = $("#gradeEntry").find("tr");
  	rows.each(function(index, row) {
    const inputs = $(row).find("input");
    let subject = "null";
    let targetGrade;
    if (inputs.length) {
    	subject = inputs[0].name;
    	targetGrade = inputs[0].value;
			const yearGroup = $("#choose-year")[0].value;

	    populateBoxes(yearGroup, targetGrade, subject);
    };
  });
	$('html, body').animate({
   scrollTop: $(document).height()-$(window).height()},
   1000,
   "swing"
	);
});

function populateBoxes(yearGroup, targetGrade, subject) {
	let yearAsNum = convertYearGroupToNum(yearGroup);
	let predictedGrades = predictGrades(yearAsNum, targetGrade);
   //Set correlating year group box to predicted grade for that year
	
	if (error == 0) {
   		$(`#${yearGroup}`).find(`.${subject}`).find('.targetData').text(formatGrade(targetGrade));
	}

   	//Calculate predicted grades for subsequent years and populate form
   	let yearCounter = yearAsNum;

   	while (predictedGrades.length > 1) {
   		yearCounter++;
   		let newYearGroup = convertNumToYearGroup(yearCounter);
   		$(`#${newYearGroup}`).find(`.${subject}`).find('.targetData').text(predictedGrades.shift());
   	}

   	$("#gcses").find(`.${subject}`).find('.targetData').text(predictedGrades.shift());
}

function formatGrade(grade) {
    let formattedGrade = grade;
    if ($("#choose-grade-format-ks3").is(":visible") && $("#choose-grade-format-ks3")[0].value === "percentages") {
        formattedGrade = formattedGrade + "%";
    } else if ($("#choose-grade-format-ks4").is(":visible") && $("#choose-grade-format-ks4")[0].value === "letters") {
        formattedGrade = formattedGrade.toUpperCase();
    }
    return formattedGrade;
}

$('#gcses').find('.btn-up').click( function(){
	$('.error').html("");
	error = 0;
	let subject = $(this).parent().parent().prop('className');
	const rows = $("#predictions-container").find(`.${subject}`);
	let currentGrade = $(rows[rows.length-1]).find('.targetData').text();
	let gradeAbove = returnGradeAbove(currentGrade);
	$(rows[rows.length-1]).find('.targetData').text(gradeAbove);

	const gradeFormat = $('#chooseGradeDiv').find('select:visible')[0].value;

	let projections = [];
	switch(gradeFormat) {
		case 'numbers':
			projections = defaultProjectionsNumbers(gradeAbove);
			break;
		case 'letters':
			projections = defaultProjectionsLetters(gradeAbove);
			break;
		case 'sublevels':
			projections = defaultProjectionsSublevels(gradeAbove);
			break;
		case 'percentages':
			projections = defaultProjectionsPercentages(gradeAbove);
			break;
		default:
			$('.error').html("There has been an error. Please try again.");
			error = 1;
	}

	for (let i=0; i < rows.length-2; i++) {
		$(rows[i]).find('.targetData').text(formatGrade(projections.shift()));
	}

});

$('#gcses').find('.btn-down').click( function(){
	let subject = $(this).parent().parent().prop('className');
	let originalTargetGrade = $('#gradeEntry').find(`input[name="${subject}"]`)[0].value;

	const yearGroup = $('#choose-year')[0].value;

	let originalPredictions = predictGrades(convertYearGroupToNum(yearGroup), originalTargetGrade);
	const rows = $("#predictions-container").find(`.${subject}`);

	let currentGrade = $(rows[rows.length-1]).find('.targetData').text();
	let gradeBelow = returnGradeBelow(currentGrade);

	const gradeFormat = $('#chooseGradeDiv').find('select:visible')[0].value;

	let projections = [];
	switch(gradeFormat) {
		case 'numbers':
			projections = defaultProjectionsNumbers(gradeBelow);
			break;
		case 'letters':
			projections = defaultProjectionsLetters(gradeBelow);
			break;
		case 'sublevels':
			projections = defaultProjectionsSublevels(gradeBelow);
			break;
		case 'percentages':
			projections = defaultProjectionsPercentages(gradeBelow);
			break;
		default:
			$('.error').html("An unexpected error has occurred. Please try again.");
			error = 1;
	}

	const originalGCSEGrade = originalPredictions[originalPredictions.length - 1];
	if (gradesArray.indexOf(gradeBelow) < gradesArray.indexOf(originalGCSEGrade)) {
		$('.error').html("Cannot reduce grade below value of your original target grade.");
		error = 1;
	} else if (gradesArray.indexOf(gradeBelow) == gradesArray.indexOf(originalGCSEGrade)) {
		populateBoxes(yearGroup, originalTargetGrade, subject);
	} else {
		$(rows[rows.length-1]).find('.targetData').text(gradeBelow);
		for (let i=0; i < rows.length-2; i++) {
			$(rows[i]).find('.targetData').text(formatGrade(projections.shift()));
		}
	}


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
    	$('.error').html("An unexpected error has occurred. Please try again.");
    	error = 1;
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
    	$('.error').html("An unexpected error has occurred. Please try again.");
    	error = 1;
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

  targetGrade = targetGrade.trim();

  switch(gradeFormat) {
  	case "numbers":
  		if (yearAsNum == 7 && gradesNumbers.indexOf(targetGrade) > gradesNumbers.indexOf('5+')) {
  			$('.error').html("Highest target grade for year 7 is 5+.");
  			error = 1;
  			return;
  		} else if (yearAsNum == 8 && gradesNumbers.indexOf(targetGrade) > gradesNumbers.indexOf('8+')) {
  			$('.error').html("Highest target grade for year 8 is 8+.");
  			error = 1;
  			return;
  		} else if (gradesNumbers.indexOf(targetGrade) == -1) {
  			$('.error').html("One of your number grades is invalid.");
  			error = 1;
  			return;
  		}
  		return predictNumbers(yearAsNum, targetGrade);
  		break;
  	case "sublevels":
  		if (sublevels.indexOf(targetGrade) == -1) {
  			$('.error').html("One of your sublevel grades is invalid.");
  			error = 1;
  			return;
  		}
  	    return predictSublevels(yearAsNum, targetGrade);
  		break;
  	case "letters":
  		targetGrade = targetGrade.toUpperCase();
  		let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'U'];
  		if (letters.indexOf(targetGrade) == -1) {
  			$('.error').html("One of your letter grades is invalid.");
  			error = 1;
  			return;
  		}
  	    return predictLetters(targetGrade);
  		break;
  	case "percentages":
        if (isNaN(targetGrade)) {
            $('.error').html("Please enter only numbers between 1 and 100.");
            error = 1;
            return;
  	  	} else if ( 100 < targetGrade || targetGrade < 0) {
  			$('.error').html("Please enter a number between 1 and 100.");
  			error = 1;
  			return;
  		}
  	    return predictPercentages(yearAsNum, targetGrade);
  		break;
  	default:
  		$('.error').html("An unexpected error has occurred. Please try again.");
  		error = 1;
  }
}


function predictNumbers(year, grade) {
	let predictions = [];
	if (year == 10) {
		grade = predictedNumberGrade(year.toString(), grade);
		predictions.push(grade);

	} else {
		while (year < 10) {
			grade = predictedNumberGrade(year.toString(), grade);
			predictions.push(grade);
			year++;
		}
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

$("#choose-year").change(function() {
	const dropdown = $("#choose-year");
	const year = dropdown[0].value;
	switch (year) {
		case "year7":
			y7showform();
			break;
		case "year8":
			y8showform();
			break;
		case "year9":
			y9showform();
			break;
		case "year10":
			y10showform();
			break;
		case "gcses":
			y11showform();
			break;
		default:
	}
	$("html").css("height", "initial");
});


function resetFields() {
    let inputs = $(document).find("input");
    $('#predictions-container').find(".targetData").text("");
    inputs.each(function(index, input) {
        input.value='';
    });
}

function resetAllFields() {
    $('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').hide();
    resetFields();
	$('#year7').hide();
	$('#year8').hide();
	$('#year9').hide();
	$('#year10').hide();
	$('#gcses').hide();
}

// Show relevant form fields for each year group
function y7showform() {
    resetFields();
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').show();
	$("#year7").show();
	$("#year8").show();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y8showform() {
    resetFields();
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').show();
	$("#year7").hide();
	$("#year8").show();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y9showform() {
    resetFields();
	$('#choose-grade-format-ks4').hide();
	$('#choose-grade-format-ks3').show();
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").show();
	$("#year10").hide();
	$("#gcses").show();
}

function y10showform() {
    resetFields();
	$('#choose-grade-format-ks3').hide();
	$('#choose-grade-format-ks4').show();
	$("#year7").hide();
	$("#year8").hide();
	$("#year9").hide();
	$("#year10").show();
	$("#gcses").show();
}
