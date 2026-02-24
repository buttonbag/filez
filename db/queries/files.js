import db from "#db/client";

export async function createFile(name, size, folder_id) {
  const sql = `
  INSERT INTO files (name, size, folder_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const { rows: [newlyCreatedFile] } = await db.query(sql, [name, size, folder_id]);
  return newlyCreatedFile;
}

// sends array of all files
export async function getFiles() {
  const sql=`
    SELECT files.*, folder_id AS folder_name
    FROM files
      JOIN folders ON folders.id = files.folder_id
  `;
  const { rows: files } = await db.query(sql);
  return files;
};