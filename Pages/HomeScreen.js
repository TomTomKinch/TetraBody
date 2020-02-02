// Home Screen
import React, { Component } from "react";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList
} from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";

//Placeholder data to put into the scrolling feed once the database ready for integration
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  },
  {
    id: "4",
    title: "FOURTH Item"
  },
  {
    id: "5",
    title: "Vth Item"
  }
];

//Placeholder for a video to select
//Going to need database link for the processed video on AWS S3 Storage
function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri:
              "http://d2khmbg2rb4k4p.cloudfront.net/e3c815db-fae3-4774-b918-de97b9841910/mp4/workout_test_Mp4_Avc_Aac_16x9_1280x720p_24Hz_4.5Mbps_qvbr.mp4"
          }
        }}
        inFullscreen={false}
        showControlsOnLoad={true}
        showFullscreenButton={true}
        volume={0.1}
        width={300}
        height={260}
      />
    </View>
  );
}

export default class HomeScreen extends Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>TetraBody - Video Feed</Text>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />

          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Login")}
            title="Login"
          />
          <View style={ styles.container }>
          <Text style={styles.title}>TetraBody</Text>
          <Text style={styles.title}>(Home Page)</Text>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Login")}
            title="Sign Out"
          />
          </View>
        </SafeAreaView>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#4d4d4d',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    margin: 10,
    color: '#00cccc',
  },
  item: {
    backgroundColor: '#333333',
    padding: 40,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  scroll:{
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
    //overflow-y: scroll,
  }
})
