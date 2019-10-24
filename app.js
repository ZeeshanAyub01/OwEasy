
const userFactory = (fullName, nickName, email, expenses, total_owing, total_owed) => {
    return {
        fullName: fullName,
        nickName: nickName,
        email: email,
        expenseList: expenses,
        total_owing: total_owing,
        total_owed: total_owed
    }
};

const expenseFactory = (description, creditor, debtor, amount) => {
    return {
        description: description,
        creditor: creditor,
        debtor: debtor,
        amount: amount
    }
};

const groupFactory = (groupName, userList, expenseList, notes) => {
    return {
        groupName: groupName,
        userList: userList,
        expenseList: expenseList,
        notes: notes
    }
};


let groupList = [];
let userList = [];
let expenseList = [];

let notes = 'This is just to test groups';

let newGroup = groupFactory('Cancun group', userList, expenseList, notes);

let user1 = userFactory('', 'Zeeshan', 'zayub92@hotmail.com',expenseList,0,0);
let user2 = userFactory('Qudrat', 'Chico', 'sexy_chico@outlook.com',expenseList,0,0);
let user3 = userFactory('Arbab', '', '',expenseList,0,0);
let user4 = userFactory('Luqman Ejaz', 'Loqi', 'sexy_shorts@gmail.com',expenseList,0,0);

newGroup.userList.push(user1);
newGroup.userList.push(user2);
newGroup.userList.push(user3);
newGroup.userList.push(user4);

if(userList.length <= 1){
    console.log('A group can\'t have one or less members!');
}

let expense1 = expenseFactory('Flight', userList[1], userList[0], 400);
userList[1].expenseList.push(expense1);
userList[0].expenseList.push(expense1);
userList[1].total_owed += 400;
userList[0].total_owing += 400;

let expense2 = expenseFactory('Gas', userList[1], userList[2], 50);
userList[1].expenseList.push(expense2);
userList[2].expenseList.push(expense2);
userList[1].total_owed += 50;
userList[2].total_owing += 50;

let expense3 = expenseFactory('Souvenirs', userList[2], userList[3], 22);
userList[2].expenseList.push(expense3);
userList[3].expenseList.push(expense3);
userList[2].total_owed += 22;
userList[3].total_owing += 22;

let expense4 = expenseFactory('Other shit', userList[1], userList[0], 150);
userList[1].expenseList.push(expense4);
userList[0].expenseList.push(expense4);
userList[1].total_owed += 150;
userList[0].total_owing += 150;

newGroup.expenseList.push(expense1);
newGroup.expenseList.push(expense2);
newGroup.expenseList.push(expense3);
newGroup.expenseList.push(expense4);

console.log(newGroup);


var UIController = (function () {

    var DOMstrings = {
        inputGroup: '.add__type',
        inputMember: '.add__member',
        inputTransaction: '.add__transaction',
        inputAmount: '.add__amount',
        inputBtn: '.add__btn',
        doneBtn: '.done__btn'   
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },

        addListItem: function (obj, type) {

            var html, newHtml;
            //Create HTML string with placeholder text,
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }


            //Replace the placeholder text with some actual data,
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearfields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); //Returns a list; so array methods can't be used

            fieldsArr = Array.prototype.slice.call(fields); //This is to call array methods to a list such as fields

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();