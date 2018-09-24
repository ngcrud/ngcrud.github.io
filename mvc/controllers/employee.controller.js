(function() {
	'use strict';
	angular.module('myApp').directive('datepicker', function() {
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModel) {
				$(element).datepicker({
					dateFormat : "yy-mm-dd",
					onSelect : function(dateText) {
						scope.$apply(function() {
							ngModel.$setViewValue(dateText);
						});
					}
				});
			}
		};
	});
	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp);
		var months = [ '01', '02', '03', '04', '05', '06', '07', '08',
				'09', '10', '11', '12' ];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		date = parseInt(date)<10 ? '0'+date : date;
		var time = year + '-' + month + '-' + date;
		return time;
	}

	angular.module('myApp').directive('fileModel', [ '$parse', function($parse) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	} ]);

	angular.module('myApp').service('fileUpload', [ '$http', function($http) {
		this.uploadFileToUrl = function(file, uploadUrl) {
			var fd = new FormData();
			fd.append('file', file);
			$http.post(uploadUrl, fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).then(function(response) {
				alert(response);
			});
		}
	} ]);

	angular.module('myApp').controller('EmployeeController',
			EmployeeController);

	EmployeeController.$inject = [ '$http' ];

	function EmployeeController($http, $resource, $scope, fileUpload) {
		var http = $http;
		var vm = this;
		vm.page = {};
		vm.addEmployeeMessages = [];
		vm.employees = [];
		vm.multipleEmployees = [];
		vm.uploadedMultipleEmployees = [];
		vm.editEmployee = editEmployee;
		vm.saveEmployee = saveEmployee;
		vm.saveMultipleEmployeeData = saveMultipleEmployeeData;
		vm.getPaginatedEmployees = getPaginatedEmployees;
		vm.getAll = getAll;
		vm.clearFields = clearFields;
		vm.getUserLogins = getUserLogins;
		vm.excelFileUpload = excelFileUpload;
		vm.deleteAllTempEmployeeListData = deleteAllTempEmployeeListData;
		vm.saveAllTempEmployeeListData = saveAllTempEmployeeListData;
		vm.getEmployeeTypes = getEmployeeTypes;


		vm.addRow = addRow;
		vm.deleteEmployee = deleteEmployee;
		vm.previousPage = previousPage;
		vm.nextPage = nextPage;
		vm.searchOnEmployeeTable = searchOnEmployeeTable;
		vm.loadOnEmployeeDetails = loadOnEmployeeDetails;
		
		vm.page.number = 0;
		vm.page.size = 5;

		init();

		function init() {
			//getPaginatedEmployees(vm.page.number, vm.page.size);
			//getAll();
			//getUserLogins();
			//getEmployeeTypes();
            alert('from employee');

		}

		function saveEmployee() {

			clearValidationMessages();

			var employee = {};

			
employee.employeeId = vm.employeeId;
employee.name = vm.name;
employee.fatherName = vm.fatherName;
employee.employeeTypeId = (vm.employeeType!==undefined) ? vm.employeeType.employeeTypeId : null;
employee.contactAddress = vm.contactAddress;
employee.email = vm.email;
employee.parmanentAddress = vm.parmanentAddress;
employee.district = vm.district;
employee.thana = vm.thana;
employee.country = vm.country;


			var url = "/employees/save";
			$http.post(url, employee).then(function(response) {
				var messageMap = response.data;

				if (messageMap.error !== "") {
					//vm.orderId_validationMessage =
					//messageMap.orderId_validationMessage;
					
vm.employeeId_validationMessage = messageMap.employeeId_validationMessage;
vm.name_validationMessage = messageMap.name_validationMessage;
vm.fatherName_validationMessage = messageMap.fatherName_validationMessage;
vm.employeeTypeId_validationMessage = messageMap.employeeTypeId_validationMessage;
vm.contactAddress_validationMessage = messageMap.contactAddress_validationMessage;
vm.email_validationMessage = messageMap.email_validationMessage;
vm.parmanentAddress_validationMessage = messageMap.parmanentAddress_validationMessage;
vm.district_validationMessage = messageMap.district_validationMessage;
vm.thana_validationMessage = messageMap.thana_validationMessage;
vm.country_validationMessage = messageMap.country_validationMessage;

					vm.technicalError = messageMap.technicalError;
				} else {
					vm.successMessage = messageMap.successMessage;
					getPaginatedEmployees(vm.page.number, vm.page.size);
					getAll();
					clearFields();

					if (vm.isAllowNotification) {
						sendNotification();
					}
					if (vm.isAllowSendAsTask) {
						sendAsTaskAssignment();
					}
				}

			});
		}
		function clearValidationMessages() {
			//vm.orderId_validationMessage = "";
			
vm.employeeId_validationMessage = "";
vm.name_validationMessage = "";
vm.fatherName_validationMessage = "";
vm.employeeTypeId_validationMessage = "";
vm.contactAddress_validationMessage = "";
vm.email_validationMessage = "";
vm.parmanentAddress_validationMessage = "";
vm.district_validationMessage = "";
vm.thana_validationMessage = "";
vm.country_validationMessage = "";

		}

		function sendNotification() {
			var notificationMap = {};

			notificationMap.notificationMessage = vm.notificationMessage;
			notificationMap.notificationReceivers = vm.notificationReceivers;
			notificationMap.notifyByEmail = vm.notifyByEmail;
			notificationMap.notifyBySMS = vm.notifyBySMS;

			var url = "/employees/sendNotification";
			$http.post(url, notificationMap).then(function(response) {
				//vm.notificationSentResult = response.data;
				alert('Notification Sent Successfully');
				clearNotificationFields();
			});
		}

		function sendAsTaskAssignment() {
			var taskManagement = {};
			taskManagement.assigneeId = vm.assigneeId;
			taskManagement.reporterId = vm.reporterId;
			taskManagement.taskDetails = vm.taskDetails;
			//taskManagement.createdDate = vm.createdDate;
			//taskManagement.planReportDate = vm.planReportDate;
			//taskManagement.actualReportDate = vm.actualReportDate;
			taskManagement.completeParcentage = 40;
			taskManagement.taskStatus = 'Assigned';

			var url = "/taskManagements/save";
			$http.post(url, taskManagement).then(function(response) {
				//vm.addTaskManagementMessages = response.data;
				alert("Task Assigned Successfully");
			});
		}
		function clearNotificationFields() {

			vm.notificationMessage = "";
			vm.districtShortName = "";
			vm.distFullName = "";
			vm.createdDate = "";

		}
		function addRow() {
			vm.multipleEmployees.push({
			column1: true,column1: true,column1: true,column1: true,column1: true,column1: true,column1: true,column1: true,column1: true,column1: true,column1: true

			});
		}
		;
		function saveMultipleEmployeeData() {
			$http({
				method : "post",
				url : "/employees/saveMultipleEmployeeData",
				data : vm.multipleEmployees,
			}).success(function(data) {
				///vm.addEmployeeMessages = response.data;
				vm.multipleEmployees = response.data;
				getPaginatedEmployees(vm.page.number, vm.page.size);
			}).error(function(err) {
				vm.Message = err.Message;
			})
		}
		;
		function editEmployee(employee) {
			
vm.employeeId = employee.employeeId;
vm.name = employee.name;
vm.fatherName = employee.fatherName;
vm.employeeType = getEmployeeTypeByEmployeeTypeId(employee.employeeTypeId);

vm.contactAddress = employee.contactAddress;
vm.email = employee.email;
vm.parmanentAddress = employee.parmanentAddress;
vm.district = employee.district;
vm.thana = employee.thana;
vm.country = employee.country;

		}
		function getEmployeeTypeByEmployeeTypeId(employeeTypeId){for(var i = 0; i < vm.employeeTypeList.length; i += 1){var employeeType = vm.employeeTypeList[i];if(employeeType.employeeTypeId === employeeTypeId){ return employeeType;
}
}
}


		function clearFields() {
			
vm.employeeId = "";
vm.name = "";
vm.fatherName = "";
vm.employeeTypeId = "";
vm.contactAddress = "";
vm.email = "";
vm.parmanentAddress = "";
vm.district = "";
vm.thana = "";
vm.country = "";

		}

		function getAll() {
			var url = "/employees/all";
			var employeesPromise = $http.get(url);
			employeesPromise.then(function(response) {
				vm.multipleEmployees = response.data;
			});
		}
		function getUserLogins() {
			var url = "/userLogins/all";
			var userLoginsPromise = http.get(url);
			userLoginsPromise.then(function(response) {
				vm.userLoginList = response.data;
			});
		}
		function getEmployeeTypes(){var url = "/employeeTypes/all";var employeeTypesPromise = http.get(url);employeeTypesPromise.then(function(response){vm.employeeTypeList = response.data;});}

		function deleteEmployee(id) {
			var url = "/employees/delete/" + id;
			if (confirm("Are you sure?")) {
				$http.post(url).then(function(response) {
					vm.deleteMessage = response.data;
				});
				getPaginatedEmployees(vm.page.number, vm.page.size);
				getAll();
			}
		}
		function getPaginatedEmployees(pageNumber, size) {
			var url = "/employees/get?page=" + pageNumber + "&size=" + size;
			var employeesPromise = $http.get(url);
			employeesPromise.then(function(response) {
				vm.employees = response.data.content;
				if (vm.employees !== "") {
					vm.page.number = response.data.number;
					vm.page.size = response.data.size;
					vm.page.numberOfElements = response.data.numberOfElements;
					vm.page.first = response.data.first;
					vm.page.last = response.data.last;
					vm.page.totalPages = response.data.totalPages;
					vm.page.totalElements = response.data.totalElements;
				}
			});
		}
		function previousPage() {
			if (!vm.page.first) {
				vm.page.number = vm.page.number - 1;
				getPaginatedEmployees(vm.page.number, vm.page.size);
			}
		}
		function nextPage() {
			if (!vm.page.last) {
				vm.page.number = vm.page.number + 1;
				getPaginatedEmployees(vm.page.number, vm.page.size);
			}

		}
		function excelFileUpload() {
			var file = vm.myFile;
			console.log('file is ');
			console.dir(file);
			var uploadUrl = "/employees/excelFileUpload";

			var fd = new FormData();
			fd.append('file', file);
			$http.post(uploadUrl, fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).then(function(response) {
				vm.uploadedMultipleEmployees = response.data;
			});
		}
		function deleteAllTempEmployeeListData() {
			vm.uploadedMultipleEmployees = [];
		}
		function saveAllTempEmployeeListData() {
			$http({
				method : "post",
				url : "/employees/saveMultipleEmployeeData",
				data : vm.uploadedMultipleEmployees,
			}).success(function(response) {
				vm.employees = response.data;
				vm.uploadedMultipleEmployees = [];
			}).error(function(err) {
				vm.Message = err.Message;
			});
		}
		//findByEmployeeId
		function searchOnEmployeeTable(){
			var url = "/employees/searchOnEmployeeTable?employeeId=" + vm.employeeIdSearch;
			var employeesPromise = $http.get(url);
			employeesPromise.then(function(response) {
				vm.employees = response.data.content;
				if (vm.employees !== "") {
					vm.page.number = response.data.number;
					vm.page.size = response.data.size;
					vm.page.numberOfElements = response.data.numberOfElements;
					vm.page.first = response.data.first;
					vm.page.last = response.data.last;
					vm.page.totalPages = response.data.totalPages;
					vm.page.totalElements = response.data.totalElements;
				}
			});
		}
		function loadOnEmployeeDetails(){
			var url = "/employees/searchOnEmployeeTable?employeeId=" + vm.employeeIdToLoad;
			var employeesPromise = $http.get(url);
			employeesPromise.then(function(response) {
				vm.employees = response.data.content;
				if (vm.employees !== "") {
					var employee = vm.employees[0];
					
vm.employeeId = employee.employeeId;
vm.name = employee.name;
vm.fatherName = employee.fatherName;
vm.employeeType = getEmployeeTypeByEmployeeTypeId(employee.employeeTypeId);

vm.contactAddress = employee.contactAddress;
vm.email = employee.email;
vm.parmanentAddress = employee.parmanentAddress;
vm.district = employee.district;
vm.thana = employee.thana;
vm.country = employee.country;

				}
			});
		}
		
	}
})();
