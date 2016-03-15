var prolannerRef = new Firebase('https://prolanner.firebaseio.com')

var data = {
    tasks: []
};

var projectID = window.location.hash.substring(1);

function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}/>,
    $('#tasklist').get(0)
  );
  ReactDOM.render(
    <MyComponents.NavBar/>,
    $('#navbar').get(0)
  );
}

//

// gets all task values for a given project ID
prolannerRef.child('tasks').child(projectID).on('value', function(snapshot){
    // gets all task IDs
    var taskIDs = Object.keys(snapshot.val())
    taskIDs.forEach(function(taskID){
      // gets all the values within a task ID
      prolannerRef.child('tasks').child(projectID).child(taskID).on('value', function(sn){
        data.tasks.push(sn.val())
      })
      
      render()

    })
})