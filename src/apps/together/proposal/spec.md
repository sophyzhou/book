---
layout: layout.hbs
---
# Specification

# Data

Our app uses the following structure for the database backend:

* `users`
  * username
    * displayName
    * id
    * status
    * projects: [projectName]

* `projects`
  * projectName
    * taskIDs: [taskID]
    * eventIDs: [eventID]
    * members: [username]
    * chatroom: chatroomID
    
* `tasks`
  * taskID
    * taskName
    * taskDescription
    * priority
    * taskStatus
    * assignedTo: [username]
    * deadline

* `events`
  * eventID
    * eventName
    * eventDate
    * location

* `chatroom`
  * room-messages
    * roomID
      * messageID
        * message
        * name
        * timestamp
        * type
        * userId
  * room-metadata
    * roomID
      * createdAt
      * createdByUserId
      * id
      * name
      * type
  * users
    * userID


# Actions

The major actions of our app are:
* Task Operations
* Project Operations
* Event Operations
* Post in Chatroom

## Action: Task Operations

### Case: Add a task 't2' with specified fields
``` javascript
// given
tasks is
{
  '-taskid1': {
    'taskName' : 't1',
    'taskDescription' : 'Create firebase database',
    'priority' : 'high',
    'taskStatus' : 'doing',
    'assignedTo' :  'peichetsao',
    'deadline' : '05/03/2016'
  }
}

// when
add_a_task(taskName = 't2', taskDescription = 'Submit a demo', priority = 'low', taskStatus = 'done', assignedTo = 'lilyJi', deadline = '01/03/2016')

// then
tasks should be
{
 '-taskid1': {
    'taskName' : 't1',
    'taskDescription' : 'Create firebase database',
    'priority' : 'high',
    'taskStatus' : 'doing',
    'assignedTo' :  'peichetsao',
    'deadline' : '05/03/2016'
  },
  '-taskid2': {
    'taskName' : 't2',
    'taskDescription' : 'Submit a demo',
    'priority' : 'low',
    'taskStatus' : 'done',
    'assignedTo' :  'lilyJi',
    'deadline' : '01/03/2016'
  }
}
```

### Case: Delete a task 't2' 
``` javascript
// given
tasks is
{
  '-taskid1': {
    'taskName' : 'task1',
    'taskDescription' : 'Create firebase database',
    'priority' : 'high',
    'taskStatus' : 'doing',
    'assignedTo' :  'peichetsao',
    'deadline' : '05/03/2016'
  },
 '-taskid2': {
    'taskName' : 't2',
    'taskDescription' : 'Submit a demo',
    'priority' : 'low',
    'taskStatus' : 'done',
    'assignedTo' :  'lilyJi',
    'deadline' : '05/03/2016'
  }
}

// when
delete_a_task(taskName = 't2')

// then
tasks should be
{
 '-taskid1': {
    'taskName' : 'task1',
    'taskDescription' : 'Create firebase database',
    'priority' : 'high',
    'taskStatus' : 'doing',
    'assignedTo' :  'peichetsao',
    'deadline' : '05/03/2016
  }
}
```

### Case: Edit a task 't2' to re-assign member to 'kavyaravikumar' and change the deadline to '03/01/2016'
``` javascript
// given
tasks is
{
  '-taskid1': {
    'taskName' : 'task1',
    'taskDescription' : 'Create firebase database',
    'priority' : 'high',
    'taskStatus' : 'doing',
    'assignedTo' :  'peichetsao',
    'deadline' : '05/03/2016'
  },
 '-taskid2': {
    'taskName' : 't2',
    'taskDescription' : 'Submit a demo',
    'priority' : 'low',
    'taskStatus' : 'done',
    'assignedTo' :  'lilyJi',
    'deadline' : '01/03/2016'
  }
}

// when
edit_task(taskName = 't2', assignedTo = 'kavyaravikumar', deadline = '03/01/2016')

// then
tasks should be
{
 '-taskid1': {
    'taskName' : 'task1',
    'taskDescription' : 'Create firebase database',
    'priority' : 'high',
    'taskStatus' : 'doing',
    'assignedTo' :  'peichetsao',
    'deadline' : '05/03/2016'
  },
 '-taskid2': {
    'taskName' : 't2',
    'taskDescription' : 'Submit a demo',
    'priority' : 'low',
    'taskStatus' : 'done',
    'assignedTo' :  'kavyaravikumar',
    'deadline' : '03/01/2016'
  }
}
```


## Action: Project Operations

### Case: Add a project 'project1' with administrator 'peichetsao' and members ['calebhsu', 'kavyaravikumar', 'lilyJi']
``` javascript
// given
projects is
{
  'project0': {members: ['peichetsao'], 'chatroom': h245hsdg},
}

// when
add_a_project(projectName = 'project1', members=['peichetsao','calebhsu', 'kavyaravikumar', 'lilyJi'])

// then
projects should be
{
   'project0': {members: ['peichetsao'], 'chatroom': h245hsdg},
   'project1': {'members': ['peichetsao','calebhsu', 'kavyaravikumar', 'lilyJi'], 'chatroom': ge123ffa3}
}
```



