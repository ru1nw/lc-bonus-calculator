const overtimeSold = document.getElementById("overtime-sold")
const overtimeQuota = document.getElementById("overtime-quota")
const overtimeDeadline = document.getElementById("overtime-deadline")
const desiredPay = document.getElementById("desired-paycheck")
const desiredValuePay = document.getElementById("desired-value-paycheck")
const desiredOt = document.getElementById("desired-overtime-bonus")
const desiredValueOt = document.getElementById("desired-value-overtime-bonus")
const desiredValueItem = document.getElementById("desired-value-items")
const desiredItemsContainer = document.getElementById("desired-items-container")
const desiredPayQuota = document.getElementById("desired-paycheck-quota")
const desiredPayDeadline = document.getElementById("desired-paycheck-deadline")
const itemCountButtonMinusArray = document.getElementsByClassName("item-count-button-minus")
const itemCountArray = document.getElementsByClassName("item-count")
const itemCountButtonPlusArray = document.getElementsByClassName("item-count-button-plus")

overtimeSold.addEventListener("input", (e) => {otBonus(false);})
overtimeQuota.addEventListener("input", (e) => {otBonus(false);})
overtimeDeadline.addEventListener("input", (e) => {otBonus(false);})
desiredPay.addEventListener("input", (e) => {desiredPaycheck(false);})
desiredValuePay.addEventListener("click", desiredValueFocus)
desiredOt.addEventListener("input", (e) => {desiredPaycheck(false);})
desiredValueOt.addEventListener("click", desiredValueFocus)
desiredPayQuota.addEventListener("input", (e) => {desiredPaycheck(false);})
desiredPayDeadline.addEventListener("input", (e) => {desiredPaycheck(false);})
desiredValueItem.addEventListener("click", desiredValueFocus)
for (let elem of itemCountButtonMinusArray) {
  elem.addEventListener("click", (e) => {
    for (let i = 0; i < itemCountButtonMinusArray.length; i++) {
      if (itemCountButtonMinusArray[i] === e.target)
        itemCountArray[i].value = (parseInt(itemCountArray[i].value) > 1 && parseInt(itemCountArray[i].value) > itemCountArray[i].min && parseInt(itemCountArray[i].value) <= itemCountArray[i].max) ? (parseInt(itemCountArray[i].value) - 1) : "0"
    }
    desiredPaycheck(false)
  })
}
for (let elem of itemCountButtonPlusArray) {
  elem.addEventListener("click", (e) => {
    for (let i = 0; i < itemCountButtonPlusArray.length; i++) {
      if (itemCountButtonPlusArray[i] === e.target)
        itemCountArray[i].value = (parseInt(itemCountArray[i].value) > 0 && parseInt(itemCountArray[i].value) >= itemCountArray[i].min && parseInt(itemCountArray[i].value) < itemCountArray[i].max) ? (parseInt(itemCountArray[i].value) + 1) : "1"
    }
    desiredPaycheck(false)
  })
}

var itemPriceArray = [12, 15, 30, 20, 25, 30, 60, 120, 400, 900, 60, 60, 50, 40, 400, 138,
                     100, 255, 375, 425,
                     140, 70, 60, 90, 900, 110, 200, 50, 50, 130, 120, 120, 180, 70, 150, 40, 100, 150]

