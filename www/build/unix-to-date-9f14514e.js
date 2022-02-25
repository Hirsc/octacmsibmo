const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function unixDateToDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const time = `${day}.${month}.${year}`;
  return time;
}

export { unixDateToDate as u };
