//Define your initialState
import {
  ADD_ENTRY_TO_MEETING,
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
  SET_FIELD_VALUE,
  SET_MEETING_DATA,
  SET_SELECTED_CIRCUMSTANTIAL_CELL,
  TOGGLE
} from "./actionConstants";
import {THEME} from "../color-theme";
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
const NUM_ITEMS = 10;

function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const generateMeetingCard = () => {
  const meetingCards = [...Array(20)].map((d, index) => {
    return {
      key: `item-${Math.floor(Math.random() * 1000)}`,
      label: String(index),
      backgroundColor: THEME.NEUTRAL_COLOR,
    };
  });
  meetingCards.push({
    addNewCard: true,
    key: `CEAI`,
    label: String(123),
    backgroundColor: getColor(123),
  })
  return meetingCards;
}

export const initialState = {
  searchOverlay: false,
  count: 0,
  paused: true,
  duration: 0,
  selectedTrack: '2-aWEYezEMk',
  repeatOn: false,
  shuffleOn: false,
  selectedCircumstantialCell: 0,
  tracks: {},
  playerRef: null,
  isYoutubeVisible: true,
  meetings: {
    [1]: [{
      key: UUID(),
      addNewCard: true
    }]
  },
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {...state, [action.payload.name]: action.payload.value};
    case TOGGLE:
      return {...state, [action.payload.name]: !state[action.payload.name]};
    case ADD_TO_CIRCUMSTANTIAL_MUSIC:
      return {...state, tracks: {...state.tracks, [state.selectedCircumstantialCell]: action.payload}};
    case SET_SELECTED_CIRCUMSTANTIAL_CELL:
      return {...state, selectedCircumstantialCell: action.payload.id};
    case PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO: {
      if (state.tracks[state.selectedCircumstantialCell] && action.payload.id !== undefined) {
        return {
          ...state,
          selectedTrack: state.tracks[action.payload.id].id.videoId,
          selectedCircumstantialCell: action.payload.id,
          paused: false
        };
      }
      return state;
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
        meetings: {[action.payload.id]: [ action.payload.entry, ...state.meetings[action.payload.id]]}
      };
    }

    default:
      return state;
  }
}

export default reducer;