const gradesMatrixNumbers = new Array(5);
//the next years predicted grades for year 7
gradesMatrixNumbers[0] = ['1','1+','1+','2','2+','3','4-','4-','4-','5','5','5+'
                          ,'6-','8','8'];
//the next years predicted grades for year 8
gradesMatrixNumbers[1] = ['1','1+','2-','2','2+','3','3+','4+','5-','5','5+','6-'
                          ,'6','6','6+','7','7+','8-','8-','8', '8+'];
//next years predicted grades for year 9
gradesMatrixNumbers[2] = ['1(F/G)', '1(F/G)', '2(E/F)', '2(E/F)', '3(D)', '3(D)',
                          '3(D)', '4(C)', '4(C)', '4(C)', '5(B/C)', '5(B/C)',
                          '5(B/C)', '6-(B)', '6-(B)','6-(B)','6-(B)', '7(A)',
                          '7(A)','8+(A*)','8+(A*)','8+(A*)','9(A*)','9(A*)',
                          '9(A*)','9(A*)', '9(A*)']
//next years predicted grades for year 10
gradesMatrixNumbers[3] =
//don't need for year 11 as these will be converted straight to GCSE grade
//values

//helper function to correlate number grades as numbers for comparisons and
//matrix
function numberGradesConvert(grade) {
  var gradesNumbers = ['1-','1','1+','2-','2','2+','3-','3','3+','4-','4','4+',
                       '5-','5','5+','6-','6','6+','7-','7','7+','8-','8','8+',
                       '9-','9','9+'];
  return gradesNumbers.indexOf(grade);
}

//takes the students year and their grade and outputs their predicted grades for
//subsequent years
function predictedNumberGrade(year, grade) {
  var gradeIndex = numberGradesConvert(grade);
  return gradesMatrixNumbers[year][gradeIndex];
}

function predictedPercentageGrade(percentageGrade) {
  var gradeAsInt = parseInt(percentageGrade)
  return (gradeAsInt + 8).toString();
}

function generateMatrix(x, y) {
  var matrix = [];
  for(var i=0; i<y; i++) {
    matrix[i] = new Array(x);
  }
  return matrix
}
