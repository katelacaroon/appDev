import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import YouTubeIframe, { useYouTubePlayer } from 'react-native-youtube-iframe';
import axios from 'axios';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTd-xVu-R3BY6LcX4Y9GqtN-zFlfSq0HE",
  authDomain: "seventeen-89144.firebaseapp.com",
  projectId: "seventeen-89144",
  storageBucket: "seventeen-89144.firebasestorage.app",
  messagingSenderId: "608891305247",
  appId: "1:608891305247:web:6c1860eb518b395ca6442a",
  measurementId: "G-NNK2QB03JF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TrackListScreen = ({ navigation }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef(null); // Track the YouTube player instance

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "TrackList"));
      const trackList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          name: doc.data().trackName,
          trackID: doc.data().trackID
        }))
        .sort((a, b) => a.trackID - b.trackID);
  
      setTracks(trackList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tracks from Firebase:", error);
      setLoading(false);
    }
  };

  const handlePlay = async (track) => {
    if (playingTrack === track.name) {
      // If the same track is playing, pause it and save the current time
      playerRef.current?.getCurrentTime().then(time => {
        setCurrentTime(time);
        setPlayingTrack(null);
      });
    } else {
      // If a new track is played, reset the timer
      setCurrentTime(0);
      const trackURL = await getTrackURL(track.name, 'SEVENTEEN');
      if (trackURL) {
        setPlayingTrack(track.name);
        setVideoId(trackURL);
      } else {
        Alert.alert("Track not found", "Unable to find the track to play.");
      }
    }
  };

  const getTrackURL = async (trackName, artistName) => {
    try {
      const searchQuery = `${trackName} ${artistName}`;
      const youtubeSearchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=AIzaSyAc0mDpCzUnGZI-7zX-u7cly8Hk3EuVTjg`;

      const response = await axios.get(youtubeSearchURL);
      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].id.videoId;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching track URL:", error);
      return null;
    }
  };

  return (
    <LinearGradient colors={["#FCF579", "#F98937"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tracks</Text>
      </View>

      <View style={styles.separatorLine} />

      {videoId && (
        <View style={{ height: 0, width: 0, }}>
        <YouTubeIframe
          ref={playerRef} 
          videoId={videoId}
          height={200}
          play={playingTrack !== null}
          initialPlayerParams={{ start: currentTime }} 
          onChangeState={(event) => {
            if (event === "paused") {
              playerRef.current?.getCurrentTime().then(time => setCurrentTime(time));
            }
            if (event === "ended") {
              setPlayingTrack(null);
              setVideoId(null);
            }
          }}
        />
        </View>
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={tracks}
          renderItem={({ item }) => (
            <View style={styles.trackContainer}>
              <Text style={styles.trackText}>{item.name}</Text>
              <TouchableOpacity onPress={() => handlePlay(item)}>
                <Image
                  source={playingTrack === item.name ? require('./assets/stop.png') : require('./assets/play.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F98937',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#F98937',
    marginBottom: 20,
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
  trackText: {
    fontSize: 18,
    color: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default TrackListScreen;
