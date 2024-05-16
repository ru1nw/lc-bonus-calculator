function otBonus() {
  let sold = Number(document.getElementById("overtime-sold").value);
  let quota = Number(document.getElementById("overtime-quota").value);
  let deadline = Number(document.getElementById("overtime-deadline").value);
  if (sold < quota) {
    document.getElementById("overtime-bonus").innerHTML = "you get 0 credits of overtime bonus if you sold " + sold.toString() + " credits worth of scraps when the quota is " + quota.toString() + "credits, " + deadline.toString() + " day(s) before the deadline";
    return;
  }
  if (sold < 0 || quota < 0 || deadline < 0) {
    document.getElementById("overtime-bonus").innerHTML = "sold, quota, and deadline must be larger than 0";
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
  document.getElementById("overtime-bonus").innerHTML = "you get <b>" + ((ot > 0) ? Math.floor(ot).toString() : "0") + "</b> credits of overtime bonus if you sold " + sold.toString() + " credits worth of scraps when the quota is " + quota.toString() + "credits, " + deadline.toString() + " day(s) before the deadline";
}

function desiredPaycheck() {
  let pay = Number(document.getElementById("desired-paycheck").value);
  let quota = Number(document.getElementById("desired-paycheck-quota").value);
  let deadline = Number(document.getElementById("desired-paycheck-deadline").value);
  if (pay <= quota) {
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell " + pay.toString() + " credits worth of scraps if you want " + pay.toString() + " credits of total paycheck when the quota is " + quota.toString() + "credits, " + deadline.toString() + " day(s) before the deadline";
    return;
  }
  if (pay < 0 || quota < 0 || deadline < 0) {
    document.getElementById("desired-paycheck-sell").innerHTML = "desired paycheck, quota, and deadline must be larger than 0";
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
  let sell = ((pay - extra) * 5 + quota) / 6
  document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>" + Math.ceil(sell).toString() + "</b> credits worth of scraps if you want " + pay.toString() + " credits of total paycheck when the quota is " + quota.toString() + " credits, " + deadline.toString() + " day(s) before the deadline";
}
