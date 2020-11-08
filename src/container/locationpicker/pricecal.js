import locations from './location';
const onChangeHandler = require('./index');

const Prices2 = (place1,place2) => {
        if (place1 == place2) {
          if (place1 == place2){
            //console.log('10');
            return '1'
          }
          else {
            //console.log('15');
            return '2'
          }
        }
        else if (place1 !== place2){
          if (place1 == 'A') {
            if (place2 == 'B'){
              //console.log('20');
              return '4544'
            }
            else if (place2 == 'C'){
              //console.log('25');
              return '4'
            }
            else if (place2 == 'D'){
              //console.log('20');
              return '5'
            }
          }
          else if (place1 == 'B') {
            if (place2 == 'C'){
              //console.log('20');
              return '6'
            }
            else if (place2 == 'D'){
              //console.log('25');
              return '7'
            }
            else if (place2 == 'A'){
              //console.log('20');
              return '8'
            }
          }
          else if (place1 == 'C') {
            if (place2 == 'D'){
              //console.log('20');
              return '9'
            }
            else if (place2 == 'A'){
              //console.log('25');
              return '10'
            }
            else if (place2 == 'B'){
              //console.log('20');
              return '11'
            }
          }
          else if (place1 == 'D') {
            if (place2 == 'C'){
              //console.log('20');
              return '12'
            }
            else if (place2 == 'A'){
              //console.log('25');
              return '33'
            }
            else if (place2 == 'B'){
              //console.log('20');
              return '115'
            }
          }
        }else {
          return '0'
        }
  }
export default Prices2;