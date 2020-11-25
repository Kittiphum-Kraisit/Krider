const onChangeHandler = require('./App');
import coordinatezone from './zonecoordinate';


const Prices = (place1,place2) => {
  var zone1 = place1.zone;
  var zone2 = place2.zone;
  var coXzone1 = coordinatezone[zone1].x;
  var coYzone1 = coordinatezone[zone1].y;
  var coXzone2 = coordinatezone[zone2].x;
  var coYzone2 = coordinatezone[zone2].y;

  distance = Math.sqrt(Math.pow((coXzone2 - coXzone1),2) + Math.pow((coYzone2 - coYzone1),2));
  
  if (distance == 0) {
    return '15'
  }
  else if (distance >0 && distance<=1){
      return '20'
  }
  else if (distance >1 && distance <= Math.sqrt(2)){
      return '25'
  }
  else {
    return '100'
  }
}
export default Prices;