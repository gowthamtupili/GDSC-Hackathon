function suggest(floors) {
  var sugggested_floor = Math.min(floors[0], floors[1], floors[2], floors[3]);
  return sugggested_floor;
}

function count() {
  var floors = [0, 0, 0, 0];
  const data = require("../dataset.json");
  data.Students.forEach((e) => {
    floors[e.floor]++;
  });
  console.log(suggest(floors));
}
count();
