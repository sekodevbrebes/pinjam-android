import React from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Rating from '../../components/Rating';
import {Gap, SlideShow, Button} from '../../components';
import {Aula, RuangBupati, RuangCC, RuangSekda} from '../../assets';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const DetailRuangan = ({navigation}) => (
  <View style={styles.page}>
    <ScrollView>
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          showPagination>
          <SlideShow image={Aula} />
          <SlideShow image={RuangBupati} />
          <SlideShow image={RuangSekda} />
          <SlideShow image={RuangCC} />
        </SwiperFlatList>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <View>
            <Text style={styles.titleContent}>Aula</Text>
            <Rating />
          </View>
          <Gap height={12} />
          <View>
            <Text style={styles.titleContent}>Lokasi</Text>
            <Text>
              Lantai 5 Kantor Pemerintahan Terpadu, Jl. Proklamasi No. 77 Brebes
              Contact : 0899-5900-700
            </Text>
          </View>
          <Gap height={12} />
          <View>
            <Text style={styles.titleContent}>Fasilitas :</Text>
            <Text style={{margin: 14, lineHeight: 22}}>
              1. Ruangan Ukuran 120 x 50 mtr {'\n'}2. Video Wall 100 Inc {'\n'}
              3. Sound System {'\n'}4. Meja Kursi Narasumber {'\n'}5.Kursi
              Peserta mak 400 {'\n'}6. Meja Peserta 20 {'\n'}7. Meja Kursi
              Operator/MC {'\n'}8. Kabel HDMI ke Laptop {'\n'}9. Podium
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 40}}>
          <Button
            title="Booking Now"
            type="primary"
            onPress={() => navigation.navigate('Agenda')}
          />
        </View>
      </View>
    </ScrollView>
  </View>
);

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
    color: '#ffffff',
    marginBottom: 12,
  },

  subTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'semi-bold',
  },
  titleContent: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 20,

    color: '#000000',
  },
});
