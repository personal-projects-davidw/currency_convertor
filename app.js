button = document.querySelector('#btn');
cog = document.querySelector('#cog');
currencyOneEL = document.querySelector('#currency1');
currencyTwoEL = document.querySelector('#currency2');
AmountInput = document.querySelector('#amount-field');

button.onclick = () => {
    cog.className = "turn";
    
    setTimeout(() => {
        cog.className = "reset";
    }, 1000)

    calculate();
}

function calculate() {
    const currencyOne = currencyOneEL.value;
    const currencyTwo = currencyTwoEL.value;
    fetch(`https://api.exchangeratesapi.io/latest?symbols=${currencyOne},${currencyTwo}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
}

// cur1 to euros = num/quotedRate1 = Euros
// euros to cur2 = Euros * quotedRate2


