import { readFileSync, writeFileSync } from "node:fs";

const FILE = "src/data/listings.ts";
const source = readFileSync(FILE, "utf8");
if (source.includes("zipCode:")) {
  console.error("Already migrated, aborting.");
  process.exit(1);
}

const stateByCity = {
  Austin: "TX",
  Denver: "CO",
  Seattle: "WA",
  Portland: "OR",
  Nashville: "TN",
};
const zipById = {
  1: "78704",
  2: "78701",
  3: "78731",
  4: "78702",
  5: "78703",
  6: "80202",
  7: "80220",
  8: "80204",
  9: "80246",
  10: "80206",
  11: "98104",
  12: "98101",
  13: "98121",
  14: "98112",
  15: "98109",
  16: "97214",
  17: "97209",
  18: "97205",
  19: "97219",
  20: "97202",
  21: "37203",
  22: "37219",
  23: "37201",
  24: "37205",
};
const pending = new Set(["5", "13", "20"]);
const sold = new Set(["10", "22"]);

const out = [];
let currentId = null;

for (const line of source.split("\n")) {
  const idMatch = line.match(/^\s{4}id: "(\d+)",$/);
  if (idMatch) currentId = idMatch[1];

  const addressMatch = line.match(
    /^(\s{4}address: ".*?), (?:Austin|Denver|Seattle|Portland|Nashville)",$/,
  );
  if (addressMatch) {
    out.push(`${addressMatch[1]}",`);
    continue;
  }

  out.push(line);

  const cityMatch = line.match(/^\s{4}city: "(\w+)",$/);
  if (cityMatch && currentId) {
    const city = cityMatch[1];
    const status = sold.has(currentId)
      ? "sold"
      : pending.has(currentId)
        ? "pending"
        : "for-sale";
    out.push(`    state: "${stateByCity[city]}",`);
    out.push(`    zipCode: "${zipById[currentId]}",`);
    out.push(`    status: "${status}",`);
    out.push(`    agentId: "agent-${city.toLowerCase()}",`);
  }
}

writeFileSync(FILE, out.join("\n"));
