import fs from "fs";

async function example() {
  try {
    await fs.rename("/Users/joe", "/Users/roger", () => {});
  } catch (err) {
    console.log(err);
  }
}
example();
