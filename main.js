import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Exponent, {ImagePicker} from 'exponent';

class App extends React.Component {
  state = {       // I'm not super sure what this does
    image: null,
  }

  render() {
    // This stores my image URL for background image (since the URL is long )
    const BGImageUri = 'http://images.undergroundfilmjournal.com/wp-images/andy_warhol_filming.jpg';
    const imgurID = '607d5fae371a85b'; // client_id from imgur developer API registration
    const imgurUri = 'https://api.imgur.com/3/image';

    let {image} = this.state;

    // This function launches the camera
    const showCamera = async () => {
      let pick = await ImagePicker.launchCameraAsync({}); // Storing the result of camera launch as my pick
      console.log(pick); // I'm not super sure this is needed save to see that things are happening
      if(!pick.cancelled) {
        this.setState({image: pick.uri}) // Updating global state in line 13 with the image we took
      }
    };

    // This function pulls up the camera roll
    const showPhotos = async () => {
      let pick = await ImagePicker.launchImageLibraryAsync({}); // Storing the chosen photo as my pick
      console.log(pick);
      if(!pick.cancelled) {
        this.setState({image: pick.uri})
      }
    };

    // This function tries to upload to imgur but doesn't work yet
    const uploadImage = async () => {
      let body = new FormData();
      body.append ('image', {uri: image, name: 'hellophoto', type: 'image/jpeg'});

      console.log('About to upload!');

      let response = await fetch(imgurUri, {
        method: 'POST',
        headers: {Authorization: 'Client-ID ' + imgurID},
        body: body
      })

      let uploadedImage = (await response.json()).data.link;

      console.log(uploadedImage);

    };

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
            flexDirection: 'row',     // This made the buttons line up side by side
            justifyContent: 'space-around' // This did nothing (space between buttons was fixed in button style)
          }}>
            <TouchableOpacity onPress={showCamera}>
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

            <TouchableOpacity onPress={showPhotos}>
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


        {image &&               /* I don't really understand this part */
          <View style={{        /* This put a frame around the image */
            borderStyle: 'solid',
            borderColor: 'grey',
            borderWidth: 1,
            margin: 40
          }}>
          <Image
            source={{uri: image}}
            style={{
              width: 250,
              height: 250,
              margin: 5
            }}/>
          </View>
        }


        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20
        }}>
          <TouchableOpacity onPress={uploadImage}>
            <View style={styles.button}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: 'transparent',
                  fontSize: 20
                }}>
                Upload
              </Text>
            </View>
          </TouchableOpacity>

        </View>


        </View>
      </View>
    );
  }

}

// Style sheet allows me to file away these lines of detail so they don't clutter up the main section
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
