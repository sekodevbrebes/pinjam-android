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
import {ProfilUser} from '../../assets';

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
  const [activeSection, setActiveSection] = useState('facility'); // Default to 'facility'

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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'review':
        return (
          <View>
            <View style={styles.sectionContent}>
              <View style={styles.reviewProfile}>
                <Image source={ProfilUser} style={styles.reviewProfileImage} />
              </View>
              <Text style={styles.textReview}>
                Review Content Here Review Content HereReview Content HereReview
              </Text>
            </View>
            <Gap height={12} />
            <View style={styles.sectionContent}>
              <View style={styles.reviewProfile}>
                <Image source={ProfilUser} style={styles.reviewProfileImage} />
              </View>
              <Text style={styles.textReview}>
                Review Content Here Review Content HereReview Content HereReview
              </Text>
            </View>
            <Gap height={12} />
            <View style={styles.sectionContent}>
              <View style={styles.reviewProfile}>
                <Image source={ProfilUser} style={styles.reviewProfileImage} />
              </View>
              <Text style={styles.textReview}>
                Review Content Here Review Content HereReview Content HereReview
              </Text>
            </View>
            <Gap height={12} />
            <View style={styles.sectionContent}>
              <View style={styles.reviewProfile}>
                <Image source={ProfilUser} style={styles.reviewProfileImage} />
              </View>
              <Text style={styles.textReview}>
                Review Content Here Review Content HereReview Content HereReview
              </Text>
            </View>
          </View>
        );
      case 'contact':
        return (
          <View style={styles.sectionContent}>
            <View style={styles.textContact}>
              <Text style={styles.contactText}>Phone: +62899-5900-700</Text>
              <Text style={styles.contactText}>
                Email: setda@brebeskab.go.id
              </Text>
              <Text style={styles.contactText}>
                Jl. Proklamasi No. 77 KPT Brebes
              </Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.listContainer}>
            <View style={styles.listFacility}>
              {facilitiesArray.map((facility, index) => (
                <Text key={index} style={styles.facilityItem}>
                  {index + 1}. {facility}
                </Text>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <View style={styles.btnContain}>
              <Button
                title="Fasilitas"
                type={activeSection === 'facility' ? 'primary' : 'tertiary'}
                style={styles.button}
                onPress={() => setActiveSection('facility')}
              />
              <Gap width={10} />
              <Button
                title="Review"
                type={activeSection === 'review' ? 'primary' : 'tertiary'}
                style={styles.button}
                onPress={() => setActiveSection('review')}
              />
              <Gap width={10} />
              <Button
                title="Contact"
                type={activeSection === 'contact' ? 'primary' : 'tertiary'}
                style={styles.button}
                onPress={() => setActiveSection('contact')}
              />
            </View>

            <Gap height={12} />
            {renderActiveSection()}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bookNowContainer}>
        <Button title="Book Now" type="primary" onPress={onBooking} />
      </View>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 80, // Add padding to avoid overlap with the fixed button
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
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
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
  btnContain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 50,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    fontSize: 16,
    color: '#000',
    padding: 10,
  },
  textReview: {
    fontSize: 14,
    paddingRight: 50,
  },
  reviewProfileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  bookNowContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
