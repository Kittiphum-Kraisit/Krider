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


/*
export const UpdateActive =  (guestUserId, driver, driveid) => {
  //try {
    return firebase
      .database()
      .ref("actives/" + guestUserId + "/driveid")
      .transaction(function(driveId){
        //console.log(guestUserId)
        //console.log(driveId)
        //console.log(driveId == null)
        //return driveid
        return driveId
  })
}
*/