
const location = require('./dropdownlist/index');
var place1 = location.place1;
var place2 = location.place2;

const Priceja = (place1,place2) => {
  console.log(place1,place2);
  if (place1 !== null) {
      return 'cannot tell price';
  }
  else if (place2 !== null) {
      return 'cannot tell price';
  } 
  else if (place1 == place2) {
      return 'cannot tell price';
    }
  else if (place1 == 'HM Building') {
    if (place2 == 'E12 Building') {
      return '15 Baht';
    } else if (place2 == 'First Aid') {
      return '20 Baht';
    }
  } else if (place1 == 'E12 Building') {
    if (place2 == 'HM Building') {
      return '15 Baht';
    } else if (place2 == 'First Aid') {
      return '30 Baht';
    }
  } else if (place1 == 'First Aid') {
    if (place2 == 'HM Building') {
      return '20 Baht';
    } else if (place2 == 'E12 Building') {
      return '30 Baht';
    } 
  }
};
export default Priceja;
