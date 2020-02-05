
participantList = [];
temp_list = [];
transactions_list = [];
payments_list = [];
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
        let total_credit_amount = 0;
        let total_credit_currency = '$';

        for (var i = 0; i < this._credits.length; i++){
            total_credit_amount += Number(this._credits[i].amount);
        }

        if (total_credit_amount === 0){
            total_credit_currency = this._debts[0].currency;
            //console.log('THis total credit currency and name: ' + this._debts[0].currency+this._name);
        }

        return { currency: total_credit_currency, amount: total_credit_amount};
    }

    get total_debt() {
        let total_debt_amount = 0;
        let total_debt_currency = '$';

        for (var i = 0; i < this._debts.length; i++) {
            total_debt_amount += Number(this._debts[i].amount);
        }

        if (total_debt_amount === 0) {
            total_debt_currency = this._credits[0].currency;
        }

        return { currency: total_debt_currency, amount: total_debt_amount };
    }

    get net_credit(){
        return { currency : this.total_credit.currency, amount : this.total_credit.amount - this.total_debt.amount};
    }


}

class Transaction{
    constructor(creditor, debtor, currency,  amount, description) {
        this._creditor= creditor;
        this._debtor= debtor;
        this._currency = currency;
        this._amount= amount;
        this._description = description;
    }

    get creditor(){
        return this._creditor;
    }
    set creditor(creditor_name){
        this._creditor = creditor_name;
    }
    get debtor() {
        return this._debtor;
    }
    set debtor(debtor_name) {
        this._debtor = debtor_name;
    }

    get currency() {
        return this._currency;
    }

    set currency(currency) {
        this._currency = currency;

    }

    get amount() {
        return this._amount;
    }

    set amount(amount) {
        if (typeof amount === 'Number') {
            this._amount = amount;
        }

    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get toString(){
        return this.debtor + ' owes ' + this.creditor + ' ' + this.currency + this.amount + ' for ' + this.description;
    }

}

    
class Payment {
    constructor(payer, payee, currency, amount){
        this._payer = payer;
        this._payee = payee;
        this._currency = currency;
        this._amount = amount;
        this._description = description;
    }

    get payer() {
        return this._payer;
    }
    set payer(payer_name) {
        this._payer = payer_name;
    }
    get payee() {
        return this._payee;
    }
    set payee(payee_name) {
        this._payee = payee_name;
    }

    get currency() {
        return this._currency;
    }

    set currency(currency) {
        this._currency = currency;

    }

    get amount() {
        return this._amount;
    }

    set amount(amount) {
        if (typeof amount === 'Number') {
            this._amount = amount;
        }

    }

    get toString() {
        return this.payer + ' must pay ' + this.payee + ' ' + this.currency + Math.abs(this.amount);
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

    newTransaction = new Transaction(creditor, debtor, currency, amount, description);
    console.log(newTransaction.toString);

    participant_creditor = fetchParticipant(creditor);
    participant_debtor = fetchParticipant(debtor);

    participant_creditor.credits.push(newTransaction);
    participant_debtor.debts.push(newTransaction);
    transactions_list.push(newTransaction);

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
        if (participantList[i].net_credit.amount != 0) {
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
        if (initShortList[i].unresolved_amount.amount != 0){
            shorterList.push(initShortList[i]);
        }
        
    }

    initShortList = [];
    return shorterList;
}

function resolveADebt(initShortList){

    //console.log(initShortList[0]);
    initShortList.sort(function (p1, p2) {
        //console.log(p1.unresolved_amount + ' and ' + p2.unresolved_amount.amount);
        return p1.unresolved_amount.amount - p2.unresolved_amount.amount;
    });

    p1 = initShortList[0];
    p2 = initShortList[initShortList.length - 1];

    ura_1 = p1.unresolved_amount.amount;
    ura_2 = p2.unresolved_amount.amount;


    if (Math.abs(p1.unresolved_amount.amount) > p2.unresolved_amount.amount){
        console.log(p1.name + ' should pay ' + p2.name + ' $' + Math.abs(p2.unresolved_amount.amount));
        initShortList[0].unresolved_amount.amount += Math.abs(initShortList[initShortList.length - 1].unresolved_amount.amount);
        initShortList[initShortList.length - 1].unresolved_amount.amount -= Math.abs(ura_2);
        
    }
    else if (Math.abs(p1.unresolved_amount.amount) <= p2.unresolved_amount.amount){
        
        newPayment = new Payment(p1.name, p2.name, p1.unresolved_amount.currency, p1.unresolved_amount.amount);
        console.log(newPayment.toString);
        initShortList[0].unresolved_amount.amount += Math.abs(initShortList[0].unresolved_amount.amount);
        initShortList[initShortList.length - 1].unresolved_amount.amount -= Math.abs(ura_1);
        
    }

    return initShortList;

}


done_adding_trans_btn.addEventListener("click", function () {

    shortList = addUnresolvedAmount();//To add an extra attribute 'unresolved_amount' to participants whose net_credit is non-zero; called only once
    

    while (shortList.length > 1){
        shortList = resolveADebt(shortList);
        shortList = generateShorterList(shortList);//To shorten the list based on participants whose unresolved_amount is still non-zero; called multiple times
    }

    if (shortList.length === 1){
        console.log(shortList[0].name + ' still has an unresolved amount of: $' + shortList[0].unresolved_amount.amount);
    }


});