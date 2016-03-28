var prolannerRef = new Firebase('https://prolanner.firebaseio.com')

function saveData() {
  var eventDate = document.getElementById("date").value;
  var eventName = document.getElementById("event_name").value;
  var location =  document.getElementById("location").value;
  var projectID = window.location.hash.substring(1);
  var newEventRef = prolannerRef.child('events').child(projectID).push()
  
  var events = {
    eventDate: eventDate,
    eventName: eventName,
    location : location
  }

  if (eventDate == "" || eventName == "" || location == "") {
     Materialize.toast('Sorry, you are missing a field.', 4000)
  }
  
  else {
    newEventRef.set(events)
    window.top.close();
  }
}
