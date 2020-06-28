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

    fetch(`https://api.exchangeratesapi.io/latest?symbols=${currencyOne},${currencyTwo}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        quoteParaEL.innerHTML = `${amountInputEL.value} ${currencyOne} =`;

        // convert currency1 -> Euros then Euros -> currency2
        const currencyOneValueInEuros = amountInputEL.value / data.rates[`${currencyOne}`],
              quote = currencyOneValueInEuros * data.rates[`${currencyTwo}`],
              rate = quote / amountInputEL.value;
        
        quoteEL.innerHTML = `${quote.toFixed(2)} ${currencyTwo}`;
        quoteRateEL.innerHTML = `Current rate ${currencyOne}/${currencyTwo} is ${rate.toFixed(2)}`;
        amountInputEL.value = "";
        setButton();
    });
}