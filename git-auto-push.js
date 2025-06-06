const { exec } = require("child_process");

exec('git add . && git commit -m "save" && git push', (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Error:", stderr.trim());
    return;
  }
  console.log("✅ Git push complete:\n", stdout.trim());
});
