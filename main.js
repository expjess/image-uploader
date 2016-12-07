import Exponent from 'exponent';
import {ImagePicker} from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Button from 'react-native-button';

class App extends React.Component {
  state = { //setimagetest
    image: null, //setimagetest
  } //setimagetest

  render() {
    const BGImageUri = 'http://images.undergroundfilmjournal.com/wp-images/andy_warhol_filming.jpg';

    let {image} = this.state; //setimagetest

    const showCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({});
      console.log(result); // setimagetest
      if(!result.cancelled) { // setimagetest
        this.setState({image: result.uri}) // setimagetest
      }
    }

    return (
      <View style={styles.container}>
        {/* <Image
          style={styles.wallpaper}
          source={{uri: BGImageUri}}
        /> */}
        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: 'rgba(0,0,0,0.7)',
          alignItems: 'center',
          justifyContent: 'center'}]}>
        <Text style={styles.headline}>
          Camera on!
        </Text>
        <Button
          onPress={showCamera}>
          Open camera
        </Button>

        {image && <Image source={{uri: image}} style={{width:50, height:50}}/>}

        </View>
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wallpaper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headline: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 20,
    marginBottom: 20,
  }
});

Exponent.registerRootComponent(App);
