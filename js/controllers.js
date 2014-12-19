Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var iidControllers = angular.module('iidControllers', []);


iidControllers.controller('SearchGlobalController', function($scope) {
    // for navigation_beispiel
    $scope.user = null;
    $scope.selectedSemester = null;
    $scope.selectedLva = null;
    $scope.selectedBeispiel = null;
    $scope.selectedUni = null;
    $scope.selectedTestfile = null;
    $scope.selectedContributor = null;


    $scope.goToUni = function(uni) {
        $scope.selectedUni = uni;
        $scope.selectedLva = null;
        $scope.selectedSemester = null;
        $scope.selectedBeispiel = null;
        $scope.selectedTestfile = null;
    };
    $scope.goToLva = function(lva) {
        console.info('goToLva ' + lva.name);
        $scope.selectedLva = lva;
        $scope.selectedSemester = null;
        $scope.selectedBeispiel = null;
        $scope.selectedTestfile = null;
    };
    $scope.goToLva2 = function(uni, lva) {
        $scope.selectedUni = uni;
        $scope.selectedLva = lva;
        $scope.selectedSemester = null;
        $scope.selectedBeispiel = null;
        $scope.selectedTestfile = null;
    };
    $scope.goToSemester = function(semester) {
        console.info('goToSemester ' + semester.name);
        $scope.selectedSemester = semester;
        $scope.selectedBeispiel = null;
        $scope.selectedTestfile = null;
    };
    $scope.goToSemester2 = function(uni, lva, semester) {
//        alert(uni.name);
//        alert(lva.name);
//        alert(semester.name);
        $scope.selectedUni = uni;
        $scope.selectedLva = lva;
        $scope.selectedSemester = semester;
        $scope.selectedBeispiel = null;
        $scope.selectedTestfile = null;
    };
    $scope.goToBeispiel = function(beispiel) {
        console.info('goToBeispiel ' + beispiel.name);
        $scope.selectedBeispiel = beispiel;
        $scope.selectedTestfile = null;
    };
    $scope.goToBeispiel2 = function(uni, lva, semester, beispiel) {
//        alert(uni.name + ', ' + lva.name + ', ' + semester.name + ', ' + beispiel.name);
        console.info('goToBeispiel2 ' + testfile.filename);
        $scope.selectedUni = uni;
        $scope.selectedLva = lva;
        $scope.selectedSemester = semester;
        $scope.selectedBeispiel = beispiel;
        $scope.selectedTestfile = null;
    };
    $scope.goToTestfile = function(testfile) {
        console.info('goToTestfile ' + testfile.filename);
        $scope.selectedTestfile = testfile;
    };
    $scope.goToTestfile2 = function(uni, lva, semester, beispiel, contributor, testfile) {
        console.info('goToTestfile ' + testfile.filename);
        $scope.selectedUni = uni;
        $scope.selectedLva = lva;
        $scope.selectedSemester = semester;
        $scope.selectedBeispiel = beispiel;
        $scope.selectedContributor = contributor;
        $scope.selectedTestfile = testfile;
    };

    $scope.setSelectedLva = function(lva) {
      $scope.selectedLva = lva; 
      $scope.selectedSemester = null; 
    };
    $scope.setSelectedBeispiel = function(bsp) {
      $scope.selectedBeispiel = bsp;
    };
    $scope.setSelectedContributor = function(cont) {
      $scope.selectedContributor = cont;
    };    
    $scope.setSelectedSemester = function(sem, lva) {
      $scope.selectedSemester = sem;
      $scope.selectedLva = lva;  
    };
    $scope.setSelectedUni = function(uni) {
      $scope.selectedUni = uni;
    };
    $scope.setSelectedTestfile = function(testfile) {
        $scope.selectedTestfile = testfile;
    };
    $scope.checkAllSelected = function(contributor) {
       var allSelected = true;
       contributor.testfiles.forEach(function(testfile) {
          if (testfile.forDownload == false) {
             allSelected = false;
          }
       });
       contributor.allSelected = allSelected;
    };
    $scope.selectAllForDownload = function(contributor) {
       if (contributor.allSelected == true) {
	       contributor.testfiles.forEach(function(testfile) {
		  testfile.forDownload = true;
	       });
       } else {
               contributor.testfiles.forEach(function(testfile) {
		  testfile.forDownload = false;
	       });
       }
    };
    $scope.selectAllForBeispiel = function(bsp) {
       bsp.contributors.forEach(
          function(contributor) {
          contributor.testfiles.forEach(function(testfile) {
             testfile.forDownload = true;
          });
       });
       bsp.contributors.forEach(function(contributor) {
          contributor.allSelected = true;
       });
    };
    $scope.selectGoodForBeispiel = function(bsp) {
       bsp.contributors.forEach(
       	  function(contributor) {
          contributor.testfiles.forEach(function(testfile) {
             var sum = testfile.votesUp - testfile.votesDown;
             if (sum >= 0) {
                testfile.forDownload = true;
             } else {
                testfile.forDownload = false;
             }
          });
          var allSelected = true;
          contributor.testfiles.forEach(function(testfile) {
          if (testfile.forDownload == false) {
             allSelected = false;
          }
       });
       contributor.allSelected = allSelected;
       });
    };
    $scope.getVotesForTestfile = function(testfile) {
       var sum = testfile.votesUp - testfile.votesDown;
       return sum;
    };
    $scope.getNrSelected = function(bsp) {
       var sum = 0;
       bsp.contributors.forEach(function(cont) {
          cont.testfiles.forEach(function(testfile) {
             if (testfile.forDownload == true) {
                sum ++;
             }
          });
       });
       return sum;
    }
    $scope.numberOfTestFiles = function(beispiel) {
       var l = 0;
       if(beispiel.contributors == null) {
        return 0;
       }
       beispiel.contributors.forEach(function(cont) {
          if(cont.testfiles != null) {
            l = l + cont.testfiles.length;
          }
       });
       return l;
    }
    $scope.getColorLva = function(lva, selected) {
      if(lva == selected) {
        return 'background-color: #CCEEFF';
      }else {
        return 'background-color: #FFFFFF';
      }
    }
    $scope.getColorContributor = function(cont, selected) {
      if(cont == selected) {
        return 'background-color: #CCEEFF';
      }else {
        return 'background-color: #FFFFFF';
      }
    }
    $scope.getColorVotes = function(testfile) {
      var v = testfile.votesUp - testfile.votesDown;
      if (v >= 0) {
        return '#00C000';
      } else {
        return '#FF0000';
      }
    }
    $scope.hasAFavorite = function(lva) {
      var r = false;
      if(lva.semester == null) {
        return r;
      }
      lva.semester.forEach(function(sem) {
        if(sem.favorite == true) {
          r = true;
        }
      });
      return r;
    };
    $scope.orderCourses = function(lva) {
      var r = true;
      if(lva.semester == null) {
        return r;
      }
      lva.semester.forEach(function(sem) {
        if(sem.favorite == true) {
          r = false;
        }
      });
      return r;
    };
    $scope.favoriteFilterEnabled = false;
//    $scope.searchString = ($location.search()).searchString;
    $scope.saved = false;
    $scope.deleted = false;
    $scope.upd_saved = false;
    $scope.upd_deleted = false;
    $scope.fileSelected = false;
    $scope.newLVA = {name:'<neue Lehrveranstaltung>'};
    $scope.newSemester = {name:'<neues Semester>'};
    $scope.newBeispiel = {name:'<neues Beispiel>'};
    $scope.doSave_upd = function() {
        $scope.upd_saved = true;
        $scope.upd_deleted = false;
        var date = new Date();
        $scope.savedTime = date.timeNow();
    };
    $scope.doDelete_upd = function() {
        $scope.upd_deleted = true;
        $scope.upd_saved = false;
        var date = new Date();
        $scope.deletedTime = date.timeNow(); // date.today() + " " +
    };
    $scope.doSave = function() {
        $scope.saved = true;
        $scope.deleted = false;
        var date = new Date();
        $scope.savedTime = date.timeNow();
    };
    $scope.doDelete = function() {
        $scope.deleted = true;
        $scope.saved = false;
        var date = new Date();
        $scope.deletedTime = date.timeNow(); // date.today() + " " +
    };
    $scope.selectFile = function() {
        $scope.fileSelected = true;
    };
    $scope.toggleFavorite = function(sem) {
        if(sem.favorite) {
          sem.favorite = false;
        }else {
          sem.favorite = true;
        }
    };
    $scope.getLVAsForSelectedUni = function(selectedUni) {
        if (selectedUni == undefined) {
            return [];
        }
        var result = [];
        angular.forEach(selectedUni.lvas, function(lva) {
            result.push(lva);
        });
        result.push($scope.newLVA);
        return result;
    };

    $scope.getSemesterForSelectedLVA = function(selectedLva) {
        if (selectedLva == undefined) {
            return [];
        }
        var result = [];
        angular.forEach(selectedLva.semester, function(sem) {
            result.push(sem);
        });
        result.push($scope.newSemester);
        return result;
    };

    $scope.getBeispieleForSelectedSemester = function(selectedSemester) {
        if (selectedSemester == undefined) {
            return [];
        }
        var result = [];
        angular.forEach(selectedSemester.beispiele, function(bsp) {
            result.push(bsp);
        });
        result.push($scope.newBeispiel);
        return result;
    };
    
    $scope.getAvgVotesForContributor = function(contributor) {
       if (contributor == undefined) {
           return null;
       }
       var sum = 0;
       var count = 0;
       var testSum = 0;
       contributor.testfiles.forEach(function(testfile) {
          testSum = testfile.votesUp - testfile.votesDown;
          sum = sum + testSum;
          count = count + 1;
       });
       return Math.round((sum/count) * 100) / 100;
    };
    
    $scope.getAvgVotesColorForContributor = function(contributor) {
       if (contributor == undefined) {
           return [];
       }
       var sum = 0;
       var count = 0;
       var testSum = 0;
       contributor.testfiles.forEach(function(testfile) {
          testSum = testfile.votesUp - testfile.votesDown;
          sum = sum + testSum;
          count = count + 1;
       })
       if (Math.round((sum/count) * 100) / 100 >= 0){
        return '#00C000';
      } else {
        return '#FF0000';
      }
    };
    
    $scope.allVoted = function(contributor, vote) {
       contributor.votedAll = vote;
       contributor.testfiles.forEach(function(testfile) {
          $scope.fileVoted(contributor, testfile, vote, false);
       });
    
    };
    
    $scope.fileVoted = function(contributor, testfile, vote, check) {
       if (vote == 1) {
          testfile.votesUp ++;
          if (testfile.voted == -1) testfile.votesDown --;
       }
       if (vote == -1) {
          testfile.votesDown ++;
          if (testfile.voted == 1) testfile.votesUp --;
       }
       if (vote == 0) {
          if (testfile.voted == 1) testfile.votesUp --;
          if (testfile.voted == -1) testfile.votesDown --;
       }
       testfile.voted = vote;
       if (check) $scope.checkAllVoted(contributor);
    };
    
    $scope.checkAllVoted = function(contributor) {
       var vote = 0;
       var first = true;
       var mismatch = false;
       contributor.testfiles.forEach(function(testfile) {
          if (first == true) {
             vote = testfile.voted;
             first = false;
          } else {
             if (vote != testfile.voted) {
                mismatch = true;
             }
          }
       });
       if (!mismatch) {
          contributor.votedAll = vote;
       } else {
          contributor.votedAll = 0;
       }
    };


    $scope.register = function(username, email, password, password2) {

        if (password != password2) {
            $scope.registerFailureMessage = 'The passwords do not match!';
        } else if (username == undefined || username.length < 3) {
            $scope.registerFailureMessage = 'Username must be at least 3 characters long!';
        } else if (email == undefined) {
            $scope.registerFailureMessage = 'Email must not be empty!';
        } else if (password == undefined || password.length < 7) {
            $scope.registerFailureMessage = 'The password must be at least 7 characters long!';
        } else {
            $scope.registerFailureMessage = null;
        }

        if ($scope.registerFailureMessage != null) {
            return;
        }
        var newUser = {username: username, email: email, password: password, notifications: { type: {push: 'true', email:'false'}, trigger: { newTestfiles: 'true', comments: 'false', answer: 'true'}}};
        $scope.users.push(newUser);
//        $scope.userRegistered = true;
//        confirm("'" + newUser.username + "' registered! An email will be sent to your email address in order to verify its validity.", "", function(ret) {
//            window.location.href = '#/home';
//        });
        alert("'" + newUser.username + "' registered! An email will be sent to your email address in order to verify its validity.");
        window.location.href = '#/home';
        window.location.href = '#/login';

    };

    $scope.isLoggedIn = function() {
        return $scope.user != null;
    };

    $scope.login = function(username, password) {
        var foundUser = null;
        angular.forEach($scope.users, function(user) {
           if (user.username.toLowerCase() == username.toLowerCase()) {
               foundUser = user;
           }
        });
        if (foundUser == null || foundUser.password != password) {
            $scope.loginFailureMessage = 'Invalid credentials!';
        } else {
            $scope.loginFailureMessage = null;
        }

        if ($scope.loginFailureMessage != null) {
            $scope.user = null;
            return;
        }

        $scope.user = foundUser;
        if ($scope.user != null) {
            window.location.href = '#/home';
        }

    };

    $scope.logout = function() {
        $scope.user = null;
        window.location.href = '#/home';
    };

    $scope.cpw_old_pw = '';
    $scope.cpw_new_pw_1 = '';
    $scope.cpw_new_pw_2 = '';

    $scope.changePasswordFailureMessage = null;
    $scope.changePassword = function(user, old_pw, new_pw_1, new_pw_2) {
        console.info(user.password + ", " + old_pw);
        if (user.password != old_pw) {
            $scope.changePasswordFailureMessage = 'Wrong password, please try again!';
        } else if (new_pw_1 == undefined || new_pw_1.length < 7) {
            $scope.changePasswordFailureMessage = 'The password must be at least 7 characters long!';
        } else if (new_pw_1 != new_pw_2) {
            $scope.changePasswordFailureMessage = 'The passwords do not match!';
        } else {
            $scope.changePasswordFailureMessage = null;
        }

        if ($scope.changePasswordFailureMessage != null) {
            return;
        }

        $scope.user.password = new_pw_1;
        $scope.cpw_old_pw = '';
        $scope.cpw_new_pw_1 = '';
        $scope.cpw_new_pw_2 = '';

        alert('Password successfully changed!');

    };
   
    $scope.getNumNotiAll = function(unis) {
      var num = 0;  
      unis.forEach(function(uni) {
        uni.lvas.forEach(function(lva) {
          lva.semester.forEach(function(sem) {
            if(sem.beispiele != null) {
              sem.beispiele.forEach(function(beispiel) {
                if(beispiel.contributors != null) {
                  beispiel.contributors.forEach(function(cont) {
                      if(cont.testfiles != null) {
                        cont.testfiles.forEach(function(tf) {
                          if(tf.notificate == true) {
                            num++;
                          }
                        });
                      }
                   });
                 }
              });
            } 
          });
        });  
      });     
      return num;
    }   
    
    $scope.getNumNotiLva = function(lva) {
      var num = 0;
      lva.semester.forEach(function(sem) {
        if(sem.beispiele != null) {
          sem.beispiele.forEach(function(beispiel) {
            if(beispiel.contributors != null) {
              beispiel.contributors.forEach(function(cont) {
                  if(cont.testfiles != null) {
                    cont.testfiles.forEach(function(tf) {
                      if(tf.notificate == true) {
                        num++;
                      }
                    });
                  }
               });
             }
          });
        } 
      });
      return num;
    }
    $scope.getNumNotiSem = function(sem) {
      var num = 0;
      sem.beispiele.forEach(function(beispiel) {
        if(beispiel.contributors != null) {
          beispiel.contributors.forEach(function(cont) {
              if(cont.testfiles != null) {
                cont.testfiles.forEach(function(tf) {
                  if(tf.notificate == true) {
                    num++;
                  }
                });
              }
           });
         }
      });
      return num;
    }
    $scope.getNumNotiTBeispiel = function(beispiel) {
       var num = 0;
       beispiel.contributors.forEach(function(cont) {
          if(cont.testfiles != null) {
            cont.testfiles.forEach(function(tf) {
              if(tf.notificate == true) {
                num++;
              }
            });
          }
       });
       return num;
    }
    $scope.getNumNotiCont = function(cont) {
      var num = 0;
      if(cont.testfiles != null) {
        cont.testfiles.forEach(function(tf) {
          if(tf.notificate == true) {
            num++;
          }
        });
      }
      return num;
    }
    
    $scope.inputText = '';
    
    $scope.addComment = function(user, text) {
        $scope.inputText = '';
    	var date = new Date();
        $scope.comments.push({
        	'username': user.username,
        	'date': date.today(),
        	'text': text
        });
        if ($scope.comments.length > 10) {
              $scope.comments.splice(0, 1);
        }
    };

    $scope.users = [
        {username:'Martin', password:'password', email:'e1234567@student.tuwien.ac.at', notifications: { type: {push: 'true', email:'false'}, trigger: { newTestfiles: 'true', comments: 'false', answer: 'true'}}},
        {username:'Floff', password:'password', email:'e9876543@student.tuwien.ac.at', notifications: { type: {push: 'false', email:'false'}, trigger: { newTestfiles: 'false', comments: 'false', answer: 'false'}}},
        {username:'Jotschi', password:'password', email:'e5647382@student.tuwien.ac.at', notifications: { type: {push: 'false', email:'true'}, trigger: { newTestfiles: 'false', comments: 'false', answer: 'true'}}},
        {username:'Micc', password:'password', email:'e1946243@student.tuwien.ac.at', notifications: { type: {push: 'true', email:'true'}, trigger: { newTestfiles: 'true', comments: 'true', answer: 'true'}}}
    ];
    
    $scope.comments = [
        {username:'DumbUtuber', date:'10/12/2014', text:'First!'},
        {username:'xXxD347hKn1gh7xXx', date:'12/12/2014', text:'Ich hab schon viel bessere Testf�lle geschrieben!'},
        {username:'GreenThumb420', date:'12/12/2014', text:'Die Haltungsbedingungen von diesen industriell gehaltenen Testf�llen sind einfach unm�glich zu rechtfertigen!'},
    ];

    $scope.unis = [
        {name: 'HTL Hollabrunn', lvas: [
            {name: 'Objektorientierte Programmiertechniken', typ:'VU', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', favorite: true, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: '', contributors:[]},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: '', contributors:[]},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: '', contributors:[]}
                ]},
                {name: 'WS13', favorite: true, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: '', contributors:[]},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: '', contributors:[]},
                    {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: '', contributors:[]},
                    {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: '', contributors:[]},
                    {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: '', contributors:[]},
                    {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: '', contributors:[]},
                    {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: '', contributors:[]}
                ]}
            ]}
        ]},
        {name: 'Technikum Wien', lvas: [
	    {name: 'LVA 1', typ:'VU', kurzname: '', nummer: '', institut: '', website: '', semester:[]},
	    {name: 'LVA 2', typ:'VU', kurzname: '', nummer: '', institut: '', website: '', semester:[]},
	    {name: 'LVA 3', typ:'VO', kurzname: '', nummer: '', institut: '', website: '', semester:[]}
        ]},
        {name: 'TU Wien', lvas: [
            {name: 'Objektorientierte Programmiertechniken', typ:'VU', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', favorite: true, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: '', contributors: [
                        {user:'Micc', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestOranges.java', notificate:true, votesUp:'9', votesDown:'1', description:'', voted:'0', code:'public class TestOranges {}', comments:'17', downloads:'25', forDownload:'false'},
                            {filename:'TestBananas.java', notificate:true,votesUp:'21', votesDown:'4', description:'', voted:'0', code:'public class TestBananas {}', comments:'34', downloads:'2', forDownload:'false'},
                            {filename:'TestKiwi.java',  notificate:true,votesUp:'0', votesDown:'12', description:'', voted:'0', code:'public class TestKiwi {}', comments:'142', downloads:'15', forDownload:'false'}
                        ]},
                        {user:'Floff', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestApples.java',  notificate:true,votesUp:'16', votesDown:'0', description:'', voted:'0', code:'public class TestApples {}', comments:'2', downloads:'13', forDownload:'false'}
                        ]}
                    ]},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: '', contributors: [
                        {user:'Micc', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestSuperman.java',  notificate:false, votesUp:'9', votesDown:'1', description:'', voted:'0', code:'public class TestSuperman {}', comments:'45', downloads:'23', forDownload:'false'}
                        ]},
                        {user:'Martin', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestBatman.java', notificate:false, votesUp:'16', votesDown:'1', description:'', voted:'0', code:'public class TestBatman {}', comments:'12', downloads:'334', forDownload:'false'},
                            {filename:'TestSuperwoman.java', notificate:false, votesUp:'18', votesDown:'0', description:'', voted:'0', code:'public class TestSuperwoman {}', comments:'0', downloads:'12', forDownload:'false'}
                        ]},
                        {user:'Jotschi', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestAquaman.java', votesUp:'20', notificate:false, votesDown:'4', description:'', voted:'0', code:'public class TestAquaman {}', comments:'11', downloads:'31', forDownload:'false'},
                            {filename:'TestCatwoman.java', votesUp:'7', notificate:true, votesDown:'2', description:'', voted:'0', code:'public class TestCatwoman {}', comments:'2', downloads:'24', forDownload:'false'}
                        ]}
                    ]},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: '', contributors: [
                        {user:'Floff', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestRechteck.java', votesUp:'9', notificate:false, votesDown:'1', description:'', voted:'0', code:'public class TestRechteck {}', comments:'52', downloads:'2', forDownload:'false'}
                        ]},
                        {user:'Micc', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestPunkt.java', votesUp:'2', votesDown:'41', notificate:false, description:'', voted:'0', code:'public class TestPunkt {}', comments:'3112', downloads:'52', forDownload:'false'}
                        ]},
                        {user:'Martin', allSelected:'false', votedAll:'1', testfiles:[
                            {filename:'TestKreis.java', votesUp:'16', votesDown:'1', notificate:false, description:'', voted:'1', code:'public class TestKreis {}', comments:'1', downloads:'17', forDownload:'false'},
                            {filename:'TestQuadrat.java', votesUp:'18', votesDown:'0', notificate:false, description:'', voted:'1', code:'public class TestQuadrat {}', comments:'2', downloads:'18', forDownload:'false'}
                        ]},
                        {user:'Jotschi', allSelected:'false', votedAll:'0', testfiles:[
                            {filename:'TestElipse.java', votesUp:'20', votesDown:'4', notificate:false, description:'', voted:'-1', code:'public class TestElipse {}', comments:'4', downloads:'35', forDownload:'false'},
                            {filename:'TestGerade.java', votesUp:'7', votesDown:'2', notificate:false, description:'', voted:'0', code:'public class TestGerade {}', comments:'0', downloads:'13', forDownload:'false'}
                        ]}
                    ]}
                ]},
                {name: 'WS13', favorite: true, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: '', contributors:[]},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: '', contributors:[]},
                    {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: '', contributors:[]},
                    {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: '', contributors:[]},
                    {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: '', contributors:[]},
                    {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: '', contributors:[]},
                    {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: '', contributors:[]}
                ]}
            ]},
            {name: 'Interface and Interaction Design', typ:'VU', kurzname: 'IIXD', nummer: '183.289', institut: 'Institut für Rechnergestützte Automation', website: 'http://www.inso.tuwien.ac.at/lectures/iixd/', semester: [
                {name: 'WS14', favorite: true, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: '', contributors:[]},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: '', contributors:[]}
                ]},
                {name: 'WS13', favorite: false, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: '', contributors:[]},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: '', contributors:[]},
                    {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: '', contributors:[]}
                ]}
            ]},
            {name: 'Funktionale Programmierung', typ:'VU', kurzname: 'FUNCPROG', nummer: '311.813', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/funcprog', semester: [
                {name: 'WS14', favorite: false, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: '', contributors:[]},
                    {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: '', contributors:[]},
                    {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: '', contributors:[]}
                ]}
            ]},
            {name: 'Software Engineering & Projekt Management', typ:'UE', kurzname: 'SEPM', nummer: '346.952', institut: 'QSE', website: 'http://qse.tuwien.ac.at', semester: [
                {name: 'WS14', favorite: false, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '17.11.2014', url: '', contributors:[]},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '02.01.2014', url: '', contributors:[]}
                ]},
                {name: 'SS14', favorite: false, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: '', contributors:[]},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: '', contributors:[]}
                ]}
            ]}
        ]},
        {name: 'Uni Wien', lvas: [
            {name: 'LVA 1', typ:'VO', kurzname: '', nummer: '', institut: '', website: '', semester:[]},
            {name: 'LVA 2', typ:'UE', kurzname: '', nummer: '', institut: '', website: '', semester:[]}
        ]}

    ];

    $scope.favoriteUni = $scope.unis[2];

    var beispiele = [];
    $scope.unis.forEach(function(uni) {
        uni.lvas.forEach(function(lva) {
            lva.semester.forEach(function(sem) {
                sem.beispiele.forEach(function(bsp) {
                    beispiele.push({
                        'uni': uni,
                        'lva': lva,
                        'sem': sem,
                        'bsp': bsp
                    });
                });
            });
        });
    });


    $scope.getBeispiele = function() {
        return beispiele;
    };

    var testFiles = [];
    $scope.unis.forEach(function(uni) {
        uni.lvas.forEach(function(lva) {
            lva.semester.forEach(function(sem) {
                sem.beispiele.forEach(function(bsp) {
                    bsp.contributors.forEach(function(contr) {
                        contr.testfiles.forEach(function(value) {
                            testFiles.push({
                                'uni': uni,
                                'lva': lva,
                                'sem': sem,
                                'bsp': bsp,
                                'contr': contr,
                                'value': value
                            });
                        });
                    });
                });
            });
        });
    });


    $scope.getTestfiles = function() {
        return testFiles;
    };

    var lvas = [];
    $scope.unis.forEach(function(uni) {
        uni.lvas.forEach(function(lva) {
            lvas.push({
                'lva': lva,
                'uni': uni
            });
        });
    });

    $scope.getLVAs = function() {
        return lvas;
    };
});