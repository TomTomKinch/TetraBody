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