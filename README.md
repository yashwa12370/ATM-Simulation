🏧 ATM Simulation

A simple and professional ATM Simulation Web Application built using HTML, CSS, and JavaScript.
This project simulates common ATM operations through a clean, responsive, and user-friendly interface. It demonstrates practical use of JavaScript logic, DOM manipulation, form validation, transaction handling, and browser "localStorage".

📌 Project Overview

The ATM Simulation allows users to securely log in using a 4-digit PIN and perform common banking operations such as checking balance, withdrawing cash, depositing money, transferring funds, viewing transaction history, and changing their PIN.
The project is designed as a beginner-friendly front-end project while maintaining a professional banking-style user interface.

✨ Features

🔐 PIN Login

- 4-digit PIN authentication
- Maximum 3 incorrect attempts
- Account gets locked after 3 failed attempts
- Interactive PIN keypad
- PIN input display using dots

💰 Balance Inquiry

- Displays the current account balance
- Balance is automatically updated after every transaction

💵 Cash Withdrawal

- Withdraw money from the account
- Minimum withdrawal: Rs. 500
- Withdrawal amount must be in multiples of Rs. 500
- Prevents withdrawal when balance is insufficient

💳 Cash Deposit

- Deposit money into the account
- Minimum deposit: Rs. 100
- Balance is automatically updated

🔄 Money Transfer

- Transfer money to another account
- Recipient account number validation
- Insufficient balance validation
- Optional transfer remarks

📜 Transaction History

- Displays recent transactions
- Shows transaction type and amount
- Displays deposits and withdrawals separately
- Stores up to the latest 20 transactions

🗑️ Clear Transaction History

- Allows the user to clear transaction history
- Confirmation is required before deleting history
- Prevents accidental deletion

🔑 Change PIN

- Requires current PIN
- New PIN must contain exactly 4 digits
- New PIN and confirmation PIN must match
- New PIN must be different from the old PIN

🚪 Logout

- Allows the user to securely return to the login screen
- Clears the current login session

💾 Local Storage

- Account information is saved using browser "localStorage"
- Balance, PIN, and transaction history remain available after page refresh

📱 Responsive Design

- Works on desktop, tablet, and mobile screens
- Clean and professional banking-style interface

---

🛠️ Technologies Used

- HTML5 — Structure of the application
- CSS3 — Styling, layout, responsive design, and animations
- JavaScript — Application logic and ATM functionality
- LocalStorage — Persistent browser-based data storage

▶️ How to Run

1. Clone or Download the Project

Download the project files to your computer.

2. Open the Project

Open the project folder in Visual Studio Code.

3. Run the Application

Open "index.html" in your browser.

You can also use the Live Server extension in Visual Studio Code for a better development experience.

4. Login

Enter the demo PIN:

1234

You can now explore all available ATM operations.

🧪 Validation & Security Features

The project includes several validation checks:

- PIN must contain exactly 4 digits
- Maximum 3 incorrect PIN attempts
- Withdrawal cannot exceed available balance
- Withdrawal amount must be at least Rs. 500
- Withdrawal must be in multiples of Rs. 500
- Deposit must be at least Rs. 100
- Transfer amount cannot exceed available balance
- Recipient account number must be valid
- New PIN must be exactly 4 digits
- New PIN cannot be the same as the current PIN
- Confirmation PIN must match the new PIN

«This is an educational front-end simulation and does not connect to a real banking system.»

💡 Learning Objectives

This project was created to practice and understand:

- JavaScript functions
- Variables and objects
- Conditional statements
- DOM manipulation
- Event handling
- Form validation
- Array manipulation
- Dynamic HTML generation
- LocalStorage
- Responsive web design
- User interface development
- Basic banking application logic

🚀 Future Improvements

Possible future enhancements include:

- Multiple user accounts
- Real backend/database integration
- OTP verification
- Account statement download
- Date and time based transaction filtering
- Dark mode
- Admin dashboard
- Real authentication system
- Backend API integration
- Database support
