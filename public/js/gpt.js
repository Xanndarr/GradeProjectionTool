$("#calcButton").click(function() {
  const rows = $("#gradeEntry").find("tr");
  rows.each(function(index, row) {
    const inputs = $(row).find("input");
    let subject = "null";
    if (inputs.length) subject = inputs[0].name;
    console.log(subject)
  });
});
