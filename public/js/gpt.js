$(document).ready(function() {
	resetAllFields();
	var careerGrades = ['4(C-)','5(C)','6(B)','7(A)','8(A*)','9(A*)']
    populateDropdown('career-grade-select', careerGrades);
});

$('.configure-button').click(function() {
	if (this.className == 'configure-button year-select') {
		$('#chooseYearDiv').children('button').each(function () {
			console.log(this.classList);
			this.classList.remove('button-clicked');
		});
	}
	if (this.className == 'configure-button format-select') {
		$('#chooseGradeFormatDiv').children('button').each(function () {
			console.log(this.classList);
			this.classList.remove('button-clicked');
		});
	}
	$(this).addClass('button-clicked');
	populateDropdowns(this.id)
});

function populateDropdowns(id) {
	if (id == 'select-sublevels') {
		var sublevels = ['1c', '1b','1a', '2c','2b','2a', '3c', '3b','3a', '4c','4b','4a',
                   '5c', '5b','5a', '6c','6b','6a', '7c','7b','7a', '8c', '8b','8a',
                   '8a+']
        populateDropdown('current-grade-select', sublevels)
    } else if (id == 'select-numbers') {
    	var numbers = ['1','1+','2-','2','2+','3-','3','3+','4-','4','4+','5-','5','5+','6-'
                          ,'6','6+','7-','7','7+','8-','8','8+', '9-','9', '9+']
    	populateDropdown('current-grade-select', numbers)
    }
};

function populateDropdown(dropdownClass, values) {
	var dropdown = $("." + dropdownClass);
	dropdown.empty();
	dropdown.append($("<option selected='selected'/>").text(''));
	for (x in values) {
		dropdown.append($("<option />").text(values[x]));
	}
}

$("#calculate-button").click(function() {
	$("#back-button-2").show();
	$("#back-button-1").hide();
	$(".current-grade-select").attr("disabled", true);
	var gradeIds = ['english','maths', 'science', 'custom1-grade', 'custom2-grade'];
	for (x in gradeIds) {
		var grade = $("#career-" + gradeIds[x] + "-grade").val();
		var required = getRequiredGrades(grade);
		if ($("#select-year-10").css('background-color') == 'rgb(255, 255, 255)') {
			var year10required = required[0];
			$('#year10-container').find("." + gradeIds[x]).find('.targetData').text(year10required);
			y10showform();
		}
		if ($("#select-year-9").css('background-color') == 'rgb(255, 255, 255)') {
			var year9required = required[1];
			$('#year10-container').find("." + gradeIds[x]).find('.targetData').text(required[0]);
			$('#year9-container').find("." + gradeIds[x]).find('.targetData').text(year9required);
			y9showform();
		}
		
	}
});

function getRequiredGrades(grade) {
	// returns an array containing the required grades for y10/y9
	var required;
	switch(grade) {
	    case "4(C-)":
	    	required = ["3(D)","2-", "4a"];
	    	break;
	    case "5(C)":
	    	required = ["4(C-)","3-", "5a"];
	    	break;
	    case "6(B)":
	    	required = ["5(C)", "4-"];
	    	break;
	    case "7(A)":
	    	required = ["6(B)", "5-"];
	    	break;
	    case "8(A*)":
	    	required = ["7(A)", "6-"];
	    	break;
	    case "9(A*)":
	    	required = ["8(A*)", "7-"];
	    	break;
	    default:
	    	required = [];
    }

    return required;
}

var error = 0;
$("#next-button").click(function() {
	$(this).hide();
	$(".career-grade-select").attr("disabled", true);
	$("#calculate-button").show()
	$("#back-button-1").show();
	$("#current-grade-container").addClass('visible');
	$("#current-grade-container").show();

	$("#custom-subject1").prop("readonly", true);
	var subject1 = $("#custom-subject1").val();
	$(".custom-subject1-copy").html(subject1);
	
	$("#custom-subject2").prop("readonly", true);
	var subject2 = $("#custom-subject2").val();
	$(".custom-subject2-copy").html(subject2);
});

$('#back-button-1').click(function() {
	$(this).hide();
	$("#next-button").show();
	$("#calculate-button").hide()
	$("#current-grade-container").hide();
	$("#custom-subject1").prop("readonly", false);
	$("#custom-subject2").prop("readonly", false);
	$(".career-grade-select").attr("disabled", false);
});

$('#back-button-2').click(function() {
	$(this).hide();
	$("#back-button-1").show();
	$("#year10-container").hide();
	$("#year9-container").hide();
	$(".current-grade-select").attr("disabled", false);
});

function populateBoxes(yearGroup, targetGrade, subject) {
	var yearAsNum = convertYearGroupToNum(yearGroup);
	var predictedGrades = predictGrades(yearAsNum, targetGrade);
	console.log(predictedGrades[0]);
   //Set correlating year group box to predicted grade for that year

	if (error == 0) {
		if (yearAsNum == 11) {
			$("" + yearGroup).find("" + subject).find('.targetData').text(predictedGrades.shift());
		} else {
   		$("" + yearGroup).find("" + subject).find('.targetData').text(formatGrade(targetGrade));
		}
	}

   	//Calculate predicted grades for subsequent years and populate form
   	var yearCounter = yearAsNum;

   	while (predictedGrades.length > 1) {
   		yearCounter++;
   		var newYearGroup = convertNumToYearGroup(yearCounter);
   		$("" +newYearGroup).find("" + subject).find('.targetData').text(predictedGrades.shift());
   	}

   	$("#gcses").find("" + subject).find('.targetData').text(predictedGrades.shift());
}

