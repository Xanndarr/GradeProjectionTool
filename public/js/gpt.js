$(document).ready(function() {
	resetAllFields();
	var careerGrades = ['9(A*)','8(A*)','7(A)','6(B)','5(C)','4(C-)']
    populateDropdown('career-grade-select', careerGrades);
});

$('.year-select').click(function() {
	$('#choose-year').children('button').each(function () {
		this.classList.remove('button-clicked');
		this.disabled = true;
	});
})

$('.format-select').click(function() {
	$('#choose-grade-format').children('button').each(function () {
		this.classList.remove('button-clicked');
		this.disabled = true;
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
	dropdown.append($("<option selected='selected'/>").text(''));
	for (x in values) {
		dropdown.append($("<option />").text(values[x]));
	}
}

$("#calculate-button").click(function() {
	$("#back-button-2").show();
	$("#back-button-1").hide();
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
});

function addColourIndicatorNumbers(currentGrade, requiredGrade) {
	if (numberGradeIsLessThan(currentGrade, requiredGrade)) {
		colourRed();
	} else {
		colourGreen();
	}
}

function addColourIndicatorSublevels(currentGrade, requiredGrade) {
	if (sublevelGradeIsLessThan(currentGrade, requiredGrade)) {
		colourRed();
	} else {
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
	    	required = ["8", "7", "8a|"];
	    	break;
	    default:
	    	required = [];
    }

    return required;
}

var error = 0;
$("#next-button").click(function() {
	$(this).hide();
	$(".current-grade-select").attr("disabled", true);
	$("#calculate-button").show()
	$("#back-button-1").show();
	$("#career-grade-container").addClass('visible');
	$("#career-grade-container").show();

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
	$("#career-grade-container").hide();
	$("#custom-subject1").prop("readonly", false);
	$("#custom-subject2").prop("readonly", false);
	$(".current-grade-select").attr("disabled", false);
});

$('#back-button-2').click(function() {
	$(this).hide();
	$("#back-button-1").show();
	$("#year10-container").hide();
	$("#year9-container").hide();
	$(".career-grade-select").attr("disabled", false);
	$("tr").removeClass('below-target');
	$("tr").removeClass('on-target');
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


