import { ADD_ADDRESS, GET_CURRENT_USER_LOCATION, CHALLENGE1, CHALLENGE2, CHALLENGE3, ADD_TEAM_ADDRESS } from '../constants';
import axios from 'axios';
import Axios from '../utils/axios'
import { getCurrentLocation } from '../utils';

export const getAddress = (address) => dispatch => {
  const { address1, city, state, zip, } = address

  axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=+${address1},+${city},+${state},+${zip}&key=AIzaSyAYzDOXRGzFOOl8e1mCMGBxu6pl_tiruCc`)
    .then(address => {
      dispatch({
        type: ADD_ADDRESS,
        payload: address.data.results[0]
      })
    })
    .catch(error => {
      console.log(error)
    })
}

//this whole function is janky af sorry bout it
export const checkChallenge = (id, latChallenge, lngChallenge, title) => {
  getCurrentLocation()
    .then(location => {
      let latCurrentLocation = location.latitude;
      let lngCurrentLocation = location.longitude;
      let latDiff = Math.abs(latChallenge - latCurrentLocation);
      let lngDiff = Math.abs(lngChallenge - lngCurrentLocation);
      if (lngCurrentLocation === lngChallenge && latCurrentLocation === latChallenge){
        console.log('same location')
        return
      } else if (latDiff <0.1 && lngDiff < 0.1){
        console.log("checking in!")
        //Make a put request to update the database with 'true' for the relevant challenge
        if(title.endsWith(1)){
          let newChallenge = {
              compelete: true
        }
          Axios.put(`/teams/updateTeam`, {
            id: '5bd731c744955203f5018e84',
            challenge1: newChallenge
          })
          .then(response => {
            //run a score update function here
            //remove the challenge from the array?
            console.log(response);
                })
          .catch(error => {
            console.log(error);
                });
        } else if(title.endsWith(2)){
          let newChallenge = {
              compelete: true
        }
          Axios.put(`/teams/updateTeam`, {
            id: '5bd731c744955203f5018e84',
            challenge2: newChallenge
          })
          .then(response => {
            //run a score update function here
            console.log(response);
                })
          .catch(error => {
            console.log(error);
                });
        } else if (title.endsWith(3)){
                  let newChallenge = {
                      compelete: true
                }
                //the team id is currently hardcoded, which is an issue. i think we can pull it from the navbar JJ is working on,
                //and then pass it in from there, but i cant do that until compiled with the navbar.
                  Axios.put(`/teams/updateTeam`, {
                    id: '5bd731c744955203f5018e84',
                    challenge3: newChallenge
                  })
                  .then(response => {
                    //run a score update function here?
                    console.log(response);
                        })
                  .catch(error => {
                    console.log(error);
                        });
                } else {
          console.log('not a challenge')
          return
        }

      } else {
        console.log('you are too far to complete this challenge')
      }
    })
    .catch(error => {
      console.log(error)
    })
}

export const getUserCurrentLocation = () => dispatch => {
  getCurrentLocation()
    .then(location => {
      dispatch({
        type: GET_CURRENT_USER_LOCATION,
        payload: location
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const getTeam = (team) => dispatch => {
  Axios
    .get(`/teams/getteam?id=5bd731c744955203f5018e84`)
    .then(team => {
      console.log(team.data.payload)
      dispatch({
        type: CHALLENGE1,
        payload: team.data.payload
      })
      dispatch({
        type: CHALLENGE2,
        payload: team.data.payload
      })
      dispatch({
        type: CHALLENGE3,
        payload: team.data.payload
      })
      dispatch({
        type: ADD_TEAM_ADDRESS,
        payload: team.data.payload
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// export const getTeamInfo = (team) => dispatch => {
//   Axios
//     .get(`/teams/getteam?id=5bd21691581e2a170b9b90cc`)
//     .then(team => {
//       console.log(team.data.payload.challenge1)
//       dispatch({
//         type: CHALLENGE1_NAME,
//         payload: team.data.payload.challenge1
//       })
//       dispatch({
//         // type: CHALLENGE2_NAME,
//         // payload: team.data.payload.challenge1.name
//       })
//       dispatch({
//         // type: CHALLENGE3_NAME,
//         // payload: team.data.payload.challenge1.name
//       })
//     })
//     .catch(error => {
//       console.log(error)
//     })
// }

export const getUser = (user) => dispatch => {
  Axios
    .get(`/users/getuser`)
    .then(user => {
      console.log(user)

      // dispatch({
      //   type: GET_USER,
      //   payload: team.data.payload.users
      // })
    })
    .catch(error => {
      console.log(error)
    })
}