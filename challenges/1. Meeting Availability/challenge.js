const moment = require("moment");
const data = require("./data.json");

// Mock data to play with
const start = moment("2017-02-21T05:00:00-05:00");
const end = moment("2017-02-21T22:00:00-05:00");

function findFreeTimes(start, end, duration, events) {
  const availableTimes = [];
  let current = moment(start);

  // Looping through all events to check if difference is >= to duration
  // If true, we store its original form _i value
  for (let i = 0; i < events.length; i++) {
    const next = moment(events[i].start);

    if (Math.abs(current.diff(next, "minutes")) >= duration) {
      availableTimes.push({
        start: current._i,
        end: next._i
      });
    }
    // Getting next beginning of free time
    current = moment(events[i].end);
  }

  // Checking between last meeting and end of the work day
  if (Math.abs(current.diff(end, "minutes")) >= duration) {
    availableTimes.push({
      start: current._i,
      end: end._i
    });
  }
  return availableTimes;
}

const availableTimes = findFreeTimes(start, end, 15, data);

console.log("available Times\n=================", availableTimes);
