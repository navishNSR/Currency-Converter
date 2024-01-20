const BASE$URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to Select");


for (let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        // Here while creating element we are adding selected to the USD and INR
        if(select.className === "dropdown-from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.className === "dropdown-to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    } 

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })


}

function updateFlag (element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

function finalAmount(amtValue, fromCurr, conAmount, toCurr){
    let finalAmount = document.querySelector(".msg");
    finalAmount.innerText = `${amtValue} ${fromCurr.value} = ${conAmount} ${toCurr.value}`
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }

    let URL = `${BASE$URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data)

    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    let conAmount = amtValue * rate;

    console.log(conAmount);

    finalAmount(amtValue, fromCurr, conAmount, toCurr);
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})
