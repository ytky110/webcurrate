const CODES = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "CHF",
  "CNY",
  "HKD",
  "KRW",
  "TWD",
  "SGD",
  "AUD",
  "NZD",
  "CAD",
  "BRL",
  "INR",
  "RUB",
  "TRY",
  "ZAR",
  "MXN",
  "THB",
  "VND",
  "IDR",
  "MYR",
  "PHP",
  "AED",
  "SAR",
  "NOK",
  "SEK",
  "DKK",
  "PLN",
  "CZK",
  "HUF",
  "ILS",
  "EGP"
];

function fillSelect(id) {
    const select = document.getElementById(id);

    CODES.forEach(code => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = code;
        select.appendChild(option);
    });
}

function process() {
    const amount_in = document.getElementById("amount_in");

    const from_code = document.getElementById("from_dd").value;
    const to_code   = document.getElementById("to_dd").value;

    const result_p = document.getElementById("result_p");

    const url = `https://currencyrateapi.com/api/latest?base=${from_code}&codes=${to_code}`;

    result_p.textContent = "";

    if (amount_in.value === "") {
        result_p.textContent = "error: Empty Input";
        return;
    }

    const amount = Number(amount_in.value);

    if (Number.isNaN(amount)) {
        result_p.textContent = "error: Not a Number";
        return;
    }


    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const k = data.rates[to_code.toLowerCase()];
                const result = k * amount
                result_p.textContent = `result: ${result}`;
            } else {
                result_p.textContent = "error: It didn't work";
            }
        })
        .catch(error => {
            result_p.textContent = `error: ${error}`;
        });
}

fillSelect("from_dd");
fillSelect("to_dd");

document.getElementById("process_btn").addEventListener("click", process);

