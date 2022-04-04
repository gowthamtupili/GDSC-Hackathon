function count(floor1, floor2, floor3, floor4) {
    var sugggested_floor = Math.min(floor1, floor2, floor3, floor4);
    return sugggested_floor;
  }
  var floors = [0, 0, 0, 0];
  
  const data = require("./dataset.json");
  data.Students.forEach((e) => {
  //   console.log(e);
      floors[e.floor]++;
  });
  console.log(floors[1]);