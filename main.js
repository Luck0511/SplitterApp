//Tip calculation function
function tipPers(tot, tip, ppl) {
    if (!isManual) {
        //calculate tip, using percentage --> return tip for each pers(splitting the %)
        let tipOnTot = tot / 100 * tip;
        return tipOnTot / ppl;
    } else {
        //divide manual tip among all ppl --> returns tip for each pers(splitting tot tip)
        return tip / ppl;
    }
}

//Tot / person calculation
function totPers(tot, tip, ppl) {
    //calculates tot for each pers (splitting bill adding tip for each pers)
    return tot / ppl + tipPers(tot, tip, ppl);
}

//buttons logic plus tip input
let selectedTip = 0;

const buttons = document.querySelectorAll('.tipButton');
//list of all custom inputs (either numeric or percentage)
const customInput = [document.getElementById('percTipValue'), document.getElementById('manualTipValue')];

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active')); // remove active status from all
        btn.classList.add('active'); // add active to clicked one
        selectedTip = parseFloat(btn.value);
        //call display function, print elements on screen
        display();
    });
});

//update on input
customInput.forEach((userIn) => {
    userIn.addEventListener('input', () => {
        //turn of all buttons
        buttons.forEach(b => b.classList.remove('active'));
        if (tipCheckbox.checked) {
            selectedTip = parseFloat(userIn.value);
            if (!isManual) {
                //input error section
                if (selectedTip > 100) {
                    // >100%
                    document.getElementById('tipExceeded').classList.add('visible');
                    document.getElementById('invalidInput').classList.remove('visible');
                    selectedTip = 0;
                    return false;
                } else if (isNaN(selectedTip)) {
                    //not a number
                    document.getElementById('tipExceeded').classList.remove('visible');
                    document.getElementById('invalidInput').classList.add('visible');
                    selectedTip = 0;
                    return false;
                } else {
                    //all good!
                    document.getElementById('tipExceeded').classList.remove('visible');
                    document.getElementById('invalidInput').classList.remove('visible');
                    //call display function, print elements on screen
                    display();
                    return true
                }
            } else {
                if (!isNaN(selectedTip)) {
                    display();
                    return true;
                } else {
                    console.warn('Invalid input detected', {selectedTip});
                    return false;
                }
            }
        }
    })
});

//acquiring and using form data
const formElement = document.getElementById('input_form');

formElement.addEventListener('input', (e) => {
    //prevent reload on submit
    e.preventDefault();

    //DEBUGGING:
    console.log(e.target);
    //call display function, print elements on screen
    display();
});

//reset button
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    document.querySelectorAll('.customIn').forEach(element => element.value = null);
    document.getElementById('optionalTip').checked = false;
    document.location.reload();
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
        //unchecked section (no Tip)
        document.getElementById('form_tipBtn').setAttribute('class', 'hidden');
        manualTipSec.classList.add('hidden');
        perTipSec.classList.add('hidden');
        document.getElementById('outTipDiv').classList.add('hidden');
        //reset tip amount
        selectedTip = null;
        //refresh output
        display();
    }
});

//switch tip mode

//toggle slider element
const tipModeSwitch = document.getElementById('tipModeSwitch');
let isManual = false; //be default nothing shows
//alternating windows elements
const perTipSec = document.getElementById('percTip-sec');
const manualTipSec = document.getElementById('manualTip-sec');

//switch windows on click
tipModeSwitch.addEventListener('click', () => {
    document.getElementById('manualTipValue').value = '';
    document.getElementById('percTipValue').value = '';
    if (tipModeSwitch.checked) {
        selectedTip = 0;
        isManual = true;
        manualTipSec.classList.remove('hidden');
        perTipSec.classList.add('hidden');
        return true;
    } else if (!tipModeSwitch.checked) {
        selectedTip = 0;
        isManual = false;
        manualTipSec.classList.add('hidden');
        perTipSec.classList.remove('hidden');
        return false;
    }
})

//CORE: display function, each time called display and update based on current formData
function display() {
    //get data from form --> FormData OBJ
    const formData = new FormData(formElement);
    console.log(formData);

    //ternary operator to validate input, filters out file and converts: strings to float
    const validate = (input) => typeof input != 'number' ?
        parseFloat(typeof input === 'string' ? input : null) : input;

    //validate inputs from formData
    const billValue = formData.get('bill');
    const peopleValue = formData.get('people');
    //ternary operators to validate input, filters out file and converts: strings to float
    const tot = validate(billValue);
    const ppl = validate(peopleValue);

    if (isNaN(tot) || isNaN(ppl) || isNaN(selectedTip)) {
        console.warn("Invalid input detected", {tot, ppl, selectedTip});
        return false;
    }

    //display data --> using tot, selectedTip and ppl as parameter for calculation
    const singleTip = tipPers(tot, selectedTip, ppl).toFixed(2);
    const singleTot = totPers(tot, selectedTip, ppl).toFixed(2);

    //validate calculation if NaN or infinity doesn't display
    if (isNaN(singleTip) || isNaN(singleTot) || isNaN(selectedTip)) {
        console.warn('result is NaN', {singleTip, singleTot, selectedTip});
        return false;
    } else if (singleTip === 'Infinity' || singleTot === 'Infinity') {
        console.warn('result is Infinity');
        return false;
    } else {
        document.getElementById('tipPerson').innerText = `$${singleTip}`;
        document.getElementById('total').innerText = `$${singleTot}`;
        return true;
    }
}