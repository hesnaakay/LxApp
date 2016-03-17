
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "Partials/home.html",
            controller: "mainController"
        })

        .when("/yonet", {
            templateUrl: "Partials/yonet.html",
            controller: "yonetController"
        }).otherwise({ redirectTo: "/home" });


});

var yonetController = function ($scope, $http) {
    $scope.message = "Yönetici Sayfası";
    $scope.newkomut = {};
    $scope.butunkomutlar = [];
    $scope.isHttpBusy = false;
    $scope.isUpdating = false;
    $scope.updatedKomut = {};

    var onNewKomutOk = function (response) {
        // eğer başarılı olursa, bütün komutlar için tekrar bir get isteği yapmama gerek yok, zaten web api kısmında yeni eklenen Komut nesnesini döndürüyorum, yapmama gereken bu yeni gelen nesneyi varolan dizime eklemek
        $scope.butunkomutlar.push(response.data);
        $scope.isHttpBusy = false;
    };

    var onNewKomutError = function (reason) {
        $scope.isHttpBusy = false;
        alert("Yeni komut eklenemedi!");
    }

    $scope.addNew = function () {
        $scope.isHttpBusy = true;
        $http.post("/api/komut/newkomut", $scope.newkomut).then(onNewKomutOk, onNewKomutError);
    };

    $scope.hepsiniGor = function () {
        $scope.isHttpBusy = true;
        $http.get("/api/komut/hepsi").then(function (response) {
            $scope.isHttpBusy = false;
            $scope.butunkomutlar = response.data;
        },
        function (reason) {
            $scope.isHttpBusy = false;
            alert("bütün komutlar alrınırken bit hata oluştu!");
        });
    }

    $scope.toggleIsUpdating = function () {
        $scope.isUpdating = !$scope.isUpdating;
    }

    var onUpdateOk = function (response) {
        $scope.isHttpBusy = false;
        $.grep($scope.butunkomutlar, function (e) {
            return e.Id === response.data.Id;
        });
    };

    var onUpdateError = function (reason) {
        $scope.isHttpBusy = false;
        alert("Guncelleme yapılamadı!");
    }

    $scope.updateKomut = function (k) {
        $scope.isHttpBusy = true;
        $http.put("/api/komut/guncelle",k).then(onUpdateOk, onUpdateError);
    };

    $http.get("/api/komut/hepsi").then(function (response) {
        $scope.isHttpBusy = false;
        $scope.butunkomutlar = response.data;
    },
       function (reason) {
           $scope.isHttpBusy = false;
           alert("bütün komutlar alrınırken bit hata oluştu!");
       });
};

var mainController = function ($scope, $http) {
    $scope.message = "Linux Komutları";
    $scope.newkomut = Object();
    $scope.isHttpBusy = false;

    var istekBasarili = function (response) {
        $scope.isHttpBusy = false;
        $scope.data = response.data;
    };

    var onError = function (reason) {
        $scope.isHttpBusy = false;

        alert("Hata var!");
    };

    var onKomutOk = function (response) {
        $scope.isHttpBusy = false;

        $scope.komut = response.data;
        alert($scope.komut.Id);

    };
    $scope.getKomut = function () {
        $scope.isHttpBusy = true;

        $http.get('/api/komut/?adi=' + '0komut').then(onKomutOk, onError);
    };
    var onNewKomutOk = function (response) {
        $scope.isHttpBusy = false;

        alert(response.data.Id);
    };

    var onPostError = function (reason) {
        $scope.isHttpBusy = false;

        alert("Yeni komut eklenemedi!");
    };

    $scope.postKomut = function () {
        $scope.isHttpBusy = true;

        //var newKomut = {
        //    KomutAdi:"hesnanın komutu",
        //    Aciklama:"yeni aciklama",
        //    Referans:"falanca referans"
        //};
        $http.post('/api/komut/newkomut', $scope.newkomut).then(onNewKomutOk, onPostError);


    }

    var onHepsiOk = function (response) {
        $scope.butunkomutlar = response.data;
    };

    var onHepsiError = function (reason) {
        alert("Komutların hepsi getirilirken hata oluştu!");
    }

    $http.get("/api/komut/hepsi").then(onHepsiOk, onHepsiError);
    // bütün komutları getirir
    //$http.get('/api/komut/hesna').then(istekBasarili, onError);
};

app.controller('mainController', mainController);
app.controller('yonetController', yonetController);