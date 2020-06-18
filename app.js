button = document.querySelector('#btn');
cog = document.querySelector('#cog');

button.onclick = () => {
    cog.className = "turn";
    
    setTimeout(() => {
        cog.className = "reset";
    }, 1000)
}


//https://open.exchangerate-api.com/v6/latest

