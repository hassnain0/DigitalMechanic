import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Modal, FlatList} from 'react-native';
import Icons from '../../helpers/Icons';
import {Colors} from '../../themes';
import Button from '../Button';
import styles from './styles';

const ReasonModal = props => {
  const [visible, setVisible] = useState(props.visible);
  const [seletedIndex, setSelectedIndex] = useState(-1);
  return (
    <View stlye={styles.container}>
      <Modal
        onRequestClose={() => props.setResonModal()}
        visible={props.visible}>
        <View stlye={styles.container}>
          <View style={styles.headers}>
            <Icons.Ionicons
              onPress={() => props.setResonModal()}
              name="arrow-back"
              color={Colors.themeColor}
              size={28}
            />
            <Text style={styles.headerText}>Delivery Failed Reason</Text>
          </View>
          <View style={styles.modalBody}>
            <FlatList
              data={props?.data || []}
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  onPress={() => setSelectedIndex(index)}
                  style={styles.itemList}>
                  <Text style={styles.itemListText}>{item.name}</Text>
                  {index == seletedIndex && (
                    <Icons.AntDesign
                      onPress={() => props.setResonModal()}
                      name="checkcircle"
                      color={Colors.themeColor}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.modalFooter}>
          <View style={styles.bottomContainer}>
            <View style={styles.buttonView}>
              <Button
                disabled={seletedIndex >= 0}
                btnPress={() => props.saveReason(seletedIndex)}
                label={'Submit'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReasonModal;
