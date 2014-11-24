#TWEB-Project01

Repository for Rui Reis and Frédéric Saam

Heroku app: http://fast-hamlet-3168.herokuapp.com/

##Project Presentation 

This project allows people to create or follow PDF presentations with live feedback.

Everyone can create a classroom that people can join in 2 clicks.

People can join by simply clicking the classroom in the main page.


##Features

O: Working  
X: Not Yet Implemented

|     Teacher     | Local | Heroku |
|:---------------:|:-----:|:------:|
| Prepare Lecture |   O   |    O   |
| Control Slides  |   O   |    O   |
| See Feedback    |   O   |    O   |
| Submit Poll     |   X   |    X   |

|         Student         |  Local  |  Heroku  |
|:-----------------------:|:-------:|:--------:|
| Join and Attend Lecture |    O    |     O    |
| Ask Questions           |    O    |     O    |
| Give Feedback           |    O    |     O    |
| Answer Poll             |    X    |     X    |

|       Common to Both      |  Local  |  Heroku  |
|:-------------------------:|:-------:|:--------:|
| Explore Archives          |    X    |     X    |
| List of Past Lectures     |    X    |     X    |
| Access Past Lecture Stats |    X    |     X    |

|      Admin      |  Local  |  Heroku  |
|:---------------:|:-------:|:--------:|
| Monitor System  |    X    |     X    |
| Admin Dashboard |    X    |     X    |


##TODO
* Automatic refresh of active classes in main page.
* Allow public / private classes with password.
	* Allow access to classromm with personnalized id and / or name.
* Update overall UI.
* Upload PDF files with public / private option.
* Access public uploaded files.
* Access files uploaded by logged user.
* Detect if file already exists in database to avoid unnecessary redundancy (metadata ?).
* Better management of users and redirections.
* Fullscreen + mouse support during PDF presentation.
* Chat filtering for teachers (deletion of messages, censorship).
* Access past given lectures and past attended lectures.
	* This can help rejoining a classroom in case of unexpected exit.

##Known Issues and Possible Workarounds
* When a teacher leaves a page (by clicking yes when prompted), the classroom should become inactive. 
	* This works as intended locally but not in Heroku.
	* Possibly change how a room becomes inactive by giving the possibilty to the creator/teacher to dismiss the class.
	* User dashboard with past lectures and possibility to change status (active / inactive).
* Page resizing is not dynamic, several visual glitches depending on resolution / browser zoom.
* If someone tries to access a teacher page without being the creator, he should be redirected to the student page.
	* Redirection not working with Chrome but working with Firefox.
	* The browser prompt for exiting the page causes a problem.
* Huge code duplication between teacher and student PDF pages.
	* Merge is possible by detecting room creator and using ng-show / ng-hide.
