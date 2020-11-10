import firebase from "../../firebase/config";

export const AddActive = async (firstlocation,lastlocation,price,uid,cusname,stip,deip ) => {
  try {
    return await firebase
      .database()
      .ref("actives/" + uid)
      .set({
        waiter:"Finding your driver",
        cusname:cusname,
        startlocation: firstlocation,
        endlocation: lastlocation,
        price: price,
        uuid: uid,
        driver: "",
        driveid: "no",
        startip : stip,
        destip : deip
      });
  } catch (error) {
    return error;
  }
};

export const RemoveActive = async (guestid) => {
  try {
    firebase.database().ref('actives').child(guestid).remove();
  } catch (error) {
    return error;
  }
};

export const UpdateActive = async (guestUserId, driver,driveid) => {
  try {
    return await firebase
      .database()
      .ref("actives/" + guestUserId)
      .update({
        waiter:"Found your driver",
        driver: driver,
        driveid: driveid,
      });
  } catch (error) {
    return error;
  }
};
 
export const UpdateActiveMeet = async (myId) => {
  try {
    return await firebase
      .database()
      .ref("actives/" + myId)
      .update({
        waiter:"Enjoy The Ride !",
      });
  } catch (error) {
    return error;
  }
};
/*
export const UpdateActive = async (guestUserId, driver, driveid) => {
  // try {
    return await firebase
      .database()
      .ref("actives/" + guestUserId)
      .transaction(function(driveId){
        if (driveId === null) {
          return driveId
        } else {
          console.log('User driveId already exists.');
          return; // Abort the transaction.
        }
      } , function(error, committed) {
    if (error) {
      console.log("transaction failed",error);
    } else if (!committed) {
      console.log("aborted");
    } else {
      console.log("IT'S WORKING")
    }
  })
}
*/

export const UpdateActiveTransaction = async (guestUserId, driver, driveid) => {
  var DriveidRef = firebase.database().ref('actives/'+ guestUserId + "/driveid")
  DriveidRef.transaction(function(DriveID) {
    console.log(DriveID)
    console.log(guestUserId)
    if (DriveID == 'no') {
        DriveID = driveid
      return driveid
    } else {
        console.log('abandoned ID')
      return 0;
    }
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction (because DriveID already exists).');
    } else {
      console.log('DriveID added!');
    }
    //console.log("DriveID: ", snapshot.val());
  });
  var DriverRef = firebase.database().ref('actives/'+ guestUserId + '/driver')
    DriverRef.transaction(function(Driver) {
      console.log(Driver)
      if (Driver == '') {
        Driver = driver
        return driver
      } else {
        return 0;
      }
    }, function(error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because Driver already exists).');
      } else {
        console.log('Driver Updated!');
      }
      //console.log("Driver: ", snapshot.val());
    }); 
  var WaiterRef = firebase.database().ref('actives/'+ guestUserId + '/waiter')
    WaiterRef.transaction(function(WAITER) {
      if (WAITER == "Finding your driver") {
        WAITER = "Found your driver"
        return "Found your driver"
      } else {
        return 0;
      }
    }, function(error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because WAITER already exists).');
      } else {
        console.log('WAITER updated!');
      }
      //console.log("WAITER: ", snapshot.val());
    });

};
/*
  REFERENCE
// Try to create a user for ada, but only if the user id 'ada' isn't
// already taken
var adaRef = firebase.database().ref('users/ada');
adaRef.transaction(function(currentData) {
  if (currentData === null) {
    return { name: { first: 'Ada', last: 'Lovelace' } };
  } else {
    console.log('User ada already exists.');
    return; // Abort the transaction.
  }
}, function(error, committed, snapshot) {
  if (error) {
    console.log('Transaction failed abnormally!', error);
  } else if (!committed) {
    console.log('We aborted the transaction (because ada already exists).');
  } else {
    console.log('User ada added!');
  }
  console.log("Ada's data: ", snapshot.val());
});
*/
