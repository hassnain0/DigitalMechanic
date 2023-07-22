import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../themes';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  headers: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d2d2d2',
  },
  headerText: {
    color: Colors.themeColor,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemList: {
    // marginVertical:10,
    flexDirection:'row',
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems:'center',
    paddingRight:20,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  itemListText: {
    color: Colors.black,
    fontSize: 14,
  },

  modalFooter: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    height: 70,
    // zIndex:1,
  },
  bottomContainer: {
    flex: 1,
  },
  buttonView: {
    marginTop: Metrics.ratio(20),
    width: Metrics.vw * 60,
    marginHorizontal: Metrics.vw * 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    marginBottom: 185,
  },
});
