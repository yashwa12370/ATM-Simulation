/* =================================
   ATM DATA
================================= */

// Default account data
const defaultAccount = {
    name: "Yashwa Rubab",
    pin: "1234",
    balance: 25000,
    transactions: []
};


// Load account from LocalStorage
let account =
    JSON.parse(localStorage.getItem("atmAccount"))
    || defaultAccount;


// Current entered PIN
let enteredPin = "";

// Number of wrong attempts
let attempts = 0;

// Maximum attempts
const maxAttempts = 3;


/* =================================
   SAVE DATA
================================= */

function saveAccount() {

    localStorage.setItem(
        "atmAccount",
        JSON.stringify(account)
    );

}


/* =================================
   FORMAT MONEY
================================= */

function formatMoney(amount) {

    return "Rs. " + amount.toLocaleString("en-PK");

}


/* =================================
   PIN SYSTEM
================================= */

function enterPin(number) {

    if (enteredPin.length >= 4) {
        return;
    }

    enteredPin += number;

    updatePinDisplay();

}


function removePin() {

    enteredPin = enteredPin.slice(0, -1);

    updatePinDisplay();

}


function clearPin() {

    enteredPin = "";

    updatePinDisplay();

}


function updatePinDisplay() {

    const dots =
        document.querySelectorAll("#pinDisplay span");


    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    });

}


/* =================================
   LOGIN
================================= */

function login() {

    const message =
        document.getElementById("loginMessage");


    if (enteredPin.length !== 4) {

        showMessage(
            message,
            "Please enter your 4-digit PIN.",
            "error"
        );

        return;
    }


    // Correct PIN
    if (enteredPin === account.pin) {

        attempts = 0;

        enteredPin = "";

        updatePinDisplay();

        message.style.display = "none";

        document.getElementById("loginScreen")
            .classList.add("hidden");

        document.getElementById("dashboardScreen")
            .classList.remove("hidden");


        updateDashboard();

    }

    // Wrong PIN
    else {

        attempts++;

        enteredPin = "";

        updatePinDisplay();


        if (attempts >= maxAttempts) {

            showMessage(
                message,
                "Account locked! Too many incorrect attempts.",
                "error"
            );

            document
                .querySelectorAll(".keypad button")
                .forEach(button => {
                    button.disabled = true;
                    button.style.opacity = "0.5";
                });

            document.querySelector(".login-btn").disabled = true;

        }

        else {

            const remaining =
                maxAttempts - attempts;

            showMessage(
                message,
                `Incorrect PIN! You have ${remaining} attempt(s) left.`,
                "error"
            );

        }

    }

}


/* =================================
   UPDATE DASHBOARD
================================= */

function updateDashboard() {

    document.getElementById("userName")
        .textContent = account.name;


    document.getElementById("balanceAmount")
        .textContent = formatMoney(account.balance);

}


/* =================================
   SHOW SECTION
================================= */

function showSection(sectionId) {

    // Hide dashboard
    document
        .getElementById("dashboardScreen")
        .classList.add("hidden");


    // Show transaction screen
    document
        .getElementById("transactionScreen")
        .classList.remove("hidden");


    // Hide all transaction sections
    document
        .querySelectorAll(".transaction-section")
        .forEach(section => {
            section.classList.add("hidden");
        });


    // Show selected section
    document
        .getElementById(sectionId)
        .classList.remove("hidden");


    // Update data
    if (sectionId === "balanceSection") {

        document.getElementById("balanceDisplay")
            .textContent =
            formatMoney(account.balance);

    }


    if (sectionId === "historySection") {

        renderHistory();

    }

}


/* =================================
   BACK TO DASHBOARD
================================= */

function backToDashboard() {

    document
        .getElementById("transactionScreen")
        .classList.add("hidden");


    document
        .getElementById("dashboardScreen")
        .classList.remove("hidden");


    updateDashboard();

}


/* =================================
   WITHDRAW
================================= */

function setWithdrawAmount(amount) {

    document.getElementById("withdrawAmount")
        .value = amount;

}


