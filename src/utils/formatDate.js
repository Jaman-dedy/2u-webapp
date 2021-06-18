import moment from 'moment';

export const formatDate = targetDate => {
  let date = targetDate;
  try {
    date = new Date(targetDate);
    if (Object.prototype.toString.call(date) === '[object Date]') {
      if (isNaN(date.getTime())) {
        let dateValues = [];
        if (targetDate.includes('-')) {
          dateValues = targetDate.substr(0, 11).split('-');
        } else {
          dateValues = targetDate.substr(0, 11).split('/');
        }

        dateValues = dateValues.map((value, index) => {
          if (index === 1) {
            return +value - 1;
          } else {
            return +value;
          }
        });
        date = new Date(...dateValues);

        return date;
      }
    } else {
      return targetDate;
    }
  } catch (error) {
    return date.substr(0, 11);
  }
};
export default (date, langue) => {
  if (langue === 'fr') {
    return moment(date).format('DD/MM/YYYY');
  }
  return moment(date).format('YYYY/MM/DD');
};
