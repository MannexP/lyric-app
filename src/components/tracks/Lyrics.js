import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import {Link} from 'react-router-dom'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${
          process.env.REACT_APP_MM_KEY
        }
    `
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=15953433&apikey=${
            process.env.REACT_APP_MM_KEY
          }
        `
        );
      })
      .then(res => {
        this.setState({ lyrics: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
            <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
            <h5 className="card">
                <div className="cardHeader">
                    {track.track_name} by  {''}
                    <span className="atext-secondary">{track.artist_name}</span>
                </div>
            </h5>
            <div className="car-body">
                <p className="card text">{lyrics.lyrics_body}</p>
            </div>
            <ul className="list-group mt-3">
                <li className="list-item-group-item">
                    <strong>Album ID</strong>: {track.album_id}
                </li>
                <li className="list-item-group-item">
                    <strong>Song Genre</strong>: {track.primary_grnres.music_genre_list[0].music_genre.music_genre_name}
                </li>
                <li className="list-group-item">
                  <strong>Explicit Words</strong>:{track.explicit === 0 ? 'No' : 'Yes'}
         
                </li>
                <li className="list-group-item">
                   <strong>Release Date</strong>: {track.first_release_date}
         
                </li>
            </ul>
        </React.Fragment>
      ) 
    }
  }
}

export default Lyrics;
