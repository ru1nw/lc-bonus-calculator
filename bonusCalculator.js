const overtimeSold = document.getElementById("overtime-sold")
const overtimeQuota = document.getElementById("overtime-quota")
const overtimeDeadline = document.getElementById("overtime-deadline")
const desiredPay = document.getElementById("desired-paycheck")
const desiredValuePay = document.getElementById("desired-value-paycheck")
const desiredOt = document.getElementById("desired-overtime-bonus")
const desiredValueOt = document.getElementById("desired-value-overtime-bonus")
const desiredPayQuota = document.getElementById("desired-paycheck-quota")
const desiredPayDeadline = document.getElementById("desired-paycheck-deadline")

overtimeSold.addEventListener("input", (e) => {otBonus();})
overtimeQuota.addEventListener("input", (e) => {otBonus();})
overtimeDeadline.addEventListener("input", (e) => {otBonus();})
desiredPay.addEventListener("input", (e) => {desiredPaycheck();})
desiredValuePay.addEventListener("click", desiredValueFocus)
desiredOt.addEventListener("input", (e) => {desiredPaycheck();})
desiredValueOt.addEventListener("click", desiredValueFocus)
desiredPayQuota.addEventListener("input", (e) => {desiredPaycheck();})
desiredPayDeadline.addEventListener("input", (e) => {desiredPaycheck();})

function otBonus() {
  if (!/^\d+$/.test(overtimeSold.value)) {
    document.getElementById("overtime-bonus").innerHTML = "enter value for scraps sold";
    return;
  }
  if (!/^\d+$/.test(overtimeQuota.value)) {
    document.getElementById("overtime-bonus").innerHTML = "enter quota";
    return;
  }
  if (!/^\d+$/.test(overtimeDeadline.value)) {
    document.getElementById("overtime-bonus").innerHTML = "enter days until deadline";
    return;
  }
  let sold = Number(overtimeSold.value);
  let quota = Number(overtimeQuota.value);
  let deadline = Number(overtimeDeadline.value);
  if (sold < quota) {
    document.getElementById("overtime-bonus").innerHTML = "you get <b>0</b> credits of overtime bonus if you sold " + overtimeSold.value + " credits worth of scraps when the quota is " + overtimeQuota.value + " credits, " + overtimeDeadline.value + " day(s) before the deadline";
    return;
  }
  if (sold < 0 || quota < 0 || deadline < 0) {
    document.getElementById("overtime-bonus").innerHTML = "sold, quota, and deadline must be larger than 0";
    return;
  }
  if (deadline > 3) {
    document.getElementById("overtime-bonus").innerHTML = "deadline must be smaller than 3";
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
  document.getElementById("overtime-bonus").innerHTML = "you get <b>" + ((ot > 0) ? Math.floor(ot).toString() : "0") + "</b> credits of overtime bonus if you sold " + overtimeSold.value + " credits worth of scraps when the quota is " + overtimeQuota.value + " credits, " + overtimeDeadline.value + " day(s) before the deadline";
}

function desiredPaycheck() {
  if (!/^\d+$/.test(desiredPay.value)) {
    document.getElementById("desired-paycheck-sell").innerHTML = "enter desired paycheck";
    return;
  }
  if (!/^\d+$/.test(desiredPayQuota.value)) {
    document.getElementById("desired-paycheck-sell").innerHTML = "enter quota";
    return;
  }
  if (!/^\d+$/.test(desiredPayDeadline.value)) {
    document.getElementById("desired-paycheck-sell").innerHTML = "enter days until deadline";
    return;
  }
  let quota = Number(desiredPayQuota.value);
  let deadline = Number(desiredPayDeadline.value);
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
  if (desiredPay.disabled) {
    let ot = Number(desiredOt.value);
    desiredPay.value = (ot - extra) * 5 + quota + ot;
  }
  let pay = Number(desiredPay.value);
  if (pay <= quota) {
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>" + pay.toString() + "</b> credits worth of scraps if you want " + desiredPay.value + " credits of total paycheck when the quota is " + desiredPayQuota.value + " credits, " + desiredPayDeadline.value + " day(s) before the deadline";
    return;
  }
  if (pay < 0 || quota < 0 || deadline < 0) {
    document.getElementById("desired-paycheck-sell").innerHTML = "desired paycheck, quota, and deadline must be larger than 0";
    return;
  }
  if (deadline > 3) {
    document.getElementById("desired-paycheck-sell").innerHTML = "deadline must be smaller than 3";
    return;
  }
  let sell = ((pay - extra) * 5 + quota) / 6
  if (desiredOt.disabled) {
    desiredOt.value = Math.floor((Math.ceil(sell) - quota) / 5 + extra);
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>" + ((sell > 0) ? Math.ceil(sell).toString() : desiredPayQuota.value) + "</b> credits worth of scraps if you want " + desiredPay.value + " credits of total paycheck when the quota is " + desiredPayQuota.value + " credits, " + desiredPayDeadline.value + " day(s) before the deadline";
  } else {
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>" + ((sell > 0) ? Math.ceil(sell).toString() : desiredPayQuota.value) + "</b> credits worth of scraps if you want " + desiredOt.value + " credits of overtime bonus when the quota is " + desiredPayQuota.value + " credits, " + desiredPayDeadline.value + " day(s) before the deadline";
  }
}

function desiredValueFocus(event) {
  if (event.target === desiredValuePay) {
    desiredOt.disabled = true;
    desiredPay.disabled = false;
    document.getElementById("desired-paycheck-sell").innerHTML = document.getElementById("desired-paycheck-sell").innerHTML.substring(0, document.getElementById("desired-paycheck-sell").innerHTML.indexOf("credits")) + "credits worth of scraps if you want " + desiredPay.value + " credits of total paycheck when the quota is " + desiredPayQuota.value + " credits, " + desiredPayDeadline.value + " day(s) before the deadline";
  } else if (event.target === desiredValueOt) {
    desiredPay.disabled = true;
    desiredOt.disabled = false;
    document.getElementById("desired-paycheck-sell").innerHTML = document.getElementById("desired-paycheck-sell").innerHTML.substring(0, document.getElementById("desired-paycheck-sell").innerHTML.indexOf("credits")) + "credits worth of scraps if you want " + desiredOt.value + " credits of overtime bonus when the quota is " + desiredPayQuota.value + " credits, " + desiredPayDeadline.value + " day(s) before the deadline";
  }
}
