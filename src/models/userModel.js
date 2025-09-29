const pool = require("../config/dbConnection");

exports.createUser = async (name, email, password) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password) 
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, password]
  );
  return result.rows[0];
};

exports.getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

exports.getUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, created_at, password_changed_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

exports.setResetCode = async (resetCode, expireTime, userId) => {
  const result = await pool.query(
    `UPDATE users 
     SET password_reset_token = $1, password_reset_expires = $2
     WHERE id = $3 
     RETURNING password_reset_token`,
    [resetCode, new Date(expireTime), userId]
  );
  return result.rows[0];
};

exports.getUserByResetToken = async (hashedToken) => {
  const result = await pool.query(
    `SELECT * FROM users 
     WHERE password_reset_token = $1 
     AND password_reset_expires > now()`,
    [hashedToken]
  );
  return result.rows[0];
};

exports.updatePassword = async (userId, hashedPassword) => {
  await pool.query(
    `UPDATE users 
     SET password = $1,
         password_reset_token = NULL,
         password_reset_expires = NULL,
         password_changed_at = now()
     WHERE id = $2`,
    [hashedPassword, userId]
  );
};
