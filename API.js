//Copyright 2020, Erik Jastad, All rights reserved.

/*
*Inputs ('username')
*Outputs an array with the attributes            (.userName and .accountType .dateCreated)               example: result[0].accountType would contain 'ANON' or 'USER'  
*This function returns account information on the user
*/
export function getUser(name){
    var dest = 'https://baxsdrrhvj.execute-api.us-west-2.amazonaws.com/Dev?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs ('username') 
*Outputs an array with the attributes       (.description .uploadUserName .videoDateTime .videoID .videoName)     example: result[0].description 
*This function returns the user favorited videos
*/
export function getFavoriteVideos(name){
    var dest = 'https://oozffhq4h9.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs ()
*Outputs an array with the attributes        (.description .uploadUserName .videoDateTime .videoID .videoName)         example: result[0].description 
*This function get the most popular videos of all time
*/
export function getMostPopularVideos(){
    var dest = 'https://c7s3qs2qjg.execute-api.us-west-2.amazonaws.com/DEV';
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs ('username','accountType')
*Outputs an array of rows changed or affected.. or contains errorMessages
*This function is used to add a new user to the app, input the username and account type
*/
export function addUser(name, type){
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
}

/*
*Inputs ('videoName','userName','videoID','description')
*Outputs an array of rows changed or affected.. or contains errorMessages
*This function is used to update the video name and description of an existing videoID and uploader
*/
export function updateVideo(vname, uname, id, desc){
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
}

/*
*Inputs ('tagName','videoID')
*Outputs an array of rows changed or affected.. or contains errorMessages
*This function is used to delete a video.
*/
export function deleteVideoTag(name, id){
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
}

/*
*Inputs ()
*This function returns an array of JSON objects containing tags that can be used on videos
*Objects in format tagname: "tag goes here"
*/
export function getVideoTags(){
    var dest = 'https://epbuidyooa.execute-api.us-west-2.amazonaws.com/DEV';
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs ()
*This function returns the most recently uploaded videos in a JSON array of objects containing:
*   videoID, description, uploadUserName, videoName, videoDateTime
*/
export function getRecentVideos(){
    var dest = 'https://156oopdhb8.execute-api.us-west-2.amazonaws.com/DEV';
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs (name)
*This function returns a list of stats in a JSON array of objects, one for each stat.
*Pass in a username to get a list of stats they can track (including customs) or nothing for default list.
*/
export function getStatList(name){
    var dest = 'https://e3jaydvywi.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs (name, stat)
*This function returns a a JSON array of objects for each entry for a specific tracked stat for a user.
*Pass in a username and a stat, objects contain statName, statValue, statDate.
*/
export function getUserStat(name, stat){
    var dest = 'https://hfpvnoa3jc.execute-api.us-west-2.amazonaws.com/DEV?name=' + name + '&stat=' + stat;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs (name)
*This function returns a JSON array of objects for each entry of recently entered stats for a user.
*Pass in a username, objects contain statName, statValue, statDate.
*/
export function getUserStatSnapshot(name){
    var dest = 'https://fvkcdshqb5.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs (name)
*This function returns a JSON video object based on a passed in video name
*unknown return formate - unable to test right now
*/
export function getVideoByName(name){
    var dest = 'https://nvtdkj3xoe.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs (name)
*This function returns a JSON video object based on a passed in tag
*unknown return formate - unable to test right now, might return an array of video objects or something
*/
export function getVideoByTag(name){
    var dest = 'https://hw1o6ug24b.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}

/*
*Inputs (name)
*This function returns a JSON array of video objects uploaded by a specific user from a passed in username
*Elements in the objects: videoID, description, uploadUserName, videoName, videoDateTime
*/
export function getVideoByUploader(name){
    var dest = 'https://7c1swj45yb.execute-api.us-west-2.amazonaws.com/DEV?name=' + name;
    
    return fetch(dest)
    .then((response) => response.json())
    .then((response => {
        return response;
    }))
}