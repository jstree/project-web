'use strict';

define(['projectWeb'],
  function () {
    var routeModule = angular.module('projectWeb', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute',
      'ngSanitize', 'ngTouch', 'pascalprecht.translate', 'tmh.dynamicLocale']);

    // constand setting
    routeModule.constant('DEBUG_MODE', true);
    routeModule.constant('VERSION_TAG', new Date().getTime());
    routeModule.constant('LOCALES', {
      'locales': {
        'ko_KR': '한글',
        'en_US': 'English'
      },
      'preferredLocale': 'ko_KR'
    }); // LOCALES end

    // route config
    routeModule.config(['$routeProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
      function ($routeProvider, $stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
          debug: true,
          events: true,
          suppressBootstrapWarning: true
        });

        $urlRouterProvider.otherwise("/");
        $locationProvider.hashPrefix("StandardDevelopment#");

        $stateProvider.state('rivalWar', {
          url: "/",
          views: {
            '': {
              controller: 'rivalWarLayoutController',
              templateUrl: 'partials/layout/rivalWarLayoutIndex.html'
            }
          },
          resolve: {
            Index: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load([{
                name: 'rivalWarLayoutControllerModule',
                files: ['partials/layout/rivalWarLayoutController.js'],
                cache: false
              }, {
                name: 'rivalWarLayoutServiceModule',
                files: ['partials/layout/rivalWarLayoutService.js'],
                cache: false
              }, {
                name: 'rivalWarDataServiceModule',
                files: ['partials/layout/rivalWarDataService.js'],
                cache: false
              },{
                name: 'rivalWarLayoutDirectiveModule',
                files: ['partials/layout/rivalWarLayoutDirective.js'],
                cache: false
              }]); //$ocLazyLoad end
            }] //devIndex end
          } // resolve end
        }); //state end
      }]); // routeModule.config end

    //이하 다국어 처리 부
    routeModule.config(function ($compileProvider, DEBUG_MODE) {
      if (!DEBUG_MODE) {
        $compileProvider.debugInfoEnabled(false);
      }
    });// $compileProvider end

    routeModule.config(function ($translateProvider, DEBUG_MODE, LOCALES) {
      if (DEBUG_MODE) {
        $translateProvider.useMissingTranslationHandlerLog();// warns
      }
      $translateProvider.useStaticFilesLoader({
        prefix: 'partials/common/lang/locale-',
        suffix: '.json'
      });

      $translateProvider.useSanitizeValueStrategy('escapeParameters');
      $translateProvider.preferredLanguage(LOCALES.preferredLocale);
      $translateProvider.useLocalStorage();
    });// $translateProvider end

    routeModule.config(function (tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('lib/angular-i18n/angular-locale_{{locale}}.js');
    }); // tmhDynamicLocaleProvider end

  }); // function end
