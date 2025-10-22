import pool from '../config/db.js';

// Dapatkan semua user
export const getAllUsers = async () => {
  const { rows } = await pool.query(
    'SELECT id, username, email, role, avatar_url FROM users'
  );
  return rows;
};

// Dapatkan user berdasarkan ID
export const getUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

// Update user (username, email, atau avatar)
export const updateUserById = async (id, username, email, avatar_url = null) => {
  let query, values;

  if (avatar_url) {
    query = `
      UPDATE users
      SET avatar_url = $1
      WHERE id = $2
      RETURNING id, username, email, avatar_url;
    `;
    values = [avatar_url, id];
  } else {
    query = `
      UPDATE users
      SET username = $1, email = $2
      WHERE id = $3
      RETURNING id, username, email, avatar_url;
    `;
    values = [username, email, id];
  }

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Hapus user
export const deleteUserById = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return rowCount > 0;
};
