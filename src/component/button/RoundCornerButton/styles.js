import {StyleSheet} from 'react-native';
import {appStyle,color} from '../../../utility';

export default StyleSheet.create({
  btn: {
    //backgroundColor: appStyle.fieldBgColor,
    backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
  },
  text: {fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor},
});
