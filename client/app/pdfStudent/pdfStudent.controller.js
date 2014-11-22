'use strict';

angular.module('twebProject01App')
    .controller('PdfStudentCtrl', function ($scope, $http, $location, socket) {
        console.log($location.search().id);

        $scope.currentClassroom = [];
        $scope.url = null;
        $scope.sync = true;
        $scope.actualPage;


        $http.get('/api/classrooms/' + $location.search().id).success(function (currentClassroom) {
            $scope.currentClassroom = currentClassroom;
            $scope.url = "/assets/slides/" + currentClassroom.pdf;
            console.log($scope.currentClassroom);

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
                pageNum = num;
                document.getElementById('page_num').textContent = pageNum;
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

            $http.get('/api/pageNumbers/' + currentClassroom._id).success(function (pageNumbers) {
                $scope.pageNumbers = pageNumbers;
                pageNum = $scope.pageNumbers[Object.keys(pageNumbers).length - 1].pageNumber;
                socket.syncUpdates('pageNumber', $scope.pageNumbers, function (event, pageNumber, pageNumbers) {
                    if (pageNumber.classroomId == currentClassroom._id) {
                        $scope.actualPage = pageNumber.pageNumber;
                        if ($scope.sync) {
                            document.getElementById('page_num').textContent = pageNumber.pageNumber;
                            queueRenderPage(pageNumber.pageNumber);
                        }
                    }
                });
            });

            $scope.$on('$destroy', function () {
                socket.unsyncUpdates('pageNumber');
            });

            $scope.syncUnsync = function () {
                if ($scope.sync) {
                    console.log("sync");
                    document.getElementById('page_num').textContent = $scope.actualPage;
                    queueRenderPage($scope.actualPage);
                }
            }
        });

        $scope.addFeedback = function (number) {
            $http.post('/api/feedbacks', {
                number: number,
                classroomId: $location.search().id
            });
        };

        $http.get('/api/feedbacks/' + $location.search().id).success(function (feedbacks) {
            $scope.feedbacks = feedbacks;
            var feedbackCount = [0, 0, 0];
            for (var i = 0; i < Object.keys(feedbacks).length; i++) {
                feedbackCount[feedbacks[i].number - 1] += 1;
            }
            document.getElementById('tooQuick').textContent = feedbackCount[0];
            document.getElementById('perfect').textContent = feedbackCount[1];
            document.getElementById('tooSlow').textContent = feedbackCount[2];

            socket.syncUpdates('feedback', $scope.feedbacks, function (event, feedback, feedbacks) {
                if (feedback.number == 1) {
                    document.getElementById('tooQuick').textContent = feedbackCount[0] += 1;
                } else if (feedback.number == 2) {
                    document.getElementById('perfect').textContent = feedbackCount[1] += 1;
                } else if (feedback.number == 3) {
                    document.getElementById('tooSlow').textContent = feedbackCount[2] += 1;
                }
            });
        });




    });