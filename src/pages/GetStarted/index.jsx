import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Appearance,
} from 'react-native';
import {BgStarted, Logo} from '../../assets';
import {Button} from '../../components';

const GetStarted = ({navigation}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    <ImageBackground
      source={BgStarted}
      style={[
        styles.page,
        {backgroundColor: theme === 'dark' ? '#000000' : '#FF9736'}, // Set background color based on theme
      ]}>
      <View>
        <Image style={styles.image} source={Logo} />
        <Text
          style={[
            styles.subtitle,
            {color: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'},
          ]}>
          ( Sistem Ketersediaan Pinjam Tempat )
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: theme === 'dark' ? '#CCCCCC' : '#FFFFFF'},
          ]}>
          Mudah, Cepat dan Akurat
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          type="primary"
          onPress={() => navigation.navigate('SignUp')}
          buttonStyle={[
            styles.button,
            {backgroundColor: theme === 'dark' ? '#444444' : '#FF5733'}, // Background color of button
          ]}
          textStyle={[
            styles.buttonText,
            {color: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}, // Text color of button
          ]}
        />
        <View style={{height: 20}} />
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('SigIn')}
          buttonStyle={[
            styles.button,
            {backgroundColor: theme === 'dark' ? '#666666' : '#FF6F61'}, // Background color of button
          ]}
          textStyle={[
            styles.buttonText,
            {color: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}, // Text color of button
          ]}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 24,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 70,
    paddingTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    paddingBottom: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
