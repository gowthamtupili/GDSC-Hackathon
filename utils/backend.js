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
var returned_floor;
const optimal_floor = min_index;
if (optimal_floor == 0) {
  returned_floor = "GROUND FLOOR";
} else if (optimal_floor == 1) {
  returned_floor = "FIRST FLOOR";
} else if (optimal_floor == 2) {
  returned_floor= "SECOND FLOOR"
}
else {
  returned_floor="THIRD FLOOR"
}
module.exports = { returned_floor, floors };
