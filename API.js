//Copyright 2020, Erik Jastad, All rights reserved.

//Old type before making in to objecT:   export function getUser(name){....

export var tetraAPI = {
    /*
    *Inputs ('username')
    *Outputs an array with the attributes            (.userName and .accountType .dateCreated)               example: result[0].accountType would contain 'ANON' or 'USER'  
    *This function returns account information on the user
    */
    getUser: function(name){
        var dest = 'https://baxsdrrhvj.execute-api.us-west-2.amazonaws.com/Dev?name=' + name;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ('username') 
    *Outputs an array with the attributes       (.description .uploadUserName .videoDateTime .videoID .videoName)     example: result[0].description 
    *This function returns the user favorited videos
    */
    getFavoriteVideos: function(username){
        var dest = 'https://amvlhv7lwa.execute-api.us-west-2.amazonaws.com/DEV?name=' + username;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ()
    *Outputs an array with the attributes        (.description .uploadUserName .videoDateTime .videoID .videoName)         example: result[0].description 
    *This function get the most popular videos of all time
    */
    getMostPopularVideos: function(){
        var dest = 'https://c7s3qs2qjg.execute-api.us-west-2.amazonaws.com/DEV';
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ('username','accountType')
    *Outputs an array of rows changed or affected.. or contains errorMessages
    *This function is used to add a new user to the app, input the username and account type
    */
    addUser: function(name, type){
        var dest = 'https://48ur58t8tg.execute-api.us-west-2.amazonaws.com/Dev?name=' + name + '&type=' + type;
        return fetch(dest, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ('videoName','userName','videoID','description')
    *Outputs an array of rows changed or affected.. or contains errorMessages
    *This function is used to update the video name and description of an existing videoID and uploader
    */
    updateVideo: function(vname, uname, id, desc){
        var dest = 'https://mntonrj3cj.execute-api.us-west-2.amazonaws.com/DEV?vname=' + vname + '&uname=' + uname + '&id=' + id + '&desc=' + desc;
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ('tagName','videoID')
    *Outputs an array of rows changed or affected.. or contains errorMessages
    *This function is used to delete a video.
    */
    deleteVideoTag: function(name, id){
        var dest = 'https://6bn8fsdcp9.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&id=' + id;
        return fetch(dest, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ()
    *This function returns an array of JSON objects containing tags that can be used on videos
    *Objects in format tagname: "tag goes here"
    
    getVideoTags: function(){
        var dest = 'https://epbuidyooa.execute-api.us-west-2.amazonaws.com/DEV';
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    }duplicate,*/

    /*
    * Inputs(username, list)
    * This function takes in a video name and returns the found videos for the user.
    */
    getVideoByTags: function(username, list){
        var dest = 'https://b61mlem030.execute-api.us-west-2.amazonaws.com/DEV?name=' + username + '&list=' + list;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs ()
    *This function returns the most recently uploaded videos in a JSON array of objects containing:
    *   videoID, description, uploadUserName, videoName, videoDateTime
    */
    // getRecentVideos: function(){
    //     var dest = 'https://156oopdhb8.execute-api.us-west-2.amazonaws.com/DEV';
        
    //     return fetch(dest)
    //     .then((response) => response.json())
    //     .then((response => {
    //         return response;
    //     }))
    // },

    /*
    * Inputs(username)
    * The following API will get the most recent videos
    * TetraNEWGetRecentVideos
    */  
    getRecentVideos: function(username){
        var dest = 'https://0hkxfgl1w6.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;

        return fetch(dest)
            .then((response) => response.json())
            .then((response => {
                return response;
            }))
    },

    /*
    *Inputs (name)
    *This function returns a list of stats in a JSON array of objects, one for each stat.
    *Pass in a username to get a list of stats they can track (including customs) or nothing for default list.
    */
    getStatList: function(name){
        var dest = 'https://e3jaydvywi.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name, stat)
    *This function returns a a JSON array of objects for each entry for a specific tracked stat for a user.
    *Pass in a username and a stat, objects contain statName, statValue, statDate.
    */
    getUserStat: function(name, stat){
        var dest = 'https://hfpvnoa3jc.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&stat=' + stat;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name)
    *This function returns a JSON array of objects for each entry of recently entered stats for a user.
    *Pass in a username, objects contain statName, statValue, statDate.
    */
    getUserStatSnapshot: function(name){
        var dest = 'https://fvkcdshqb5.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (username, videoname)
    *This function returns a JSON video object based on a passed in video name
    *unknown return formate - unable to test right now
    */
    getVideosByName: function(username, videoname){
        var dest = 'https://4zisndnw3a.execute-api.us-west-2.amazonaws.com/DEV?name=' + username + '&videoname=' + videoname;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name)
    *This function returns a JSON video object based on a passed in tag
    *unknown return formate - unable to test right now, might return an array of video objects or something
    */
    getVideoByTag: function(name){
        var dest = 'https://hw1o6ug24b.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /* 
    * Inputs (id)
    * This function takes in a video id and returns the tags for the video
    */
    getVideoTags: function(id) {
        var dest = 'https://7naf9v7n0g.execute-api.us-west-2.amazonaws.com/DEV?id=' + id;

        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (username, uploadername)
    *This function takes in a username and uploadername and returns the uploaders videos from the DB.
    *Elements in the objects: videoID, description, uploadUserName, videoName, videoDateTime
    */
     getVideosByUploader: function(username, uploadername){
        var dest = 'https://34s65ecub4.execute-api.us-west-2.amazonaws.com/DEV?username=' + username + '&uploadername=' + uploadername;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /* 
    * Inputs (name, offset)
    * This function takes in a username and month offset to get popular videos.
    */
    getPopularvideos: function(name, offset){
        var dest = 'https://j579let7u8.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&offset=' + offset;
        
        return fetch(dest)
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (stat, username, value)
    *Add a stat to track for the user - unable to test right now
    */
    addUserStat: function(stat, name, value){
        var dest = 'https://91lmkkbgxb.execute-api.us-west-2.amazonaws.com/Dev?stat=' + stat + '&name=' + name + '&value=' + value;
        return fetch(dest, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (favorite, count, name, id)
    *Add a stat association between the user and the video
    */
    addUserVideoStat: function(favorite, count, name, id){
        var dest = 'https://k617y0hsz7.execute-api.us-west-2.amazonaws.com/DEV?favorite=' + favorite + '&count=' + count + '&name=' + name + '&id=' + id;
        return fetch(dest, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (userName, videoName, id, desc)
    *Add video info to the database
    */
    addVideo: function(userName, videoName, id, desc){
        var dest = 'https://b9oewzsfch.execute-api.us-west-2.amazonaws.com/DEV?userName=' + userName + '&videoName=' + videoName + '&id=' + id + '&desc=' + desc;
        return fetch(dest, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name, id)
    *Add a tag and video association
    */
    addVideoTag: function(name, id){
        var dest = 'https://jm9qzaez9k.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&id=' + id;
        return fetch(dest, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    * Inputs (id, names)
    * The following API will take in a videoID(URL) and a comma seperated list of tags to apply to the video    comma list example = (Core,UpperBody,LowerBody)
    */

    tetraAddVideoTags: function(id, names){
        var dest = 'https://q2r2sv3kab.execute-api.us-west-2.amazonaws.com/DEV?id='+ id + '&names=' + names;

        return fetch(dest, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    * Inputs(username, id)
    * The following API will increment the views for the week on the passed in videoID, if the current week does not exist it will be created for the video.
    */
    tetraUpdatevideoPopularity: function(username, id){
        var dest = 'https://02tbtdh082.execute-api.us-west-2.amazonaws.com/Dev?name=' + username + '&id=' + id;
        
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name)
    *Delete a User from the DB
    */
    deleteUser: function(name){
        var dest = 'https://m9inyvtng7.execute-api.us-west-2.amazonaws.com/dev?name=' + name;
        return fetch(dest, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name, id)
    *Remove a video
    */
    deleteVideo: function(name, id){
        var dest = 'https://fkk07l7kol.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&id=' + id;
        return fetch(dest, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (stat, date, flag, name)
    *Removes a user stat, flag parameter true means remove all of this stat.
    */
    removeUserStat: function(stat, date, flag, name){
        var dest = 'https://bhc55fiebf.execute-api.us-west-2.amazonaws.com/DEV?stat=' + stat + '&date=' + date + '&flag=' + flag + '&name=' + name;
        return fetch(dest, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    * This function takes in a video id and a comma seperated tag list and removes all the tags that match the video and a tag in the list.
    */
    removeVideoTags: function(id, list){
        var dest = 'https://4j24kr2jyi.execute-api.us-west-2.amazonaws.com/DEV?id=' + id + '&list=' + list;
        return fetch(dest, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (name, type)
    *Update a User in the DB
    */
    updateUser: function(name, type){
        var dest = 'https://6bicoh59s9.execute-api.us-west-2.amazonaws.com/Dev?name=' + name + '&type=' + type;
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (stat, date, value, name)
    *Updates a stat for the user	
    */
    updateUserStat: function(stat, date, value, name){
        var dest = 'https://64v9emy50c.execute-api.us-west-2.amazonaws.com/DEV?stat=' + stat + '&date=' + date + '&value=' + value + '&name=' + name;
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (stat, date, value, name)
    *Updates a stat for the user	
    */
    /*updateUserVideoFavorite: function(name, id, value){
        var dest = 'https://64v9emy50c.execute-api.us-west-2.amazonaws.com/DEV?stat=' + stat + '&date=' + date + '&value=' + value + '&name=' + name;
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },*/ //no stage on AWS side - skip for now

    /*
    *Inputs (stat, date, value, name)
    *Update the stats about a user and respective video
    */
    updateUserVideoStats: function(name, id){
        var dest = 'https://9eu4kshig8.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&id=' + id;
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    },

    /*
    *Inputs (videoName, userName, id, desc)
    *Update a video description and name
    
    updateVideo: function(vname, uname, id, desc){
        var dest = 'https://mntonrj3cj.execute-api.us-west-2.amazonaws.com/DEV?vname=' + vname + '&uname=' + uname + '&id=' + id + '&desc=' + desc;
        return fetch(dest, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            
        })
        .then((response) => response.json())
        .then((response => {
            return response;
        }))
    }duplicate*/
    

};
export default tetraAPI;