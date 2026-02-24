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

// sends array of all folders
export async function getFolders() {
  const sql=`
    SELECT *
    FROM folders
  `;
  const { rows: folders } = await db.query(sql);
  return folders;
};

// // send a folder by given ID
// export async function getFolderById(id) {
//   const sql=`
//     SELECT *
//     FROM folders
//     WHERE id=$1
//   `;
//   const { rows: [folder] } = await db.query(sql, [id]);
//   return folder;
// };

// get folder by id with files
export async function getFolderById(id) {
  const sql=`
    SELECT *,
    (
      SELECT json_agg(files)
      FROM files
      WHERE files.folder_id = folders.id
    ) AS files
    FROM folders
    WHERE id=$1
  `;
  const { rows: [folder] } = await db.query(sql, [id]);
  return folder;
}

// not needed
// update the folder with given id
// export async function updateFolder({ id, name, birthday, salary }) {
//   // TODO
//   const sql = `
//   UPDATE folders
//   SET name=$2, birthday=$3, salary=$4
//   WHERE id=$1
//   RETURNING *
//   `;
//   const { rows: [folder]} = await db.query(sql, 
//     [id, name, birthday, salary]
//   );
//   return folder;
