![Live Classrooms Logo](/client/assets/images/logo.png)

# Live Classrooms

Repository for Rui Reis and Frédéric Saam

Heroku app: http://fast-hamlet-3168.herokuapp.com/

Landing page: http://evilangel00.github.io/

## Project Presentation 

This project allows people to create or follow PDF presentations with live feedback.

Everyone can create a classroom that people can join in 2 clicks.

People can join by simply clicking the classroom in the main page.

## Features

O: Working  
X: Not Implemented

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
| Explore Archives          |    O    |     O    |
| List of Past Lectures     |    O    |     O    |
| Access Past Lecture Stats |    X    |     X    |

|      Admin      |  Local  |  Heroku  |
|:---------------:|:-------:|:--------:|
| Monitor System  |    X    |     X    |
| Admin Dashboard |    X    |     X    |


## Possible future developpements
* Automatic refresh of active classes in main page.
* Allow public / private classes with password.
	* Allow access to classroom with personnalized id and / or name.
* Upload PDF files with public / private option.
* Access public uploaded files.
* Access files uploaded by logged user.
* Detect if file already exists in database to avoid unnecessary redundancy (metadata ?).
* Chat filtering for teachers (deletion of messages, censorship).

## Known Issues and Possible Workarounds
* Page resizing is not dynamic, several visual glitches depending on resolution / browser zoom.
* Huge code duplication between teacher and student PDF pages.
	* Merge is possible by detecting room creator and using ng-show / ng-hide.
* Full screen is not exactly full screen.
	* Pages have to be re-rendered to fit the screen.

## Additions since Part 1
* Colour scheme change.
* Overall revamp of redirections and general flow of the application.
* S3 upload.
* Past Lectures page allowing centralized and efficient management of created lectures.
* [Landing page](http://evilangel00.github.io)
* Fullscreen + mouse and keyboard keys support during PDF presentation.
