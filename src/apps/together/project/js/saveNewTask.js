var prolannerRef = new Firebase('https://prolanner.firebaseio.com')

function saveData() {

  var priority = document.getElementById("priority").value;
  var taskDescription = document.getElementById("task_desc").value
  var taskStatus = document.getElementById("status").value;
  var taskDate = document.getElementById("deadline").value
  var taskName = document.getElementById("task_name").value;
  var projectID = window.location.hash.substring(1);
  var newTaskRef = prolannerRef.child('tasks').child(projectID).push()
  var assignedTo = document.getElementById("name").innerHTML
  var key = newTaskRef.key()

  var tasks = {
    key: key,
    assignedTo: assignedTo,
    deadline: taskDate,
    priority: priority,
    taskDescription: taskDescription,
    taskName: taskName,
    taskStatus:taskStatus
  }

  if (deadline == "" || priority == "" || taskDescription == "" || taskName == "" || taskStatus == "") {
     Materialize.toast('Sorry, you are missing a field.', 4000)
  }
  else {
    newTaskRef.set(tasks)
    window.top.close();
  }

}
