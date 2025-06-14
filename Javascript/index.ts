import moment from "moment";
import axios from "axios";
import fs from "fs";
import chalk from "chalk";

const readData = async () => {
  const results: any = [];
  fs.readdirSync("./data/").forEach((file) => {
    const res = fs.readFileSync(`./data/${file}`, "utf8");
    results.push(JSON.parse(res));
  });

  return results;
};

const saveData = async (data: string[]) => {
  for await (let d of data) {
    try {
      fs.writeFile(`./results/${d}}.json`, JSON.stringify(d), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  }
};

// Start here
const main = () => {
  const now = new Date();
  console.log(chalk.bgGreen("Current Time: " + moment(now).format("h:mmA")));
};

main();
