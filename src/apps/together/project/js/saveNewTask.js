var prolannerRef = new Firebase('https://prolanner.firebaseio.com')


function saveData() {

	var priority = "0"
	var taskDescription = "New task"
	var taskStatus = "2"
	var taskDate = Math.floor(Date.now() / 1000)
	var taskName = document.getElementById("task_name").value;
  var projectID = window.location.hash.substring(1);
	var newEventRef = prolannerRef.child('tasks').child(projectID).push()

	var tasks = {
		assignedTo: " ",
		deadline: Math.floor(Date.now() / 1000),
		priority: priority,
		taskDescription: taskDescription,
		taskName: taskName,
		taskStatus:"0"
	}

  newEventRef.set(tasks)
	console.log(projectID)

}
