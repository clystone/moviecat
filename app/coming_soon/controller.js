/**
 * Created by Administrator on 2017/2/23.
 */
(function (angular) {
	'use strict';
	/*创建正在热映模块*/
	var module = angular.module(
		'moviecat.coming_soon', [
			'ngRoute',
			'moviecat.services.http'
		]);
	/*配置模块的路由*/
	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/coming_soon/:page', {
			templateUrl: 'coming_soon/view.html',
			controller: 'ComingSoonController'
		});
	}]);

	module.controller('ComingSoonController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		function ($scope, $route, $routeParams, HttpService) {
			var page = parseInt($routeParams.page);
			var count = 5;
			var start = (page - 1) * count;
			/*$scope.subjects = data;*/
			$scope.subjects = [];
			$scope.message = '';
			$scope.title = '';
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			$scope.currentPage = page;
			$scope.loading = true;
			HttpService.jsonp(
				'http://api.douban.com/v2/movie/coming_soon',
				{start: start, count: count},
				function (data) {
					$scope.title = data.title;
					$scope.subjects = data.subjects;
					$scope.totalCount = data.total;
					$scope.totalPages = Math.ceil($scope.totalCount / count);
					$scope.loading = false;
					$scope.$apply();
				});
			//更改上一页，下一页的行为
			$scope.go = function (page) {
				if(page>=1&&page<=$scope.totalPages){
					$route.updateParams({page : page});
				}
			};
		}
	]);
})(angular);

//var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
////测试$http服务
////在angular中使用JSONP的方式做跨域请求，必须给当前地址加上一个参数callback=JSON_CALLBACK
//$http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function (res) {
//	if (res.status === 200) {
//		$scope.subjects = res.data.subjects;
//	} else {
//		$scope.message = '获取数据错误,错误信息：'+ res.statusText;
//	}
//	//console.log(res);
//}, function (err) {
//	console.log(err);
//	$scope.message = '获取数据错误,错误信息：'+ err.statusText;
//});
