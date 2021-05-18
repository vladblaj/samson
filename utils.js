export const UUID = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxx-xxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export const formatDate = (date) => {
  let YYYY = new Date(date).toJSON().slice(0, 4);
  let MM = new Date(date).toJSON().slice(5, 7);
  let DD = new Date(date).toJSON().slice(8, 10);
  let mmName = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  return mmName[MM] + ' ' + DD + ', ' + YYYY;
}

export const youtubeDurationToSeconds = (duration) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Remove PT from string ref: https://developers.google.com/youtube/v3/docs/videos#contentDetails.duration
  duration = duration.replace('PT', '');

  // If the string contains hours parse it and remove it from our duration string
  if (duration.indexOf('H') > -1) {
    const hours_split = duration.split('H');
    hours = parseInt(hours_split[0]);
    duration = hours_split[1];
  }

  // If the string contains minutes parse it and remove it from our duration string
  if (duration.indexOf('M') > -1) {
    const minutes_split = duration.split('M');
    minutes = parseInt(minutes_split[0]);
    duration = minutes_split[1];
  }

  // If the string contains seconds parse it and remove it from our duration string
  if (duration.indexOf('S') > -1) {
    const seconds_split = duration.split('S');
    seconds = parseInt(seconds_split[0]);
  }

  // Math the values to return seconds
  return (hours * 60 * 60) + (minutes * 60) + seconds;
}

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



export const minutesAndSeconds = (time)=>
{
  let sec_num = parseInt(time, 10); // don't forget the second param
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}