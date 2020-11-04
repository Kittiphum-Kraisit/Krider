import firebase from "../../firebase/config";

export const AddActive = async (location,price,uid,cusname ) => {
  try {
    return await firebase
      .database()
      .ref("actives/" + uid)
      .set({
        waiter:"Finding your driver",
        cusname:cusname,
        location: location,
        price: price,
        uuid: uid,
        driver: " ",
        driveid: "no",
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


