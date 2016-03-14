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
}


prolannerRef.child('tasks').child(projectID).on('value', function(snapshot){
    console.log(snapshot.val())
    var taskIDs = Object.keys(snapshot.val())
    taskIDs.forEach(function(taskID){
    	console.log("final")
    	console.log(taskID)
    	prolannerRef.child('tasks').child(projectID).child(taskID).on('value', function(sn){
    		data.tasks.push(sn.val())
    	})
    	
    	//data.tasks.push(taskID)
    	render()

    })

    /*console.log(Object.keys(snapshot.val()))
    for(var i in Object.keys(snapshot.val()))
    {
        data.tasks.push(prolannerRef.child('tasks').child(projectID).child(Object.keys(snapshot.val())[i]))
        render();
        //prolannerRef.child('tasks').child(projectID).child(Object.keys(snapshot.val())[i]).
        console.log("data val")
        console.log(data.tasks)

    }*/
})

console.log("tasks:"+data.tasks)
