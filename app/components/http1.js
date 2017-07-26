/**
 * Created by Administrator on 2017/2/24.
 */
'use strict';
(function (angular) {
	var http = angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$document', function ($document) {
		this.jsonp = function (url,callback) {

		};
	}]);
})(angular);
