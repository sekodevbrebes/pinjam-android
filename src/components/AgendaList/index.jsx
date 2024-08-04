import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import AgendaItem from '../AgendaItem';
import ModalContent from '../AgendaModal/modalContent';

const AgendaList = ({selectedDate, agendaData, item}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [updatedAgendaData, setUpdatedAgendaData] = useState(agendaData);

  const handleOpenModal = agenda => {
    setSelectedAgenda(agenda);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAgenda(null);
  };

  const handleUpdateAgenda = updatedStatus => {
    const updatedData = {...updatedAgendaData};
    updatedData[selectedDate] = updatedData[selectedDate].map(agenda =>
      agenda.id === selectedAgenda.id
        ? {...agenda, status: updatedStatus}
        : agenda,
    );
    setUpdatedAgendaData(updatedData);
  };

  return (
    <View style={styles.agendaContainer}>
      <Text style={styles.agendaTitle}>Tempat {item.name}</Text>
      {updatedAgendaData[selectedDate].map((agenda, index) => (
        <AgendaItem
          key={index}
          agenda={agenda}
          onPress={() => handleOpenModal(agenda)}
        />
      ))}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAgenda && (
              <ModalContent
                item={item}
                agenda={selectedAgenda}
                onClose={handleCloseModal}
                onUpdateAgenda={handleUpdateAgenda}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    padding: 12,
  },
  agendaTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default AgendaList;
