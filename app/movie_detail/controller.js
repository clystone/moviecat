/**
 * Created by Administrator on 2017/2/24.
 */

(function (angular) {
	'use strict';

	// 创建详情页模块
	var module = angular.module(
		'moviecat.movie_detail', [
			'ngRoute',
			'moviecat.services.http'
		]);
	// 配置模块的路由
	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'MovieDetailController'
		});
	}]);

	module.controller('MovieDetailController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',
		function ($scope, $route, $routeParams, HttpService,AppConfig) {
			//console.log(AppConfig);
			$scope.movie = {};
			$scope.loading = true;
			var id = $routeParams.id;

			var apiAddress = AppConfig.detailApiAddress + id;
			//跨域的方式请求
			HttpService.jsonp(apiAddress,{}, function (data) {
				$scope.movie = data;
				$scope.loading = false;
				$scope.$apply();
			});
		}
	]);
})(angular);


// var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
// // 测试$http服务
// // 在Angular中使用JSONP的方式做跨域请求，
// // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
// $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res) {
//   // 此处代码是在异步请求完成过后才执行（需要等一段时间）
//   if (res.status == 200) {
//     $scope.subjects = res.data.subjects;
//   } else {
//     $scope.message = '获取数据错误，错误信息：' + res.statusText;
//   }
// }, function(err) {
//   console.log(err);
//   $scope.message = '获取数据错误，错误信息：' + err.statusText;
// });

