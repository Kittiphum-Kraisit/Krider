import firebase from "../../firebase/config";
import { appStyle } from "../../utility";

export const AddTask = async (firstlocation,lastlocation,price,uid,cusname,stzone,stip,deip ) => {
  try {
    return await firebase
      .database()
      .ref("tasks/" + uid)
      .set({
        startlocation: firstlocation,
        endlocation: lastlocation,
        cusname: cusname,
        price: price,
        uuid: uid,
        zone: stzone,
        startip : stip,
        destip : deip,
      });
  } catch (error) {
    return error;
  }
};
export const AddPrice = async (price ) => {
  try {
    return await firebase
      .database()
      .ref("prices/" + uid)
      .set({
        myprice: price
      });
  } catch (error) {
    return error;
  }
};

export const RemoveTask = async (guestid) => {
  try {
    firebase.database().ref('tasks').child(guestid).remove();
  } catch (error) {
    return error;
  }
};