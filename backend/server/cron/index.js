import sequenceEventsCron from "./sequence.cron";

function init() {
  sequenceEventsCron.start();
}

module.exports = {
  init,
};
