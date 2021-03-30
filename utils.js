export const UUID = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxx-xxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export const formatDate = (date) =>{
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