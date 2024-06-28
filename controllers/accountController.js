// controllers/accountController.js
const accounts = [];

let nextId = 1;

const findAccount = (id) => accounts.find(acc => acc.id === id);

exports.createAccount = (req, res) => {
  const { name, balance = 0 } = req.body;
  const account = { id: nextId++, name, balance };
  accounts.push(account);
  console.log('Account created:', account); // Debug log
  res.status(201).json(account);
};

exports.depositMoney = (req, res) => {
  const { id, amount } = req.body;
  const account = findAccount(id);
  console.log('Deposit request:', { id, amount }); // Debug log
  if (!account) {
    console.error('Account not found for deposit:', id); // Error log
    return res.status(404).json({ error: 'Account not found' });
  }
  account.balance += amount;
  console.log('Account after deposit:', account); // Debug log
  res.status(200).json(account);
};

exports.withdrawMoney = (req, res) => {
  const { id, amount } = req.body;
  const account = findAccount(id);
  console.log('Withdraw request:', { id, amount }); // Debug log
  if (!account) {
    console.error('Account not found for withdrawal:', id); // Error log
    return res.status(404).json({ error: 'Account not found' });
  }
  if (account.balance < amount) {
    console.error('Insufficient balance for withdrawal:', { id, amount }); // Error log
    return res.status(400).json({ error: 'Insufficient balance' });
  }
  account.balance -= amount;
  console.log('Account after withdrawal:', account); // Debug log
  res.status(200).json(account);
};

exports.getAccountDetails = (req, res) => {
  const account = findAccount(parseInt(req.params.id, 10));
  console.log('Get account details request:', req.params.id); // Debug log
  if (!account) {
    console.error('Account not found for details:', req.params.id); // Error log
    return res.status(404).json({ error: 'Account not found' });
  }
  console.log('Account details:', account); // Debug log
  res.status(200).json(account);
};
