import Exponent from 'exponent';
import {ImagePicker} from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

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

    const showPhotos = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({});
      console.log(result);
      if(!result.cancelled) {
        this.setState({image: result.uri})
      }
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.wallpaper}
          source={{uri: BGImageUri}}
        />
        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: 'rgba(0,0,0,0.7)',
          alignItems: 'center',
          justifyContent: 'center'}]}>

          <Text style={styles.headline}>
            Show us a photo, svp!
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <TouchableOpacity
            onPress={showCamera}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    fontSize: 20
                  }}>
                  Camera
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showPhotos}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    fontSize: 20
                  }}>
                  Photos
                  </Text>
                </View>
            </TouchableOpacity>
          </View>
  
        {image && <Image
          source={{uri: image}}
          style={{
            width: 250,
            height: 250,
            margin: 20
          }}/>
        }

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
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 10
  }
});

Exponent.registerRootComponent(App);
