# **Table of Contents** {#table-of-contents .TOC-Heading}

[Final Version of ERD [4](#final-version-of-erd)](#final-version-of-erd)

[Final DFD -- Context Level
[5](#final-dfd-context-level)](#final-dfd-context-level)

[Final DFD -- Level 0 [6](#final-dfd-level-0)](#final-dfd-level-0)

[Final DFD -- Level 1 [7](#final-dfd-level-1)](#final-dfd-level-1)

[User Roles [8](#user-roles)](#user-roles)

[Student Role [8](#student-role)](#student-role)

[Faculty Role [8](#faculty-role)](#faculty-role)

[Admin Role [8](#admin-role)](#admin-role)

[Login View [9](#login-view)](#login-view)

[Login Page Validations
[10](#login-page-validations)](#login-page-validations)

[Sample Login Demonstration (Admin Role)
[11](#sample-login-demonstration-admin-role)](#sample-login-demonstration-admin-role)

[Student View [13](#student-view)](#student-view)

[New Student Registration
[13](#new-student-registration)](#new-student-registration)

[Student Profile Page
[15](#student-profile-page)](#student-profile-page)

[Course Enrollments Page
[16](#course-enrollments-page)](#course-enrollments-page)

[Page Validations [17](#page-validations)](#page-validations)

[Course Enrollment Process
[18](#course-enrollment-process)](#course-enrollment-process)

[Student Courses Page
[23](#student-courses-page)](#student-courses-page)

[Course Announcements
[24](#course-announcements)](#course-announcements)

[Course Contents [25](#course-contents)](#course-contents)

[Course Assignments [33](#course-assignments)](#course-assignments)

[Course Grades [35](#course-grades)](#course-grades)

[Calendar Page [35](#calendar-page)](#calendar-page)

[Faculty View [37](#faculty-view)](#faculty-view)

[Faculty Profile [37](#faculty-profile)](#faculty-profile)

[Faculty Courses [38](#faculty-courses)](#faculty-courses)

[Course Announcement [38](#course-announcement)](#course-announcement)

[Course Content management
[40](#course-content-management)](#course-content-management)

[Assignment Submissions
[49](#assignment-submissions)](#assignment-submissions)

[Course Grades Page [53](#course-grades-page)](#course-grades-page)

[Admin View [55](#admin-view)](#admin-view)

[Charts Dashboard [55](#charts-dashboard)](#charts-dashboard)

[Percentage of students completing courses over time - Line chart:
[55](#percentage-of-students-completing-courses-over-time---line-chart)](#percentage-of-students-completing-courses-over-time---line-chart)

[New Students Enrolled or Registered by Semester -- Bar Chart:
[55](#new-students-enrolled-or-registered-by-semester-bar-chart)](#new-students-enrolled-or-registered-by-semester-bar-chart)

[Bar Chart Showing Most Enrolled Courses by Semester:
[56](#bar-chart-showing-most-enrolled-courses-by-semester)](#bar-chart-showing-most-enrolled-courses-by-semester)

[Pie Chart Showing Student Strength by Programs
[56](#pie-chart-showing-student-strength-by-programs)](#pie-chart-showing-student-strength-by-programs)

[Course dashboard [56](#course-dashboard)](#course-dashboard)

[Add New Course [57](#add-new-course)](#add-new-course)

[Edit a course [58](#edit-a-course)](#edit-a-course)

[Delete a course [58](#delete-a-course)](#delete-a-course)

[Add New teaching section
[60](#add-new-teaching-section)](#add-new-teaching-section)

[Edit a teaching section
[64](#edit-a-teaching-section)](#edit-a-teaching-section)

[Program Dashboard [64](#program-dashboard)](#program-dashboard)

[Add new program [65](#add-new-program)](#add-new-program)

[Edit a program [66](#edit-a-program)](#edit-a-program)

[Delete a program [66](#delete-a-program)](#delete-a-program)

[Faculty Dashboard [67](#faculty-dashboard)](#faculty-dashboard)

[Add new faculty [68](#add-new-faculty)](#add-new-faculty)

[Edit a faculty [68](#edit-a-faculty)](#edit-a-faculty)

[Remove faculty [69](#remove-faculty)](#remove-faculty)

[Semester End Audit [70](#semester-end-audit)](#semester-end-audit)

[Semester end overview
[70](#semester-end-overview)](#semester-end-overview)

[Post section grades (faculty view)
[73](#post-section-grades-faculty-view)](#post-section-grades-faculty-view)

[Close current semester
[77](#close-current-semester)](#close-current-semester)

[Future Scope [82](#future-scope)](#future-scope)

**[\
]{.underline}**

# Final Version of ERD {#final-version-of-erd .MyCustomHeading1}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image1.png){width="6.5in"
height="4.38125in"}

**\
**

# Final DFD -- Context Level {#final-dfd-context-level .MyCustomHeading1}

#  {#section .MyCustomHeading1}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image3.png){width="6.5in"
height="4.696527777777778in"}

# Final DFD -- Level 0 {#final-dfd-level-0 .MyCustomHeading1}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image5.png){width="6.78971675415573in"
height="5.191666666666666in"}

# Final DFD -- Level 1 {#final-dfd-level-1 .MyCustomHeading1}

#  {#section-1 .MyCustomHeading1}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image7.png){width="6.5in"
height="4.2034722222222225in"}

# User Roles {#user-roles .MyCustomHeading1}

## Student Role  {#student-role .MyCustomHeading2}

-   Students are users in the system with the necessary permissions to
    register through the system.

-   They can enroll for a course and access the course information
    posted by the respective faculty members.

-   They can submit assignments and access faculty provided feedback for
    their learning purpose.

-   All their grades and CGPA are calculated automatically at the end of
    the semester by the system.

## Faculty Role {#faculty-role .MyCustomHeading2}

-   Faculty are the users in the system with the necessary permissions
    to teach courses to the student users.

-   Faculty members are added to the system by the administration team
    after they receive a list of qualified faculty members from the HR
    department of the university.

-   Faculty users can be assigned teaching sections by the
    administrators of specific departments to instruct the students.

## Admin Role {#admin-role .MyCustomHeading2}

-   Admin users are supervised users who can access all the system's
    information and can read or write them with necessary permissions.

-   Admins can add other admins and faculty. They can edit or delete all
    the information of different users.

-   Admins can run reports like semester enrollment reports and can
    process end-of-semester audits in the system.

**\
**

# Login View {#login-view .MyCustomHeading1}

The login page is commonly used for all the roles of users. Based on the
credentials users provide on this page, the system will determine the
role of the user by checking the email address in the database.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image9.png){width="6.5in"
height="3.421527777777778in"}

Login Page View

**\
**

## Login Page Validations {#login-page-validations .MyCustomHeading2}

The login page has essential validations to prevent faulty data from
being entered into the system.

![A screenshot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image10.png){width="3.0190463692038496in"
height="3.6076662292213473in"}

No email or password validation

![A screenshot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image11.png){width="2.886527777777778in"
height="3.518151793525809in"}

Not found email address validation

![A screenshot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image12.png){width="2.9257567804024496in"
height="3.577344706911636in"}

Incorrect password validation

## Sample Login Demonstration (Admin Role) {#sample-login-demonstration-admin-role .MyCustomHeading2}

##  {#section-2 .MyCustomHeading2}

![A screenshot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image13.png){width="6.5in"
height="3.158333333333333in"}

Admin login information

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image14.png){width="6.5in"
height="3.1645833333333333in"}

Admin view after successful login (for demonstration) & Main Dashboard
View

# Student View {#student-view .MyCustomHeading1}

## New Student Registration {#new-student-registration .MyCustomHeading2}

![A screen shot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image15.png){width="2.9012379702537183in"
height="3.354928915135608in"}

Option for new student registration

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image16.png){width="6.716345144356955in"
height="4.019417104111986in"}

New student registration view

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image17.png){width="5.192239720034996in"
height="3.7332852143482063in"}

Page validations

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image18.png){width="4.588955599300087in"
height="3.6639402887139108in"}

New Student Registration Information

![A computer screen shot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image19.png){width="6.533333333333333in"
height="3.2666666666666666in"}

Successful registration feedback

## Student Profile Page {#student-profile-page .MyCustomHeading2}

Once the user registered, the system will bring the user to the login
page to login using their credentials.

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image20.jpeg){width="6.5in"
height="3.1562576552930883in"}

Student Profile View

## Course Enrollments Page {#course-enrollments-page .MyCustomHeading2}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image21.png){width="6.499997812773404in"
height="3.0593219597550307in"}Course Registration / Enrollments Page

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image22.png){width="6.499984689413823in"
height="3.0932206911636047in"}Current Semester and Future Enrollments

### Page Validations {#page-validations .MyCustomHeading3}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image23.png){width="6.5in"
height="3.16667760279965in"}Course Search form validations

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image24.png){width="6.5in"
height="3.1666666666666665in"}

No search results message view

Fall 2024, the current semester, has no teaching sections under the
Business Information Systems Department.

Refer the section 'Admin View \>\> Course Dashboard', in the table of
contents to know how an administrator creates a teaching section.

**[\
]{.underline}**

### Course Enrollment Process {#course-enrollment-process .MyCustomHeading3}

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image25.png){width="6.5in"
height="3.471097987751531in"}

Refreshing the page or by searching again, will fetch the newly added
teaching section following the search criteria.

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image26.png){width="6.5in"
height="3.471097987751531in"}

Enrollment view after enrolling a teaching section

Once the student clicks on 'Enroll' button, the course will be enrolled.
The drop or enroll option will be allowed until the Enroll/Drop deadline
is passed.

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image27.png){width="6.430579615048119in"
height="3.4826509186351706in"}

Current and future enrollments view after enrolling a course

All the enrolled courses will be shown in Current and Future Enrollments
tab grouped by semesters.

Let us add few more enrollments for this student.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image28.jpeg){width="6.5in"
height="3.479673009623797in"}

Enrollment limit feedback

**Business rule 1:** for Horizon University: Students can only enroll
for a maximum of 3 courses for a semester. If a student tries to enroll
beyond this limit, an error will be shown to students.

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image29.png){width="6.5in"
height="3.459507874015748in"}However student can change the term to
Spring 2025 to see if any other courses available.

Since this student has already enrolled for all three courses that are
on the top, they aren\'t enabled for enrollment, but they have an option
to retake the course (Request option), which is not implemented as it
will be considered as future scope. However, he can enroll for the
following three courses for Spring 2025.

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image30.png){width="6.5in"
height="3.4479166666666665in"}Current and future enrollments view

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image31.png){width="6.5in"
height="3.4895833333333335in"}

Current and future enrollments view after drop or enrollment deadline is
passed

**Business rule 2:** Once the drop deadline is passed the enrollments
cannot be added or dropped

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image32.png){width="6.5in"
height="3.471725721784777in"}

Course search view after enrollment or drop deadline is passed

If a new student enrolls (Jane, In this example) at this point where the
enrollment / drop deadline ends, they can view the teaching sections but
cannot enroll for them as shown in the picture below. Again, the request
option is just there as a placeholder to show its future purpose.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image33.png){width="6.5in"
height="3.477678258967629in"}

Request a course feedback

## Student Courses Page {#student-courses-page .MyCustomHeading2}

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image34.png){width="6.5in"
height="3.477678258967629in"}

Student Courses View

Let us go back to the student mahesh@gmail.com. Under the 'Courses' tab,
they can view all the enrolled courses for the current semester. If
there are any previous terms that they had, all those completed terms
will be listed down as shown in the account below (under student Emily,
student306@gmail.com).

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image35.png){width="6.5in"
height="3.471725721784777in"}

Courses page view for previous semester terms

Going back to the student account \`mahesh@gmail.com\`, for the
demonstration of course teaching page. The course page has 4 different
tabs for students:

1.  Announcements

2.  Content

3.  Assignments

4.  Grades

### Course Announcements  {#course-announcements .MyCustomHeading3}

Once a faculty posts an announcement, students can view them under this
tab. Currently, for this teaching section, the faculty had already
posted a welcome announcement.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image36.png){width="6.5in"
height="3.65625in"}course announcements page

### Course Contents  {#course-contents .MyCustomHeading3}

Under this tab, students can view all the course content posted by the
instructor.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image37.png){width="6.5in"
height="3.65625in"}

Course Content Page

There are five different content types for a course. Those are as
follows:

1.  Text

2.  Folder

3.  URL Link with a text

4.  File

5.  Assignment

**1. Text:** Any content that has a text file icon as highlighted in the
below image is a text content. By default, the content is sliced to show
only a portion of it to save space. It can be clickable to open in a
separate page to view its information in detailed.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image38.png){width="6.5in"
height="3.4805555555555556in"}

Text type content (Not opened)

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image39.png){width="6.5in"
height="3.65625in"}

Text Type content (Opened)

A back button is provided to navigate back into its previous directory
or the user can be able to click the breadcrumbs (Courses
\>\> BIS-1 Information Systems \[CR 3\] (Section: 4521) \>\> Course
Syllabus) on top to go directly into that directory.

**2. Folder:** Any folder that has a folder icon as highlighted in the
image below is folder content. A folder can accommodate any type of
course content (i.e. Text, another Folder, URL Link content, or a File)
and can be nestable. Assume it as a folder in our computer, we can
create N number of folders or files in it. Folders can be nested meaning
they can go to N number of levels by nesting folders inside them. Thanks
to a self-referencing table \`Course_content\` to achieve this behavior.

The table Course_content schema is given below:

![A screenshot of a computer program Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image40.png){width="6.5in"
height="3.6881944444444446in"}

course_content table schema

In an up-opened form, the folder slices the text information inside it
to save space. It can be clickable to open in a separate page to view
all the information inside it.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image41.png){width="6.5in"
height="3.277083333333333in"}

Folder type content (Not opened)

![A computer screen shot of a computer screen Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image42.png){width="6.5in"
height="3.65625in"}

Folder type content (Opened)

For this demonstration, the folder Week 1, has some text showing on top
of the page and any other content inside it will be showed under the
text.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image43.png){width="6.5in"
height="3.65625in"}

Nested folder (Assignments) inside a parent folder (Week 1)

**3. URL Link with a text:** Any content with a link icon as shown in
the below image is a URL Link content. The title hosts an external
website's URL to open in a new browser tab. It cannot be opened in a new
page to view its text information. So, the application has necessary
validations while creating this content to ensure that the text
information met the length constraints.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image44.png){width="6.5in"
height="3.4604166666666667in"}

URL Link content

**4. File Content**: A content which has a pdf icon as shown in the
image below is either file content or an assignment. File content can be
distinguished from assignment as it don't contain any deadline
information like an assignment. File contents are generally designed to
host a file and some text information about the contents of the file.
Users can download the files attached in this content. Current
limitations are it can host a single file and some text. The feature
multiple file hosting in this content is taken as a future scope.

File contents can be opened to view their text information in full as
well as its files.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image45.png){width="6.5in"
height="3.472916666666667in"}

File content (un-opened view)

![A computer screen shot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image46.png){width="6.5in"
height="3.4895833333333335in"}

File content (opened view)

**5. Assignment Content:** Any content that has a pdf icon and a due
date as shown in the image below is an Assignment Content.

Assume the assignment content is a superset of file content. It has all
the features of a file content and additionally, it has its own set of
data such as deadline (A date and time), number of attempts, maximum
assignment score, faculty posted instruction files and text, student
posted submission files and text and faculty uploaded feedback files or
text. It can be clickable to open a new page where students can submit
the assignment, and faculty can grade them further.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image47.png){width="6.5in"
height="3.484027777777778in"}

Assignment content(un-opened)

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image48.png){width="6.5in"
height="3.4625in"}

Assignment content (opened)

### Course Assignments  {#course-assignments .MyCustomHeading3}

Students can find all the assignments posted under this tab. They might
be originally posted in any folder level or main content level. This tab
helps students to find the assignments all in one place.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image49.png){width="6.5in"
height="3.65625in"}

Course Assignments page

Students can navigate to assignments tab to quickly find all the
assignments or to their respective parent content such as assignment
folder (in our example) to submit an assignment.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image50.png){width="6.5in"
height="3.4819444444444443in"}

Assignment submission view

Once the student submits an assignment, it will show the following
message, and the status of the submission is shown as tick icon on the
corresponding assignment.

![A computer screen shot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image51.png){width="6.5in"
height="3.4592793088363956in"}

Successful submission

### Course Grades {#course-grades .MyCustomHeading3}

The grades tab contains the detailed status of all the assignments. The
information such as assignment name, due date, status of the assignment,
grade received, and faculty provided feedback (if any).

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image52.png){width="6.5in"
height="3.4833333333333334in"}

Grades tab view

## Calendar Page {#calendar-page .MyCustomHeading2}

The calendar module embedded in the student portal is an external
website (<https://calender-app-v2.web.app/>) developed by one of the
team members of this project. The website has equipped necessary
validations and security that can be embedded into the Horizon
University's portal by leveraging the use of an iframe. Iframe is a
browser's API that allows us to embed external applications into the
parent application (Horizon university portal). The communication
between this calendar module and University portal is established
through \`postMessage\` API which is a web browser's built-in API.

This calendar module helps students to track all their assignments of
all the courses they have enrolled in. If a student has any deadline for
any course that he enrolls in, the calendar module will show all those
assignments of that course in the respective calendar dates shown in the
below image. Anything that is showing up in this calendar date's cell
will be termed as 'event'. The image below shows up all assignment
events that the student had for BIS-1 course. The calendar right side
pane will show all the events of that date since the date-cell cannot
accommodate more than 3 events in it. But it will show ellipses (3 dots)
when they overflow to represent that the date has more events underlying
it. Users can click these date-cells to view all those events in the
events pane.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image53.png){width="6.5in"
height="3.4180555555555556in"}

Calendar module

Users can click an event to view its information more. Below image
showing up the BIS-1 course's assignment \`Draw Process Flowchart\`.
This tab has a few limitations that it can show only the course code,
assignment name, due date and assignment instructions. More features
like showing up the attempt count left, grade received, submitting the
assignment there itself or navigating to the respective assignment
submission page are taken into consideration in future scope.

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image54.png){width="6.5in"
height="3.4604166666666667in"}

Calendar assignment event (opened)

# Faculty View {#faculty-view .MyCustomHeading1}

Now that a student submits an assignment, let us quickly navigate into a
faculty portal to see how the course module looks and how they can grade
the students.

## Faculty Profile {#faculty-profile .MyCustomHeading2}

To demonstrate the course teaching process such as posting course
content, assignments, grading we need to look at the faculty portal. Let
us login as faculty emil@gmail.com:

![A screenshot of a login page Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image55.png){width="2.6065780839895014in"
height="3.1166819772528433in"}

Faculty login information

![A computer screen shot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image56.png){width="6.5in"
height="3.4155468066491688in"}

Successful faculty login

## Faculty Courses {#faculty-courses .MyCustomHeading2}

Faculty portal is made simple with only a profile, courses and calendar
options. Let us view the faculty courses tab:

![](vertopal_b44d5e8a60a345058419deba999a47dc/media/image57.png){width="6.5in"
height="3.426246719160105in"}

Faculty courses view

All the current and coming up courses they have taken are shown on this
page grouped by semester. The teaching section 4521 for BIS-1
Information system shows total enrollment count as '1 / 10'. The student
\`mahesh@gmail.com\` is the only enrolled student as of now out of 10
seats.

There are 5 tabs for faculty's course module. They are as follows:

1.  Announcements

2.  Content

3.  Assignments

4.  Assignment Submissions

5.  Grades

### Course Announcement {#course-announcement .MyCustomHeading3}

Tabs 1, 2, 3 look alike for students or faculty but faculty can post the
announcements, post the teaching content and assignments and can grade
them. In this example, the faculty, emil, has already posted a welcome
announcement for their students.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image58.png){width="6.5in"
height="3.472916666666667in"}

Faculty Announcements view

Faculty can add an announcement by clicking on the 'New Announcement'
Button under the announcement tab. They can add a announcement subject
and message as shown in the image below:\
![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image59.png){width="6.5in"
height="3.4659722222222222in"}

Faculty new announcement view

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image60.png){width="6.393151793525809in"
height="3.5961482939632545in"}

Faculty view for successful announcement post

### Course Content management {#course-content-management .MyCustomHeading3}

Faculty have privilege to edit or delete any course content such as
Text, Folder, URL Link content, File and Assignment content. The 'Add
New' dropdown button under the content tab can be useful to add any
course content or assignments. 'Options' dropdown button can be useful
to edit or delete any course content or assignments.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image61.png){width="6.311875546806649in"
height="3.376136264216973in"}

Course content view

Faculty can add course content by clicking on the 'Course Content'
button under the 'Add New' dropdown button as shown in the image below.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image62.png){width="4.634564741907262in"
height="1.4166021434820648in"}

Add New Course Content option for faculty

Faculty can add any type of content as we described earlier using this
view except assignments. They can choose a content type from the
dropdown.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image63.png){width="6.5in"
height="3.4805555555555556in"}

Add New course content view

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image64.png){width="1.5842924321959755in"
height="1.859663167104112in"}

Choose content type option

Text and Folder content share the same form structure but the only
difference is folders can act as containers to other types of content as
we discussed earlier. URL link content has an extra column 'Title URL'
that will display dynamically (as shown in the image below) when the
user selects the 'Text with title URL' option from the drop-down.

![A screenshot of a course content Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image65.png){width="3.3003729221347333in"
height="2.699886264216973in"}

URL link content view

File content can be added by selecting the file option from the
drop-down. The respective file picker input will show up dynamically (as
shown in the image below) when the user selects this option.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image66.png){width="3.380686789151356in"
height="2.9630424321959756in"}

Add File content view

Let us add a folder content in the main level with some dummy
information. By default, user can add a text for the folder creation.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image67.png){width="6.5in"
height="3.1618055555555555in"}

Adding course folder content information

Users can add nested contents into the folder by selecting it once upon
successful creation. The newly created folder will be shown under all
other contents as shown in the image below:

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image68.png){width="6.5in"
height="3.4895833333333335in"}

Successful content creation view

If the content that is opened is a folder type, the 'Add New' drop-down
button will be displayed just like in the main content level. For all
other content types, this feature would not be there as they are not
nestable content type like a folder. In this example, the newly added
folder 'Week 3' has only text information for now. Faculty can now add
any type of content or assignment in it.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image69.png){width="6.5in"
height="2.7948720472440947in"}

Newly created folder content view

Faculty can edit or delete the content by going into its main directory
(but not in its open view). Any further improvements in this logic such
as editing the content or deleting it when it is in open view are
considered for future scope.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image70.png){width="5.985701006124234in"
height="1.584676290463692in"}

Content Edit option

Content Edit View

Let us update the title to 'Week 3: Data Analytics' and save the
content.

Content Edit Feedback view

Faculty can delete the content by selecting the respective option in the
'Options' drop-down menu.

![A white background with black and white clouds Description
automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image71.png){width="6.5in"
height="0.9298611111111111in"}

Content delete option view

Before deleting any content, there are some things to note that if a
folder is deleted all its nested contents (of any type described
earlier) and its text data are permanently deleted, and this process is
irreversible. The concept of soft deletion will be considered in future.
Thanks to the cascading effect of MySQL table schema, if any folder
content is deleted, all other contents that are nested inside it will be
deleted effortlessly.

Content delete prompt

Now, if the folder is deleted, it no longer exists in the system and the
page will be refreshed accordingly (as shown in the image below).

Successful content deletion view

Let us now focus on how a faculty creates an assignment. Users can add
an assignment in any directory as they wish. For the sake of
demonstration, let us choose an existing folder 'Week 2 \>\>
Assignments'. User can select the 'Course Assignment' button under 'Add
New' dropdown to add an assignment into that folder.

Create Assignment option view

Add Assignment View

By default, the time input will be filled with '23:59:59' as a military
time and this is because most of the assignments are created for end of
the day due. Let us add a test assignment named 'Individual Effort
Evaluation' with some test data.

Add assignment view (sample information)

After hitting 'Add Content' the newly created assignment will be shown
in the respective folder as shown in the image below.

Assignment created feedback

The editing of course assignment is straightforward as other content
types.

The only drawback in this content management page is that users have no
choice on the content order. This will be considered for future and the
potential solution will consists of a draggable option on the content to
re-arrange them.

### Assignment Submissions  {#assignment-submissions .MyCustomHeading3}

This is a feature tab solely for faculty where all the students
submitted assignments will be displayed (as shown in the image below).
Currently, only one student (mahesh@gmail.com) is submitted the
'assignment1' as shown earlier. The table will show the student
information, assignment information, submission information, grading
status, and score. submissions that are on-time are highlighted in green
with 'On Time' text whereas late submissions are highlighted in red with
\'Late' text. Student scores will be displayed once the grade is posted
by faculty else 'Not Graded' will be displayed.

![A screenshot of a computer Description automatically
generated](vertopal_b44d5e8a60a345058419deba999a47dc/media/image72.png){width="6.5in"
height="2.0320516185476816in"}

Assignment submissions tab view

Faculty can filter through various assignments by selecting an
assignment in the search options provided. They can filter through the
assignment status as well or by searching student name.

Assignments that were posted for that teaching section will be displayed
(as shown in the image below) to filter through the submissions.

Assignment filter view

Assignment status filter view

Search bar will be used to search by student name, email address, or
assignment name. Search will be made along with other filters through
AND logic.

Assignment submission search

Faculty can select any submitted assignments by students to grade them.
Let us select the only submitted assignment to grade that submission.

Selecting the submitted assignment

Assignment grading view for faculty

Users can collapse or expand the submission details, faculty grading
(only visible to faculty to post the grades and feedback) and assignment
instructions.

Assignment page (information collapsed view)

Let us grade this student submission by inputting some test information.

Faculty Grading and Feedback view

After posting the grade and feedback, the assignment page will be closed
and navigated back to the submissions page where the updated information
(student grade) will be displayed.

Successful Grading

If the faculty already graded an assignment and opened it again, the
respective grade score, feedback written or any files uploaded for
feedback will be displayed as showed in the picture below. This screen
will be same both for faculty and students.

Graded Assignment View (for faculty and students)

### Course Grades Page  {#course-grades-page .MyCustomHeading3}

This tab shows the detailed status of the submissions and assignments
status. A class average will also be shown to give some insights to
faculty about the student performance. If at least one student receives
a grade the class average will be displayed for that assignment as shown
in the image below.

Faculty grades tab view

Let us add few more enrollments to this course for the demonstration.

Assignment submission's view

Faculty grades tab

# Admin View {#admin-view .MyCustomHeading1}

Administrator (Admin) users have access to all the other users
(students, faculty), all the courses, teaching sections, programs, and
other administrators.

Admin Portal View

## Charts Dashboard {#charts-dashboard .MyCustomHeading2}

Dashboard has integrated with better insights with visualizations for
admins such as:

### Percentage of students completing courses over time - Line chart: {#percentage-of-students-completing-courses-over-time---line-chart .MyCustomHeading3}

1.  This visualization shows the percentage of students who successfully
    completed their courses across different semesters.

2.  Each line represents a specific course or program, and the y-axis
    displays the percentage of students completing the course, while the
    x-axis represents semesters over time.

**How It Helps Admins:**

-   Identify trends in course completion rates and spot declining or
    improving courses.

-   Determine in which courses students are struggling to succeed and
    which need improvement.

-   If a course has consistently low completion rates, it may require
    additional resources, better faculty support, or curriculum
    redesign.

### New Students Enrolled or Registered by Semester -- Bar Chart: {#new-students-enrolled-or-registered-by-semester-bar-chart .MyCustomHeading3}

1.  This chart shows the number of new students registered in each
    semester.

2.  The y-axis represents the number of students, and the x-axis
    represents the semesters.

**How It Helps Admins:**

-   Track the success of recruitment campaigns by analyzing spikes or
    drops in student registrations.

-   Identify trends in enrollment for specific semesters (e.g., more
    enrollments in Fall vs. Spring) and plan recruitment efforts
    accordingly.

-   Understand whether recent programs or initiatives impact the
    enrollment of new students.

-   Adjust admissions targets, financial aid offerings, or marketing
    strategies based on semester-by-semester data.

### Bar Chart Showing Most Enrolled Courses by Semester: {#bar-chart-showing-most-enrolled-courses-by-semester .MyCustomHeading3}

1.  This chart highlights the top courses with the highest student
    enrollments for a particular semester or across multiple semesters.

2.  The x-axis lists the courses, and the y-axis shows the number of
    students enrolled.

**How It Helps Admins:**

-   Identify which courses are in high demand and which might require
    increased capacity or additional sections.

-   Use enrollment trends to design future curriculum and prioritize
    popular courses while phasing out underperforming ones.

-   Assign experienced faculty or increase faculty hiring for highly
    enrolled courses.

###  Pie Chart Showing Student Strength by Programs {#pie-chart-showing-student-strength-by-programs .MyCustomHeading3}

1.  This visualization divides students into their respective programs
    and shows the proportion of students enrolled in each program.

2.  Each slice represents a program, with the size proportional to its
    student strength.

**How It Helps Admins:**

-   Assess the popularity and strength of various programs briefly.

-   Allocate budgets, faculty, and resources proportionately to programs
    based on their student strength.

-   Spot programs with disproportionately low enrollments and
    investigate why they are less appealing to students.

## Course dashboard {#course-dashboard .MyCustomHeading2}

This dashboard helps admins to find different department courses in one
place. They can apply filters such as department, program, program type
(graduate level, undergraduate level etc.) and can even search using
course name, department name and program name.

Courses dashboard view

### Add New Course {#add-new-course .MyCustomHeading3}

Admins can add a course by clicking on the 'Add New Course' button and
the course creation view is as follows:

Create new course view.

Admins can edit a course by clicking 'Quick Edit Course' button under
options drop-down.

### Edit a course {#edit-a-course .MyCustomHeading3}

Course Edit Option View

Course Edit View

The important fields for a course are shown in the create and edit views
of a course. Admin can add a course, can select it as program required,
can edit course credits, department to which this course belongs to,
program type, program, pre-requisites of that course (maximum of five
pre-requisites can be selected) and finally course description.

### Delete a course {#delete-a-course .MyCustomHeading3}

Admin can choose to delete a course by clicking on 'Delete Course'
option as shown below. Deleting a course can potentially delete all the
course information, teaching sections for that course, the respective
enrollments, student's course progress and everything that is associated
with that course.

In future scope, we will take precautions while deleting a course such
as requiring an administrator's password to prevent only the authorized
persons can be able to modify the course information. There might be
scenarios that if the administrator might go away from the computer, and
no other person can perform this action unless they know the password.
The same will apply for updating the course.

Along with that, there should be a way to let the admin know that this
course has active teaching sections going on and the respective student
enrollments. All these things will be taken into consideration in future
scope of this project.

Course Delete Option View

Delete course prompt view

### Add New teaching section {#add-new-teaching-section .MyCustomHeading3}

Let's select BIS-1 i.e., Information Systems course in the program MSIS
of Business Information Systems Department.

Course details page where course teachings will be listed down
(currently no teaching sections yet). Let us create a teaching section
for this course by clicking the new teaching section button.

Add new teaching section view

By default, student\'s enrollment option is enabled, and the admin can
disable it by toggling it. The main purpose is, if the admin disables
it, this teaching section will not be visible under the search results
in the student's enrollments tab.

Admin can choose a faculty from a particular department, i.e., BIS and
can select the delivery mode for the semester for the teaching section
to be enrolled and can add the capacity for them.

Newly created teaching section is showing up in the page

Admin can select a section to view its details such as faculty and
enrolled student list.

Teaching Sections View

Teaching section information view

### Edit a teaching section {#edit-a-teaching-section .MyCustomHeading3}

Teaching section edit option

Edit teaching section view.

## Program Dashboard {#program-dashboard .MyCustomHeading2}

Admin can use this dashboard to manage the existing programs. They can
utilize the search and filter options provided to find the desired
programs efficiently.

Program Management Dashboard

### Add new program {#add-new-program .MyCustomHeading3}

Admin can add a new program to the university by clicking on the 'Add
New Program' button on top.

Create New Program View

### Edit a program {#edit-a-program .MyCustomHeading3}

Edit Program Option view

Edit Program View

### Delete a program {#delete-a-program .MyCustomHeading3}

Delete Program Option

Delete Program Prompt View

## Faculty Dashboard {#faculty-dashboard .MyCustomHeading2}

Admins can use this dashboard to manage the faculty of all the
departments. They can add new faculty and can manage their existing
basic information. They can reset passwords of faculty as well.

Faculty Management Dashboard

### Add new faculty {#add-new-faculty .MyCustomHeading3}

Admin can click on the 'Add New Faculty' to add a new faculty member.
They can set an initial password while creating the new faculty member.

Add New Faculty View

### Edit a faculty {#edit-a-faculty .MyCustomHeading3}

###  {#section-3 .MyCustomHeading3}

Faculty Edit Option

Edit Faculty View

### Remove faculty {#remove-faculty .MyCustomHeading3}

###  {#section-4 .MyCustomHeading3}

Remove Faculty Option

## Semester End Audit {#semester-end-audit .MyCustomHeading2}

### Semester end overview {#semester-end-overview .MyCustomHeading3}

In general, university systems are equipped with an automated process of
ending semesters by running an audit internally and start up new
semester. This audit makes sure that the grades were received from the
faculty for the student enrolled courses, updates the students'
progress, run financial reports and other system checks.

For this, the system must be configured in such a way that the database
creates future semester terms automatically. When the end of the
semester arrives, this process runs the audit to verify if all the
teaching sections enrolled by students did post grades, and update or
save the course progress and finally this audit changes the semester in
the system.

For the purpose of this project and demonstration, the current system
hasn't configured with the features of automation we discussed above.
So, the administrator has a manual control to run this audit and change
the semester. Admins can process this audit by clicking on the 'End
Semester Audit' on the left side menu.

End Semester Audit View

This view is configured to let the admins know what is happening in a
stepwise manner listed below:

**Step-1 Check Grade Status:** The first step of this audit before
ending the semester and changing it to a new term is to check whether
all the grades are posted by the faculty for the respective courses
enrolled by students. If yes, the process will move to step 2.

**Step-2 Update Course Progress:** The second step of this audit is to
update the course progress of students. Assuming the initial progress of
any new enrollments is NULL, this step will save the course progress by
checking the grades received of individual enrollments. Once all the
enrollments' course progress is updated, the sub process step 2 will be
completed, and the next process will be overseen by step 3.

**Step-3 Save Student Progress & Change Semester:** This sub process of
the audit takes all the updated course progress of student enrollments
and calculates the student's GPA for the end of the current semester.
Once all the students' Cumulative GPA is processed, this step makes sure
it updates the system to move to next semester. This step also ensures
that it creates a new semester if there are not any.

In general, the administrator should make sure that all the faculty
staff have posted their students' grades. In future scope of this
project, we will take measures to implement such features that
administrators can know what teaching sections are not yet posted grades
by the end of the semester. For now, step 1 will take care of this
measure by checking through all the current semester's enrollments. If
at all an administrator does not want to end the semester but if they
just want to check if all the grades are posted, they can run the first
step and close the process.

Let us now start the end of the semester audit and see what this process
will show to the user.

The process got stopped due to an error in step 1 that is one or more
teaching sections did not received grades for the respective students
and the detailed error log is shown in the view. This error occurred
because no faculty has posted grade for their sections yet.

Fall-2024 semester has a total of five teaching sections for 4 different
courses. Those are:

1.  BIS-1 (Section 4521 and 4534)

2.  BIS-2 (Section 4522)

3.  BIS-3 (Section 4523)

4.  BIS-4 (Section 4524)

Let us consider the teaching section 4521 for posting grades for
students. The 'grade_received' column in enrollment table will save this
grade information once the faculty post grades. This value is calculated
based on the weighted percentage score of the student of all their
respective assignments. Below is the implementation of grade calculation
function and grade honor points look up.

+-----------------------------------------------------------------------+
| const isValueInRange = (value, min, max) =\> {                        |
|                                                                       |
|     if (min \<= value && value \<= max + 0.99) ***return*** true;     |
|                                                                       |
|     ***return*** false;                                               |
|                                                                       |
| }                                                                     |
|                                                                       |
| *export* const gradeForWeightedPercentage = (percentage) =\> {        |
|                                                                       |
|     if (isValueInRange(percentage, 94, 100)) ***return*** \'A\';      |
|                                                                       |
|     else if (isValueInRange(percentage, 90, 93)) ***return*** \'A-\'; |
|                                                                       |
|     else if (isValueInRange(percentage, 87, 89)) ***return*** \'B+\'; |
|                                                                       |
|     else if (isValueInRange(percentage, 84, 86)) ***return*** \'B\';  |
|                                                                       |
|     else if (isValueInRange(percentage, 80, 83)) ***return*** \'B-\'; |
|                                                                       |
|     else if (isValueInRange(percentage, 77, 79)) ***return*** \'C+\'; |
|                                                                       |
|     else if (isValueInRange(percentage, 74, 76)) ***return*** \'C\';  |
|                                                                       |
|     else if (isValueInRange(percentage, 70, 73)) ***return*** \'C-\'; |
|                                                                       |
|     else if (isValueInRange(percentage, 67, 69)) ***return*** \'D+\'; |
|                                                                       |
|     else if (isValueInRange(percentage, 64, 66)) ***return*** \'D\';  |
|                                                                       |
|     else if (isValueInRange(percentage, 60, 63)) ***return*** \'D-\'; |
|                                                                       |
|     else if (percentage \< 60) ***return*** \'E\';                    |
|                                                                       |
|     else ***return*** null;                                           |
|                                                                       |
| }                                                                     |
|                                                                       |
| *export* const gradeHonorPointsLookUp = {                             |
|                                                                       |
|     \'A\': 4,                                                         |
|                                                                       |
|     \'A-\': 3.7,                                                      |
|                                                                       |
|     \'B+\': 3.3,                                                      |
|                                                                       |
|     \'B\': 3.0,                                                       |
|                                                                       |
|     \'B-\': 2.7,                                                      |
|                                                                       |
|     \'C+\': 2.3,                                                      |
|                                                                       |
|     \'C\': 2.0,                                                       |
|                                                                       |
|     \'C-\': 1.7,                                                      |
|                                                                       |
|     \'D+\': 1.3,                                                      |
|                                                                       |
|     \'D\': 1.0,                                                       |
|                                                                       |
|     \'D-\': 0.7,                                                      |
|                                                                       |
|     \'E\': 0.0                                                        |
|                                                                       |
| }                                                                     |
+=======================================================================+
+-----------------------------------------------------------------------+

Enrollment Table schema

Query to retrieve all the enrollments of section 4521

Enrollments of section 4521 (ungraded)

Let us now look at how a faculty can post grades for his teaching
section (in our example section-4521).

### Post section grades (faculty view) {#post-section-grades-faculty-view .MyCustomHeading3}

Faculty portal has one more essential feature that we have not discussed
earlier, which is the post section grades. The faculty grades tab has a
button called 'Post Grades' feature to post all the section grades as
shown in the image below. Once faculty posts all grades, the system
executes the grade calculation process for the respective enrollments.

Faculty grades table view

The relevant program or logic to handle this process is shown in the
snippet [courseGradesTab.js]{.underline} (front-end) and the server has
the following code to process this request.

[postAllSectionGrades-PUT Request (Server / Backend API):]{.underline}

+-----------------------------------------------------------------------+
| exam_router.put(\"/postAllSectionGrades\", authenticateFaculty,       |
| *async* (req, res) =\> {                                              |
|                                                                       |
|     const { sectionId } = req.body;                                   |
|                                                                       |
|     if (!sectionId) {                                                 |
|                                                                       |
|         res.status(400).send(\'Please provide a section Id\');        |
|                                                                       |
|         ***return***;                                                 |
|                                                                       |
|     }                                                                 |
|                                                                       |
|     const allExamsStatus = ***await***                                |
| getAllSectionExamsStatus(sectionId);                                  |
|                                                                       |
|     if (allExamsStatus) {                                             |
|                                                                       |
|         if (allExamsStatus.every(exam =\> exam.students_graded ===    |
| exam.students_attempted)) {                                           |
|                                                                       |
|             let studentGrades = \[\]                                  |
|                                                                       |
|             allExamsStatus.forEach(exam =\> {                         |
|                                                                       |
|                 let { grades_array, MaximumScore } = exam;            |
|                                                                       |
|                 grades_array = JSON.parse(grades_array);              |
|                                                                       |
|                 grades_array.map(grade =\> {                          |
|                                                                       |
|                     const { student_id, grade_received } = grade;     |
|                                                                       |
|                     const index = studentGrades.findIndex(sa =\> sa   |
| && sa.student_id === student_id)                                      |
|                                                                       |
|                     if (index !== -1) {                               |
|                                                                       |
|                         studentGrades\[index\].student_total +=       |
| grade_received;                                                       |
|                                                                       |
|                         studentGrades\[index\].max_total +=           |
| MaximumScore;                                                         |
|                                                                       |
|                     } else {                                          |
|                                                                       |
|                         studentGrades.push({                          |
|                                                                       |
|                             student_id,                               |
|                                                                       |
|                             student_total: grade_received,            |
|                                                                       |
|                             max_total: MaximumScore                   |
|                                                                       |
|                         })                                            |
|                                                                       |
|                     }                                                 |
|                                                                       |
|                 })                                                    |
|                                                                       |
|             })                                                        |
|                                                                       |
|             if(!studentGrades.length){                                |
|                                                                       |
|                 res.status(400).send(\'No Student Grades To Post\');  |
|                                                                       |
|                 ***return***;                                         |
|                                                                       |
|             }                                                         |
|                                                                       |
|             *// logic continues to post the grades*                   |
|                                                                       |
|             studentGrades = studentGrades.map(studentScore =\> {      |
|                                                                       |
|                 const { student_id, student_total, max_total } =      |
| studentScore;                                                         |
|                                                                       |
|                 const weightedPercentage = (student_total /           |
| max_total) \* 100;                                                    |
|                                                                       |
|                 const Grade =                                         |
| gradeForWeightedPercentage(weightedPercentage)                        |
|                                                                       |
|                 *// const GradeHonorPoints =                          |
| gradeHonorPointsLookUp\[Grade\];*                                     |
|                                                                       |
|                 ***return*** {                                        |
|                                                                       |
|                     student_id,                                       |
|                                                                       |
|                     grade: Grade,                                     |
|                                                                       |
|                 }                                                     |
|                                                                       |
|             })                                                        |
|                                                                       |
|             const bulkResponse = ***await***                          |
| postSectionGrades(studentGrades, sectionId);                          |
|                                                                       |
|             *// console.log(bulkResponse)*                            |
|                                                                       |
|             res.send(\'All grades posted\');                          |
|                                                                       |
|             ***return***;                                             |
|                                                                       |
|         } else {                                                      |
|                                                                       |
|             res.status(400).send(\'One or more students needs to be   |
| graded!\');                                                           |
|                                                                       |
|             ***return***;                                             |
|                                                                       |
|         }                                                             |
|                                                                       |
|     } else {                                                          |
|                                                                       |
|         res.status(500).send(\'Something went wrong! please try       |
| again\');                                                             |
|                                                                       |
|         ***return***;                                                 |
|                                                                       |
|     }                                                                 |
|                                                                       |
| })                                                                    |
+=======================================================================+
+-----------------------------------------------------------------------+

[getAllSectionExamsStatus (Query Handler):]{.underline}

+-----------------------------------------------------------------------+
| *export* *async* function getAllSectionExamsStatus(sectionId) {       |
|                                                                       |
|     let query = \`SELECT                                              |
|                                                                       |
|                 e.ExamID,                                             |
|                                                                       |
|                 e.MaximumScore,                                       |
|                                                                       |
|                 COUNT(DISTINCT es.submission_id) AS                   |
| students_attempted,                                                   |
|                                                                       |
|                 COUNT(DISTINCT CASE WHEN es.grade_received IS NOT     |
| NULL THEN es.submission_id END) AS students_graded,                   |
|                                                                       |
|                 (                                                     |
|                                                                       |
|                     SELECT COUNT(\*)                                  |
|                                                                       |
|                     FROM Enrollment en                                |
|                                                                       |
|                     WHERE en.SectionID = e.SectionID                  |
|                                                                       |
|                 ) AS total_students,                                  |
|                                                                       |
|                 CONCAT(\"\[\",                                        |
|                                                                       |
|                     GROUP_CONCAT(                                     |
|                                                                       |
|                         JSON_OBJECT(                                  |
|                                                                       |
|                         \'student_id\', en.StudentID,                 |
|                                                                       |
|                         \'grade_received\', CASE                      |
|                                                                       |
|                             WHEN EXISTS (                             |
|                                                                       |
|                                 SELECT 1                              |
|                                                                       |
|                                 FROM Exam_Submission es_sub           |
|                                                                       |
|                                 WHERE es_sub.exam_id = e.ExamID       |
|                                                                       |
|                                 AND es_sub.student_id = en.StudentID  |
|                                                                       |
|                             ) THEN COALESCE(es.grade_received, 0)     |
|                                                                       |
|                             ELSE 0 END                                |
|                                                                       |
|                                 )                                     |
|                                                                       |
|                     ),                                                |
|                                                                       |
|                 \"\]\") AS grades_array                               |
|                                                                       |
|             FROM Exam e                                               |
|                                                                       |
|             LEFT JOIN Enrollment en on en.SectionID = e.SectionID     |
|                                                                       |
|             LEFT JOIN Exam_Submission es ON e.ExamID = es.exam_id AND |
| en.StudentID = es.student_id                                          |
|                                                                       |
|             WHERE e.SectionID IN (                                    |
|                                                                       |
|                 SELECT Section_ID                                     |
|                                                                       |
|                 FROM Section s                                        |
|                                                                       |
|                 WHERE s.SemesterID = (                                |
|                                                                       |
|                     SELECT semester_id                                |
|                                                                       |
|                     FROM Semester                                     |
|                                                                       |
|                     WHERE is_current_semester = 1 AND e.SectionID = ? |
|                                                                       |
|                 )                                                     |
|                                                                       |
|             )                                                         |
|                                                                       |
|             GROUP BY e.ExamID\`                                       |
|                                                                       |
|     const \[rows\] = ***await*** pool.query(query, sectionId);        |
|                                                                       |
|     ***return*** rows;                                                |
|                                                                       |
| }                                                                     |
+=======================================================================+
+-----------------------------------------------------------------------+

[postSectionGrades]{.underline} (Query handler to post the section
grades):

+-----------------------------------------------------------------------+
| *export* *async* function postSectionGrades(grades, sectionId) {      |
|                                                                       |
|     let query1 = \`                                                   |
|                                                                       |
|     DROP TEMPORARY TABLE IF EXISTS TempGrades;                        |
|                                                                       |
|     CREATE TEMPORARY TABLE TempGrades (                               |
|                                                                       |
|         StudentID INT,                                                |
|                                                                       |
|         grade_received ENUM(\'A\', \'A-\', \'B+\', \'B\', \'B-\',     |
| \'C+\', \'C\', \'C-\', \'D+\', \'D\', \'D-\', \'E\')                  |
|                                                                       |
|     );                                                                |
|                                                                       |
|     INSERT INTO TempGrades (StudentID, grade_received)                |
|                                                                       |
|     VALUES                                                            |
|                                                                       |
|     \`                                                                |
|                                                                       |
|     const studentValues = grades.map(                                 |
|                                                                       |
|         ({ student_id, grade }) =\> \`(\${student_id},                |
| \'\${grade}\')\`                                                      |
|                                                                       |
|     ).join(\', \');                                                   |
|                                                                       |
|     query1 += \` \${studentValues}; \`                                |
|                                                                       |
|     let query2 = \`UPDATE Enrollment e                                |
|                                                                       |
|                 JOIN TempGrades tg ON e.StudentID = tg.StudentID      |
|                                                                       |
|                 SET e.grade_received = tg.grade_received,             |
|                                                                       |
|                     e.grade_posted_at = NOW()                         |
|                                                                       |
|                 WHERE e.SectionID = ?;\`;                             |
|                                                                       |
|     const result = ***await*** pool.query(query1 + query2,            |
| \[sectionId\])                                                        |
|                                                                       |
|     ***return*** result;                                              |
|                                                                       |
| }                                                                     |
+=======================================================================+
+-----------------------------------------------------------------------+

### Close current semester {#close-current-semester .MyCustomHeading3}

The following enrollments of section 4521 are now received the grade
information and the same can be seen updated in the database.

Updated Grades for enrollments of section 4521

Now, if we try again to run the semester end audit, we no longer see
this section (4521) in the error log (as shown in the image below) as
this section received its grades from the faculty.

Let us continue the same process of posting grades for the remaining
teaching sections and re-try the step 1 again.

Let us continue to step-2, this step ensures that it updates the course
progress to 'Course Completed'.

Updated course progress

Before running the step 3, we can check the student GPA of the students
who has enrollments this semester (Fall 2024).

Query to retrieve all enrollments of current semester

Results:

We can see no student has updated GPA till now (all were enrolled in
current semester). Now let us run the step 3 by clicking on the
'continue' button.

Semester end audit ran successfully

Admin now can close this audit page, and it will refresh the application
and we can see the system is updated for next semester. If we check the
student records again, the GPA will be updated accordingly.

Query to retrieve the students who have enrollments in the past
semester.

**Note:** The query has been updated (in 'WHERE' clause) as the previous
query works only for the current semester. Since, the semester is now
changed, we should update the query with past semester id.

**Results:**

Step 3 utilizes the code inserted in the snippets
[admin_router.js]{.underline} and a stored procedure called
'CalculateCumulativeGPA' which are shown the codes section below.

# Future Scope {#future-scope .MyCustomHeading1}

-   Implementation of course waitlist for students when the teaching
    section is full.

-   Multiple file upload feature for 'File' content and assignment
    submissions.

-   Feature to set the assignment attempt count for student submissions
    so that they can submit more than once.

-   Customizing the calendar module to show more information about the
    student's assignments.

-   Feature to edit the course content (such as folder or other contents
    where it is not supported currently) in its open form.

-   Soft deletion of applicable data such as course, enrollment, files
    etc. instead of deleting them permanently.

-   Logging the user transactions in a log table for any CRUD operation
    performed in the database.

-   Validating the student registration process by the admin such as
    reviewing the transcripts and all before making them as users of the
    system.

-   Allowing faculty to re-order course content.
