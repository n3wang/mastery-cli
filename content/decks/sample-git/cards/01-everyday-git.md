# Everyday Git

#### The Three Trees
Git moves changes between the working tree, the index (staging area), and HEAD.
?p: What sits between your edited file and the last commit?
?x
The index. `git add` copies from the working tree into the index; `git commit`
turns the index into a new commit.

#### git add -p
Stages selected hunks rather than whole files.
?p: You fixed a bug and reformatted the file in one sitting. How do you commit only the fix?
?x
`git add -p` — step through each hunk and stage just the ones belonging to the
fix, leaving the formatting for a separate commit.

#### Detached HEAD
HEAD points straight at a commit instead of at a branch.
?p: You checked out a commit hash directly and committed. Where did that commit go?
??x
Onto no branch. HEAD advanced but no branch reference moved, so the commit is
reachable only by its hash and will eventually be garbage collected.

`git switch -c <name>` before or after committing gives it a branch to live on;
`git reflog` finds the hash if you already moved away.
x??

#### git revert vs git reset
Both undo, in opposite directions.
?p: Which one is safe on a branch other people have pulled, and why?
?x
`git revert`. It records a new commit undoing the change, so history everyone
already has stays intact. `git reset` rewrites history and forces everyone else
to reconcile.

#### Fast-Forward Merge
Merging when the target branch has not diverged.
?p: Why does a fast-forward merge produce no merge commit?
?x
There is nothing to reconcile — the branch pointer just slides forward to the
newer commit, since all of its history already contains the target.

#### git stash
Parks uncommitted work without committing it.
?p: What does `git stash` do that `git commit --amend` cannot?
?x
It sets work aside without putting it in history at all, so you can switch
branches cleanly and reapply later with `git stash pop`.