function withdrawMoney() {

    const input =
        document.getElementById("withdrawAmount");

    const amount =
        Number(input.value);

    const message =
        document.getElementById("withdrawMessage");


    // Validation
    if (!amount || amount <= 0) {

        showMessage(
            message,
            "Please enter a valid amount.",
            "error"
        );

        return;
    }


    if (amount < 500) {

        showMessage(
            message,
            "Minimum withdrawal is Rs. 500.",
            "error"
        );

        return;
    }


    if (amount % 500 !== 0) {

        showMessage(
            message,
            "Amount must be in multiples of Rs. 500.",
            "error"
        );

        return;
    }


    if (amount > account.balance) {

        showMessage(
            message,
            "Insufficient balance.",
            "error"
        );

        return;
    }


    // Deduct money
    account.balance -= amount;


    // Add transaction
    addTransaction(
        "Withdrawal",
        -amount
    );


    saveAccount();


    input.value = "";

    message.style.display = "none";


    showModal(
        "Transaction Successful",
        `${formatMoney(amount)} has been withdrawn from your account.`
    );

}


/* =================================
   DEPOSIT
================================= */

function setDepositAmount(amount) {

    document.getElementById("depositAmount")
        .value = amount;

}


function depositMoney() {

    const input =
        document.getElementById("depositAmount");

    const amount =
        Number(input.value);

    const message =
        document.getElementById("depositMessage");


    if (!amount || amount <= 0) {

        showMessage(
            message,
            "Please enter a valid amount.",
            "error"
        );

        return;
    }


    if (amount < 100) {

        showMessage(
            message,
            "Minimum deposit is Rs. 100.",
            "error"
        );

        return;
    }


    // Add money
    account.balance += amount;


    addTransaction(
        "Deposit",
        amount
    );


    saveAccount();


    input.value = "";

    message.style.display = "none";


    showModal(
        "Deposit Successful",
        `${formatMoney(amount)} has been added to your account.`
    );

}


/* =================================
   TRANSFER
================================= */

function transferMoney() {

    const accountNumber =
        document.getElementById("accountNumber").value.trim();

    const amount =
        Number(
            document.getElementById("transferAmount").value
        );

    const remarks =
        document.getElementById("remarks").value.trim();

    const message =
        document.getElementById("transferMessage");


    if (accountNumber.length < 8) {

        showMessage(
            message,
            "Please enter a valid recipient account number.",
            "error"
        );

        return;
    }


    if (!amount || amount <= 0) {

        showMessage(
            message,
            "Please enter a valid transfer amount.",
            "error"
        );

        return;
    }


    if (amount > account.balance) {

        showMessage(
            message,
            "Insufficient balance.",
            "error"
        );

        return;
    }


    // Deduct transfer
    account.balance -= amount;


    addTransaction(
        "Transfer",
        -amount,
        accountNumber
    );


    saveAccount();


    document.getElementById("accountNumber").value = "";

    document.getElementById("transferAmount").value = "";

    document.getElementById("remarks").value = "";


    message.style.display = "none";


    showModal(
        "Transfer Successful",
        `${formatMoney(amount)} has been transferred successfully.`
    );

}


/* =================================
   TRANSACTION HISTORY
================================= */

function addTransaction(type, amount, accountNumber = "") {

    const transaction = {

        id: Date.now(),

        type: type,

        amount: amount,

        account: accountNumber,

        balance: account.balance,

        date: new Date().toLocaleString("en-PK")

    };


    account.transactions.unshift(transaction);


    // Keep only latest 20 transactions
    if (account.transactions.length > 20) {

        account.transactions =
            account.transactions.slice(0, 20);

    }

}


/* =================================
   RENDER HISTORY
================================= */

