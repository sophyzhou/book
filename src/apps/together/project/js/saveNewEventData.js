var prolannerRef = new Firebase('https://prolanner.firebaseio.com')

function saveData() {

  var location =  document.getElementById("location").value
  var eventDate = document.getElementById("date").value
  var eventName = document.getElementById("event_name").value;
  var projectID = window.location.hash.substring(1);
  var newEventRef = prolannerRef.child('events').child(projectID).push()

  var events = {
      eventDate: eventDate,
      eventName: eventName,
      location : location
  }

  newEventRef.set(events)

  window.top.close();

}
