const accounts = [
  {
    numberAccount: "00112341",
    typeAccount: "ahorros",
    passcode: "123451",
    owner: "Lucía Romero",
    balance: 500,
  },
  {
    numberAccount: "00112342",
    typeAccount: "corriente",
    passcode: "123452",
    owner: "Pedro Pérez",
    balance: 300,
  },
  {
    numberAccount: "00112343",
    typeAccount: "ahorros",
    passcode: "123453",
    owner: "Luis Muñoz",
    balance: 200,
  },
  {
    numberAccount: "00112344",
    typeAccount: "corriente",
    passcode: "123454",
    owner: "Amaranto Perea",
    balance: 800,
  },
];

// Variables
const date = new Date();

const d = document;
const sectionAccounts = d.getElementById("section-accounts"); // seleciono sección
const sectionMain = d.getElementById("section-main");
const modalTitle = d.querySelector(".modal-title");
const receiptMessage = d.getElementById("modal-receipt");
const bodyModal = d.querySelector(".modal-body");

const receipt = {
  date: `${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`,
};

let validAccount;
let typeTransaction; // undefined

// Mostrar Errores
function showError(message, element) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error");
  element.insertAdjacentElement("afterend", errorMessage);

  setTimeout(() => {
    errorMessage.classList.add("d-none");
  }, 3000);
}

// Validar cuenta
function validateAccount(passcode) {
  return accounts.find((acc) => acc.passcode === passcode);
}

// Insertar dinero
const insertCash = (acc, amount) => {
  if (acc.balance + amount > 990) return; // false
  acc.balance += amount; // acc.balance = acc.balance + amount
  return true;
};

// Retirar dinero
const withdrawCash = (acc, amount) => {
  if (acc.balance - amount < 10) return;
  acc.balance -= amount;
  return true;
};

const makeTransaction = (type, passcode, amount) => {
  const validAccount = validateAccount(passcode);

  if (validAccount) {
    if (type === "insert") {
      const validTransaction = insertCash(validAccount, amount);

      if (validTransaction === true) {
        receipt.type = "Ingreso";
        receipt.amount = amount;
        receipt.newBalance = validAccount.balance;

        receiptMessage.querySelector(
          "#amount-receipt"
        ).textContent = `$${receipt.amount.toFixed(2)}`; //$100.00
        receiptMessage.querySelector("#type").textContent = receipt.type;
        receiptMessage.querySelector("#date").textContent = receipt.date;
        receiptMessage.querySelector(
          "#new-balance"
        ).textContent = `$${receipt.newBalance.toFixed(2)}`;
        d.querySelector(".modal-form").classList.add("d-none");
        receiptMessage.classList.remove("d-none");

        setTimeout(() => {
          receiptMessage.classList.add("d-none");
          location.reload();
        }, 4000);
      } else {
        showError("Monto Inválido", bodyModal);
      }
    }

    if (type === "withdraw") {
      const validTransaction = withdrawCash(validAccount, amount);

      if (validTransaction === true) {
        receipt.type = "Retiro";
        receipt.amount = amount;
        receipt.newBalance = validAccount.balance;

        receiptMessage.querySelector(
          "#amount-receipt"
        ).textContent = `$ ${receipt.amount.toFixed(2)}`;
        receiptMessage.querySelector("#type").textContent = receipt.type;
        receiptMessage.querySelector("#date").textContent = receipt.date;
        receiptMessage.querySelector(
          "#new-balance"
        ).textContent = `$ ${receipt.newBalance.toFixed(2)}`;
        d.querySelector(".modal-form").classList.add("d-none");
        receiptMessage.classList.remove("d-none");

        setTimeout(() => {
          receiptMessage.classList.add("d-none");
          location.reload();
        }, 4000);
      } else {
        showError("Saldo Insuficiente", bodyModal);
      }
    }
  } else {
    showError("Clave Incorrecta", bodyModal);
  }
};
// Event Click
d.addEventListener("click", (e) => {
  if (e.target.matches("#button-start")) {
    d.querySelector(".home").classList.add("d-none");
    sectionMain.classList.remove("d-none");
  }

  // Realizar transacción
  if (e.target.matches("#insert-cash")) {
    typeTransaction = "insert";
    modalTitle.textContent = "Ingresar Dinero";
  }

  if (e.target.matches("#withdraw-cash")) {
    typeTransaction = "withdraw";
    modalTitle.textContent = "Retirar Dinero";
  }

  if (e.target.matches("#btn-transaction")) {
    const passcode = d.getElementById("passcode").value;
    let cant = Number(d.getElementById("cant").value);

    makeTransaction(typeTransaction, passcode, cant);
  }

  // if(e.target.matches("#detail-account")) console.log(validAccount)

  if (e.target.matches("#logout")) {
    location.reload();
  }
});
