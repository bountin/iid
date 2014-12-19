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
    $scope.changeSelectedForDownload = function(testfile) {
       if(testfile.forDownload == 1) {
          testfile.forDownload = 0;
       } else {
          testfile.forDownload = 1;
       }
    };
    $scope.getVotesForTestfile = function(testfile) {
       var sum = testfile.votesUp - testfile.votesDown;
       var result = [];
       if (sum > 0) result.push('+');
       if (sum < 0) result.push('-');
       result.push(sum);
       return result;
    };
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
    $scope.fileSelected = false;
    $scope.newLVA = {name:'<neue Lehrveranstaltung>'};
    $scope.newSemester = {name:'<neues Semester>'};
    $scope.newBeispiel = {name:'<neues Beispiel>'};
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
        result.push(selectedSemester.beispiele);
        angular.forEach(selectedSemester.beispiele, function(bsp) {
            result.push(bsp);
        });
        result.push($scope.newBeispiel);
        return result;
    };
    
    $scope.getAvgVotesForContributor = function(contributor) {
       if (contributor == undefined) {
           return [];
       }
       var result = [];
       result.push(13);
       return result;
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
        var newUser = {username: username, email: email, password: password};
        $scope.users.push(newUser);
//        $scope.userRegistered = true;
        alert("'" + newUser.username + "' registered! An email will be sent to your email address in order to verify its validity.")
    };

    $scope.login = function(username, password) {
        var foundUser = null;
        angular.forEach($scope.users, function(user) {
           if (user.username == username) {
               foundUser = user;
           }
        });
        if (foundUser == null || foundUser.password != password) {
            $scope.loginFailureMessage = 'Invalid credentials!';
        } else {
            $scope.loginFailureMessage = null;
        }

        $scope.user = foundUser;

    };

    $scope.users = [
        {username:'Martin', password:'password', email:'e1234567@student.tuwien.ac.at'},
        {username:'Floff', password:'password', email:'e9876543@student.tuwien.ac.at'},
        {username:'Jotschi', password:'password', email:'e5647382@student.tuwien.ac.at'},
        {username:'Micc', password:'password', email:'e1946243@student.tuwien.ac.at'},
    ];

    $scope.unis = [
        {name: 'HTL Hollabrunn', lvas: [
            {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', favorite: true, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
                ]},
                {name: 'WS13', favorite: true, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: ''},
                    {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: ''},
                    {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: ''},
                    {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: ''},
                    {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: ''}
                ]}
            ]}
        ]},
        {name: 'Technikum Wien', lvas: [
	    {name: 'LVA 1', kurzname: '', nummer: '', institut: '', website: '', semester:[]},
	    {name: 'LVA 2', kurzname: '', nummer: '', institut: '', website: '', semester:[]},
	    {name: 'LVA 3', kurzname: '', nummer: '', institut: '', website: '', semester:[]}
        ]},
        {name: 'TU Wien', lvas: [
            {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', favorite: true, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: '', contributors: [
                        {user:'Micc', testfiles:[
                            {filename:'TestOranges.java', votesUp:'9', votesDown:'1', description:'', voted:'0', code:'public class TestOranges {}', comments:'17', downloads:'25', forDownload:'0'},
                            {filename:'TestBananas.java', votesUp:'21', votesDown:'4', description:'', voted:'0', code:'public class TestBananas {}', comments:'34', downloads:'2', forDownload:'0'},
                            {filename:'TestKiwi.java', votesUp:'0', votesDown:'12', description:'', voted:'0', code:'public class TestKiwi {}', comments:'142', downloads:'15', forDownload:'0'}
                        ]},
                        {user:'Floff', testfiles:[
                            {filename:'TestApples.java', votesUp:'16', votesDown:'0', description:'', code:'public class TestApples {}', comments:'2', downloads:'13', forDownload:'0'}
                        ]}
                    ]},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: '', contributors: [
                        {user:'Micc', testfiles:[
                            {filename:'TestSuperman.java', votesUp:'9', votesDown:'1', description:'', voted:'0', code:'public class TestSuperman {}', comments:'45', downloads:'23', forDownload:'0'}
                        ]},
                        {user:'Martin', testfiles:[
                            {filename:'TestBatman.java', votesUp:'16', votesDown:'1', description:'', voted:'0', code:'public class TestBatman {}', comments:'12', downloads:'334', forDownload:'0'},
                            {filename:'TestSuperwoman.java', votesUp:'18', votesDown:'0', description:'', voted:'0', code:'public class TestSuperwoman {}', comments:'0', downloads:'12', forDownload:'0'}
                        ]},
                        {user:'Jotschi', testfiles:[
                            {filename:'TestAquaman.java', votesUp:'20', votesDown:'4', description:'', voted:'0', code:'public class TestAquaman {}', comments:'11', downloads:'31', forDownload:'0'},
                            {filename:'TestCatwoman.java', votesUp:'7', votesDown:'2', description:'', voted:'0', code:'public class TestCatwoman {}', comments:'2', downloads:'24', forDownload:'0'}
                        ]}
                    ]},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: '', contributors: [
                        {user:'Floff', testfiles:[
                            {filename:'TestRechteck.java', votesUp:'9', votesDown:'1', description:'', voted:'0', code:'public class TestRechteck {}', comments:'52', downloads:'2', forDownload:'0'}
                        ]},
                        {user:'Micc', testfiles:[
                            {filename:'TestPunkt.java', votesUp:'2', votesDown:'41', description:'', voted:'0', code:'public class TestPunkt {}', comments:'3112', downloads:'52', forDownload:'0'}
                        ]},
                        {user:'Martin', testfiles:[
                            {filename:'TestKreis.java', votesUp:'16', votesDown:'1', description:'', voted:'1', code:'public class TestKreis {}', comments:'1', downloads:'17', forDownload:'0'},
                            {filename:'TestQuadrat.java', votesUp:'18', votesDown:'0', description:'', voted:'1', code:'public class TestQuadrat {}', comments:'2', downloads:'18', forDownload:'0'}
                        ]},
                        {user:'Jotschi', testfiles:[
                            {filename:'TestElipse.java', votesUp:'20', votesDown:'4', description:'', voted:'-1', code:'public class TestElipse {}', comments:'4', downloads:'35', forDownload:'0'},
                            {filename:'TestGerade.java', votesUp:'7', votesDown:'2', description:'', voted:'0', code:'public class TestGerade {}', comments:'0', downloads:'13', forDownload:'0'}
                        ]}
                    ]}
                ]},
                {name: 'WS13', favorite: true, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: ''},
                    {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: ''},
                    {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: ''},
                    {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: ''},
                    {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: ''}
                ]}
            ]},
            {name: 'VU Interface and Interaction Design', kurzname: 'IIXD', nummer: '183.289', institut: 'Institut für Rechnergestützte Automation', website: 'http://www.inso.tuwien.ac.at/lectures/iixd/', semester: [
                {name: 'WS14', favorite: true, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: ''}
                ]},
                {name: 'WS13', favorite: false, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: ''},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: ''},
                    {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: ''}
                ]}
            ]},
            {name: 'VU Funktionale Programmierung', kurzname: 'FUNCPROG', nummer: '311.813', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/funcprog', semester: [
                {name: 'WS14', favorite: false, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: ''}
                ]}
            ]},
            {name: 'UE Software Engineering & Projekt Management', kurzname: 'SEPM', nummer: '346.952', institut: 'QSE', website: 'http://qse.tuwien.ac.at', semester: [
                {name: 'WS14', favorite: false, startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '02.01.2014', url: ''}
                ]},
                {name: 'SS14', favorite: false, startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: ''},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: ''}
                ]}
            ]}
        ]},
        {name: 'Uni Wien', lvas: [
	    {name: 'LVA 1', kurzname: '', nummer: '', institut: '', website: '', semester:[]},
	    {name: 'LVA 2', kurzname: '', nummer: '', institut: '', website: '', semester:[]}
        ]}

    ];

    $scope.getBeispiele = function() {

        var result = [];

        var i = 0;
        $scope.unis.forEach(function(uni) {
            uni.lvas.forEach(function(lva) {
                lva.semester.forEach(function(sem) {
                    sem.beispiele.forEach(function(bsp) {
                        result2[j] = {
                            'uni': uni,
                            'lva': lva,
                            'sem': sem,
                            'bsp': bsp
                        };
                        alert(j + ':' + result2[j].bsp.name);
                        j++;

                    });
                });
            });
        });
//        result2.forEach(function(obj) {
//            alert(obj.lva);
//        });
        return result2;
    };

    $scope.getLVAs = function() {
        result = [];

        i = 0;
        $scope.unis.forEach(function(uni) {
            uni.lvas.forEach(function(lva) {
                result[i] = {
                    'lva': lva,
                    'uni': uni
                };
                i++;
            });
        });
        return result;
    };

});