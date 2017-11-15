var currentStep = 1;
var DEBUGGING = true;

$(document).ready(function() {
	var careerGrades = ['9(A*)','8(A*)','7(A)','6(B)','5(C)','4(C-)']
    populateDropdown('career-grade-select', careerGrades);
});

$('.year-select').click(function() {
	$('#choose-year').children('button').each(function () {
		this.classList.remove('button-clicked');
	});
})

$('.format-select').click(function() {
	$('#choose-grade-format').children('button').each(function () {
		this.classList.remove('button-clicked');
	});
})

$('.configure-button').click(function() {
	if (this.id == 'select-year-9') {
		$('#select-sublevels').removeClass('hidden');
		$('#select-numbers').removeClass('button-clicked');
		$('#select-sublevels').show();
	}

	if (this.id == 'select-year-10') {
		$('#select-sublevels').hide();
		$('#select-numbers').addClass('button-clicked');
		$('#select-sublevels').removeClass('button-clicked');
		populateDropdowns('select-numbers')
	}

	populateDropdowns(this.id)
	$(this).addClass('button-clicked');
});

$("#calculate-button").click(function() {
	if (stepComplete(currentStep) || DEBUGGING) {
		$(this).hide();
		$(".career-grade-select").attr("disabled", true);

		var gradeIds = ['english','maths', 'science', 'custom1', 'custom2'];
		for (x in gradeIds) {
			var gcseGrade = $("#career-" + gradeIds[x] + "-grade").val();
			var required = getRequiredGrades(gcseGrade);
			var year10required = required[0];
			var currentGrade = $("#current-" + gradeIds[x] + "-grade").val();

			if ($("#select-year-10").hasClass('button-clicked')) {
				$('#year10-container').find("." + gradeIds[x]).find('.targetData').text(year10required);
				y10showform();

				addColourIndicatorNumbers(currentGrade, year10required);
			}

			if ($("#select-year-9").hasClass('button-clicked')) {
				var year9required;

				if ($('#select-sublevels').hasClass('button-clicked')) {
					year9required = required[2];
					addColourIndicatorSublevels(currentGrade, year9required);
				} else {
					year9required = required[1];
					addColourIndicatorNumbers(currentGrade, year9required);
				}

				$('#year10-container').find("." + gradeIds[x]).find('.targetData').text(year10required);
				$('#year9-container').find("." + gradeIds[x]).find('.targetData').text(year9required);
				y9showform();
			}

		}
		currentStep += 1;
		showTextForStep(currentStep);
		$("#reset-button").show();
	} else {
		showTextForIncompleteStep(currentStep);
	}
});

$("#next-button").click(function() {
	if (stepComplete(currentStep) || DEBUGGING) {
		currentStep += 1;
		showStep(currentStep);
		showTextForStep(currentStep);
  } else {
		showTextForIncompleteStep(currentStep);
	}
});

$('#back-button').click(function() {
	currentStep -= 1;
	showStep(currentStep);
	showTextForStep(currentStep);
});

$('#reset-button').click(function() {
	currentStep = 1;
	showTextForStep(currentStep);
	showStep(3);
	showStep(2);
	showStep(1);

	//Clear all fields
	$(":input").val('');
	$('#year10-container').find('.targetData').text('');
	$('#year9-container').find('.targetData').text('');
});

// **** Helper Functions ****

function y10showform() {
	$("#year10-container").addClass('visible');
	$("#year10-container").show();
}

function y9showform() {
	$("#year10-container").addClass('visible');
	$("#year9-container").addClass('visible');
	$("#year10-container").show();
	$("#year9-container").show();
}

function showTextForStep(stepNumber) {
	var text = "Error!"
	switch (stepNumber) {
		case 1:
			text = "Welcome! Start by selecting your year group and grade format below, then press next.";
			break;
		case 2:
			text = "Use the dropdown menu to select your <u>most current grades</u>. Fill in the boxes with 2 additional subjects that you think are relevant to your career goals";
			break;
		case 3:
			text = "Now, use the dropdown menus to select your <u>Career Target GCSE Grades</u>. Press calculate to find your Flight Path!";
			break;
		case 4:
			text = "Your current grades should now be highlighted in different colours to represent your progress:<br><br><span style='background-color: #ff8e82; color: #ff8e82'>____</span> You are below target and should discuss with your coach how you can improve this<br><br><span style='background-color: #95f997; color: #95f997'>____</span> You are on track and should discuss with your coach how to keep working at the same level<br><br><span style='background-color: #3972ce; color: #3972ce'>____</span> You are working at a level higher than your target, consider aiming higher with your goal GCSE grades";
			break;
		default:
			text= "Error!"
	}
	$('#instructions-text').html(text);
	$('#instructions').css("background-color", "rgba(3, 0, 119, 0.1)")
}

function showTextForIncompleteStep(stepNumber) {
	var text = "Error!"
	switch (stepNumber) {
		case 1:
			text = "You must select a year group and a grade format!";
			break;
		case 2:
			text = "Ensure you have filled in the 2 input boxes and all of the dropdown menus.";
			break;
		case 3:
			text = "Make sure you have selected from all of the dropdown menus. ";
			break;
		default:
			text= "Error!"
	}
	$('#instructions-text').html(text);
	$('#instructions').css("background-color", "rgba(244, 66, 75, 0.1)")
}

function setButtonsHidden(setHidden) {
	if(setHidden) {
		$('#choose-year').hide();
		$('#choose-grade-format').hide();
	} else {
		$('#choose-year').show();
		$('#choose-grade-format').show();
	}
}

