import db from "#db/client";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";

// inside the async to stay consistent with async await convention
async function seed() {
  // connect to db
  await db.connect();
  // TODO
  // nested loop to create 3 folders and 5 files each
  for (let i = 1; i <= 3; i++) {
    const folder = await createFolder("Folder "+i);
    for (let j = 1; j <= 5; j++) {
      await createFile("File " + j, 1000 + j, folder.id);
    }
  }
  console.log("🌱 Database seeded.");
  await db.end();
}

await seed();