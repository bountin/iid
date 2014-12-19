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
    $scope.selectedSemester = null;
    $scope.selectedLva = null;      
    $scope.selectedUni = null;
    $scope.setSelectedLva = function(lva) {
      $scope.selectedLva = lva;
    };
    $scope.setSelectedSemester = function(sem, lva) {
      $scope.selectedSemester = sem;
      $scope.selectedLva = lva;  
    };
    $scope.setSelectedUni = function(uni) {
      $scope.selectedUni = uni;
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
    };
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
    $scope.getLVAsForSelectedUni = function() {
        console.info($scope.selectedUni);
        if ($scope.selectedUni == undefined) {
            return [];
        }
        var result = [];
        result.push($scope.selectedUni.lvas);
        result.push($scope.newLVA);
        result.forEach(function(elem) {
            console.info(elem.name);
        });
        return result;
    };

    $scope.getSemesterForSelectedLVA = function(selectedLva) {
        if (selectedLva == undefined) {
            return [];
        }
        var result = [];
        result.push(selectedLva.semester);
        result.push($scope.newSemester);
        return result;
    };

    $scope.getBeispieleForSelectedSemester = function(selectedSemester) {
        if (selectedSemester == undefined) {
            return [];
        }
        var result = [];
        result.push(selectedSemester.beispiele);
        result.push($scope.newBeispiel);
        return result;
    };

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
                            {filename:'TestOranges.java', votesUp:'9', votesDown:'1', description:'', voted:'0'},
                            {filename:'TestBananas.java', votesUp:'21', votesDown:'4', description:'', voted:'0'},
                            {filename:'TestKiwi.java', votesUp:'0', votesDown:'12', description:'', voted:'0'}
                        ]},
                        {user:'Floff', testfiles:[
                            {filename:'TestApples.java', votesUp:'16', votesDown:'0', description:''}
                        ]}
                    ]},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: '', contributors: [
                        {user:'Micc', testfiles:[
                            {filename:'TestSuperman.java', votesUp:'9', votesDown:'1', description:'', voted:'0'}
                        ]},
                        {user:'Martin', testfiles:[
                            {filename:'TestBatman.java', votesUp:'16', votesDown:'1', description:'', voted:'0'},
                            {filename:'TestSuperwoman.java', votesUp:'18', votesDown:'0', description:'', voted:'0'}
                        ]},
                        {user:'Jotschi', testfiles:[
                            {filename:'TestAquaman.java', votesUp:'20', votesDown:'4', description:'', voted:'0'},
                            {filename:'TestCatwoman.java', votesUp:'7', votesDown:'2', description:'', voted:'0'}
                        ]}
                    ]},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: '', contributors: [
                        {user:'Floff', testfiles:[
                            {filename:'TestRechteck.java', votesUp:'9', votesDown:'1', description:'', voted:'0'}
                        ]},
                        {user:'Micc', testfiles:[
                            {filename:'TestPunkt.java', votesUp:'2', votesDown:'41', description:'', voted:'0'}
                        ]},
                        {user:'Martin', testfiles:[
                            {filename:'TestKreis.java', votesUp:'16', votesDown:'1', description:'', voted:'1'},
                            {filename:'TestQuadrat.java', votesUp:'18', votesDown:'0', description:'', voted:'1'}
                        ]},
                        {user:'Jotschi', testfiles:[
                            {filename:'TestElipse.java', votesUp:'20', votesDown:'4', description:'', voted:'-1'},
                            {filename:'TestGerade.java', votesUp:'7', votesDown:'2', description:'', voted:'0'}
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