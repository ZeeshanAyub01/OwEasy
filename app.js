
participantList = [];
temp_list = [];
transactions_list = [];
var total_particpants = participantList.length;

class Participant {
    constructor(name) {
        this._name = name;
        this._credits = [];
        this._debts = [];
    }

    get name(){
        return this._name;
    }

    get credits() {
        return this._credits;
    }

    get debts() {
        return this._debts;
    }

    get total_credit(){
        this._total_credit = 0;
        for (var i = 0; i < this._credits.length; i++){
            this._total_credit += Number(this._credits[i].amount);
        }
        return this._total_credit;
    }

    get total_debt() {
        this._total_debt = 0;
        for (var i = 0; i < this._debts.length; i++) {
            this._total_debt += Number(this._debts[i].amount);
        }

        return this._total_debt;
    }

    get net_credit(){
        return this.total_credit - this.total_debt;;
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
            if(typeof amount === 'Number'){
                this._amount = amount;
            }
            
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
var done_adding_trans_btn = document.getElementById('done_adding_trans_btn');


add_btn.addEventListener("click", function(){
    if(parti_name.value){
        //Add functionality to check if the participant name already exists
        for(var i = 0; i < participantList.length; i++){
            if (participantList[i].name === parti_name.value){
                alert('The participant ' + parti_name.value + ' has already been added! Add a different name for this participant!');
                return;
            }
        }

        let newParticipant = new Participant(parti_name.value);
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
        console.log(participantList);
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
    amount = Number(owed_amount.value);
    currency = amount_currency.value;
    description = transaction_desc.value;

    console.log(debtor + ' owes ' + creditor + ' ' + currency + amount + ' for ' + description);

    newTransaction = createTransaction(creditor, debtor, amount, description);

    participant_creditor = fetchParticipant(creditor);
    participant_debtor = fetchParticipant(debtor);

    // console.log('Creditor for this transacton: '+ participant_creditor.name);
    // console.log('Debtor for this transaction: ' + participant_debtor.name);

    participant_creditor.credits.push(newTransaction);
    participant_debtor.debts.push(newTransaction);

    //console.log(participant_creditor.name + ' is owed a total of: ' + currency + participant_creditor.total_credit + '. Thus their net credit = ' + participant_creditor.net_credit);
    //console.log(participant_debtor.name + ' owes a total of: ' + currency + participant_debtor.total_debt + '. Thus their net credit = ' + participant_debtor.net_credit);

    added_participants_2.value = "";
    added_participants_1.value = "";
    owed_amount.value = "0.00";
    transaction_desc.value = "";


});

function fetchParticipant(participant_name){

    for(var i = 0; i < participantList.length; i++){
        if (participantList[i].name == participant_name){
            return participantList[i];
        }
    }

    return null;
}

function addUnresolvedAmount() {
    shortList = [];
    j = 0;
    for (var i = 0; i < participantList.length; i++) {
        if (participantList[i].net_credit != 0) {
            shortList.push(participantList[i]);
            shortList[j].unresolved_amount = participantList[i].net_credit;
            j += 1;
        }
    }

    return shortList;
}

function generateShorterList(initShortList){
    shorterList = [];
    
    for (var i = 0; i < initShortList.length; i++){
        if (initShortList[i].unresolved_amount != 0){
            shorterList.push(initShortList[i]);
        }
        
    }

    initShortList = [];
    return shorterList;
}

function resolveADebt(initShortList){

    initShortList.sort(function (p1, p2) {
        return p1.unresolved_amount - p2.unresolved_amount;
    });

    p1 = initShortList[0];
    p2 = initShortList[initShortList.length - 1];

    ura_1 = p1.unresolved_amount;
    ura_2 = p2.unresolved_amount;

    //console.log('The UR of ' + p1.name + ' is: ' + p1.unresolved_amount + ' and the UR of ' + p2.name + ' is: ' + p2.unresolved_amount);

    if (Math.abs(p1.unresolved_amount) > p2.unresolved_amount){
        console.log(p1.name + ' should pay ' + p2.name + ' $' + Math.abs(p2.unresolved_amount));
        initShortList[0].unresolved_amount += Math.abs(initShortList[initShortList.length - 1].unresolved_amount);
        initShortList[initShortList.length - 1].unresolved_amount -= Math.abs(ura_2);
        // console.log('Now ' + p1.name + '\'s unresolved amount is = ' + p1.unresolved_amount);
        // console.log('And ' + p2.name + '\'s unresolved amount is = ' + p2.unresolved_amount);
    }
    else if (Math.abs(p1.unresolved_amount) <= p2.unresolved_amount){
        console.log(p1.name + ' should pay ' + p2.name + ' $' + Math.abs(p1.unresolved_amount));
        initShortList[0].unresolved_amount += Math.abs(initShortList[0].unresolved_amount);
        initShortList[initShortList.length - 1].unresolved_amount -= Math.abs(ura_1);
        // console.log('Now ' + p1.name + '\'s unresolved amount is = ' + p1.unresolved_amount);
        // console.log('And ' + p2.name + '\'s unresolved amount is = ' + p2.unresolved_amount);
    }

    return initShortList;

}


done_adding_trans_btn.addEventListener("click", function () {

    shortList = addUnresolvedAmount();//To add an extra attribute 'unresolved_amount' to participants whose net_credit is non-zero; called only once
    

    // let sorted_low_to_high = [];
    // let sorted_high_to_low = [];

    while (shortList.length > 1){
        shortList = resolveADebt(shortList);
        shortList = generateShorterList(shortList);//To shorten the list based on participants whose unresolved_amount is still non-zero; called multiple times
    }

    // sorted_low_to_high.sort(function (p1, p2){
    //     return p1.net_credit - p2.net_credit;
    // });

    // sorted_high_to_low.sort(function (p1, p2) {
    //     return p2.net_credit - p1.net_credit;
    // });

    // console.log(sorted_low_to_high);
    // console.log('***************************************');
    // console.log(sorted_high_to_low);
});