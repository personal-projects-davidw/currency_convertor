const button = document.querySelector('#btn'),
      cog = document.querySelector('#cog'),
      currencyOneEL = document.querySelector('#currency1'),
      currencyTwoEL = document.querySelector('#currency2'),
      amountInputEL = document.querySelector('#amount-field'),
      quoteParaEL = document.querySelector('#based-quote'),
      quoteEL = document.querySelector('#quote'),
      quoteRateEL = document.querySelector('#quote-rate');

amountInputEL.onkeydown = () => {
    setButton();
}

amountInputEL.onchange = () => {
    setButton();
}

btn.onmouseenter = () => {
    btn.style.cursor = 'pointer';
    if (amountInputEL.value > 0) {
        btn.style.backgroundColor = 'var(--darkest-color--)';
        btn.style.color = 'white';
    }
}

btn.onmouseleave = () => {
    btn.style.cursor = 'default';
    setButton();
}

button.onclick = () => {
    cog.className = "turn";
    
    setTimeout(() => {
        cog.className = "reset";
    }, 1000)

    calculate();
}

function setButton() {
    switch (amountInputEL.value > 0) {
        case true:
            button.disabled = false;
            button.style.backgroundColor = 'var(--base-color--)';
            button.style.borderColor = 'var(--base-color--)';
            button.style.color = 'white';
            break;
        
        case false:
            button.disabled = true;
            button.style.backgroundColor = 'var(--lightest-color--)';
            button.style.borderColor = 'var(--lightest-color--)';
            button.style.color = 'white';
            break;
    }
}

function calculate() {
    const currencyOne = currencyOneEL.value,
          currencyTwo = currencyTwoEL.value;
    
    let endpoint,
        currencyOneValueInEuros,
        quote,
        rate;

    switch (currencyOne === 'EUR' || currencyTwo === 'EUR') {
        // set endpoint for quotes without EUR
        case false:
            endpoint = `https://api.exchangeratesapi.io/latest?symbols=${currencyOne},${currencyTwo}`;
            break;
        // set endpoints for quotes with EUR
        case true:
            switch (currencyOne === 'EUR') {
                case true:
                    endpoint = `https://api.exchangeratesapi.io/latest?base=${currencyTwo}`;
                    break;
                case false:
                    endpoint = `https://api.exchangeratesapi.io/latest?symbols=${currencyOne}`;
                    break;
            }
    }

    fetch(endpoint)
    .then(res => res.json())
    .then(data => {

        console.log(data);

        switch (currencyTwo === 'EUR') {
            case true:
                switch (currencyOne === 'EUR'){
                    // handle EUR/EUR quote
                    case true:
                        currencyOneValueInEuros = amountInputEL.value * 1.00,
                        quote = currencyOneValueInEuros,
                        rate = 1;
                        break;
                    // handle ???/EUR quote
                    case false:
                        currencyOneValueInEuros = amountInputEL.value / data.rates[`${currencyOne}`],
                        quote = currencyOneValueInEuros,
                        rate = quote / amountInputEL.value;
                        break;
                }
                break;
            // handle all other quotes including EUR/???
            case false:
                // convert currency1 -> Euros then Euros -> currency2
                currencyOneValueInEuros = amountInputEL.value / data.rates[`${currencyOne}`],
                quote = currencyOneValueInEuros * data.rates[`${currencyTwo}`],
                rate = quote / amountInputEL.value;
                break;
        }

        quoteParaEL.innerHTML = `${amountInputEL.value} ${currencyOne} =`;
        quoteEL.innerHTML = `${quote.toFixed(2)} ${currencyTwo}`;
        quoteRateEL.innerHTML = `Current rate ${currencyOne}/${currencyTwo} is ${rate.toFixed(2)}`;
        amountInputEL.value = "";
        setButton();
    });
}