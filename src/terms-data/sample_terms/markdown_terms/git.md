# Git

#### git | config
:p Setup the username and email for git

??x git config --global user.name "John Doe"
git config --global user.email ??

#### Checking the difference between Stagging and Dif
Getting the difference and the stage:
git diff 
git diff --staged

:p What's the differece between Stagging and Diff

??x Stagging is the area where you add the files you want to commit, Diff is the area where you can see the changes you made to the files ??

#### Switching branches
switch to another branch and check it out into your working directory

:p Swithc into branch hello-world

??x git checkout hello-world ??

#### Logging git history
git log is a command that shows the commit history for the currently active branch

:p Show the commit history for the currently active branch

??x git log ??

#### git -f | force
Look at the attachment

:p Write the commands to go from blue to red.

??x git branch -f main C6
git checkout HEAD~1
git branch -f bugFix HEAD~1 ??

#### git | reset + revert
git reset reverses changes by moving a branch reference backwards in time to an older commit. In this sense you can think of it as "rewriting history;" git reset will move a branch backwards as if the commit had never been made in the first place.

While resetting works great for local branches on your own machine, its method of "rewriting history" doesn't work for remote branches that others are using.

:p Write the commands to go from blue to red.

??x git reset HEAD~1
git checkout pushed
git revert HEAD ??

#### git | cherry pick
It's a very straightforward way of saying that you would like to copy a series of commits below your current location (HEAD). I personally love cherry-pick because there is very little magic involved and it's easy to understand.

:p Write the commands to go from blue to red.

??x git cherry-pick C3 C4 C7 ??

#### git | rebase
We can use interactive rebasing for this -- it's the best way to review a series of commits you're about to rebase.

:p Rebase from 4 commits ago

??x git rebase -i HEAD~4 ??

#### git | rebase from a branch
:p Complete from blue to red, start from rebase into branch C4

??x git rebase -i main C4
git rebase bugFix main ??

#### git | juggling commits
:p Complete from blue to red, start from rebase into branch C4

??x git rebase -i HEAD~2
git commit --ammend
git rebase -i HEAD~2
git rebase caption main ??

#### git | tags
If that's the case, you may be wondering if there's a way to permanently mark historical points in your project's history. For things like major releases and big merges, is there any way to mark these commits with something more permanent than a branch?

:p Make the tags and movements to go from blue to red

??x git tag v0 C1
git tag v1 C2
checkout v1 ??

#### git | rebase efficient
rebasing will pick all the commits that were not applied to the first argumented branch

:p Make the tcommand executions until you get to the red

??x git rebase main bugFix
git rebase bugFix side
git rebase side another
git rebase another main ??

#### git | branch on location
:p Create a branch on the C2 Location

??x git branch bugWork HEAD~^2^ ??

#### git | get the remote url
:p Get the remote origin url

??x git config --get remote.origin.url ??

#### git | set to a new remote url
:p Set the remote origin url to URL

??x git remote set-url origin URL ??