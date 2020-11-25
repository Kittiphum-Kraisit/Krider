import React, { Component } /*, {useState, useEffect}*/ from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
//import AsyncStorage from '@react-native-community/async-storage'
import locations from './locations';
import Prices from './price';
//import {SavePlace1 ,SavePlace2} from './storage';

//const Store_Place = 'place';

export default class App extends Component {
//const App = () => {
    constructor(){
      super();
      this.state={
        PickerValue:'',
        Price: 0
      }
    };

    Place=()=>{
      alert(this.state.PickerValue);
    }
  // SavePlace = async (key,item) => {
  //   try {
  //     await AsyncStorage.setItem(Storage_Place, item)
  //       this.setState({ item });
  //   } catch (e) {
  //   }
  // }
  
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
            //onTextChange={(text) => console.log(text)}
            onItemSelect={(item => this.onChangeHandler("place1", item))}
            // Listner on the searchable input
            // onItemSelect={(item) => {this.state.PickerValue} }//Alert.alert(JSON.stringify(item.name))}
            // Called after the selection
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
              // onChangeText={(value => this.onChangeHandler("place2", value))}
              //onTextChange={(text) => console.log(text)}
              // Change listner on the searchable input
              // onItemSelect={(item) => {this.state.PickerValue}}
              onItemSelect={(value => this.onChangeHandler("place2", value))}
              // Called after the selection from the dropdown
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
          <Text style={styles.titleText}>
              Price : {this.state.price}
          </Text>
        </View>
        <View>
          <Button
            title="find driver"
            //onPress={this.onChangeHandler}
            onPress={()=>Alert.alert("Find your driver")}
            //this.props.navigation.navigate("...")}
          />
        </View>
      </SafeAreaView>
    );
  }
  places = {}
  onChangeHandler = (place, value) => {
    this.places[place] = value
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
  headingText: {
    padding: 8,
  },
});
