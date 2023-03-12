window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

function setupIntialValues() {

let amount = 15000;
  let years= 5;
  let rate= 2;


  document.getElementById("loan-amount").value = amount;
  document.getElementById("loan-years").value = years;
  document.getElementById("loan-rate").value = rate;
  
  update();
}

function update() {
  const inputValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(inputValues);
  updateMonthly(monthlyPayment);
}

function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);
  return (
    (monthlyRate * values.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2);
}

function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = "$" + monthly;
}