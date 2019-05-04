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
            <div className="card">
                <div className="cardHeader">
                    {track.track_name} by  {''}
                    <span className="atext-secondary">{track.artist_name}</span>
                </div>
            </div>
        </React.Fragment>
      ) 
    }
  }
}

export default Lyrics;
