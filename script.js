// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
   
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error("AssignmentGroup does not belong to this course.");
    }

    var results = [];
    var now = new Date();

    
    for (var i = 0; i < LearnerSubmissions.length; i++) {
        var sub = LearnerSubmissions[i];

        // Find or create the learner's row in results
        var row = null;
        for (var r = 0; r < results.length; r++) {
            if (results[r].id === sub.learner_id) {
                row = results[r];
                break;
            }
        }
        if (row === null) {
            row = { id: sub.learner_id, avg: 0, totalEarned: 0, totalPossible: 0 };
            results.push(row);
        }

        // Find the matching assignment details
        var a = null;
        for (var j = 0; j < AssignmentGroup.assignments.length; j++) {
            if (AssignmentGroup.assignments[j].id === sub.assignment_id) {
                a = AssignmentGroup.assignments[j];
                break;
            }
        }
        if (!a) continue;

        // Skip assignments that are not due yet
        var dueDate = new Date(a.due_at);
        if (dueDate > now) continue;

        // Get points and score; skip bad data
        var pointsPossible = a.points_possible;
        if (typeof pointsPossible !== "number" || pointsPossible <= 0) continue;

        if (!sub.submission) continue;
        var score = sub.submission.score;
        if (typeof score !== "number") continue;

        // Apply late penalty: minus 10% of pointsPossible if submitted after due date
        var submittedAt = new Date(sub.submission.submitted_at);
        if (submittedAt > dueDate) {
            score = score - (pointsPossible * 0.10);
            if (score < 0) score = 0;
        }

        // Save this assignment's percentage and update totals
        row[a.id] = score / pointsPossible; 
        row.totalEarned += score;
        row.totalPossible += pointsPossible;
    }

    // Averages for each learner
    for (var k = 0; k < results.length; k++) {
        var learner = results[k];
        if (learner.totalPossible > 0) {
            learner.avg = learner.totalEarned / learner.totalPossible;
        } else {
            learner.avg = 0;
        }
        delete learner.totalEarned;
        delete learner.totalPossible;
    }

    return results;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
