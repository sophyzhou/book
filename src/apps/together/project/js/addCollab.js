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

		var chatRoomID = snapshot.child("projectMetaData").child("relatedChatRoom").val()
		console.log("chat")
		console.log(chatRoomID)
		var chatRoomref = new Firebase('https://prolanner.firebaseio.com').child("chatrooms").child(chatRoomID)
		chatRoomref.once('value', function(snapshot){
			console.log(snapshot.child("roomMetaData").child("roomMembers").val())
			var cmem = snapshot.child("roomMetaData").child("roomMembers").val()
			var uid = "github:"+userID
			cmem.push(uid)
			console.log("cmem")
			console.log(cmem)
			chatRoomref.child("roomMetaData").child("roomMembers").set(cmem)
			//userRef.child('projectIDs').set(pid)
		})

	})

	//var chatRoomID = new Firebase('https://prolanner.firebaseio.com').child("projects").child(projID).child("relatedChatRoom").val()
}