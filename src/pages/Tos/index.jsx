import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components';

const TermsAndConditions = ({navigation}) => {
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  return (
    <View style={styles.container}>
      <Header
        title="Syarat dan Ketentuan"
        subTitle="Term of Conditions"
        onPress={() => navigation.navigate('Profile')}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>1. Pendahuluan</Text>
        <Text style={styles.content}>
          Selamat datang di Aplikasi SiKPT (Sistem Informasi Ketersediaan
          Tempat) yang dikelola oleh Sekretariat Daerah Kabupaten Brebes. Dengan
          menggunakan aplikasi ini, Anda menyetujui syarat dan ketentuan yang
          tercantum di bawah ini. Mohon membaca dengan seksama sebelum
          menggunakan layanan kami.
        </Text>

        <Text style={styles.heading}>2. Definisi</Text>
        <Text style={styles.content}>
          - <Text style={styles.bold}>Aplikasi</Text>: Aplikasi SiKPT yang
          digunakan untuk peminjaman tempat di Sekretariat Daerah Kabupaten
          Brebes.{'\n'}- <Text style={styles.bold}>Pengguna</Text>: Individu
          atau organisasi yang mengakses atau menggunakan Aplikasi SiKPT.{'\n'}-{' '}
          <Text style={styles.bold}>Tempat</Text>: Ruangan atau lokasi yang
          dapat dipinjam melalui aplikasi ini.
        </Text>
        <Text style={styles.heading}>3. Pendaftaran dan Akun Pengguna</Text>
        <Text style={styles.content}>
          3.1. Untuk menggunakan Aplikasi SiKPT, Anda harus mendaftar dan
          membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan
          informasi akun Anda, termasuk kata sandi.{'\n'}
          3.2. Pengguna setuju untuk memberikan informasi yang akurat, lengkap,
          dan terkini saat mendaftar dan memperbarui informasi akun.
        </Text>

        <Text style={styles.heading}>4. Penggunaan Aplikasi</Text>
        <Text style={styles.content}>
          4.1. Pengguna hanya boleh menggunakan Aplikasi SiKPT untuk tujuan yang
          sah dan sesuai dengan hukum yang berlaku.{'\n'}
          4.2. Pengguna dilarang keras untuk:{'\n'}- Menggunakan aplikasi untuk
          kegiatan ilegal atau melanggar hukum.{'\n'}- Mengakses atau mencoba
          mengakses data atau sistem lain tanpa izin.{'\n'}- Menggunakan
          aplikasi untuk mengganggu, merusak, atau menimbulkan beban yang tidak
          wajar pada server atau sistem.
        </Text>

        <Text style={styles.heading}>5. Peminjaman Tempat</Text>
        <Text style={styles.content}>
          5.1. Pengguna dapat mengajukan permohonan peminjaman tempat melalui
          aplikasi sesuai dengan prosedur yang ditetapkan.{'\n'}
          5.2. Persetujuan peminjaman tempat bergantung pada ketersediaan dan
          kebijakan yang berlaku di Sekretariat Daerah Kabupaten Brebes.{'\n'}
          5.3. Pengguna wajib mematuhi semua peraturan dan ketentuan yang
          berlaku untuk peminjaman tempat, termasuk ketentuan penggunaan, waktu
          peminjaman, dan tanggung jawab atas kerusakan.
        </Text>

        <Text style={styles.heading}>6. Pembatalan dan Pengembalian</Text>
        <Text style={styles.content}>
          6.1. Pengguna dapat membatalkan peminjaman tempat sesuai dengan
          kebijakan pembatalan yang berlaku di aplikasi.{'\n'}
          6.2. Pengguna bertanggung jawab untuk mengembalikan tempat dalam
          kondisi yang baik sesuai dengan ketentuan yang berlaku.
        </Text>

        <Text style={styles.heading}>7. Privasi dan Keamanan</Text>
        <Text style={styles.content}>
          7.1. Kami menghargai privasi Anda dan berkomitmen untuk melindungi
          informasi pribadi Anda sesuai dengan kebijakan privasi kami.{'\n'}
          7.2. Pengguna setuju bahwa informasi yang diberikan dapat digunakan
          untuk tujuan administratif dan pemantauan.
        </Text>

        <Text style={styles.heading}>8. Tanggung Jawab dan Pembatasan</Text>
        <Text style={styles.content}>
          8.1. Aplikasi SiKPT disediakan "sebagaimana adanya" tanpa jaminan apa
          pun, baik tersurat maupun tersirat.{'\n'}
          8.2. Sekretariat Daerah Kabupaten Brebes tidak bertanggung jawab atas
          kerugian atau kerusakan yang timbul dari penggunaan atau
          ketidakmampuan untuk menggunakan aplikasi ini.
        </Text>

        <Text style={styles.heading}>9. Perubahan Syarat dan Ketentuan</Text>
        <Text style={styles.content}>
          Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja tanpa
          pemberitahuan sebelumnya. Perubahan akan berlaku segera setelah
          dipublikasikan di aplikasi.
        </Text>

        <Text style={styles.heading}>10. Kontak</Text>
        <Text style={styles.content}>
          Jika Anda memiliki pertanyaan atau membutuhkan bantuan mengenai syarat
          dan ketentuan ini, silakan hubungi kami di:{'\n'}-{' '}
          <Text style={styles.bold}>Email</Text>: [setda@brebeskab.go.id]{'\n'}-{' '}
          <Text style={styles.bold}>Telepon</Text>: [0899-5900-700]
        </Text>

        <Text style={styles.content}>
          Dengan menggunakan Aplikasi SiKPT, Anda menyetujui syarat dan
          ketentuan ini. Terima kasih atas perhatian dan kerjasamanya.
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
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 12,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#3498db',
    fontFamily: 'Poppins-Bold',
  },
  content: {
    fontSize: 14,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
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
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});

export default TermsAndConditions;
