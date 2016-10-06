//************************GRADE FORMAT: LETTERS (Y10 ONLY)******************
//- Y10's may be given a predicted letter grade for the end of the year

function predictedGCSEGradeY10Letter(letterGrade) {
  switch(letterGrade) {
    case 'U':
      return'1(F/G)';
    case 'G':
    case 'F':
      return '2(E/F)';
    case 'E':
      return '3(D)';
    case 'D':
      return '4(C)';
    case 'C':
      return '6-(B)'
    case 'B':
      return '7(A)';
    case 'A':
      return '8+(A*)';
    case 'A*':
      return '9(A*)';
  }
}


//*******************************GRADE FORMAT: NUMBERS*********************
//- Create a matrix where each row correlates to Y7-10
//- Each column correlates to a number grade 1- to 9+
//- A cell of row 0 (Y7), column 2 (grade 1+) would return the Y8 predicted grade
//should their progress remain the same. 
const gradesMatrixNumbers = new Array(5);
//Y7 predicted grades for Y8
gradesMatrixNumbers[0] = ['1','1+','1+','2','2+','3','4-','4-','4-','5','5','5+'
                          ,'6-','8','8'];
//Y8 predicted grades for Y9
gradesMatrixNumbers[1] = ['1','1+','2-','2','2+','3','3+','4+','5-','5','5+','6-'
                          ,'6','6','6+','7','7+','8-','8-','8', '8+'];
//Y9 predicted GCSE grades
gradesMatrixNumbers[2] = ['1(F/G)', '1(F/G)', '2(E/F)', '2(E/F)', '3(D)', '3(D)',
                          '3(D)', '4(C)', '4(C)', '4(C)', '5(B/C)', '5(B/C)',
                          '5(B/C)', '6-(B)', '6-(B)','6-(B)','6-(B)', '7(A)',
                          '7(A)','8+(A*)','8+(A*)','8+(A*)','9(A*)','9(A*)',
                          '9(A*)','9(A*)', '9(A*)']
//Y10 predicted GCSE grades
gradesMatrixNumbers[3] = ['1(F/G)', '1(F/G)', '1(F/G)', '1(F/G)', '2(E/F)', '2(E/F)', 
                          '2(E/F)', '3(D)', '3(D)', '3(D)', '4(C)', '4(C)', '4(C)',
                          '5(B/C)', '5(B/C)', '6-(B)', '6-(B)','6-(B)','6-(B)', '7(A)',
                          '7(A)', '7(A)', '7(A)', '8+(A*)','8+(A*)','9(A*)','9(A*)']
//Y11 don't need

//helper function to correlate number grades as numbers for comparisons and
//matrix
function numberGradesConvert(grade) {
  const gradesNumbers = ['1-','1','1+','2-','2','2+','3-','3','3+','4-','4','4+',
                       '5-','5','5+','6-','6','6+','7-','7','7+','8-','8','8+',
                       '9-','9','9+'];
  return gradesNumbers.indexOf(grade);
}

//takes the students year and their grade and outputs their predicted grades for
//the next year
function predictedNumberGrade(year, grade) {
  const years = ['7', '8', '9', '10'];
  var gradeIndex = numberGradesConvert(grade);
  var yearIndex = years.indexOf(year);
  return gradesMatrixNumbers[yearIndex][gradeIndex];
}

//*********************GRADE FORMAT: SUBLEVELS***********************
//- The predicted grade for the subsequent year is simply two sublevels above

//Create array of all sublevels 
const sublevels = ['1c', '1b','1a', '2c','2b','2a', '3c', '3b','3a', '4c','4b','4a', 
                   '5c', '5b','5a', '6c','6b','6a', '7c','7b','7a', '8c', '8b','8a', 
                   '8a+']

//Find two levels above and return it(Y7,8,9)
function predictedSublevelsGrade(sublevel) {
  //find the level two levels above or if at end of array, return '8a+'
  var levelUp;
  var gradeIndex = sublevels.indexOf(sublevel);
  if (gradeIndex + 2 >= sublevels.length) {
    levelUp = sublevels[sublevels.length - 1];
  } else {
    levelUp = sublevels[gradeIndex + 2];
  }
  return levelUp;
}

