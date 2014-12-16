Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var iidControllers = angular.module('iidControllers', []);
iidControllers.controller('TestfileAddController', function($scope) {
//    $scope.searchString = ($location.search()).searchString;
    $scope.saved = false;
    $scope.newLVA = '<neue Lehrveranstaltung>';
    $scope.newSemester = '<neues Semester>';
    $scope.newBeispiel = '<neues Beispiel>';
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
    $scope.lvas = [
        {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
            ]},
            {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: ''},
                {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: ''},
                {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: ''},
                {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: ''},
                {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: ''},
                {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: ''},
                {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: ''}
            ]}
        ]},
        {name: 'VU Interface and Interaction Design', kurzname: 'IIXD', nummer: '183.289', institut: 'Institut für Rechnergestützte Automation', website: 'http://www.inso.tuwien.ac.at/lectures/iixd/', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: ''}
            ]},
            {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: ''},
                {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: ''},
                {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: ''}
            ]}
        ]},
        {name: 'VU Funktionale Programmierung', kurzname: 'FUNCPROG', nummer: '311.813', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/funcprog', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: ''},
                {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: ''}
            ]}
        ]},
        {name: 'UE Software Engineering & Projekt Management', kurzname: 'SEPM', nummer: '346.952', institut: 'QSE', website: 'http://qse.tuwien.ac.at', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '02.01.2014', url: ''}
            ]},
            {name: 'SS14', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: ''},
                {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: ''}
            ]}
        ]}
    ];

    $scope.semester =
    [
        {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
            {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
            {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
            {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
        ]},
        {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
            {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: ''},
            {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: ''},
            {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: ''},
            {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: ''},
            {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: ''},
            {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: ''},
            {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: ''}
        ]}
    ];

    $scope.beispiele = [
        {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: '', lva:"VU Objektorientierte Programmiertechniken"},
        {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: '', lva:"VU Objektorientierte Programmiertechniken"},
        {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: '', lva:"VU Objektorientierte Programmiertechniken"},
        {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: '', lva:"VU Objektorientierte Programmiertechniken"},
        {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: '', lva:"VU Objektorientierte Programmiertechniken"},
        {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: '', lva:"VU Objektorientierte Programmiertechniken"},
        {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: '', lva:"VU Objektorientierte Programmiertechniken"}
    ];

    $scope.unis = [
        {name: 'HTL Hollabrunn', lvas: [
            {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
                ]},
                {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
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
            {name: 'LVA 1', kurzname: '', nummer: '', institut: '', website: ''},
            {name: 'LVA 2', kurzname: '', nummer: '', institut: '', website: ''},
            {name: 'LVA 3', kurzname: '', nummer: '', institut: '', website: ''}
        ]},
        {name: 'TU Wien', lvas: [
            {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
                ]},
                {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
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
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: ''}
                ]},
                {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: ''},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: ''},
                    {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: ''}
                ]}
            ]},
            {name: 'VU Funktionale Programmierung', kurzname: 'FUNCPROG', nummer: '311.813', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/funcprog', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: ''}
                ]}
            ]},
            {name: 'UE Software Engineering & Projekt Management', kurzname: 'SEPM', nummer: '346.952', institut: 'QSE', website: 'http://qse.tuwien.ac.at', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '02.01.2014', url: ''}
                ]},
                {name: 'SS14', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: ''},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: ''}
                ]}
            ]}
        ]},
        {name: 'Uni Wien', lvas: [
            {name: 'LVA 1', kurzname: '', nummer: '', institut: '', website: ''},
            {name: 'LVA 2', kurzname: '', nummer: '', institut: '', website: ''}
        ]}

    ];

});




