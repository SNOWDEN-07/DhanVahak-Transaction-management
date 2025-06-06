let transactions = [];
let balance = 0;

const form = document.getElementById("transaction-form");
const balanceDisplay = document.getElementById("balance");
const tableBody = document.querySelector("#transaction-table tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount)) {
    alert("Please enter valid inputs!");
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount,
    type,
  };

  transactions.push(transaction);
  updateTable();
  form.reset();
});

function updateTable() {
  tableBody.innerHTML = "";
  balance = 0;

  transactions.forEach((tx, index) => {
    const row = document.createElement("tr");

    const amt = tx.type === "expense" ? -tx.amount : tx.amount;
    balance += amt;

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${tx.desc}</td>
      <td>₹${tx.amount}</td>
      <td style="color:${tx.type === "income" ? "green" : "red"}">${tx.type}</td>
      <td><span class="delete-btn" onclick="deleteTransaction(${tx.id})">🗑</span></td>
    `;
    tableBody.appendChild(row);
  });

  balanceDisplay.innerText = balance.toFixed(2);
}

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  updateTable();
}
