//Tip calculation function
function tipPers(tot, tip, ppl) {
    let tipOnTot = tot / 100 * tip;
    return tipOnTot / ppl;
}

//Tot / person calculation
function totPers(tot, tip, ppl) {
    return tot / ppl + tipPers(tot, tip, ppl);
}

//display function, each time called display and update based on formData
function display() {
    //get data from form --> FormData OBJ
    const formData = new FormData(formElement);
    console.log(formData);
    const tot = formData.get('bill');
    const tip = formData.get('tipValue');
    const ppl = formData.get('people');
    //display data
    document.getElementById('tipPerson').innerText = `$${tipPers(tot, tip, ppl).toFixed(2)}`;
    document.getElementById('total').innerText = `$${totPers(tot, tip, ppl).toFixed(2)}`;
    console.log(tipPers(tot, tip, ppl));
    console.log(totPers(tot, tip, ppl));
}

//button toggle logic + tip input
let selectedTip = null;

const buttons = document.querySelectorAll('.tipButton');
console.log(buttons);
const customInput = document.getElementById('tipValue');
console.log(customInput);

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active')); // remove active status from all
        btn.classList.add('active'); // add active to clicked one
        selectedTip = parseFloat(btn.value);
        document.getElementById('tipValue').value = selectedTip;
        //call display function, print elements on screen
        display();
    });
});

customInput.addEventListener('input', () => {
    buttons.forEach(b => b.classList.remove('active'));
    selectedTip = parseFloat(customInput.value);
    if (selectedTip > 100 || isNaN(selectedTip)) {
        alert("insert a valid tip percentage");
        selectedTip = null;
    } else {
        //call display function, print elements on screen
        display();
    }
})


//acquiring and using form data
const formElement = document.querySelector('.input_form');
console.log(formElement);

formElement.addEventListener('input', (e) => {
    //prevent reload on submit
    e.preventDefault();

    //call display function, print elements on screen
    display();
});

//reset button
const resetButton = document.getElementById('resetButton');
console.log(resetButton);

resetButton.addEventListener('click', (e) => {
    document.getElementById('tipPerson').innerText = '$---.--';
    document.getElementById('total').innerText = '$---.--';
    document.querySelectorAll('.customIn').forEach(element => element.value = null);
})