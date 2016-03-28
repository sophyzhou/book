var prolannerRef = new Firebase('https://prolanner.firebaseio.com')

var data = {
    tasks: [],
    events: []
};

var projectID = window.location.hash.substring(1);

function render_tasks(){
  ReactDOM.render(
    <MyComponents.TaskList
        tasks={data.tasks}/>,
    $('#tasklist').get(0)
  );
}

function render_events(){
  ReactDOM.render(
    <MyComponents.EventList
        events={data.events}/>,
    $('#eventlist').get(0)
  );
}


//

// gets all task values for a given project ID
prolannerRef.child('tasks').child(projectID).on('value', function(snap){
  // gets all task IDs
  var taskIDs = Object.keys(snap.val())
  data.tasks=[]
  taskIDs.forEach(function(taskID){
    // gets all the values within a task ID
    prolannerRef.child('tasks').child(projectID).child(taskID).on('value', function(sn){
      data.tasks.push(sn.val())
    })

    render_tasks()

  })
})

prolannerRef.child('events').child(projectID).on('value', function(snapshot){
  // gets all event IDs
  var eventIDs = Object.keys(snapshot.val())
  data.events=[]
  eventIDs.forEach(function(eventID){
    // gets all the values within a event ID
    prolannerRef.child('events').child(projectID).child(eventID).on('value', function(sna){
      data.events.push(sna.val())
    })

    render_events()

  })
})
