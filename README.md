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
| Explore Archives|   X   |    X   |

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
* Automatic refresh of active classes in main page
* Allow public / private classes with password
* Update overall UI
* Upload PDF files with public / private option
* Access public uploaded files
* Access files uploaded by logged user
* Detect if file already exists in database to avoid unnecessary redundancy (metadata ?)
* Better management of users
* Fullscreen + mouse support during PDF presentation

##Known Issues
* When a teacher leaves a page (by clicking yes when prompted), the classroom should become inactive. 
	* This works as intended locally but not in Heroku.
* Page resizing is not dynamic, several visual glitches depending on resolution / browser zoom.
* Everyone can access a teacher page by typing the URL because of the exit prompt.
	* Redirection not working.
