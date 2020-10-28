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

export const UpdateActive = async (guestUserId, driver, driveid) => {
  try {
    return await firebase
      .database()
      .ref("actives/" + guestUserId)
      .update({
        waiter:"Found your driver",
        driver: driver,
        driveid: driveid
      });
  } catch (error) {
    return error;
  }
};


/*export const UpdateActive =  (guestUserId, driver, driveid) => {
 // var currentdriveid = firebase.database().ref("actives/" + guestUserId + "/driveid");
    return firebase
      .database()
      .ref("actives/" + guestUserId + "/driveid")
      .transaction(function(id){
        id = firebase.database().ref("actives/" + guestUserId + "/driveid");
        //console.log(driveid)  
        //console.log(currentdriveid)
        if (id == "no" ) {
          return driveid
        } else {
          console.log("Task have been taken!!!")
        }
        //console.log(guestUserId)
        //console.log(driveId)
        //console.log(driveId == null)
        //return driveid
  })
}
*/