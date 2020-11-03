import React, {useEffect} from 'react';
import {View} from 'react-native';
import {globalStyle, appStyle, color} from '../../utility';
import {getAsyncStorage, keys,cuskeys} from '../../asyncStorage';
import {setUniqueValue,setCus} from '../../utility/constants';
import {Logo} from '../../component';

// export default ({navigation}) => {
//   useEffect(() => {
//     const redirect = setTimeout(() => {
//       getAsyncStorage(keys.uuid)
//         .then((uuid) => {
//           if (uuid) {
//             setUniqueValue(uuid);
//             navigation.replace('Role Select');
//           } else {
//             navigation.replace('Login');
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           navigation.replace('Login');
//         });
//     }, 4000);
//     return () => clearTimeout(redirect);
//   }, [navigation]);
//   return (
//     <View
//       style={[globalStyle.containerCentered, {backgroundColor: color.WHITE}]}>
//       <Logo />
//     </View>
//   );
// };

export default ({navigation}) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
getAsyncStorage(cuskeys.cuuid)
        .then((cuuid) => {
          if (cuuid) {
            setCus(cuuid);
            navigation.replace('Task Room');
          } else {
            getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace('Role Select');
          } else {
            navigation.replace('Login');
          }
        })
          }
        })
        .catch((err) => {
          console.log(err);
          navigation.replace('Login');
        });
    }, 4000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View
      style={[globalStyle.containerCentered, {backgroundColor: color.WHITE}]}>
      <Logo />
    </View>
  );
};
