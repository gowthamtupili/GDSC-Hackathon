

var min_index = 0;

var floors = [0, 0, 0, 0];

function count() {
  // FLoors has the number of people in each floor.
  const data = require("../dataset.json");
  data.Students.forEach((e) => {
    floors[e.floor]++;
  });
  for (let index = 1; index < floors.length; index++) {
    if (floors[index] < floors[min_index]) {
      min_index = index;
    }
  }
}
count();

const optimal_floor = min_index;
module.exports = { optimal_floor, floors };