function otBonus(submitted=true) {
  if (!/^\d+$/.test(overtimeSold.value)) {
    document.getElementById("overtime-bonus").innerHTML = "enter value for scraps sold";
    if (submitted) overtimeSold.style.background = "red";
    return;
  } else {
    overtimeSold.style.background = "gray";
  }
  if (!/^\d+$/.test(overtimeQuota.value)) {
    document.getElementById("overtime-bonus").innerHTML = "enter quota";
    if (submitted) overtimeQuota.style.background = "red";
    return;
  } else {
    overtimeQuota.style.background = "gray";
  }
  if (!/^\d+$/.test(overtimeDeadline.value)) {
    document.getElementById("overtime-bonus").innerHTML = "enter days until deadline";
    if (submitted) overtimeDeadline.style.background = "red";
    return;
  } else {
    overtimeDeadline.style.background = "gray";
  }
  let sold = Number(overtimeSold.value);
  let quota = Number(overtimeQuota.value);
  let deadline = Number(overtimeDeadline.value);
  if (sold < quota) {
    document.getElementById("overtime-bonus").innerHTML = "you get ▮<b>0</b> of overtime bonus if you sold ▮" + overtimeSold.value + " worth of scraps when the quota is ▮" + overtimeQuota.value + ", " + overtimeDeadline.value + " day(s) before the deadline";
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
  document.getElementById("overtime-bonus").innerHTML = "you get <b>▮" + ((ot > 0) ? Math.floor(ot).toString() : "0") + "</b> of overtime bonus if you sold ▮" + overtimeSold.value + " worth of scraps when the quota is ▮" + overtimeQuota.value + ", " + overtimeDeadline.value + " day(s) before the deadline";
}

function desiredPaycheck(submitted=true) {
  if (!/^\d+$/.test(desiredPay.value)) {
    document.getElementById("desired-paycheck-sell").innerHTML = "enter desired paycheck";
    if (submitted) desiredPay.style.background = "red";
    return;
  } else {
    desiredPay.style.background = "gray";
  }
  if (!/^\d+$/.test(desiredPayQuota.value)) {
    document.getElementById("desired-paycheck-sell").innerHTML = "enter quota";
    if (submitted) desiredPayQuota.style.background = "red";
    return;
  } else {
    desiredPayQuota.style.background = "gray";
  }
  if (!/^\d+$/.test(desiredPayDeadline.value)) {
    document.getElementById("desired-paycheck-sell").innerHTML = "enter days until deadline";
    if (submitted) desiredPayDeadline.style.background = "red";
    return;
  } else {
    desiredPayDeadline.style.background = "gray";
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
  let itemCost = 0
  for (let i = 0; i < itemCountArray.length; i++) {
    itemCost += Number(itemCountArray[i].value) * itemPriceArray[i]
  }
  if (desiredPay.disabled) {
    if (desiredOt.disabled) {
      desiredPay.value = itemCost
    } else {
      let ot = Number(desiredOt.value);
      desiredPay.value = (ot - extra) * 5 + quota + ot;
    }
  }
  let pay = Number(desiredPay.value);
  if (pay < quota) {
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>▮" + pay.toString() + "</b> worth of scraps if you want ▮" + desiredPay.value + " of total paycheck when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
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
  if (sell > pay) sell = pay
  if (desiredOt.disabled && desiredPay.disabled) {
    desiredOt.value = Math.floor((Math.ceil(sell) - quota) / 5 + extra);
    desiredOt.value = (Number(desiredOt.value) > 0) ? desiredOt.value : 0
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>▮" + (itemCost - Number(desiredOt.value)) + "</b> worth of scraps if you want ▮" + itemCost + " of items when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
  } else if (desiredOt.disabled) {
    desiredOt.value = Math.floor((Math.ceil(sell) - quota) / 5 + extra);
    desiredOt.value = (Number(desiredOt.value) > 0) ? desiredOt.value : 0
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>▮" + ((sell > 0) ? Math.ceil(sell).toString() : desiredPayQuota.value) + "</b> worth of scraps if you want ▮" + desiredPay.value + " of total paycheck when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
  } else {
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>▮" + ((sell > 0) ? Math.ceil(sell).toString() : desiredPayQuota.value) + "</b> worth of scraps if you want ▮" + desiredOt.value + " of overtime bonus when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
  }
}

function desiredValueFocus(event) {
  if (event.target === desiredValuePay) {
    desiredOt.disabled = true;
    desiredPay.disabled = false;
    for (let child of desiredItemsContainer.children) {
      child.style.display = "none";
    }
    document.getElementById("desired-paycheck-sell").innerHTML = document.getElementById("desired-paycheck-sell").innerHTML.substring(0, document.getElementById("desired-paycheck-sell").innerHTML.indexOf("worth")) + "worth of scraps if you want ▮" + desiredPay.value + " of total paycheck when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
  } else if (event.target === desiredValueOt) {
    desiredPay.disabled = true;
    desiredOt.disabled = false;
    for (let child of desiredItemsContainer.children) {
      child.style.display = "none";
    }
    document.getElementById("desired-paycheck-sell").innerHTML = document.getElementById("desired-paycheck-sell").innerHTML.substring(0, document.getElementById("desired-paycheck-sell").innerHTML.indexOf("worth")) + "worth of scraps if you want ▮" + desiredOt.value + " of overtime bonus when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
  } else if (event.target === desiredValueItem) {
    desiredPay.disabled = true;
    desiredPay.value = 0;
    desiredOt.disabled = true;
    desiredOt.value = 0;
    clearDesiredItems()
    for (let child of desiredItemsContainer.children) {
      child.style.display = "initial";
    }
    document.getElementById("desired-paycheck-sell").innerHTML = "you should sell <b>▮0</b> worth of scraps if you want ▮0 of items when the quota is ▮" + desiredPayQuota.value + ", " + desiredPayDeadline.value + " day(s) before the deadline";
  }
  if (desiredValueItem.checked) {
    for (let child of desiredItemsContainer.children) {
      child.style.display = "initial";
    }
  } else {
    for (let child of desiredItemsContainer.children) {
      child.style.display = "none";
    }
  }
}

function clearDesiredItems() {
  for (let elem of itemCountArray) {
    elem.value = 0
  }
}