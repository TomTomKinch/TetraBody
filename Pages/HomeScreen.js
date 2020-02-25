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
  FlatList,
  TouchableHighlight
} from "react-native";
import { Auth } from "aws-amplify";
import tetraAPI from "../API.js";
import { Video } from "expo-av";
import VideoScreen from "./VideoScreen.js";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

export var userId;

export function getSub() {
  Auth.currentAuthenticatedUser()
    .then(user => {
      userId = user.attributes.sub;
      console.log("sub grab success: " + userId);
    })
    .catch(err => console.log("user sub error: ", err));
}

const options = {
  keyPrefix: "",
  bucket: "aws-video-on-demand-destination-sns0blqrpgb3",
  region: "us-east-1",
  accessKey: "AKIAZCRK7BQHKOHPWY4I",
  secretKey: "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",
  successActionStatus: 201
};
//This is where we get info for the feed, the default feed just shows recent videos
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      page: 0, //Current amount of pages in the feed
      data: [] //Array of video data
    };
  }

  async openImagePickerAsync() {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos
    });
    console.log(pickerResult);
    console.log(pickerResult.fileName);
    if (pickerResult.cancelled === true) {
      return;
    } else {
      let file = {
        uri: pickerResult.uri,
        name: pickerResult.uri,
        type: "multipart/form-data"
      };
      RNS3.put(file, options)
        .then(response => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          console.log(response.body);
          /**
           * {
           *   postResponse: {
           *     bucket: "your-bucket",
           *     etag : "9f620878e06d28774406017480a59fd4",
           *     key: "uploads/image.png",
           *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
           *   }
           * }
           */
        })
        .catch(err => console.log(err));
    }
  }

  async getRecent() {
    var DATA = await tetraAPI.getRecentVideos("erik");

    this.setState(
      {
        isLoading: false,
        page: 0,
        dataPosts: DATA
      },
      function() {
        //Call a function to pull the initial records
        this.addItems(0);
      }
    );
  }

  //Executes on page load
  componentDidMount() {
    this.getRecent();
    // update userId with sub value when loading home screen
    // this userId is used for API calls
    getSub();
  }
  // This eventually belongs in the drawer navigation in App.js
  handleSignOut = () => {
    Auth.signOut()
      .then(() => this.props.navigation.navigate("Login"))
      .catch(err => console.log(err));
  };
  //This handles when a user favorites a video
  handleFavorite = item => {
    console.log("function works");
    this.props.navigation.navigate("VideoPlayer", { item });
  };

  // This adds items from the feed
  addItems = page => {
    //Change the number 5 to change the number of new videos per page
    const newItems = [];
    for (
      var i = page * 5, il = i + 5;
      i < il && i < this.state.dataPosts.length;
      i++
    ) {
      newItems.push(this.state.dataPosts[i]);
    }

    this.setState({
      data: [...this.state.data, ...newItems]
    });
  };

  // Pass video url and info to Video Player Page
  passVideo = ({ item }) => {
    return (
      <VideoScreen
        videoURL={item.videoID}
        videoTitle={item.videoName}
        videoUploader={item.videoUploader}
      />
    );
  };

  //An individual feed item
  renderItem = ({ item }) => {
    return (
      <SafeAreaView
        style={{
          flexDirection: "row",
          height: 100,
          width: "98%",
          backgroundColor: "#1c1c1c",
          margin: 10,
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 10
        }}
      >
        <View style={styles.thumbnail}>
          <Video
            onPress={() => this.props.navigation.navigate("Login")}
            source={{ uri: item.videoID }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.videoTextArea}>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate("VideoPlayer", {
                videoData: item.videoID
              })
            }
          >
            <Text style={styles.videoTitle}>{item.videoName}</Text>
          </TouchableHighlight>
          <Text style={styles.videoDesc}>{item.description}</Text>
          <Text style={styles.videoStat}>
            Uploader: {item.videoUploadName} Uploaded: {item.videoDateTime}
            {"\n"}
            Views: {item.views} Likes: {item.favorited}
          </Text>
          <TouchableHighlight
            style={styles.faveIcon}
            onPress={() => console.log("function works")}
          >
            <Icon name={"heart"} size={25} style={styles.faveIcon} />
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  };

  //Feed Area
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Video Feed</Text>

        <FlatList
          style={{ width: "100%", marginRight: 10 }}
          //IMPORTANT: The following line calls for the database
          data={this.state.data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.videoID}
          renderItem={this.renderItem}
          onEndReached={this.handleScroll}
          onEndThreshold={0}
        />

        <View style={{ alignSelf: "center" }}>
          <Button
            style={styles.button}
            onPress={this.handleSignOut}
            title="Sign Out"
          />
        </View>

        <View style={{ alignSelf: "flex-end" }}>
          <Button onPress={this.openImagePickerAsync} title="Upload Video" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4d4d4d"
  },
  title: {
    paddingTop: 45,
    fontSize: 32,
    textAlign: "center",
    margin: 30,
    color: "#00cccc"
  },
  item: {
    backgroundColor: "#333333",
    padding: 40,
    marginVertical: 8,
    marginHorizontal: 60
  },
  scroll: {
    fontSize: 40,
    textAlign: "center",
    margin: 10,
    color: "#FFFFFF"
  },
  thumbnail: {
    flex: 30,
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#555555",
    textAlign: "center",
    justifyContent: "center"
  },

  videoTitle: {
    position: "relative",
    top: 0,
    textAlign: "center",
    fontSize: 20,
    color: "#00cccc"
  },
  videoDesc: {
    textAlign: "left",
    color: "#555555"
  },
  videoStat: {
    position: "absolute",
    bottom: 5,
    color: "#FFFFFF"
  },
  videoTextArea: {
    flex: 75,
    width: "90%",
    // justifyContent: 'center',
    textAlign: "center"
  },
  faveIcon: {
    position: "absolute",
    width: 25,
    bottom: 0,
    right: 5,
    color: "#FFFFFF"
  }
});
