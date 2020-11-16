import firebase from "../../firebase/config";
import { setisgetTask,gettask } from "../../utility/constants";

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
        setisgetTask("gottask")
      return driveid
    } else {
        console.log('abandoned ID')
        setisgetTask("aborttask")
      return 0;
    }
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction (because DriveID already exists).');
    } else {
      console.log('DriveID added!');
      setisgetTask("gottask")
      console.log(gettask)
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
export const LastUpdateActiveTransaction = async (guestUserId) => {
  // var DriveidRef = firebase.database().ref('actives/'+ guestUserId + "/driveid")
  // DriveidRef.transaction(function(DriveID) {
  //   console.log(DriveID)
  //   console.log(guestUserId)
  //   if (DriveID == 'no') {
  //       DriveID = driveid
  //     return driveid
  //   } else {
  //       console.log('abandoned ID')
  //     return 0;
  //   }
  // }, function(error, committed, snapshot) {
  //   if (error) {
  //     console.log('Transaction failed abnormally!', error);
  //   } else if (!committed) {
  //     console.log('We aborted the transaction (because DriveID already exists).');
  //   } else {
  //     console.log('DriveID added!');
  //   }
  //   //console.log("DriveID: ", snapshot.val());
  // });
  // var DriverRef = firebase.database().ref('actives/'+ guestUserId + '/driver')
  //   DriverRef.transaction(function(Driver) {
  //     console.log(Driver)
  //     if (Driver == '') {
  //       Driver = driver
  //       return driver
  //     } else {
  //       return 0;
  //     }
  //   }, function(error, committed, snapshot) {
  //     if (error) {
  //       console.log('Transaction failed abnormally!', error);
  //     } else if (!committed) {
  //       console.log('We aborted the transaction (because Driver already exists).');
  //     } else {
  //       console.log('Driver Updated!');
  //     }
  //     //console.log("Driver: ", snapshot.val());
  //   }); 
  var WaiterRef = firebase.database().ref('actives/'+ guestUserId + '/waiter')
    WaiterRef.transaction(function(WAITER) {
      if (WAITER == "Enjoy The Ride !") {
        WAITER = "Ending Your Ride"
        return "Ending Your Ride"
      } else {
        return 0;
      }
    }, function(error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because WAITER is already done).');
      } else {
        console.log('WAITER updated last time!');
      }
      //console.log("WAITER: ", snapshot.val());
    });

};


// export const UpdateActiveTransaction = async (guestUserId, driver, driveid) => {
//   var DriveidRef = firebase.database().ref('actives/'+ guestUserId + "/driveid")
//   DriveidRef.transaction(function(DriveID) {
//     if (DriveID == "no") {
//       console.log(DriveID)
//       console.log(driveid)
//       DriveID = driveid
//       console.log('Transaction Successful')
//       return driveid
//     } else {
//       console.log('abandoned')
//       return;
//     }
//   })
//   var DriverRef = firebase.database().ref('actives/'+ guestUserId + '/driver')
//     DriverRef.transaction(function(Driver) {
//       if (Driver == "") {
//         Driver = driver
//         console.log('Transaction Successful')
//         return driver
//       } else {
//         console.log('abandoned')
//         return;
//       }
//     })
//   var WaiterRef = firebase.database().ref('actives/'+ guestUserId + '/waiter')
//     WaiterRef.transaction(function(WAITER) {
//       if (WAITER == "Finding your driver") {
//         WAITER = "Found your driver"
//         console.log('Transaction Successful')
//         return "Found your driver"
//       } else {
//         console.log('abandoned')
//         return;
//       }
//     })

// };
// export const UpdateActive = async (guestUserId, driver, driveid) => {
//   // try {
//     return await firebase
//       .database()
//       .ref("actives/" + guestUserId + "/driveid")
//       .transaction(function(driveId){
//         if (driveId === null) {
//           return driveId
//         } else {
//           console.log('User driveId already exists.');
//           return; // Abort the transaction.
//         }
//       } , function(error, committed, snapshot) {
//     if (error) {
//       console.log("transaction failed",error);
//     } else if (!committed) {
//       console.log("aborted");
//     } else {
//       console.log("IT'S WORKING")
//     }
//   })
// }
// export const UpdateActiveDid = async (guestUserId, driveid) => {
//   try {
//     return await firebase
//       .database()
//       .ref("actives/" + guestUserId)
//       .update({
//         driveid: driveid,
//       });
//   } catch (error) {
//     return error;
//   }
// };