iidControllers.controller('SearchGlobalController', function($scope) {
//    $scope.searchString = ($location.search()).searchString;
    $scope.saved = false;
    $scope.newLVA = '<neue Lehrveranstaltung>';
    $scope.newSemester = '<neues Semester>';
    $scope.newBeispiel = '<neues Beispiel>';
    $scope.lvas = [
        {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
            ]},
            {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: ''},
                {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: ''},
                {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: ''},
                {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: ''},
                {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: ''},
                {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: ''},
                {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: ''}
            ]}
        ]},
        {name: 'VU Interface and Interaction Design', kurzname: 'IIXD', nummer: '183.289', institut: 'Institut für Rechnergestützte Automation', website: 'http://www.inso.tuwien.ac.at/lectures/iixd/', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: ''}
            ]},
            {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: ''},
                {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: ''},
                {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: ''}
            ]}
        ]},
        {name: 'VU Funktionale Programmierung', kurzname: 'FUNCPROG', nummer: '311.813', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/funcprog', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: ''},
                {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: ''}
            ]}
        ]},
        {name: 'UE Software Engineering & Projekt Management', kurzname: 'SEPM', nummer: '346.952', institut: 'QSE', website: 'http://qse.tuwien.ac.at', uni: "TU Wien", semester: [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '02.01.2014', url: ''}
            ]},
            {name: 'SS14', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: ''},
                {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: ''}
            ]}
        ]}
    ];

    $scope.semester =
        [
            {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
            ]},
            {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: ''},
                {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: ''},
                {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: ''},
                {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: ''},
                {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: ''},
                {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: ''},
                {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: ''}
            ]}
        ];

    $scope.beispiele = [
        {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: '', uni:"TU Wien", lva:"VU Funktionale Programmierung", lva_kurz:"fprog", semester:"WS14"},
        {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: '', uni:"TU Wien", lva:"VU Funktionale Programmierung", lva_kurz:"fprog", semester:"WS14"},
        {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: '', uni:"TU Wien", lva:"VU Funktionale Programmierung", lva_kurz:"fprog", semester:"WS14"},
        {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: '', uni:"TU Wien", lva:"VU Interface and Interaction Design", lva_kurz:"IIXD", semester:"WS14"},
        {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: '', uni:"TU Wien", lva:"VU Interface and Interaction Design", lva_kurz:"IIXD", semester:"WS14"},
        {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: '', uni:"TU Wien", lva:"VU Interface and Interaction Design", lva_kurz:"IIXD", semester:"WS13"},
        {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: '', uni:"TU Wien", lva:"VU Interface and Interaction Design", lva_kurz:"IIXD", semester:"WS13"},
        {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: '', uni:"TU Wien", lva:"VU Interface and Interaction Design", lva_kurz:"IIXD", semester:"WS13"},
        {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '15.11.2013', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken",  lva_kurz:"OOP", semester:"WS14"},
        {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '22.11.2013', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken", lva_kurz:"OOP", semester:"WS14"},
        {name: 'Beispiel 3', angabe: 'oop1.pdf', deadline: '29.11.2013', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken", lva_kurz:"OOP", semester:"WS14"},
        {name: 'Beispiel 4', angabe: 'oop2.pdf', deadline: '05.12.2013', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken", lva_kurz:"OOP", semester:"WS14"},
        {name: 'Beispiel 5', angabe: 'oop1.pdf', deadline: '12.12.2013', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken", lva_kurz:"OOP", semester:"WS14"},
        {name: 'Beispiel 6', angabe: 'oop2.pdf', deadline: '19.12.2013', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken", lva_kurz:"OOP", semester:"WS14"},
        {name: 'Beispiel 7', angabe: 'oop3.pdf', deadline: '09.01.2014', url: '', uni:"TU Wien", lva:"VU Objektorientierte Programmiertechniken", lva_kurz:"OOP", semester:"WS14"},
        {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: '', uni:"TU Wien", lva:"UE Software Engineering & Projekt Management", lva_kurz:"UE SEPM", semester:"WS14"},
        {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: '', uni:"TU Wien", lva:"UE Software Engineering & Projekt Management", lva_kurz:"UE SEPM", semester:"WS14"},
        {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2013', url: '', uni:"TU Wien", lva:"UE Software Engineering & Projekt Management", lva_kurz:"UE SEPM", semester:"WS13"},
        {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2013', url: '', uni:"TU Wien", lva:"UE Software Engineering & Projekt Management", lva_kurz:"UE SEPM", semester:"WS13"}
    ];

    $scope.unis = [
        {name: 'HTL Hollabrunn', lvas: [
            {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
                ]},
                {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
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
            {name: 'LVA 1', kurzname: '', nummer: '', institut: '', website: ''},
            {name: 'LVA 2', kurzname: '', nummer: '', institut: '', website: ''},
            {name: 'LVA 3', kurzname: '', nummer: '', institut: '', website: ''}
        ]},
        {name: 'TU Wien', lvas: [
            {name: 'VU Objektorientierte Programmiertechniken', kurzname: 'OOP', nummer: '311.294', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/oop', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'oop1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'oop2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'oop3.pdf', deadline: '19.12.2014', url: ''}
                ]},
                {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
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
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '02.12.2014', url: ''}
                ]},
                {name: 'WS13', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Übung 1', angabe: 'iixd1.pdf', deadline: '15.11.2013', url: ''},
                    {name: 'Übung 2', angabe: 'iixd2.pdf', deadline: '30.11.2013', url: ''},
                    {name: 'Übung 3', angabe: 'iixd3.pdf', deadline: '17.12.2013', url: ''}
                ]}
            ]},
            {name: 'VU Funktionale Programmierung', kurzname: 'FUNCPROG', nummer: '311.813', institut: 'Institut für Computersprachen', website: 'http://complang.tuwien.ac.at/funcprog', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Beispiel 1', angabe: 'fprog1.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Beispiel 2', angabe: 'fprog2.pdf', deadline: '02.12.2014', url: ''},
                    {name: 'Beispiel 3', angabe: 'fprog3.pdf', deadline: '19.12.2014', url: ''}
                ]}
            ]},
            {name: 'UE Software Engineering & Projekt Management', kurzname: 'SEPM', nummer: '346.952', institut: 'QSE', website: 'http://qse.tuwien.ac.at', semester: [
                {name: 'WS14', startDatum: '01.10.2014', endDatum: '30.01.2015', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '17.11.2014', url: ''},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '02.01.2014', url: ''}
                ]},
                {name: 'SS14', startDatum: '01.10.2013', endDatum: '30.01.2014', beispiele: [
                    {name: 'Einzelbeispiel', angabe: 'einzelbeispiel.pdf', deadline: '01.04.2014', url: ''},
                    {name: 'Gruppenbeispiel', angabe: 'gruppenbeispiel.pdf', deadline: '23.06.2014', url: ''}
                ]}
            ]}
        ]},
        {name: 'Uni Wien', lvas: [
            {name: 'LVA 1', kurzname: '', nummer: '', institut: '', website: ''},
            {name: 'LVA 2', kurzname: '', nummer: '', institut: '', website: ''}
        ]}

    ];

});