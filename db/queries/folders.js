import db from "#db/client";

export async function createFolder(name) {
  const sql = `
  INSERT INTO folders (name)
  VALUES ($1)
  RETURNING *
  `;
  const { rows: [newlyCreatedFolder] } = await db.query(sql, [name]);
  return newlyCreatedFolder;
}