### Case: Edit a project 'project1' with administration access to delete a member 'calebhsu' from the project

``` javascript
// given
projects is
{
   'project0': {members: ['peichetsao'], 'chatroom': h245hsdg},
   'project1': {'members': ['peichetsao','calebhsu', 'kavyaravikumar', 'lilyJi'], 'chatroom': ge123ffa3}
}

// when
edit_a_project(projectName = 'project1', members=['peichetsao', 'kavyaravikumar', 'lilyJi'])

// then
projects should be
{
   'project0': {members: ['peichetsao'], 'chatroom': h245hsdg},
   'project1': {'members': ['peichetsao', 'kavyaravikumar', 'lilyJi'], 'chatroom': ge123ffa3}
}
```

### Case: Delete a project 'project1' with administration access 

``` javascript
// given
projects is
{
   'project0': {members: ['peichetsao'], 'chatroom': h245hsdg},
   'project1': {'members': ['peichetsao','calebhsu', 'kavyaravikumar', 'lilyJi'], 'chatroom': ge123ffa3}
}


// when
delete_a_project(projectName = 'project1')

// then
projects should be
{
   'project0': {members: ['peichetsao'], 'chatroom': h245hsdg}
}
```


## Action: Event Operations

### Case: Add an event 'Meet' for the date 'b' at the location 'ITLL' at  '18:00'

``` javascript
// given
events is
{
  '-eventID1': {
    'eventName': 'Project Meeting'
    'eventDate': 'a',
    'eventTime': '15:00',
    'eventLocation': 'locA'
  }
}

// when
addEvent(name = 'Meet', date = 'b', time='18:00', location='ITLL')

// then
events is
{
  '-eventID1': {
    'eventName': 'Project Meeting'
    'eventDate': 'a'
    'eventTime': '15:00'
    'eventLocation': 'locA'
  }
  '-eventID2': {
    'eventName': 'Meet'
    'eventDate': 'b'
    'eventTime': '18:00'
    'eventLocation': 'ITLL'
  }
}
```
### Case: Edit an event 'Dinner Out' to a new date '04/10/2016' at a new location 'The Taj'

``` javascript
// given
events is
{
  '-eventID1': {
    'eventName': 'Project Meeting'
    'eventDate': '03/15/2016',
    'eventTime': '15:00',
    'eventLocation': 'Location1'
  }
'-eventID2': {
    'eventName': 'Dinner Out'
    'eventDate': '04/15/2016'
    'eventTime': '18:00'
    'eventLocation': 'Curry and Kebob'
  }
}

// when
editEvent(name = 'Dinner out', date='04/10/2016', location='The Taj')

// then
events is
{
  '-eventID1': {
    'eventName': 'Project Meeting'
    'eventDate': '03/15/2016'
    'eventTime': '15:00'
    'eventLocation': 'Location1'
  }
  '-eventID2': {
    'eventName': 'Dinner Out'
    'eventDate': '04/10/2016'
    'eventTime': '18:00'
    'eventLocation': 'The Taj'
  }
}
```

### Case: Delete an existing event 'Progress check meeting'

``` javascript
// given
events is
{
  '-eventID1': {
    'eventName': 'Venue booking meeting'
    'eventDate': '03/15/2016'
    'eventTime': '15:00'
    'eventLocation': 'Location1'
  }
  '-eventID2': {
    'eventName': 'Progress check meeting'
    'eventDate': '04/15/2016'
    'eventTime': '18:00'
    'eventLocation': 'Location2'
  }
}

// when
delete(name = 'Progress check meeting')

// then
events is
{
  '-eventID1': {
    'eventName': 'Venue booking meeting'
    'eventDate': '03/15/2016',
    'eventTime': '15:00',
    'eventLocation': 'Location1'
  }
}
```

## Action: Post in Chatroom
### Case: User D posts a message 'd'

``` javascript
// given
chatroom.chatroomID is
{
  '-msgid1': {
    'username' : 'nameA' 
    'messageContent' : 'a'
  }
  '-msgid2': {
    'username' : 'nameB' 
    'messageContent' : 'b'
  }
  '-msgid3': {
    'username' : 'nameC' 
    'messageContent' : 'c'
  }
}

// when
post_a_message(content = 'd')

// then
chatroom.chatroomID should be
{
  '-msgid1': {
    'username' : 'nameA' 
    'messageContent' : 'a'
  }
  '-msgid2': {
    'username' : 'nameB' 
    'messageContent' : 'b'
  }
  '-msgid3': {
    'username' : 'nameC' 
    'messageContent' : 'c'
  }
   '-msgid4': {
    'username' : 'nameD' 
    'messageContent' : 'd'
  }
}
```
 
