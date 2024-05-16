function otBonus() {
  let sold = Number(document.getElementById("sold").value);
  let quota = Number(document.getElementById("quota").value);
  let deadline = Number(document.getElementById("deadline").value);
  if (sold < quota) {
    document.getElementById("bonus").innerHTML = 0;
    return;
  }
  if (sold < 0 || quota < 0 || deadline < 0) {
    document.getElementById("bonus").innerHTML = "sold, quota, and deadline must be larger than 0";
    return;
  }
  switch (deadline) {
    case 0:
      var extra = -15;
      break;
    case 1:
      var extra = 15;
      break;
    case 2:
      var extra = 30;
      break;
    case 3:
      var extra = 45;
      break;
  }
  let ot = (sold - quota) / 5 + extra;
  document.getElementById("bonus").innerHTML = (ot > 0) ? ot : 0;
}