function formatGrade(grade) {
    var formattedGrade = grade;
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
	var subject = $(this).parent().parent().prop('className');
	var rows = $("#predictions-container").find("" + subject);
	var currentGrade = $(rows[rows.length-1]).find('.targetData').text();
	var gradeAbove = returnGradeAbove(currentGrade);
	$(rows[rows.length-1]).find('.targetData').text(gradeAbove);

	var gradeFormat = $('#chooseGradeDiv').find('select:visible')[0].value;

	var projections = [];
	switch(gradeFormat) {
		case 'numbers':
			projections = defaultProjectionsNumbers(gradeAbove);
			break;
		case 'letters':
			projections = defaultProjectionsletters(gradeAbove);
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

	var year = $("#choose-year")[0].value;
	console.log(year);
	if (year === 'year10') {
		$(rows[3]).find('.targetData').text(formatGrade(projections.pop()));
	} else {
		for (var i=0; i < rows.length-2; i++) {
			$(rows[i]).find('.targetData').text(formatGrade(projections.shift()));
		}
	}

});

$('#gcses').find('.btn-down').click( function(){
	var subject = $(this).parent().parent().prop('className');
	var originalTargetGrade = $('#gradeEntry').find('input[name=" + subject + "]')[0].value;

	var yearGroup = $('#choose-year')[0].value;

	var originalPredictions = predictGrades(convertYearGroupToNum(yearGroup), originalTargetGrade);
	var rows = $("#predictions-container").find("" + subject);

	var currentGrade = $(rows[rows.length-1]).find('.targetData').text();
	var gradeBelow = returnGradeBelow(currentGrade);

	var gradeFormat = $('#chooseGradeDiv').find('select:visible')[0].value;

	var projections = [];
	switch(gradeFormat) {
		case 'numbers':
			projections = defaultProjectionsNumbers(gradeBelow);
			break;
		case 'letters':
			projections = defaultProjectionsletters(gradeBelow);
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

	var originalGCSEGrade = originalPredictions[originalPredictions.length - 1];
	if (gradesArray.indexOf(gradeBelow) < gradesArray.indexOf(originalGCSEGrade)) {
		$('.error').html("Cannot reduce grade below value of your original target grade.");
		error = 1;
	} else if (gradesArray.indexOf(gradeBelow) == gradesArray.indexOf(originalGCSEGrade)) {
		populateBoxes(yearGroup, originalTargetGrade, subject);
	} else {
		$(rows[rows.length-1]).find('.targetData').text(gradeBelow);
		var year = $("#choose-year")[0].value;
		if (year === 'year10') {
			$(rows[3]).find('.targetData').text(formatGrade(projections.pop()));
		} else {
			for (var i=0; i < rows.length-2; i++) {
				$(rows[i]).find('.targetData').text(formatGrade(projections.shift()));
			}
		}
	}


});


function convertYearGroupToNum(yearGroup) {
	var year;

	switch(yearGroup) {
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
	var year;

	switch(yearGroup) {
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
	var dropdown;

	if (yearAsNum == 10 || yearAsNum == 11) {
    dropdown = document.getElementById("choose-grade-format-ks4");
	} else {
		dropdown = document.getElementById("choose-grade-format-ks3");
	}

  var gradeFormat = dropdown.options[dropdown.selectedIndex].value;

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
  		var letters = ['A*', 'A', 'B', 'C', 'D', 'E', 'F', 'U'];
  		if (letters.indexOf(targetGrade) == -1) {
  			$('.error').html("One of your letter grades is invalid.");
  			error = 1;
  			return;
  		}
  	    return predictletters(targetGrade);
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
	var predictions = [];
	if (year == 10 || year == 11) {
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
	var predictions = [];
	while (year < 9) {
		year++;
		grade = predictedSublevelsGrade(grade);
		predictions.push(grade);
	}
	predictions.push(convertSublevelToGCSEGrade(grade));
	return predictions;
}


//year10 only
function predictletters(grade) {
	var predictions = [];
	predictions.push(predictedGCSEGradeY10letter(grade));
	return predictions;
}

$("#choose-year").change(function() {
	var dropdown = $("#choose-year");
	var year = dropdown[0].value;
	switch (year) {
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
    var inputs = $(document).find("input");
    $('#predictions-container').find(".targetData").text("");
    inputs.each(function(index, input) {
        input.value='';
    });
}

function resetAllFields() {
    resetFields();
	$('.error').html("");
}

// Show relevant form fields for each year group

function y10showform() {
    resetFields();
	$('.error').html("");
	$("#year10-container").addClass('visible');
	$("#year10-container").show();
}

function y9showform() {
	$('.error').html("");
	$("#year10-container").addClass('visible');
	$("#year9-container").addClass('visible');
	$("#year10-container").show();
	$("#year9-container").show();
}


