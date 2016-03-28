var prolannerRef = new Firebase('https://prolanner.firebaseio.com')


function saveData() {
  var priority = document.getElementById("priority").value;
  var taskDescription = document.getElementById("task_desc").value
  var taskStatus = "0"
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
    taskStatus:taskStatus
  }

  newEventRef.set(tasks)
  console.log(projectID)

}
