/*global PDFJS*/
'use strict';

angular.module('twebProject01App')
    .controller('PdfCtrl', function ($scope, $http, $location, socket, Auth, $window) {


        $scope.currentClassroom = [];
        $scope.url = null;

		// Get the current classroom and load the pdf
        $http.get('/api/classrooms/' + $location.search().id).success(function (currentClassroom) {
		
			// Check if the user is the owner of the classroom, if not, redirect to pdfStudent
			$scope.currentUserId = Auth.getCurrentUser()._id;
			if ($scope.currentUserId != currentClassroom.creatorId) {
				$window.location = "/pdfStudent?id=" + currentClassroom._id;
			}
			
			// Ask the teacher if he really wants to leave the room
			window.onbeforeunload = function (event) {
                if (!($location.search().id === undefined)) {
                    var message = 'Are you sure you want to leave this page ?';
                    if (typeof event == 'undefined') {
                        event = window.event;
                    }
                    if (event) {
                        event.returnValue = message;
                    }
                }
                return message;
            }

			// When the teacher leaves, set isActive of the classroom to false
            window.onunload = function (event) {
                if (!($location.search().id === undefined)) {
                    $http.put('/api/classrooms/' + $location.search().id, {
                        isActive: false
                    });
                }
            }
			
            $scope.currentClassroom = currentClassroom;
            $scope.url = "/assets/slides/" + currentClassroom.pdf;

            var pdfDoc = null,
                pageNum = 1,
                pageRendering = false,
                pageNumPending = null,
                scale = 0.8,
                canvas = document.getElementById('slides'),
                ctx = canvas.getContext('2d');

            /**
             * Get page info from document, resize canvas accordingly, and render page.
             * @param num Page number.
             */
            function renderPage(num) {
                pageRendering = true;
                // Using promise to fetch the page
                pdfDoc.getPage(num).then(function (page) {
                    var viewport = page.getViewport(scale);
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext);

                    // Wait for rendering to finish
                    renderTask.promise.then(function () {
                        pageRendering = false;
                        if (pageNumPending !== null) {
                            // New page rendering is pending
                            renderPage(pageNumPending);
                            pageNumPending = null;
                        }
                    });
                });

                // Update page counters
                document.getElementById('page_num').textContent = pageNum;

                $http.post('/api/pageNumbers', {
                    pageNumber: pageNum,
                    classroomId: currentClassroom._id,
                });
            }

            /**
             * If another page rendering in progress, waits until the rendering is
             * finised. Otherwise, executes rendering immediately.
             */
            function queueRenderPage(num) {
                if (pageRendering) {
                    pageNumPending = num;
                } else {
                    renderPage(num);
                }
            }

            /**
             * Displays previous page.
             */
            function onPrevPage() {
                if (pageNum <= 1) {
                    return;
                }
                pageNum--;
                queueRenderPage(pageNum);
                $http.post('/api/pageNumbers', {
                    pageNumber: pageNum,
                    classroomId: currentClassroom._id,
                });
            }
            document.getElementById('prev').addEventListener('click', onPrevPage);

            /**
             * Displays next page.
             */
            function onNextPage() {
                if (pageNum >= pdfDoc.numPages) {
                    return;
                }
                pageNum++;
                queueRenderPage(pageNum);
                $http.post('/api/pageNumbers', {
                    pageNumber: pageNum,
                    classroomId: currentClassroom._id,
                });
            }
            document.getElementById('next').addEventListener('click', onNextPage);

            /**
             * Asynchronously downloads PDF.
             */
            PDFJS.getDocument($scope.url).then(function (pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById('page_count').textContent = pdfDoc.numPages;

                // Initial/first page rendering
                renderPage(pageNum);
            });
        });

		// Get the initial feedback list
        $http.get('/api/feedbacks/' + $location.search().id).success(function (feedbacks) {
            $scope.feedbacks = feedbacks;
            var feedbackCount = [0, 0, 0];
            for (var i = 0; i < Object.keys(feedbacks).length; i++) {
                feedbackCount[feedbacks[i].number - 1] += 1;
            }
            document.getElementById('tooQuick').textContent = feedbackCount[0];
            document.getElementById('perfect').textContent = feedbackCount[1];
            document.getElementById('tooSlow').textContent = feedbackCount[2];
			
			// Synchronize the feedbacks
            socket.syncUpdates('feedback', $scope.feedbacks, function (event, feedback, feedbacks) {
				if (feedback.classroomId == $location.search().id) {
					if (feedback.number == 1) {
						document.getElementById('tooQuick').textContent = feedbackCount[0] += 1;
					} else if (feedback.number == 2) {
						document.getElementById('perfect').textContent = feedbackCount[1] += 1;
					} else if (feedback.number == 3) {
						document.getElementById('tooSlow').textContent = feedbackCount[2] += 1;
					}
				}
            });

        });

    });