function renderHistory() {

    const container =
        document.getElementById("historyContainer");


    container.innerHTML = "";


    if (account.transactions.length === 0) {

        container.innerHTML = `
            <div class="history-item">
                <p style="color:#718096;font-size:13px;">
                    No transactions yet.
                </p>
            </div>
        `;

        return;
    }


    account.transactions.forEach(transaction => {

        const positive =
            transaction.amount > 0;


        let icon = "💵";

        if (transaction.type === "Deposit") {
            icon = "💳";
        }

        if (transaction.type === "Transfer") {
            icon = "🔄";
        }


        const accountText =
            transaction.account
            ? `Account: ${transaction.account}`
            : transaction.date;


        const item = document.createElement("div");

        item.className = "history-item";


        item.innerHTML = `

            <div class="history-left">

                <div class="history-icon ${
                    positive ? "deposit" : "withdraw"
                }">
                    ${icon}
                </div>

                <div class="history-info">

                    <h4>
                        ${transaction.type}
                    </h4>

                    <p>
                        ${accountText}
                    </p>

                </div>

            </div>

            <div
                class="history-amount ${
                    positive
                    ? "positive"
                    : "negative"
                }"
            >
                ${
                    positive ? "+" : "-"
                }
                ${formatMoney(Math.abs(transaction.amount))}
            </div>

        `;


        container.appendChild(item);

    });

}


/* =================================
   CHANGE PIN
================================= */

function changePin() {

    const currentPin =
        document.getElementById("currentPin").value;

    const newPin =
        document.getElementById("newPin").value;

    const confirmPin =
        document.getElementById("confirmPin").value;

    const message =
        document.getElementById("pinMessage");


    if (currentPin !== account.pin) {

        showMessage(
            message,
            "Current PIN is incorrect.",
            "error"
        );

        return;
    }


    if (!/^\d{4}$/.test(newPin)) {

        showMessage(
            message,
            "New PIN must contain exactly 4 digits.",
            "error"
        );

        return;
    }


    if (newPin !== confirmPin) {

        showMessage(
            message,
            "New PINs do not match.",
            "error"
        );

        return;
    }


    if (newPin === currentPin) {

        showMessage(
            message,
            "New PIN must be different from current PIN.",
            "error"
        );

        return;
    }


    // Update PIN
    account.pin = newPin;


    saveAccount();


    document.getElementById("currentPin").value = "";

    document.getElementById("newPin").value = "";

    document.getElementById("confirmPin").value = "";


    message.style.display = "none";


    showModal(
        "PIN Changed Successfully",
        "Your ATM PIN has been updated successfully."
    );

}


/* =================================
   MESSAGE FUNCTION
================================= */

function showMessage(element, text, type) {

    element.textContent = text;

    element.className = `message ${type}`;

}


/* =================================
   MODAL
================================= */

function showModal(title, text) {

    document.getElementById("modalTitle")
        .textContent = title;


    document.getElementById("modalText")
        .textContent = text;


    document.getElementById("modal")
        .classList.remove("hidden");

}


function closeModal() {

    document.getElementById("modal")
        .classList.add("hidden");

    backToDashboard();

}


/* =================================
   LOGOUT
================================= */

function showLogout() {

    document
        .getElementById("logoutModal")
        .classList.remove("hidden");

}


function closeLogout() {

    document
        .getElementById("logoutModal")
        .classList.add("hidden");

}


function logout() {

    closeLogout();


    document
        .getElementById("dashboardScreen")
        .classList.add("hidden");


    document
        .getElementById("transactionScreen")
        .classList.add("hidden");


    document
        .getElementById("loginScreen")
        .classList.remove("hidden");


    enteredPin = "";

    attempts = 0;

    updatePinDisplay();


    document.getElementById("loginMessage")
        .style.display = "none";

}


/* =================================
   INITIALIZE
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDashboard();

    }
);
function clearHistory() {

    if (account.transactions.length === 0) {
        alert("Transaction history is already empty.");
        return;
    }

    const confirmClear =
        confirm("Are you sure you want to clear transaction history?");

    if (confirmClear) {

        account.transactions = [];

        saveAccount();

        renderHistory();

        alert("Transaction history cleared successfully.");
    }
}