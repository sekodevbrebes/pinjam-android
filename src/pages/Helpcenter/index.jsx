import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components';

const HelpCenter = ({navigation}) => {
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  return (
    <View style={styles.container}>
      <Header
        title="Pusat Bantuan"
        subTitle="Help Center"
        onPress={() => navigation.navigate('Profile')}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Pusat Bantuan Aplikasi SiKPT</Text>

        <Text style={styles.subHeading}>
          1. Cara Menggunakan Aplikasi SiKPT
        </Text>
        <Text style={styles.content}>
          Aplikasi SiKPT dirancang untuk memudahkan Anda dalam meminjam tempat
          di Sekretariat Daerah Kabupaten Brebes. Ikuti langkah-langkah berikut
          untuk menggunakan aplikasi ini:
          {'\n'}- Buka aplikasi SiKPT.
          {'\n'}- Daftar atau masuk dengan akun Anda.
          {'\n'}- Pilih tempat yang ingin Anda pinjam.
          {'\n'}- Pilih Waktu yang masih tersedia.
          {'\n'}- Isi formulir peminjaman dan kirim permohonan.
          {'\n'}- Tunggu konfirmasi peminjaman.
          {'\n'}- Cek Status peminjaman.
        </Text>

        <Text style={styles.subHeading}>2. Proses Pendaftaran</Text>
        <Text style={styles.content}>
          Untuk menggunakan Aplikasi SiKPT, Anda harus mendaftar terlebih
          dahulu. Berikut adalah cara mendaftar:
          {'\n'}- Buka aplikasi dan pilih "Daftar".
          {'\n'}- Isi formulir pendaftaran dengan informasi yang benar dan
          lengkap.
          {'\n'}- Setelah pendaftaran selesai, Anda dapat masuk ke aplikasi
          dengan akun yang telah dibuat.
        </Text>

        <Text style={styles.subHeading}>3. Peminjaman Tempat</Text>
        <Text style={styles.content}>
          Untuk meminjam tempat melalui Aplikasi SiKPT, ikuti langkah-langkah
          berikut:
          {'\n'}- Pilih tempat yang tersedia dari daftar.
          {'\n'}- Isi detail peminjaman, seperti tanggal, waktu, jumlah peserta
          dan isi nama kegiatan.
          {'\n'}- Kirim permohonan peminjaman.
          {'\n'}- Tunggu persetujuan dari pihak pengelola.
        </Text>

        <Text style={styles.subHeading}>4. Kontak Bantuan</Text>
        <Text style={styles.content}>
          Jika Anda memerlukan bantuan lebih lanjut atau memiliki pertanyaan,
          Anda dapat menghubungi kami melalui:
          {'\n'}- Email: [setda@brebeskab.go.id]
          {'\n'}- Telepon: [0899-5900-700]
          {'\n'}- Alamat: Sekretariat Daerah Kabupaten Brebes, Kantor
          Pemerintahan Terpadu (KPT) Jl. Proklamasi No.77 Brebes.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={scrollToBottom}>
        <Text style={styles.buttonText}>Scroll to Bottom</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: '#3498db',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    fontFamily: 'Poppins-Bold',
    color: '#3498db',
  },
  content: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default HelpCenter;
