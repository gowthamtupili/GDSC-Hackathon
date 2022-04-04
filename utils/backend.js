// function suggest() {
//   var min_index = 0;
//   for (let index = 1; index < floors.length(); index++) {
//     if (floors[i] < floors[min]) {
//       min_index = i;
//     }
//   }
//   return min_index;
// }

var min_index = 0;

function count() {
  // FLoors has the number of people in each floor.
  var floors = [0, 0, 0, 0];
  const data = require("../dataset.json");
  data.Students.forEach((e) => {
    floors[e.floor]++;
  });
  for (let index = 1; index < floors.length; index++) {
    if (floors[index] < floors[min_index]) {
      min_index = index;
    }
  }
  console.log(min_index);
}
count();

module.exports = min_index;