//Pass this the Y9 predicted sublevel to return the GCSE predicted grade
function convertSublevelToGCSEGrade(sublevelY9) {
  var levelToCompare = sublevels.indexOf(sublevelY9);
  if (levelToCompare <= sublevels.indexOf('3b')) {
    return '1(F/G)';
  } else if (levelToCompare <= sublevels.indexOf('5c')) {
    return '2(E/F)';
  } else if (levelToCompare <= sublevels.indexOf('6c')) {
    return '3(D)';
  } else if (levelToCompare <= sublevels.indexOf('6a')) {
    return '4(C)';
  } else if (levelToCompare <= sublevels.indexOf('7c')) {
    return '5(B/C)';
  } else if (levelToCompare <= sublevels.indexOf('8b')) {
    return '6-(B)';
  } else if (levelToCompare <= sublevels.indexOf('8a')) {
    return '7(A)';
  } else if (levelToCompare <= sublevels.indexOf('8a+')) {
    return '8+/9(A*)';
  } else {
    return 'INVALID';
  }
}


//***************GRADE FORMAT: PERCENTAGES*************************
//- The predicted percentage for subsequent year is 8% above

//- Use to predict percentages for Y7,8,9 
function predictedPercentageGrade(percentage) {
  var gradeAsInt = parseInt(percentage)
  var predictedGrade = gradeAsInt + 8;
  if (predictedGrade > 100) {
    return '100';
  } else {
    return (gradeAsInt + 8).toString();
  }
}

//- Convert Y9 percentage to GCSE grade
function convertPercentageToGCSEGrade(percentageY9) {
  var percentageAsInt = parseInt(percentageY9);
  if (percentageAsInt <= 24) {
    return '1(F/G)';
  } else if (percentageAsInt <= 36) {
    return '2(E/F)';
  } else if (percentageAsInt <= 36) {
    return '3(D)';
  } else if (percentageAsInt <= 36) {
    return '4(C)';
  } else if (percentageAsInt <= 36) {
    return '5(B/C)';
  } else if (percentageAsInt <= 36) {
    return '6-(B)';
  } else if (percentageAsInt <= 36) {
    return '7(A)';
  } else if (percentageAsInt > 96) {
    return '8+/9(A*)';
  } else {
    return 'INVALID';
  }
}
 
//- Returns the array of projections of target number grades from Y7-10 to achieve 
//specified grade
function defaultProjectionsNumbers(grade) {
  switch(grade) {
    case '3(D)':
      return ['1+','2-','2','2'];
    case '4(C)':
      return ['2','2+','3','3'];
    case '5(B/C)':
      return ['2+','3','4+','4+'];
    case '6-(B)':
      return ['3-','4-','5','5'];
    case '7(A)':
      return ['4+','5+','6+','6+'];
    case '8+(A*)':
      return ['5-','6-','7','7'];
    case '9(A*)':
      return ['5+','7','8','8+'];
  }
}

//- Returns the array of projections of target percentage grades from Y7-9 to 
//achieve specified grade
function defaultProjectionsPercentages(grade) {
  switch(grade) {
    case '2(E/F)':
      return ['20','28','36'];
    case '3(D)':
      return ['40','48','56'];
    case '4(C)':
      return ['52','60','68'];
    case '5(B/C)':
      return ['60','68','76'];
    case '6-(B)':
      return ['64','72','80'];
    case '7(A)':
      return ['80','88','96'];
    case '8+(A*)':
      return ['84','92','96+'];
  }
}

//- Returns the array of projections of target sublevel grades from Y7-9 to 
//achieve specified grade
function defaultProjectionsSublevels(grade) {
  switch(grade) {
    case '2(E/F)':
      return ['2b','3c','3a'];
    case '3(D)':
      return ['4c','4a','5b'];
    case '4(C)':
      return ['5c','5a','6b'];
    case '5(B/C)':
      return ['5a','6b','7c'];
    case '6-(B)':
      return ['6c','6a','7b'];
    case '7(A)':
      return ['7b','8c','8a'];
    case '8+(A*)':
      return ['7a','8b','8a+'];
    case '9(A*)':
      return ['7a','8a+','8a+'];
  }
}

//- Returns the target letter grade for Y10 to achieve specified Y11 grade
function defaultProjectionsLetters(grade) {
  switch(grade) {
    case '2(E/F)':
      return 'F';
    case '3(D)':
      return 'E';
    case '4(C)':
      return 'D';
    case '6-(B)':
      return 'C';
    case '7(A)':
      return 'B';
    case '8+(A*)':
      return 'A';
    case '9(A*)':
      return 'A*';
  }
}