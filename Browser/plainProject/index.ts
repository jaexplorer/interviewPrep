import moment from "moment";

export const showCurrentTime = () => {
  const timeEl = document.getElementById("current-time")!;

  const now = moment().format("h:mmA");
  timeEl.textContent = `Current Time: ${now}`;
};

// Call it once on load
document.addEventListener("DOMContentLoaded", () => {
  showCurrentTime();
});
