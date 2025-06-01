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
    const ppl = formData.get('people');
    //display data --> using Selected tip as parameter for calculation
    document.getElementById('tipPerson').innerText = `$${tipPers(tot, selectedTip, ppl).toFixed(2)}`;
    document.getElementById('total').innerText = `$${totPers(tot, selectedTip, ppl).toFixed(2)}`;
    console.log(tipPers(tot, selectedTip, ppl));
    console.log(totPers(tot, selectedTip, ppl));
}

//button toggle logic + tip input
let selectedTip = null;

const buttons = document.querySelectorAll('.tipButton');
const customInput = document.getElementById('tipValue');

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


//update on input
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

formElement.addEventListener('input', (e) => {
    //prevent reload on submit
    e.preventDefault();
    //call display function, print elements on screen
    display();
});

//reset button
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    document.getElementById('tipPerson').innerText = '$---.--';
    document.getElementById('total').innerText = '$---.--';
    document.querySelectorAll('.customIn').forEach(element => element.value = null);
})

//optional tip feature
const tipCheckbox = document.getElementById('optionalTip');
tipCheckbox.addEventListener('change', () => {
    if (tipCheckbox.checked) {
        //checked section (using Tip calculation)
        document.getElementById('form_tipBtn').removeAttribute('class');
        document.getElementById('outTipDiv').classList.remove('hidden');
        //refresh output
        display();
    } else {
        console.log('unchecked');
        //unchecked section (no Tip)
        document.getElementById('form_tipBtn').setAttribute('class', 'hidden');
        document.getElementById('outTipDiv').classList.add('hidden');
        //reset tip amount
        selectedTip = null;
        //refresh output
        display();
    }
})