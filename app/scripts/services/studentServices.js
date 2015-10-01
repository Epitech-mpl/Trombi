angular.module('trombiApp')
	.service('Student', ['$http', Student]);

function Student($http) {
	var res = {
		allStudents: {}
	};

	res.loading = $http.get('students.json').success(function(data) {
		res.allStudents = data;
		res.loading = undefined;
	});
	return res;
}
