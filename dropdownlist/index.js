import React from 'react';
import { SafeAreaView,Text, View, StyleSheet,Picker,Button,Alert} from 'react-native';
//import locations from './dropdownlist/location'
import Priceja from './dropdownlist/priceja';

// const [place1, setplace1] = useState();
// const [place2, setplace2] = useState();
var place1,place2;
export default class Index extends React.Component
{
    state = {
        place1 : 'HM Building',
        place2 : 'HM Building'
    }
    render()
    {
        return(
          <SafeAreaView>
            <View style={styles.container}>
              <Text
                style={{position:'absolute',top:25,bottom:10,left:0,right:0}}
              >Your started destination is {this.state.place1}</Text>
              <Picker
                style={{ backgroundColor: '#fafafa', position:'absolute', bottom:0}}
                selectedValue={this.state.place1}
                style={{ position:'absolute',top:50,bottom:10,left:0,right:0}}
                onValueChange={(place1) => this.setState({ place1 : place1 })}
              >
                <Picker.Item label="HM Building" value="HM Building"/>
                <Picker.Item label="E12 Building" value="E12 Building"/>
                <Picker.Item label="First Aid" value="First Aid"/>

              </Picker>
              <Text
                style={{position:'absolute',top:100,bottom:10,left:0,right:0}}
              >Your final destination is {this.state.place2}</Text>
              <Picker
                style={{ backgroundColor: '#fafafa', position:'absolute', bottom:0}}
                selectedValue={this.state.place2}
                style={{ position:'absolute',top:125,bottom:10,left:0,right:0}}
                onValueChange={(place2) => this.setState({ place2 : place2 })}
              >
                <Picker.Item label="HM Building" value='HM Building'/>
                <Picker.Item label="E12 Building" value='E12 Building'/>
                <Picker.Item label="First Aid" value='First Aid'/>
                
              </Picker>
              <Text style={{position:'absolute',bottom:-200,left:0,right:0}}>
                Price : {Priceja(place1,place2)}
              
              </Text>  
            </View>
            <View
              style={styles.submitButton}
            >
              <Button
                //style={{bottom:0,left:0,right:0}}
                title="find driver"
                onPress={()=>Alert.alert(Priceja(place1,place2))}
                //this.props.navigation.navigate("...")}
                //{Priceja(place1,place2)}}
              />
            </View>
            
          </SafeAreaView>
        );
    }
}
exports.place1 = place1;
exports.place2 = place2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  submitButton: {
    position: '',
    bottom:-300,
    left:0,
  }
});