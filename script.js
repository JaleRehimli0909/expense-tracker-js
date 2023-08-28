const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const list = document.querySelector("#list");
const balance = document.querySelector("#balance");
const money_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Generate random ID
const generateID = () => {
  Math.floor(Math.random() * 100000000);
};
//Add transaction

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
};

//Add transactions to  DOM list

const addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `

            ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onClick = "removeTransaction(${
    transaction.id
  })" >x</button>
    `;
  list.append(item);
};

// Update the balance, income and expense

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expense}`;
};

// Remove transactions by ID

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

// Update localStorage

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify("transactions"));
};

// Init app

const init = () => {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
};
init();
form.addEventListener("submit", addTransaction);
