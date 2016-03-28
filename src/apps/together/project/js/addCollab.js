function assig(userID) {
	var projID = window.location.hash.substring(1);

	var userRef = new Firebase('https://prolanner.firebaseio.com').child("users").child("github:"+userID)
	userRef.once('value', function(snapshot){
		console.log(snapshot.child("projectIDs").val())
		var pid = snapshot.child("projectIDs").val()
		pid.push(projID)
		console.log("pid")
		console.log(pid)
		userRef.child('projectIDs').set(pid)
	})

	var projRef = new Firebase('https://prolanner.firebaseio.com').child("projects").child(projID)
	projRef.once('value', function(snapshot){
		console.log(snapshot.child("projectMetaData").child("projectMembers").val())
		var pmem = snapshot.child("projectMetaData").child("projectMembers").val()
		var uid = "github:"+userID
		pmem.push(uid)
		console.log("pmem")
		console.log(pmem)
		projRef.child("projectMetaData").child("projectMembers").set(pmem)
	})
}