# Regex

#### Wildcard .
The dot .Similarly, there is the concept of a wildcard, which is represented by the . (dot) metacharacter, and can match any single character (letter, digit, whitespace, everything).

:p Match the following:
cat.
896.
?=+.
Skip: abc1

??x ...\\. ??

#### Character class []
The character class [ ] matches only one out of several characters placed inside the square brackets.

:p Match the following:
can
man
fan
Skip: dan, ran, pan

??x [cmf]an ??

#### Negated character class [^ ]
The negated character class [^ ] matches any character that is NOT inside the square brackets.

:p Match the following:
hog
dog
Skip: bog

??x [^b]og ??

#### Range []
The range [A-Za-z0-9] matches any character between 'A' and 'Z', lower case letters between 'a' and 'z' and digits between '0' and '9'.

:p Match the following:
Ana
Bob
Cpc
Skip: aax, bby, ccz

??x [A-Z].. ??

#### Quantifier {m,n}
The quantifier {m,n} where m is the minimum times and n is the maximum times.

:p Match the following:
wazzzzzup
wazzzup
skip: wazup

??x waz{3,5}up ??

#### Quantifier +*
The quantifier + where the character before it can appear once or more.

:p Match the following:
aaaabcc
aabbbbc
acc
skip: a

??x a+b*c+ ??

#### Characters Optional
The quantifier + where the character before it can appear once or more.

:p Match the following:
1 file found?
2 files found?
24 files found?
skip: No files found.

??x \\d+ files? found\\? ??

#### Characters Optional | whitespace
The quantifier + where the character before it can appear once or more.

:p Match the following:
1.   abc
2.	abc
3.           abc
skip: 4.abc

??x \\d\\.\\s+abc ??

#### Start and End Matching
One way to tighten our patterns is to define a pattern that describes both the start and the end of the line using the special ^ (hat) and $ (dollar sign) metacharacters. In the example above, we can use the pattern ^success to match only a line that begins with the word "success", 

:p Match the following:
Mission: successful
Last Mission: unsuccessful
Next Mission: successful upon capture of target

??x ^Mission: successful$ ??

#### Capture Groups | Filenames
Regular expressions allow us to not just match text but also to extract information for further processing. This is done by defining groups of characters and capturing them using the special parentheses ( and ) metacharacters. Any subpattern inside a pair of parentheses will be captured as a group.

:p Match the filename of the following files:
file_record_transcript.pdf
file_07241999.pdf
skip: testfile_fake.pdf.tmp

??x ^(file.+)\\.pdf$ ??

#### Capture Groups | Nested
 Generally, the results of the captured groups are in the order in which they are defined (in order by open parenthesis).

:p Math the Month with the Year and also the Year
Jan 1987 => [Jan 1987, 1987]
May 1969 => [May 1969, 1969]
Aug 2011 => [Aug 2011, 2011]

??x (\\w+ (\\d+)) ??

#### Capture Groups | Multiple
 Generally, the results of the captured groups are in the order in which they are defined (in order by open parenthesis).

:p Match the groups: 
1280x720 => [1280, 720]
1920x1600 => [1920, 1600]
1024x768 => [1024, 768]

??x (\\d+)x(\\d+) ??

#### Alternation | regex
The alternation metacharacter | matches either the characters before or after it. We can use it inside a character class [ ] as well.

:p Match the following:
I love cats
I love dogs
skip: I love logs, I love cogs

??x I love (cats|dogs) ??