import locations from './location';
const onChangeHandler = require('./index');

const Prices2 = (place1,place2) => {
        if (place1 == place2) {
          if (place1 == place2){
            //console.log('10');
            return '10'
          }
          else {
            //console.log('15');
            return '15'
          }
        }
        else if (place1 !== place2){
          if (place1 == 'A') {
            if (place2 == 'B'){
              //console.log('20');
              return '20'
            }
            else if (place2 == 'C'){
              //console.log('25');
              return '25'
            }
            else if (place2 == 'D'){
              //console.log('20');
              return '20'
            }
          }
          else if (place1 == 'B') {
            if (place2 == 'C'){
              //console.log('20');
              return '20'
            }
            else if (place2 == 'D'){
              //console.log('25');
              return '25'
            }
            else if (place2 == 'A'){
              //console.log('20');
              return '20'
            }
          }
          else if (place1 == 'C') {
            if (place2 == 'D'){
              //console.log('20');
              return '20'
            }
            else if (place2 == 'A'){
              //console.log('25');
              return '25'
            }
            else if (place2 == 'B'){
              //console.log('20');
              return '20'
            }
          }
          else if (place1 == 'D') {
            if (place2 == 'C'){
              //console.log('20');
              return '20'
            }
            else if (place2 == 'A'){
              //console.log('25');
              return '25'
            }
            else if (place2 == 'B'){
              //console.log('20');
              return '20'
            }
          }
        }else {
          return '0'
        }
  }
export default Prices2;