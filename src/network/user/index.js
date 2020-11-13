import firebase from "../../firebase/config";

export const AddUser = async (name, email, uid, profileImg) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    return error;
  }
};

export const AddNewUser = async (name, email, uid, profileImg,phonenumb) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
        status : "Free Roam",
        phone: phonenumb,
        taskid: "no",
        asCustomer: 0,
        asDriver: 0,
      });
  } catch (error) {
    return error;
  }
};
export const UserAsCus = async (uid) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .update({
        status : "Being Customer",
      });
  } catch (error) {
    return error;
  }
};
export const UserAsDriver = async (uid) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .update({
        status : "Being Driver",
      });
  } catch (error) {
    return error;
  }
};
export const UpdatePhone = async (uid,newnumb) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .update({
        phone: newnumb,
      });
  } catch (error) {
    return error;
  }
};

export const UpdateUser = async (uuid, imgSource) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uuid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};
