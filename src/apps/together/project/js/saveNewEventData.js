var prolannerRef = new Firebase('https://prolanner.firebaseio.com')


function saveData() {

	var eventDate = Math.floor(Date.now() / 1000)
	var eventName = document.getElementById("event_name").value;
  var projectID = window.location.hash.substring(1);
	var newEventRef = prolannerRef.child('events').child(projectID).push()

	var events = {
		eventDate: Math.floor(Date.now() / 1000),
		eventName: eventName,
		location : " "
	}

  newEventRef.set(events)
	console.log(projectID)

}
