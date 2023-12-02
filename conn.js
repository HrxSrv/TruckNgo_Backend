import mysql from 'mysql';

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9455957884',
  database: 'truckngo',
});

database.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database with threadId:', database.threadId);
});

export { database };
