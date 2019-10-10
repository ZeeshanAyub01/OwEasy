
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

console.log((newGroup));