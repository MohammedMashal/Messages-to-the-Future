const pool = require("../config/dbConnection");

exports.createMessage = async (
  userId,
  recipientEmail,
  title,
  body,
  scheduledAt
) => {
  const result = await pool.query(
    `
        INSERT INTO messages(user_id,recipient_email, title, body, scheduled_at)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
    [userId, recipientEmail, title, body, scheduledAt]
  );
  return result.rows[0];
};

exports.getMessagesByUser = async (userId) => {
  const result = await pool.query(
    ` SELECT * FROM messages
        WHERE user_id = $1
        ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

exports.getPendingMessages = async () => {
  //should be sent
  const result = await pool.query(
    `SELECT * FROM messages
       WHERE status = 'pending'
       AND scheduled_at <= NOW()
       ORDER BY scheduled_at ASC`
  );
  return result.rows;
};

exports.updateMessageStatus = async (id, status, sentAt = null) => {
  const result = await pool.query(
    `UPDATE messages
       SET status = $1,
           sent_at = $2
       WHERE id = $3
       RETURNING *`,
    [status, sentAt, id]
  );
  return result.rows[0];
};
