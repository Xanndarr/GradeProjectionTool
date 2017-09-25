var numbers = ['1-','1','1+','2-','2','2+','3-','3','3+','4-','4','4+',
                       '5-','5','5+','6-','6','6+','7-','7','7+','8-','8','8+',
                       '9-','9','9+'];

var sublevels = ['1c', '1b','1a', '2c','2b','2a', '3c', '3b','3a', '4c','4b','4a',
                   '5c', '5b','5a', '6c','6b','6a', '7c','7b','7a', '8c', '8b','8a',
                   '8a+']

function numberGradeIsLessThan(grade, comparisonGrade) {
  if (numbers.indexOf(grade) < numbers.indexOf(comparisonGrade)) {
    return true;
  }
  return false;
}

function sublevelGradeIsLessThan(grade, comparisonGrade) {
  if (sublevels.indexOf(grade) < sublevels.indexOf(comparisonGrade)) {
    return true;
  }
  return false;
}

function numberGradeIsHigherThan(grade, comparisonGrade) {
  if (numbers.indexOf(grade) >= (numbers.indexOf(comparisonGrade) + 1)) {
    return true;
  }
  return false;
}

function sublevelGradeIsHigherThan(grade, comparisonGrade) {
  if (sublevels.indexOf(grade) >= (sublevels.indexOf(comparisonGrade) + 1)) {
    return true;
  }
  return false;
}

