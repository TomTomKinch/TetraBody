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
import { LinearGradient } from 'expo-linear-gradient';
import VideoScreen from "./VideoScreen.js";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

export var userId;

export function getSub() {
  Auth.currentAuthenticatedUser()
    .then(user => {
      userId = user.attributes.sub;
      console.log("UserId: " + userId);
      tetraAPI.getUser(userId)
      .then(response => {
        if(response == '') {
          tetraAPI.addUser(userId, 'USER')
          .then(resp => console.log("API AddUser success: ", resp))
          .catch(err => console.log("API addUser error: ", err))
        }
      })
      .catch(err => console.log("API getUser error: ", err))
    })
    .catch(err => {
      console.log("UserId: ", err);
      userId = 'anonymous';
      console.log("Continuing as", userId);
    });
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
      data: [], //Array of video data
      sort: "popular", //Default sort is recent, 
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
    console.log(pickerResult.uri.split('/')[pickerResult.uri.split('/').length - 1]);
    if (pickerResult.cancelled === true) {
      return;
    } else {
      var date = new Date().toString();
      var dateNoSpaces = date.replace(/\s+/g, "");
      console.log(dateNoSpaces);

      let file = {
        uri: pickerResult.uri,
        name: dateNoSpaces + pickerResult.uri.split('/')[pickerResult.uri.split('/').length - 1],//String(Date.now()) + pickerResult.uri.split('/')[pickerResult.uri.split('/').length - 1],//dateNoSpaces + "workout_video.mp4",
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
    var DATA = await tetraAPI.getRecentVideos(userId);

    this.setState(
      {
        isLoading: false,
        page: 0,
        dataPosts: DATA,
        sort: 0,
      },
      function() {
        //Call a function to pull the initial records
        this.addItems(0);
      }
    );
  }
  async getPopular() {
    //Gets the most popular videos by up to 12 months
    var DATA = await tetraAPI.getPopularvideos(userId, 12);
    this.setState(
      {
        isLoading: false,
        page: 0,
        dataPosts: DATA,
        sort: 0,
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
  //This handles when a user favorites a video. If favorited is 0 ( false ), change to 1 ( true )
  //If favorited is 1, change to 0
  //
  handleFavorite = item => {
    if(item.favorited == 0){
      tetraAPI.addUserVideoStat(1, 0, userId, item.videoID);
      tetraAPI.updateUserVideoFavorite(userId, item.videoID, 1);
      console.log("added new favorite");
      //UPDATE FIRST
      //if affected rows = 0, add stat 
      //otherwise dont add
      //if anon, dont allow favorite api call
    }
    else{
      tetraAPI.updateUserVideoFavorite(userId, item.videoID, 0);
      console.log("removed favorite");
    }
    this.setState({page: 0});
    this.setState({data: []});
    this.getRecent();
    
  };
  //This handles when a user clicks on a video, update the view count of that video
  handleVideoClicked = item => {
    tetraAPI.tetraUpdatevideoPopularity(userId, item.videoID)
    this.props.navigation.navigate('VideoPlayer', { 
      videoData: item });
  };
  //This handles when a user clicks on a sort button
  handleSort = option => {
    if(option == "recent"){
      this.setState({page: 0});
      this.setState({data: []});
      this.setState({sort: "recent"});
      
        this.getRecent()
    }
    else if(option == "popular"){
      this.setState({page: 0});
      this.setState({data: []});
      this.setState({sort: "popular"});
      
        this.getPopular()
    }
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


  // This handles when we reach the end of the feed, and there's more to display
  handleScroll = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.addItems(this.state.page);
    });
  }

  //An individual feed item
  renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{flexDirection: 'row', height: 100, width: '98%', backgroundColor: '#1c1c1c', margin: 10
      , justifyContent: 'center', textAlign: 'center', borderRadius: 10
      }}>
        <View style={ styles.thumbnail }>
          <Video
            source={{ uri: item.videoID}}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={ styles.videoTextArea}>
        <TouchableHighlight
          onPress={ () => this.handleVideoClicked(item) }
        >
          <Text style={ styles.videoTitle }>{item.videoName}</Text>
        </TouchableHighlight>
          
          <Text style={ styles.videoStat }>
            Uploader: {item.uploadUserName}{"\n"}
            Uploaded: {item.videoDateTime.split("T")[0]}{"\n"}
            Views: {item.views}                    Likes: {item.likes}
          </Text>
        <TouchableHighlight
          style={ styles.faveIcon }
          onPress={ () => this.handleFavorite(item) }
        >
             <Icon
              name={ item.favorited == 1 ? 'heartbeat' : 'heart'}
              size={25}
              style={ { 
                color: item.favorited == 1 ? "#00cccc" : "#FFFFFF",
                position: 'absolute',
                width: 25,
                bottom: 0,
                right: 5,
              } }
              /> 
        </TouchableHighlight>
          
        </View>
      </SafeAreaView>
    );
  };


  //Feed Area
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={ styles.sortArea }>  
          <TouchableHighlight
            //Sorting button
            style={ { 
              padding: 5,
              margin: 5,
              position: 'relative',
              width: '50%',
              backgroundColor: this.state.sort == "recent" ? "#00cccc" : "#FFFFFF",
              borderRadius: 10,
            } }
            onPress={ () => this.handleSort("recent") }
          >
            <Text style={ styles.sortText }>Sort by Recent</Text>
          </TouchableHighlight>
          <TouchableHighlight
            //Sorting button
            style={ { 
              padding: 5,
              margin: 5,
              position: 'relative',
              width: '50%',
              backgroundColor: this.state.sort == "popular" ? "#00cccc" : "#FFFFFF",
              borderRadius: 10,
            } }
            onPress={ () => this.handleSort("popular") }
          >
         
           <Text style={ styles.sortText }>Sort by Popularity</Text>
          </TouchableHighlight>
        </View> 

        <FlatList
          style={{ width: "100%", marginTop: 10, marginRight: 10 }}
          //IMPORTANT: The following line calls for the database
          data={this.state.data}
          //When the data is changed, refresh the list
          extraData={this.state.data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.videoID}
          renderItem={this.renderItem}
          onEndReached={this.handleScroll}
          onEndThreshold={0}
        />

        <View style={{padding: 5}}>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['#00cccc', '#aecdd4', '#00cccc']}
            style={styles.linearGradient}>
             <TouchableHighlight
                style={ styles.linearGradient }
                onPress={this.openImagePickerAsync}
                underlayColor='#00cccc'
             >
                <Text style={styles.buttonText}>Upload Video</Text>
              </TouchableHighlight> 
          </LinearGradient>
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
  sortArea:{
      margin: 5,
      padding: 5,
      top: 20,
      width: '98%',
      alignSelf: "flex-start",
      flexDirection: "row",
      justifyContent: "center",
  },
  sortText:{
    textAlign: "center",
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
  },
  linearGradient: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  height: 45,
  width: 115,
  },
});
