import locations from './location';
import Prices from './price';
import React, { useContext, useEffect, useState, useLayoutEffect, Component, Fragment } from "react";
import { SafeAreaView, Alert, Text, View, FlatList ,Picker,StyleSheet,Button,Image } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../../firebase/config";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { UpdateUser, LogOutUser , AddTask, AddActive, DataPusher2 } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { globalStyle, color } from "../../utility";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { TouchableOpacity } from "react-native-gesture-handler";

var newname = firebase.database().ref("users/"+ uuid + "/name");
  

export default class App extends Component {
//const App = () => {
    constructor(){
      super();
      this.state={
        PickerValue:'',
        Price: 0,
        place1: '',
        place2: '',
        zone1: '',
        ip1: '',
        ip2: '',
        //myactualname: '',
      }
    };
  //    DataPusher2 = (location,destinationq,price,uuid,dummyzoneq,startipq,destipq) => {
  //    AddTask(location,destinationq,price,uuid,name,dummyzoneq,startipq,destipq);
  //    AddActive(location,destinationq,price,uuid,name,startipq,destipq);
  //    navigation.navigate("Lobby");
      
  // };

    Place=()=>{
      alert(this.state.PickerValue);
    }
  
  render() {
    return (
      <SafeAreaView 
        style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Location Picker
          </Text>
          <Text style={styles.headingText}>
            Where are you now?
          </Text>
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item => this.onChangeHandler("place1", item))}
            onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
            containerStyle={{padding: 5}}
            // Suggestion container style
            textInputStyle={{
              // Inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
              // Single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              // Text style of a single dropdown item
              color: '#222',
            }}
            itemsContainerStyle={{
              // Items container style you can pass maxHeight
              // To restrict the items dropdown hieght
              maxHeight: '60%',
            }}
            items={locations}
            // Mapping of item array
            defaultIndex={2}
            // Default selected item index
            placeholder="location"
            // place holder for the search input
            resPtValue={false}
            // Reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            // To remove the underline from the android input
          />
          <Text style={styles.headingText}>
            Where do you want to go?
          </Text>
          <SearchableDropdown
              onItemSelect={(value => this.onChangeHandler("place2", value))}
              // Called after the selection from the dropdown
              onTextChange={(text) => console.log(text)}
              onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
              containerStyle={{padding: 5}}
              // Suggestion container style

              textInputStyle={{
                // Inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                // Text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '50%',
              }}
              items={locations}
              // Mapping of item array
              defaultIndex={2}
              // Default selected item index
              placeholder="location"
              // Place holder for the search input
              resetValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              // To remove the underline from the android input
          />
          <Text style={styles.titleTextL}>
              Price : {this.state.price} baht
          </Text>
        </View>
        <View>
          <RoundCornerButton
            title="find driver"
            onPress={() =>  DataPusher2(this.state.place1,this.state.place2,this.state.Price,uuid,this.state.zone1,this.state.ip1,this.state.ip2,newname)}
            //onPress={this.onChangeHandler}
            //onPress={()=>Alert.alert("Find your driver")}
            //this.props.navigation.navigate("...")}
          />
        </View>
      </SafeAreaView>
    );
  }
  places = {}
  onChangeHandler = (place, value) => {
    this.places[place] = value
    if (place == "place1"){
      this.setState({place1 : value.name })
      this.setState({zone1 : value.zone })
      this.setState({ip1 : value.ip })
    } else if (place == "place2"){
      this.setState({place2 : value.name})
      this.setState({ip2 : value.ip })
    }
    if (Object.keys(this.places).length == 2){
      this.setState({price: Prices(this.places["place1"], this.places["place2"])})
    }
    else{
      return 0
    }
  }
          
}
//export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextL: {
    padding: 8,
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});