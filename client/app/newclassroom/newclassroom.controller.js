'use strict';
angular.module('twebProject01App')
    .controller('NewclassroomCtrl', function ($scope, $http, Auth, $window) {

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.allClassrooms = [];

        $scope.creds = {};
        $scope.uniqueFileName = '';

        $scope.allFiles = [];

        $scope.selected = {};

        // Temporary workaround to choose between available PDF files.
        $http.get('/assets/slides/pdfFiles.json').then(function (allFiles) {
            $scope.allFiles = allFiles.data;
        });

        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });

        function strEndsWith(str, suffix) {
            return str.match(suffix + "$") == suffix;
        }

        $scope.addClassroomFromURL = function () {

            // If the user has not selected all fields, prompt and redirect.
            if (this.classroomName === undefined || this.classroomPDF === undefined) {
                alert("Classroom name or pdf url empty !");
                window.location.href = "/newclassroom";
                return false;
            }

            // Add classroom to DB with given inputs.
            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                creatorId: Auth.getCurrentUser()._id,
                pdf: this.classroomPDF,
                isActive: true
            }).success(function (classroom) {
                $window.location = "/pdf?id=" + classroom._id;
            });
        };

        $scope.addClassroomFromBucket = function () {

            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                creatorId: Auth.getCurrentUser()._id,
                pdf: "https://s3-eu-west-1.amazonaws.com/" + $scope.creds.bucket + "/" + $scope.uniqueFileName,
                isActive: true
            }).success(function (classroom) {
                $window.location = "/pdf?id=" + classroom._id;
            });
        };

        $scope.addClassroomFromAsset = function () {

            // If the user has not selected all fields, prompt and redirect.
            if (this.classroomName === undefined) {
                alert("Classroom name empty !");
                window.location.href = "/newclassroom";
                return;
            }


            // Add classroom to DB with given inputs.
            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                creatorId: Auth.getCurrentUser()._id,
                pdf: "/assets/slides/" + $scope.selected.path,

                isActive: true
            }).success(function (classroom) {
                $window.location = "/pdf?id=" + classroom._id;
                console.log(classroom);
            });
        };


        // Retrieve currently selected file in table.
        $scope.select = function (file) {
            $scope.selected = file;
            console.log($scope.selected.path);
        }

        $scope.onFileSelect = function ($files) {
            $scope.file = $files.files[0];
        }

        $scope.sizeLimit = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;

        $scope.upload = function () {
            AWS.config.update({
                accessKeyId: $scope.creds.access_key,
                secretAccessKey: $scope.creds.secret_key
            });
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({
                params: {
                    Bucket: $scope.creds.bucket
                }
            });
            console.log($scope.file);

            if ($scope.file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt($scope.file.size));
                if (fileSize > $scope.sizeLimit) {
                    toastr.error('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed', 'File Too Large');
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                $scope.uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

                var params = {
                    Key: $scope.uniqueFileName,
                    ContentType: $scope.file.type,
                    Body: $scope.file,
                    ServerSideEncryption: 'AES256'
                };

                bucket.putObject(params, function (err, data) {
                    if (err) {
                        toastr.error(err.message, err.code);
                        return false;
                    } else {
                        // Upload Successfully Finished
                        toastr.success('File Uploaded Successfully', 'Done');

                        // Reset The Progress Bar
                        setTimeout(function () {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 4000);
                    }
                })
                    .on('httpUploadProgress', function (progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        $scope.$digest();
                    });
            } else {
                // No File Selected
                toastr.error('Please select a file to upload');
            }
        }

        $scope.fileSizeLabel = function () {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
        };

        $scope.uniqueString = function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 8; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
    });