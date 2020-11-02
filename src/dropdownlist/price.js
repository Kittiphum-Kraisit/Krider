import locations from './locations';
//import onChangeHandler from './App';
// import AsyncStorage from '@react-native-community/async-storage'

// const ReadPlace = async (key,locations) => {
//     try {
//       const place = await AsyncStorage.getItem(Storage_Place)
  
//       if (place !== null) {
//         setPlace(place)
//       }
//     } catch (e) {
//   }
// }

const onChangeHandler = require('./App');

const Prices = (place1,place2) => {
        if (place1.zone == place2.zone) {
          if (place1.id == place2.id){
            //console.log('10');
            return '10'
          }
          else {
            //console.log('15');
            return '15'
          }
        }
        else if (place1.zone !== place2.zone){
          if (place1.zone = 'A') {
            if (place2.zone = 'B'){
              //console.log('20');
              return '20'
            }
            else if (place2.zone = 'C'){
              //console.log('25');
              return '25'
            }
            else if (place2.zone = 'D'){
              //console.log('20');
              return '20'
            }
          }
          else if (place1.zone = 'B') {
            if (place2.zone = 'C'){
              //console.log('20');
              return '20'
            }
            else if (place2.zone = 'D'){
              //console.log('25');
              return '25'
            }
            else if (place2.zone = 'A'){
              //console.log('20');
              return '20'
            }
          }
          else if (place1.zone = 'C') {
            if (place2.zone = 'D'){
              //console.log('20');
              return '20'
            }
            else if (place2.zone = 'A'){
              //console.log('25');
              return '25'
            }
            else if (place2.zone = 'B'){
              //console.log('20');
              return '20'
            }
          }
        }
  }
export default Prices;

// var Price = 20;
// export default Price;
