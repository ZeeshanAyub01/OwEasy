
participantList = [];


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
        _owed: [],
        addToDebts: debt => {
            if(typeof debt === 'Number'){
                this._debts.push(debt);
            } else{
                alert('Amount must be a number!');
            }
            
        },
        addToOwed: amount => {
            if (typeof amount === 'Number') {
                this._owed.push(amount);
            } else {
                alert('Amount must be a number!');
            }

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
var owed_amount = document.getElementById('amount');

add_btn.addEventListener("click", function(){
    if(parti_name.value){
        //Add functionality to check if the participant name already exists
        let newParticipant = createParticipant(parti_name.value);
        if (participantList.length === 0){
            participant_names.textContent = '   ' + parti_name.value;
        }
        else {
            participant_names.textContent += ', ' + parti_name.value;
        }

        parti_name.value = "";
        participantList.push(newParticipant);
        num_participants.textContent = participantList.length;

        if (participantList.length >= 2) {
            done_adding_link.setAttribute("href", "#transactions_section");
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
        participantList.forEach(participant => {
            console.log(participant.name);
            added_participants_1.innerHTML += "<option>" + participant.name + "</option>";
            added_participants_2.innerHTML += "<option>" + participant.name + "</option>";
        });
        console.log(added_participants_1.innerHTML);
    }
}); 

transaction_add_btn.addEventListener("click", function () {
    creditor = added_participants_2.value;
    debtor = added_participants_1.value;
    
    console.log(debtor + ' owes ' + creditor + ' something');
});