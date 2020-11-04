import firebase from "../../firebase/config";

export const AddTask = async (location,price,uid,cusname ) => {
  try {
    return await firebase
      .database()
      .ref("tasks/" + uid)
      .set({
        location: location,
        cusname: cusname,
        price: price,
        uuid: uid,      
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