function stepComplete(stepNumber) {
	switch (stepNumber) {
		case 1:
			return ($("#select-year-9").hasClass('button-clicked') &&
							($("#select-sublevels").hasClass('button-clicked') ||
							 $("#select-numbers").hasClass('button-clicked'))) ||
							 $("#select-year-10").hasClass('button-clicked');
		case 2:
		  var complete = true;
			$("#current-grade-container :input").each(function() {
					if (this.value === '' || this.value === 'default') {
						complete = false;
					}
			});
			return complete;
		case 3:
			var complete = true;
			$("#career-grade-container :input").each(function() {
					if (this.value === 'default') {
						complete = false;
					}
			});
			return complete;
		default:
			return false;
	}
}

function showStep(stepNumber) {
	switch (stepNumber) {
		case 1:
			$("#current-grade-container").hide();
			$("#career-grade-container").hide();
			setButtonsHidden(false);

			$("#next-button").show();
			$("#back-button").hide();
			$("#reset-button").hide();
			break;
		case 2:
			$("#back-button").show()
			$("#next-button").show()
			$("#calculate-button").hide()


			$("#current-grade-container").addClass('visible');
			$("#current-grade-container").show();
			$(".current-grade-select").attr("disabled", false);
			$("#career-grade-container").hide();
			setButtonsHidden(true);
			$("#custom-subject1").prop("readonly", false);
			$("#custom-subject2").prop("readonly", false);
			break;
		case 3:
			$("#calculate-button").show();
			$("#next-button").hide();
			$("#reset-button").hide();

			$("#career-grade-container").addClass('visible');
			$("#career-grade-container").show();
			$(".current-grade-select").attr("disabled", true);
			$(".career-grade-select").attr("disabled", false);

			$("#custom-subject1").prop("readonly", true);
			var subject1 = $("#custom-subject1").val();
			$(".custom-subject1-copy").html(subject1);

			$("#custom-subject2").prop("readonly", true);
			var subject2 = $("#custom-subject2").val();
			$(".custom-subject2-copy").html(subject2);

			$("tr").removeClass('below-target');
			$("tr").removeClass('on-target');
			$("tr").removeClass('above-target');

			$("#year10-container").hide();
			$("#year9-container").hide();
			break;
		default:
			break;
	}
}

function addColourIndicatorNumbers(currentGrade, requiredGrade) {
	if (numberGradeIsHigherThan(currentGrade, requiredGrade)) {
		colourBlue();
	} else if (numberGradeIsLessThan(currentGrade, requiredGrade)) {
		colourRed();
	} else {
		colourGreen();
	}
}

function addColourIndicatorSublevels(currentGrade, requiredGrade) {
	if (sublevelGradeIsHigherThan(currentGrade, requiredGrade)) {
		colourBlue();
	} else if (sublevelGradeIsLessThan(currentGrade, requiredGrade)) {
		colourRed();
	} else {
		console.log(currentGrade)
		console.log(requiredGrade)
		colourGreen();
	}
}

function colourRed() {
	var gradeIds = ['english','maths', 'science', 'custom1', 'custom2'];
	$("#current-" + gradeIds[x] + "-grade").closest("tr").addClass('below-target');
}

function colourGreen() {
	var gradeIds = ['english','maths', 'science', 'custom1', 'custom2'];
	$("#current-" + gradeIds[x] + "-grade").closest("tr").addClass('on-target');
}

function colourBlue() {
	var gradeIds = ['english','maths', 'science', 'custom1', 'custom2'];
	$("#current-" + gradeIds[x] + "-grade").closest("tr").addClass('above-target');
}

function getRequiredGrades(grade) {
	// returns an array containing the required grades
	// [y10required, y9required (number), y9required (sublevel)]
	var required;
	switch(grade) {
	    case "4(C-)":
	    	required = ["3", "2", "6c"];
	    	break;
	    case "5(C)":
	    	required = ["4", "3", "6a"];
	    	break;
	    case "6(B)":
	    	required = ["5", "4", "7b"];
	    	break;
	    case "7(A)":
	    	required = ["6", "5", "8c"];
	    	break;
	    case "8(A*)":
	    	required = ["7", "6", "8b"];
	    	break;
	    case "9(A*)":
	    	required = ["8", "7", "8a"];
	    	break;
	    default:
	    	required = [];
    }

    return required;
}

function populateDropdowns(id) {
	if (id == 'select-sublevels' && $("#select-year-9").hasClass('button-clicked')) {
		var sublevels = ['8a+', '8a','8b', '8c','7a','7b', '7c', '6a','6b', '6c','5a','5b', '5c', '4a','4b', '4c','3a','3b', '3c','2a','2b', '2c', '1a','1b','1c']
        populateDropdown('current-grade-select', sublevels)
    } else if (id == 'select-numbers') {
    	var numbers = ['9+','9','9-','8+','8','8-','7+','7','7-','6+','6','6-','5+','5','5-'
                          ,'4+','4','4-','3+','3','3-','2+','2', '2-','1+', '1']
    	populateDropdown('current-grade-select', numbers)
    }
};

function populateDropdown(dropdownClass, values) {
	var dropdown = $("." + dropdownClass);
	dropdown.empty();
	dropdown.append($("<option value='default' selected='selected'/>").text(''));
	for (x in values) {
		dropdown.append($("<option />").text(values[x]));
	}
};
