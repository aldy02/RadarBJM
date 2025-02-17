const bcrypt = require('bcryptjs');

// Password yang akan dienkripsi
const password = 'password_pelanggan5';

// Fungsi untuk mengenkripsi password
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Encrypted password:', hashedPassword);
  }
});