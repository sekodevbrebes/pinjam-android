import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Rating from '../../components/Rating';
import {Gap, SlideShow, Button} from '../../components';
import {getData} from '../../utilities';

const DetailRuangan = ({navigation, route}) => {
  const {itemRoom} = route.params;
  const {name, location, capacity, facility, image, rate} = itemRoom;
  const images = JSON.parse(image);
  const facilitiesArray = facility
    .replace(/<\/?ol>/g, '')
    .split('</li><li>')
    .map(item => item.replace(/<\/?li>/g, ''));

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getData('userProfile').then(response => {});
  }, []);

  const onBooking = () => {
    getData('userProfile')
      .then(userProfile => {
        const data = {
          item: {
            id: itemRoom.id,
            name: name,
          },
          userProfile,
        };
        navigation.navigate('Agenda', data);
      })
      .catch(error => {});
  };

  const openModal = imgUrl => {
    setSelectedImage(imgUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.container}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination>
            {images.map((imgUrl, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(imgUrl)}>
                <SlideShow image={{uri: imgUrl}} />
              </TouchableOpacity>
            ))}
          </SwiperFlatList>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Rating number={rate} />
            </View>
            <Gap height={12} />
            <View>
              <Text style={styles.subTitle}>Location </Text>
              <Text>{location}</Text>
            </View>
            <Gap height={12} />
            <View>
              <Text style={styles.subTitle}>Capacity</Text>
              <Text>{capacity} orang</Text>
            </View>
            <Gap height={12} />
            <View>
              <Text style={styles.subTitle}>Facility :</Text>
              <View style={styles.listFacility}>
                {facilitiesArray.map((facility, index) => (
                  <Text key={index} style={styles.facilityItem}>
                    {index + 1}. {facility}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 40}}>
            <Button title="Book Now" type="primary" onPress={onBooking} />
          </View>
        </View>
      </ScrollView>

      {selectedImage && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalBackground}>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={closeModal}>
              <Image source={{uri: selectedImage}} style={styles.fullImage} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DetailRuangan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'semi-bold',
  },
  listFacility: {
    margin: 14,
    paddingBottom: 8,
  },
  facilityItem: {
    marginBottom: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '90%',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
