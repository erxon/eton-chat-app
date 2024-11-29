export function elapsedTime(dateCreated: Date) {
  let currentDate = new Date();
  let endDate = new Date(dateCreated);

  let elapsedTimeInMilisec = currentDate.valueOf() - endDate.valueOf();
  let finalTimeString = "";

  if (elapsedTimeInMilisec >= (86400000 * 3)) {
    finalTimeString = endDate.toDateString();
  }

  if (elapsedTimeInMilisec >= 86400000) {
    finalTimeString = `${Math.round(elapsedTimeInMilisec / 86400000)}d ago`;
  }

  if (elapsedTimeInMilisec < 86400000 && elapsedTimeInMilisec >= 3600000) {
    finalTimeString = `${Math.round(elapsedTimeInMilisec / 3600000)}h ago`;
  }

  if (elapsedTimeInMilisec < 3600000 && elapsedTimeInMilisec >= 60000) {
    finalTimeString = `${Math.round(elapsedTimeInMilisec / 60000)}m ago`;
  }

  if (elapsedTimeInMilisec < 60000) {
    finalTimeString = "New";
  }

  return finalTimeString;
}
