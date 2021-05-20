import {
  ADD_EMTPY_CATEGORY,
  ADD_ENTRY_TO_MEETING,
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  DELETE_SELECTED_CATEGORY,
  DUPLICATE_SELECTED_CATEGORY,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PLAY_SELECTED_VIDEO,
  REMOVE_MEETING_CARD,
  SAVE_CATEGORY,
  SET_FIELD_VALUE,
  SET_MEETING_DATA,
  TOGGLE,
  UPDATE_DURATION_FOR_VIDEO
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
  selectedTrack: null,
  repeatOn: false,
  shuffleOn: false,
  playerRef: null,
  isYoutubeVisible: false,
  playingIn: null,
  selectedMeeting: 1,
  tracks: [],
  previousTracks: [],
  meetings: {
    ['1']: [{
      key: '1',
      addNewCard: true
    }]
  },
  categories: [{id: '1', name: '1st Degree Meeting'}],
  videoState: null,
  editMeeting: false,
  isLightTheme: false,
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
  ],
  theme: {
    PRIMARY_COLOR: '#1b262c',
    SECONDARY_COLOR: '#0f4c75',
    SELECTED: '#d6ab12',
    NEUTRAL_COLOR: '#3282b8',
    FILLER_COLOR: '#bbe1fa',
    WHITE: '#ffffff'
  }
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
  console.log('Action:', action.type);
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {...state, [action.payload.name]: action.payload.value};
    case TOGGLE:
      return {...state, [action.payload.name]: !state[action.payload.name]};
    case ADD_TO_CIRCUMSTANTIAL_MUSIC:
      const currentTrack = state.selectedTrack && state.selectedTrack.key === action.payload.entry.key
          ? action.payload.entry
          : state.selectedTrack;
      let replIndex = state.tracks.findIndex(tr => tr.key === action.payload.entry.key)
      if (replIndex === -1) {
        return {
          ...state,
          selectedTrack: currentTrack,
          tracks: [...state.tracks, action.payload.entry]
        };
      }
      return {
        ...state,
        selectedTrack: currentTrack,
        tracks: state.tracks.map((track, index) => index === replIndex ? action.payload.entry : track),

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
      const selected = state.selectedTrack && state.selectedTrack.key === action.payload.entry.key
          ? action.payload.entry : state.selectedTrack;
      const replIndex2 = state.meetings[state.selectedMeeting].findIndex(tr => tr.key === action.payload.entry.key)
      if (replIndex2 === -1) {
        return {
          ...state,
          selectedTrack: selected,
          meetings: {
            ...state.meetings,
            [action.payload.id]: [action.payload.entry, ...state.meetings[action.payload.id]]
          }
        };
      }
      return {
        ...state,
        selectedTrack: selected,
        meetings: {
          ...state.meetings,
          [action.payload.id]: state.meetings[state.selectedMeeting].map(
              (video, index) => index === replIndex2 ? action.payload.entry : video)
        }
      };
    }
    case PLAY_NEXT:
      return playNext(state);
    case PLAY_PREVIOUS:
      return playPrevious(state);
    case REMOVE_MEETING_CARD:
      return {
        ...state,
        meetings: {
          [state.selectedMeeting]: state.meetings[state.selectedMeeting].filter(
              meeting => meeting.key !== action.payload.key)
        }
      }
    case ADD_EMTPY_CATEGORY: {
      const id = UUID();
      return {
        ...state,
        categories: [...state.categories, {id, isEmpty: true}],
        meetings: {
          ...state.meetings, [id]: [{
            key: id,
            addNewCard: true
          }]
        }
      }
    }
    case SAVE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.map(
            category => category.id === action.payload.id ? action.payload : category)
      }
    }
    case DELETE_SELECTED_CATEGORY: {
      return {
        ...state,
        paused: true,
        categories: state.categories.filter(category => category.id !== state.selectedMeeting),
        selectedMeeting: state.categories.length >= 1 ? state.categories[0].id : null
      }
    }
    case DUPLICATE_SELECTED_CATEGORY: {
      const newId = UUID();
      const currentCategory = state.categories.find(cat => cat.id === state.selectedMeeting);
      return {
        ...state,
        paused: true,
        categories: [...state.categories, {id: newId, name: currentCategory.name}],
        meetings: {...state.meetings, [newId]: state.meetings[state.selectedMeeting]},
        selectedMeeting: newId
      }
    }
    case UPDATE_DURATION_FOR_VIDEO: {
      const currentMeeting = JSON.parse(JSON.stringify(state.meetings[state.selectedMeeting]));
      const currentTracks = JSON.parse(JSON.stringify(state.tracks));
      const selectedTrack = JSON.parse(JSON.stringify(state.selectedTrack));
      if (selectedTrack) {
        if (selectedTrack.videoId === action.payload.videoId) {
          selectedTrack.duration = action.payload.duration;
        }
      }
      currentMeeting.forEach(video => {
        if (video.videoId === action.payload.videoId) {
          video.duration = action.payload.duration
        }
      });
      currentTracks.forEach(video => {
        if (video.videoId === action.payload.videoId) {
          video.duration = action.payload.duration
        }
      });
      return {
        ...state,
        selectedTrack: selectedTrack,
        meetings: {...state.meetings, [state.selectedMeeting]: currentMeeting},
        tracks: currentTracks
      }
    }

    default:
      return state;
  }
}

export default reducer;