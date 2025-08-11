# First Steps 

- Make an empty list called learnerIds to store only unique learner IDs.
- Go through each submission in LearnerSubmissions, get its learner_id, and check if it’s already in the list.
- If the ID isn’t found, add it to learnerIds so there are no duplicates.

# Second Steps 
-  Check if the AssignmentGroup actually belongs to the course by comparing course_id to CourseInfo.id and throw an error if they don’t match.
- Create an empty results array to hold each learner’s data.
- Save the current date/time in 'now' to filter out assignments that arent due yet.
- Go through each submission; find or create that learner’s record in results.
- Find the matching assignment; if it’s missing or not due yet, skip this submission.
- Check numbers: points_possible must be > 0 and score must be a number; otherwise skip.
- If late, subtract 10% of points_possible from the score (don’t go below 0).
- Save the percentage (score / points_possible) on the learner’s record and update totals for average later.

# Third Steps
- Go through each learner in results.
- If totalPossible > 0, set avg = totalEarned / totalPossible; otherwise set avg = 0.
- Remove the temporary fields totalEarned and totalPossible to keep the output clean.
- Return the results array.
- Each learner now has: id, overall avg (0–1), and one key per assignment ID with its percentage (0–1).

# Reflection

## What could you have done differently during the planning stages of your project to make the execution easier?

- I’d start by writing a short list of rules and the exact output I wanted, so there’s no guessing or winging it later. I’d sketch what each object looks like and plan simple lookup tables, so I don’t waste time searching in loops. I’d decide tricky cases up front—like late work, bad numbers, or future assignments—and write down what to do for each. I’d outline the steps in plain pseudocode and make a tiny test set to check on-time, late, zero points, and bad data. Then I’d plan build in small pieces from the start (for example learners -> scoring -> averages) 

## Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?

- Comparing dates for “late” and “not yet due”. Handling bad data (missing scores, non-numbers, points_possible <= 0) without breaking the average. Matching each submission to its assignment using only loops (no lookup table), which led to nested loops. Keeping the weighted average and output format consistent (0–1 values, rounding, cleaning temp fields).



 


