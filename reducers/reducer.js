import {
  ADD_ENTRY_TO_MEETING,
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PLAY_SELECTED_VIDEO,
  SET_FIELD_VALUE,
  SET_MEETING_DATA,
  TOGGLE
} from "./actionConstants";
import {UUID} from "../utils";

const mockItem = {
  "kind": "youtube#searchResult",
  "etag": "r6nsSp-0yjb9lW9Jtg-EIgs2C3g",
  "id": {
    "kind": "youtube#video",
    "videoId": "vTHDaLMhi3Q"
  },
  "snippet": {
    "publishedAt": "2021-02-03T13:00:12Z",
    "channelId": "UCRydMJd4Oe-FTTZg95K2ZxQ",
    "title": "Chán Gái 707 | Low G | Rap Nhà Làm | KIONX DANCE TEAM | SPX ENTERTAINMENT",
    "description": "Chán Gái 707 | Low G | Rap Nhà Làm | KIONX DANCE TEAM | SPX ENTERTAINMENT Chào mừng Các Bạn với KION-X DANCE TEAM ! Giúp chúng mình đạt ...",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/vTHDaLMhi3Q/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/vTHDaLMhi3Q/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/vTHDaLMhi3Q/hqdefault.jpg",
        "width": 480,
        "height": 360
      }
    },
    "channelTitle": "KION-X",
    "liveBroadcastContent": "none",
    "publishTime": "2021-02-03T13:00:12Z"
  }
}

const MAX_PREVIOUS_TRACKS = 5;

export const initialState = {
  searchOverlay: false,
  count: 0,
  paused: true,
  duration: 0,
  selectedTrack: null,
  repeatOn: false,
  shuffleOn: false,
  playerRef: null,
  isYoutubeVisible: true,
  playingIn: null,
  selectedMeeting: 1,
  tracks: [],
  previousTracks: [],
  meetings: {
    [1]: [{
      key: UUID(),
      addNewCard: true
    }]
  },
  videoState: null,
  meetingTypes: [
    {label: 'Entrance of Officers', value: 'Entrance of Officers'},
    {label: 'Opening Ode', value: 'Opening Ode'},
    {label: 'Deacons Attend TB Etc.', value: 'Deacons Attend TB Etc.'},
    {label: 'Entrance of Lodge Guests', value: 'Entrance of Lodge Guests'},
    {label: 'Late Arrivals', value: 'Late Arrivals'},
    {label: 'Signing of Minutes', value: 'Signing of Minutes'},
    {label: 'Balloting', value: 'Balloting'},
    {label: 'PGM or A/PGM Admission', value: 'PGM or A/PGM Admission'},
    {label: 'In Memoriam', value: 'In Memoriam'},
  ]
}
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const nextShuffledTrack = (tracks, selectedTrack) => {
  if (!tracks) {
    return null;
  }
  if (0 === tracks.length - 1) {
    return 0;
  }
  const nextRandomTrackIndex = randomInteger(0, tracks.length - 1);
  console.log(nextRandomTrackIndex);
  if (tracks[nextRandomTrackIndex].key === selectedTrack.key) {
    return nextShuffledTrack(tracks, selectedTrack);
  }
  return tracks[nextRandomTrackIndex];
}
const findNextTrackStartingWithIndex = (tracks, selectedTrack, shuffleOn) => {
  if (!tracks || !selectedTrack) {
    return null;
  }
  if (shuffleOn) {
    return nextShuffledTrack(tracks, selectedTrack);
  }
  const currentIndex = tracks.findIndex(track => track.key === selectedTrack.key);
  for (let i = currentIndex + 1; i < tracks.length; i++) {
    if (tracks[i] != null && tracks[i].videoId) {
      return tracks[i];
    }
  }
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i] != null) {
      return tracks[i];
    }
  }
}
const playNext = (state) => {
  let nextTrack;
  if (state.repeatOn) {
    nextTrack = state.selectedTrack;
  } else {
    switch (state.playingIn) {
      case "CIRCUMSTANTIAL":
        nextTrack = findNextTrackStartingWithIndex(state.tracks, state.selectedTrack, state.shuffleOn);
        break;
      case "MEETING":
        nextTrack = findNextTrackStartingWithIndex(state.meetings[state.selectedMeeting], state.selectedTrack,
            state.shuffleOn);
        break;
    }
  }
  const previousTracks = JSON.parse(JSON.stringify([...state.previousTracks, nextTrack] || []));
  if (previousTracks.length > MAX_PREVIOUS_TRACKS) {
    previousTracks.shift();
  }
  return {
    ...state,
    selectedTrack: nextTrack,
    previousTracks,
    paused: false
  };
}
const playPrevious = (state) => {
  let previous;
  let previousTracks = JSON.parse(JSON.stringify(state.previousTracks || []));
  if (previousTracks.length > 1) {
    previousTracks.pop();
  }

  console.log(previousTracks.length)
  if (!state.previousTracks) {
    previous = state.selectedTrack
  } else {
    previous = state.previousTracks[state.previousTracks.length - 1];
  }
  return {
    ...state,
    selectedTrack: previous,
    previousTracks,
    paused: false
  };

}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {...state, [action.payload.name]: action.payload.value};
    case TOGGLE:
      return {...state, [action.payload.name]: !state[action.payload.name]};
    case ADD_TO_CIRCUMSTANTIAL_MUSIC:
      const replIndex = state.tracks.findIndex(tr => tr.key === action.payload.entry.key)
      if (replIndex === -1) {
        return {...state, tracks: [...state.tracks, action.payload.entry]};
      }
      return {
        ...state,
        tracks: state.tracks.map((track, index) => index === replIndex ? action.payload.entry : track)
      };
    case PLAY_SELECTED_VIDEO: {
      const previousTracks = JSON.parse(JSON.stringify([...state.previousTracks, action.payload.video] || []));
      if (previousTracks.length > MAX_PREVIOUS_TRACKS) {
        previousTracks.shift();
      }
      return {
        ...state,
        selectedTrack: action.payload.video,
        playingIn: action.payload.playingIn,
        previousTracks,
        paused: false
      };
    }
    case SET_MEETING_DATA: {
      return {
        ...state,
        meetings: {[action.payload.id]: action.payload.value}
      };
    }
    case  ADD_ENTRY_TO_MEETING: {
      return {
        ...state,
        meetings: {[action.payload.id]: [action.payload.entry, ...state.meetings[action.payload.id]]}
      };
    }
    case PLAY_NEXT:
      return playNext(state);
    case PLAY_PREVIOUS:
      return playPrevious(state);

    default:
      return state;
  }
}

export default reducer;