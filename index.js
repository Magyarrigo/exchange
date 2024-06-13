"use strict";

const link = "https://api.nbp.pl/api/exchangerates/tables/a/";
const dataEntryForm = document.querySelector("#converterForm");
const exchangeResult = document.querySelector("#conversionResult");
dataEntryForm.addEventListener("submit", getCurrencyListByAxios);

function getCurrencyListByAxios(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const isValueInvalid = isNaN(amount) || amount <= 0;
  if (isValueInvalid) {
    alert("wprowadź poprawną wartość: LICZBA DODATNIA");
    clearForm();
    return;
  }

  const currencyCode = event.target.currencyName.value;

  axios
    .get(link)
    .then((response) => {
      const currencyList = response.data[0].rates;

      const targetCurrency = currencyList.filter((element) => {
        return element.code === currencyCode;
      });

      const targetCurrencyRate = targetCurrency[0].mid;

      let resultText = currencyConversion(targetCurrencyRate, amount);
      resultText = parseFloat(resultText).toFixed(2);

      exchangeResult.innerText = `to: ${resultText} zł`;
    })

    .catch((error) => alert(error));
}

function currencyConversion(currencyRate, quantity) {
  const conversionResult = currencyRate * quantity;
  return conversionResult;
}
function clearForm() {
  dataEntryForm[0].value = "";
  exchangeResult.innerText = "";
}
