var app = angular.module("app", ['ui.router','ngMessages','ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/home");

    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "home.html"
        })
        .state("login", {
            url:"/login",
            templateUrl: "login.html"
        })
        .state("home.article", {
            url:"/article?page&size&total&startAt&endAt&status&type&id",
            templateUrl: "article.html"
        })
        .state("home.article_new", {
            url:"/article_new",
            templateUrl: "article_new.html"
        });
});

