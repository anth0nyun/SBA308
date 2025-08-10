# First Steps 

- Start with array called learnerIds to store unique IDs.
- Loop through every submission in the LearnerSubmissions list. (reminder that each submission is an individual learners data for that submission)
- Get the learner’s ID from each submission and store as variable currentId
- Check if this ID is already in learnerIds by running second loop. if found/true code stops.
- If the ID is not found/false, add it to learnerIds. this is so there isnt any duplicate IDs stored.

# Second Steps 
-  Check if the AssignmentGroup actually belongs to the course by comparing course_id to CourseInfo.id and throw an error if they don’t match.
- Create a loop through assignments in AssignmentGroup to find one that matches current submissions assignment_id
- Store result in assignmentInfo and use for later info


