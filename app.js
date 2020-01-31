
participantList = [];
temp_list = [];
var total_particpants = participantList.length;

function createParticipant(name){
    return{
        _name: name,
        get name(){
            return this._name
        },
        set name(name){
            if(typeof name === 'string'){
                this._name = name;
            }
        },
        _debts: [],
        _credits: [],
        get debts(){
            return this._debts;
        },
        set debts(debts_list){
            this._debts = debts_list;
        },
        get credits(){
            return this._credits;
        },
        set credits(credits_list) {
            this._credits = credits_list;
        }
        //Add attributes total_credit and total_debt and methods to calculate them automatically. You might have to consult codecademy for that
        //or turn these objects into classes

    }
}

function createTransaction(creditor, debtor, amount, description){
    return {
        _creditor: creditor,
        _debtor: debtor,
        _amount: amount,
        _description: description,
        get creditor(){
            return this._creditor;
        },
        set creditor(creditor_name){
            this._creditor = creditor_name;
        },
        get debtor() {
            return this._debtor;
        },
        set debtor(debtor_name) {
            this._debtor = debtor_name;
        },
        get amount() {
            return this._amount;
        },
        set amount(amount) {
            this._amount = amount;
        },
        get description() {
            return this._description;
        },
        set description(description) {
            this._description = description;
        }
    }
}

var add_btn = document.getElementById('participant_add_btn');
var parti_name = document.getElementById('participant_name');
var done_adding = document.getElementById('done_adding_btn');
var num_participants = document.getElementById('num_participants');
var participant_names = document.getElementById('participant_names');
var done_adding_link = document.getElementById('done_adding_link');
var added_participants_1 = document.getElementById('added_participants_1');
var added_participants_2 = document.getElementById('added_participants_2');
var transaction_add_btn = document.getElementById('transaction_add_btn');
var transaction_add_link = document.getElementById('transaction_add_link');
var owed_amount = document.getElementById('amount');
var amount_currency = document.getElementById('currency');
var transaction_desc = document.getElementById('transaction_desc');


add_btn.addEventListener("click", function(){
    if(parti_name.value){
        //Add functionality to check if the participant name already exists
        for(var i = 0; i < participantList.length; i++){
            if (participantList[i].name === parti_name.value){
                alert('The participant ' + parti_name.value + ' has already been added! Add a different name for this participant!');
                return;
            }
        }

        let newParticipant = createParticipant(parti_name.value);
        if (temp_list.length === 0){
            participant_names.textContent = '   ' + parti_name.value;
        }
        else {
            participant_names.textContent += ', ' + parti_name.value;
        }

        parti_name.value = "";
        temp_list.push(newParticipant);
        participantList.push(newParticipant);
        num_participants.textContent = temp_list.length;

        if (participantList.length >= 2) {
            done_adding_link.setAttribute("href", "#transactions_section");
            transaction_add_link.setAttribute("href", "#transactions_section");
        }
        
    } else{
        alert('The name for the participant cannot be blank!');
    }
    
});

done_adding.addEventListener("click", function () {
    if (participantList.length < 2){
        alert('You must add atleast 2 participants!');
    } 
    else{
        added_participants_1.innerHTML = "<option></option>";
        added_participants_2.innerHTML = "<option></option>";

        participantList.forEach(participant => {
            //console.log(participant.name);
            added_participants_1.innerHTML += "<option>" + participant.name + "</option>";
            added_participants_2.innerHTML += "<option>" + participant.name + "</option>";
        });
        total_particpants += participantList.length;
        temp_list = [];
        num_participants.textContent = 0;
        participant_names.textContent = '';
        //console.log(added_participants_1.innerHTML);
    }
}); 

transaction_add_btn.addEventListener("click", function () {

    if (total_particpants < 2) {
        alert('You must add atleast 2 participants before adding any transactions!');
        owed_amount.value = "0.00";
        transaction_desc.value = "";
        return;
    }

    if (!added_participants_2.value || !added_participants_2.value){
        alert('One or more of the names was left blank!');
    }

    creditor = added_participants_2.value;
    debtor = added_participants_1.value;
    amount = owed_amount.value;
    currency = amount_currency.value;
    description = transaction_desc.value;

    console.log(debtor + ' owes ' + creditor + ' ' + currency + amount + ' for ' + description);

    newTransaction = createTransaction(creditor, debtor, amount, description);

    addDebt(debtor, newTransaction);
    addCredit(creditor, newTransaction);
    
    added_participants_2.value = "";
    added_participants_1.value = "";
    owed_amount.value = "0.00";
    transaction_desc.value = "";

    displayCredit(creditor);
    displayDebt(debtor);

});

function addDebt(participant_name, transaction){
    for(var i = 0; i < participantList.length; i++){
        if (participantList[i].name === participant_name){
            participantList[i].debts.push(transaction);
        }
    }
}

function addCredit(participant_name, transaction) {
    for (var i = 0; i < participantList.length; i++) {
        if (participantList[i].name === participant_name) {
            participantList[i].credits.push(transaction);
        }
    }
}

function displayCredit(participant_name) {
    for (var i = 0; i < participantList.length; i++) {
        if (participantList[i].name === participant_name) {
            console.log(participantList[i].name);
            console.log(participantList[i].credits);
        }
    }
}

function displayDebt(participant_name) {
    for (var i = 0; i < participantList.length; i++) {
        if (participantList[i].name === participant_name) {
            console.log(participantList[i].name);
            console.log(participantList[i].debts);
        }
    }
}