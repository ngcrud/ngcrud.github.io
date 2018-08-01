
//////////////////////////////////////////////////////// Capacity Plan Info  /////////////////////////////////////
// input filtering.....

function getCapacityPlanProdLineInfo(formName) {
	var companyId = $('#' + formName + '_companyId').val();
	if (companyId!==null && companyId !==undefined) {
		jQuery.ajax({
			url : "getCapacityPlanProdLineInfo?organizationPartyId=" + companyId,
			type : "POST",
			async : false,
			success : function(data) {
				$('#' + formName + '_totalLine').val(data.totalLine);
			}
		});
	}
}
function getHoliDayInfo(formName) {
	var companyId = $('#' + formName + '_companyId').val();
	var month = $('#' + formName + '_month').val();
	var year = $('#' + formName + '_year').val();
	jQuery.ajax({
		url : "getHoliDayInfo?companyId=" + companyId + "&month=" + month
				+ "&year=" + year,
		type : "POST",
		async : false,
		success : function(data) {
			$('#' + formName + '_workingDay').val(data.workingDay);
		}
	});
}

// //////////////////////////////////////////// all update methods
// ///////////////////////////////////////////////////////
function addHolidayPopup(){
	var formName = 'addHolidayForPlanningForm';
	var url = "AddHoliday" ;
	prottayPlanningCommonPopup('Add Holiday Info for Planning',
			'#planInfoPopup', url, '480', '800', formName);
}
function updateCapacityPlanInfoPopup(capacityPlanId) {/* alert(capacityPlanId); */
	var formName = 'formUpdateCapacityPlanInfo';
	var url = "EditCapacityPlanInfo?capacityPlanId=" + capacityPlanId;

	prottayPlanningCommonPopup('Update Capacity Planning Info',
			'#planInfoPopup', url, '480', '800', formName);

}
function updateHoliDayPlanInfoPopup(workEffortId, companyId) {/* alert(capacityPlanId); */
	var formName = 'updateHolidayForPlanningForm';
	var url = "EditHolidayForPlanning?workEffortId=" + workEffortId
			+ "&companyId=" + companyId;

	prottayPlanningCommonPopup('Update Holiday Info for Planning',
			'#planInfoPopup', url, '480', '800', formName);

}

function dashboardOrderDetailsPopup(companyId, currentYear, orderType) {
	if (orderType == "totalOrder") {
		var url = "TotalOrders";
		prottayPlanningCommonPopup('All Order details Planning Info',
				'#planInfoPopup', url, '600', '800', formName);
	} else if (orderType == "futureOrder") {
		var url = "FutureOrders";
		prottayPlanningCommonPopup('All Future Order details Planning Info',
				'#planInfoPopup', url, '600', '800', formName);
	} else if (orderType == "readyOrder") {
		var url = "ReadyOrders";
		prottayPlanningCommonPopup('All Ready Order details Planning Info',
				'#planInfoPopup', url, '600', '800', formName);
	} else if (orderType == "runningOrder") {
		var url = "RunningOrders";
		prottayPlanningCommonPopup('All Running Order details Planning Info',
				'#planInfoPopup', url, '600', '800', formName);
	} else if (orderType == "completedOrder") {
		var url = "CompletedOrders";
		prottayPlanningCommonPopup('All Completed Order details Planning Info',
				'#planInfoPopup', url, '600', '800', formName);
	} else if (orderType == "failedOrder") {
		var url = "FailedOrders";
		prottayPlanningCommonPopup('All Failed Order details Planning Info',
				'#planInfoPopup', url, '600', '800', formName);
	}

}

function prottayPlanningCommonPopup(title, containerId, url, height, width,
		formName) {
	$('#loadingDiv').show();
	$(containerId).html('');
	$(containerId).dialog({
		autoOpen : true,
		title : title,
		height : height,
		width : width,
		modal : true,
		open : function() {
			$.ajax({
				url : url,
				type : "POST",
				data : getRequestData(),
				success : function(data) {
					$('.ui-dialog').css("z-index","24000");
					$(containerId).css("z-index","24000");
					$('#loadingDiv').hide();
					$(containerId).html(data);
					
					initFormFields(formName);
					draggableEvent();
					
					numericOnlyFunction();// numericField
					readonlyFunction();// readonly-field
					characterOnlyFunction();
					yearOnlyFunction();
					//inPercentageOnly();
					
				}
			});
		}

	});
}
function prottayPlanningCommonPopup(title, containerId, url, height, width) {
	$('#loadingDiv').show();
	$(containerId).html('');
	$(containerId).dialog({
		autoOpen : true,
		title : title,
		height : height,
		width : width,
		modal : true,
		open : function() {
			$.ajax({
				url : url,
				type : "POST",
				data : getRequestData(),
				success : function(data) {
					$(containerId).css("z-index","240000");
					$('.ui-dialog').css("z-index","24000");
					$('#loadingDiv').hide();
					$(containerId).html(data);
					draggableEvent();
					
					numericOnlyFunction();// numericField
					readonlyFunction();// readonly-field
					characterOnlyFunction();
					yearOnlyFunction();
					//inPercentageOnly();
					
				}
			});
		}

	});
}
function draggableEvent(){
	$('div.ui-dialog').draggable({
		cursorAt: { top: 120 },
		scroll: true,
		start: function(event,ui){
			//$("div.ui-dialog").addClass('top');
		},
		  drag : function(event,ui){
			  
		  }
	});
	$('div.ui-dialog').resizable({
		cursorAt: { top: 120 },
		start: function(event,ui){
			//$("div.ui-dialog").addClass('top');
		}
	});
}
// //////////////////////////////////////////////////////////// common Methods
// ///////////////////////////////////////////////////
$(document).ready(function() {
	// planningAlertMessage("black","planning script...",25000);
	
	if (document.getElementById('formAddCapacityPlanInfo')!==null) {
		initFormFields('formAddCapacityPlanInfo');
	}
	// planningAlertMessage("black","Dashboard loaded!", 3000);
	var chars = "";
	// $('.required').attr("readonly","true");
	$(".readonly-field:input").attr('readonly', true);
	$('.blackText:input').css({
		"color" : "red"
	});
	numericOnlyFunction();
	readonlyFunction();
	characterOnlyFunction();
	yearOnlyFunction();

	var chars = '';
	///////////////////////////
	if ($('.daterangeRow')) {
		if ($('#fromDate_i18n').val()!=="") {
			$('.daterangeRow').show();
			$('.monthRow').hide();
			$('#month').val("-1");
		}else{
			$('.daterangeRow').hide();
			$('.monthRow').show();
			$('#fromDate').val('');$('#fromDate_i18n').val('');
			$('#thruDate').val('');$('#thruDate_i18n').val('');
		}
		
	}
});

function readonlyFunction() {
	$(".readonly-field").on("keypress keyup keydown blur", function(event) {
		if (event.which) {
			event.preventDefault();
		}
	});
	
}
function characterOnlyFunction() {
	$(".allowCharacterOnly").on(
			"keypress keyup blur",
			function(event) {
				if ($.inArray(event.keyCode,
						[ 46, 8, 9, 27, 13, 190, 110, 116 ]) !== -1
						||
						// Allow: Ctrl+A
						(event.keyCode == 65 && event.ctrlKey === true) ||
						// Allow: home, end, left, right
						(event.keyCode >= 35 && event.keyCode <= 39)) {
					// let it happen, don't do anything
					return;
				}

				$(this).val($(this).val().replace(/[^0-9\.]/g, ''));
				if ((event.which != 46 || $(this).val().indexOf('.') != -1)
						&& (event.which < 65 || event.which > 90)
						&& (event.which < 97 || event.which > 122)) {
					event.preventDefault();
				}
			});
}
function numericOnlyFunction() {
	$(".allowNumericOnly")
			.on(
					"keypress keyup blur",
					function(event) {

						// planningAlertMessage("black",event.keyCode, 100);

						if ($.inArray(event.keyCode, [ 46, 8, 9, 27, 13, 190,
								110, 116 ]) !== -1
								||
								// Allow: Ctrl+A
								(event.keyCode == 65 && event.ctrlKey === true)
								||
								// Allow: home, end, left, right
								(event.keyCode >= 35 && event.keyCode <= 39)) {
							// let it happen, don't do anything
							return;
						}

						$(this).val($(this).val().replace(/[^0-9\.]/g, ''));
						if ((event.which != 46
								|| $(this).val().indexOf('.') != -1 || event.whice === 8)
								&& (event.which < 48 || event.which > 57)) {
							event.preventDefault();
						}

					});
}
function yearOnlyFunction() {
	$(".yearOnly").on(
			"keypress keyup blur",
			function(event) {

				// planningAlertMessage("black",event.keyCode, 100);

				if ($.inArray(event.keyCode,
						[ 46, 8, 9, 27, 13, 190, 110, 116 ]) !== -1
						||
						// Allow: Ctrl+A
						(event.keyCode == 65 && event.ctrlKey === true) ||
						// Allow: home, end, left, right
						(event.keyCode >= 35 && event.keyCode <= 39)) {
					// let it happen, don't do anything
					return;
				}

				$(this).val($(this).val().replace(/[^0-9\.]/g, ''));
				if ((event.which != 46 || $(this).val().indexOf('.') != -1)
						&& (event.which < 48 || event.which > 57)) {
					event.preventDefault();
				}

				/*if (chars.indexOf('.') !== -1 && event.keyCode == 190) {

					event.preventDefault();
				}*/
				planningAlertMessage("black",$(this).val(), 1000);
				//chars = chars + $(this).val();

			});
}
function inPercentageOnly() {
	$(".percentageField").on(
			"keyup change",
			function(event) {
				alert($(this).val());
				// planningAlertMessage("black",event.keyCode, 100);

				if ($.inArray(event.keyCode,
						[ 46, 8, 9, 27, 13, 190, 110, 116 ]) !== -1
						||
						// Allow: Ctrl+A
						(event.keyCode == 65 && event.ctrlKey === true) ||
						// Allow: home, end, left, right
						(event.keyCode >= 35 && event.keyCode <= 39)) {
					// let it happen, don't do anything
					return;
				}

				$(this).val($(this).val().replace(/[^0-9\.]/g, ''));
				if ((event.which != 46 || $(this).val().indexOf('.') != -1)
						&& (event.which < 48 || event.which > 57)) {
					event.preventDefault();
				}

				/*if (chars.indexOf('.') !== -1 && event.keyCode == 190) {

					event.preventDefault();
				}*/
				planningAlertMessage("black",$(this).val(), 1000);
				//chars = chars + $(this).val();

			});
}
function InYear(fieldId) {
	$('#' + fieldId).change(function() {
		var value = $('#' + fieldId).val();
		if (!(parseInt(value) >= 1970 && parseInt(value) <= 9999)) {
			planningAlertMessage("black","Enter valid year value", 3000);
			$('#' + fieldId).val("");
		}
	});

}
function InPercentage(fieldId) {
	$('#' + fieldId).keyup(function() {
		var value = $('#' + fieldId).val();
		if (!(parseInt(value) >= 0 && parseInt(value) <= 100)) {
			planningAlertMessage("black","Enter valid parcentage value", 3000);
			$('#' + fieldId).val("");
		}
	});

}
function initFormFields(formName) {// alert(formName);
	var string = formName.toLowerCase();
	var substring = "update";
	var forUpdate = string.indexOf(substring);
	
	//alert(formName + "--"+forUpdate);
	if (formName == 'formAddPrdLineLoadingInfo') { 
		$('#' + formName + '_ppAppdate').css({
			"color" : "green"
		});
		$('#' + formName + '_shipmentDate').css({
			"color" : "red"
		});
		$('#' + formName + '_ppAppdate').attr('disabled', 'true');
		$('#' + formName + '_shipmentDate').attr('disabled', 'true');
		$('#' + formName + '_feedingTime').css({
			"color" : "black"
		});
		$('#' + formName + '_learningTime').css({
			"color" : "black"
		});
		$('#' + formName + '_feedingTime').attr('disabled', 'true');
		$('#' + formName + '_learningTime').attr('disabled', 'true');
		$('#' + formName + '_orderName').attr("placeholder", "Type Order here");
		$('#' + formName + '_shipmentOrderQty').attr('readonly', 'true');
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		$('#' + formName + '_productionHour').attr('readonly', 'true');
		$('#' + formName + '_productionDay').attr('readonly', 'true');
		$('#' + formName + '_productionMinute').attr('readonly', 'true');
		$('#' + formName + '_inputDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_inputDate').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate').attr('readonly', 'true');
		//$('#' + formName + '_targetDayQty').attr('readonly', 'true');
		NumericOnly(formName + "_orderQty");
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		NumericOnly(formName + "_buyerName");
		$('#' + formName + '_buyerName').attr('readonly', 'true');
		NumericOnly(formName + "_allowQty");
		$('#' + formName + '_allowQty').attr("placeholder", "Enter Allow Qty");
		var companyId = $('#' + formName + '_companyId').val();
		//getOrderJsonDataLineLoading(formName, companyId);
	} else if (forUpdate >= 0) {
		$('#' + formName + '_ppAppdate').css({
			"color" : "green"
		});
		$('#' + formName + '_shipmentDate').css({
			"color" : "red"
		});
		$('#' + formName + '_outputStartDateAvailableHour').attr('readonly', 'true');
		$('#' + formName + '_orderName').attr('readonly', 'true');
		$('#' + formName + '_styleName').attr('readonly', 'true');
		$('#' + formName + '_buyerName').attr('readonly', 'true');
		$('#' + formName + '_totalHoliday').attr('readonly', 'true');
		$('#' + formName + '_isLearningTime').attr('readonly', 'true');
		
		$('#' + formName + '_ppAppdate').attr('disabled', 'true');
		$('#' + formName + '_shipmentDate').attr('disabled', 'true');
		$('#' + formName + '_orderName').attr("placeholder", "Type Order here");
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		$('#' + formName + '_productionHour').attr('readonly', 'true');
		$('#' + formName + '_productionDay').attr('readonly', 'true');
		$('#' + formName + '_productionMinute').attr('readonly', 'true');
		$('#' + formName + '_inputDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_inputDate').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate').attr('readonly', 'true');
		//$('#' + formName + '_targetDayQty').attr('readonly', 'true');
		NumericOnly(formName + "_orderQty");
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		NumericOnly(formName + "_buyerName");
		$('#' + formName + '_buyerName').attr('readonly', 'true');
		NumericOnly(formName + "_allowQty");
		$('#' + formName + '_allowQty').attr("placeholder", "Enter Allow Qty");
		var companyId = $('#' + formName + '_companyId').val();
		//getOrderJsonDataLineLoading(formName, companyId);
	}else if (formName == 'formAddCapacityPlanInfo') {
		// $('#'+formName+'_totalLine').attr('readonly','true');
		// $('#'+formName+'_workingDay').attr('readonly','true');
		// $('#'+formName+'_man').attr('readonly','true');
		// $('#'+formName+'_hour').attr('readonly','true');
		getCapacityPlanProdLineInfo(formName);
		// alert(formName+"_efficiency");
		InYear(formName + "_year");
		NumericOnly(formName + "_year");
		NumericOnly(formName + "_totalLine");
		NumericOnly(formName + "_workingDay");
		NumericOnly(formName + "_man");
		NumericOnly(formName + "_hour");
		InPercentage(formName + "_efficiency");
		NumericOnly(formName + "_efficiency");
		$('#' + formName + '_efficiency').attr('placeholder',
				'Enter efficiency.');

	} else if (formName == 'formUpdateCapacityPlanInfo') {
		InYear(formName + "_year");
		NumericOnly(formName + "_year");
		NumericOnly(formName + "_totalLine");
		NumericOnly(formName + "_workingDay");
		NumericOnly(formName + "_man");
		NumericOnly(formName + "_hour");
		InPercentage(formName + "_efficiency");
		NumericOnly(formName + "_efficiency");
		$('#' + formName + '_efficiency').attr('placeholder',
				'Enter efficiency.');

	}else if (formName == 'updatePlanningBoardInfoPopup') {
		
	}else if(formName == 'formAddOrderPlanInfo' ){
		
		$('#'+formName+'_orderName').attr("placeholder", "Type Order here");
		$('#'+formName+'_orderQty').attr('readonly','true');
		//$('#'+formName+'_smv').attr('readonly','true');
		//$('#'+formName+'_manQty').attr('readonly','true');
		$('#'+formName+'_hourlyTarget').attr('readonly','true');
		$('#'+formName+'_actualOrderQty').attr('readonly','true');
		$('#'+formName+'_leadTime').attr('readonly','true');
		$('#'+formName+'_totalHour').attr('readonly','true');
		$('#'+formName+'_productionDay').attr('readonly','true');
		$('#'+formName+'_productionMinute').attr('readonly','true');
		
		$('#'+formName+'_finalPrdMinute').attr('readonly','readonly');
		$('#'+formName+'_finalPrdHour').attr('readonly','readonly');
		$('#'+formName+'_finalPrdDay').attr('readonly','readonly');
		
		NumericOnly(formName+"_throughPutTime");$('#'+formName+'_throughPutTime').attr('placeholder','Enter throughput time.');
		InPercentage(formName+"_efficiency");
		NumericOnly(formName+"_efficiency");$('#'+formName+'_efficiency').attr('placeholder','Enter efficiency.');
		InPercentage(formName+"_wastage");
		NumericOnly(formName+"_wastage");$('#'+formName+'_wastage').attr('placeholder','Enter wastage parcentage.');
		NumericOnly(formName+"_feedingTime");$('#'+formName+'_feedingTime').attr('placeholder','Enter feeding time.');
		NumericOnly(formName+"_learningTime");$('#'+formName+'_learningTime').attr('placeholder','Enter learning time.');

		$('#'+formName+'_cuttingDate').attr('readonly','true');
		
		//$('#'+formName+'_deliveryDate_i18n').attr('readonly','true');
		//$('#'+formName+'_deliveryDate_i18n').attr('disabled','true');
		
		$('#'+formName+'_ppApprovalDate_i18n').attr('readonly','true');
		//$('#'+formName+'_ppApprovalDate_i18n').attr('disabled','true');
		$('#'+formName+'_ppApprovalDate_i18n').css({ "color": "black"});
		
		$('#'+formName+'_cuttingDate_i18n').attr('readonly','true');
		var companyId = $('#'+formName+'_companyId').val();

		var orderId = $('#'+formName+'_orderId').val();
		var transactionId = $('#'+formName+'_transactionId').val();
		if (orderId!="" && orderId!==undefined && transactionId!="" && transactionId!==undefined) {
			$('#'+formName+'_orderName').attr('readonly','true');alert(orderId);
			getOrderDetails(formName);
			getOrderJsonData(formName,companyId);
		}else{
			getOrderJsonData(formName,companyId);
		}
	}
	if (formName == 'formUpdateOrderPlanInfo') {
		numericOnlyFunction();
		readonlyFunction();
		//$('#'+formName+'_orderName').attr('readonly','true');
		$('#'+formName+'_orderQty').attr('readonly','true');
		//$('#'+formName+'_smv').attr('readonly','true');
		$('#'+formName+'_scheduleSmv').attr('readonly','true');
		$('#'+formName+'_manQty').attr('readonly','true');
		$('#'+formName+'_hourlyTarget').attr('readonly','true');
		$('#'+formName+'_actualOrderQty').attr('readonly','true');
		$('#'+formName+'_leadTime').attr('readonly','true');
		$('#'+formName+'_totalHour').attr('readonly','true');
		$('#'+formName+'_productionDay').attr('readonly','true');
		$('#'+formName+'_productionMinute').attr('readonly','true');
		
		$('#'+formName+'_finalPrdMinute').attr('readonly','true');
		$('#'+formName+'_finalPrdHour').attr('readonly','true');
		$('#'+formName+'_finalPrdDay').attr('readonly','true');
		
		NumericOnly(formName+"_throughPutTime");$('#'+formName+'_throughPutTime').attr('placeholder','Enter throughput time.');
		InPercentage(formName+"_efficiency");
		NumericOnly(formName+"_efficiency");$('#'+formName+'_efficiency').attr('placeholder','Enter efficiency.');
		InPercentage(formName+"_wastage");
		NumericOnly(formName+"_wastage");$('#'+formName+'_wastage').attr('placeholder','Enter wastage parcentage.');
		NumericOnly(formName+"_feedingTime");$('#'+formName+'_feedingTime').attr('placeholder','Enter feeding time.');
		NumericOnly(formName+"_learningTime");$('#'+formName+'_learningTime').attr('placeholder','Enter learning time.');

		
		
		var companyId = $('#'+formName+'_companyId').val();
		getOrderJsonData(formName,companyId);
		
		$('#'+formName+'_cuttingDate').attr('readonly','true');
		$('#'+formName+'_deliveryDate').attr('readonly','true');
		$('#'+formName+'_cuttingDate_i18n').attr('readonly','true');
		$('#'+formName+'_deliveryDate_i18n').attr('readonly','true');
		
	}
	if (formName == 'formFindOrderPlanInfo') {
		InYear(formName + "_year");
		$('#deliveryStartDate_i18n').attr('readonly','true');
		$('#deliveryEndDate_i18n').attr('readonly','true');
	}
	var string = formName.toLowerCase();
	var substring = "update";
	var forUpdate = string.indexOf(substring);

	if (formName == 'formAddPrdLineLoadingInfo') {
		$('#' + formName + '_ppAppdate').css({
			"color" : "green"
		});
		$('#' + formName + '_shipmentDate').css({
			"color" : "red"
		});
		$('#' + formName + '_ppAppdate').attr('disabled', 'true');
		$('#' + formName + '_shipmentDate').attr('disabled', 'true');
		$('#' + formName + '_feedingTime').css({
			"color" : "black"
		});
		$('#' + formName + '_learningTime').css({
			"color" : "black"
		});
		$('#' + formName + '_feedingTime').attr('disabled', 'true');
		$('#' + formName + '_learningTime').attr('disabled', 'true');
		$('#' + formName + '_orderName').attr("placeholder", "Type Order here");
		$('#' + formName + '_shipmentOrderQty').attr('readonly', 'true');
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		$('#' + formName + '_productionHour').attr('readonly', 'true');
		$('#' + formName + '_productionDay').attr('readonly', 'true');
		$('#' + formName + '_productionMinute').attr('readonly', 'true');
		$('#' + formName + '_inputDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_inputDate').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate').attr('readonly', 'true');
		//$('#' + formName + '_targetDayQty').attr('readonly', 'true');
		NumericOnly(formName + "_orderQty");
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		NumericOnly(formName + "_buyerName");
		$('#' + formName + '_buyerName').attr('readonly', 'true');
		NumericOnly(formName + "_allowQty");
		$('#' + formName + '_allowQty').attr("placeholder", "Enter Allow Qty");
		var companyId = $('#' + formName + '_companyId').val();
	} else if (forUpdate >= 0) {
		$('#' + formName + '_ppAppdate').css({
			"color" : "green"
		});
		$('#' + formName + '_shipmentDate').css({
			"color" : "red"
		});
		$('#' + formName + '_inputDateAvailableHour').attr('readonly', 'true');
		$('#' + formName + '_orderName').attr('readonly', 'true');
		$('#' + formName + '_styleName').attr('readonly', 'true');
		$('#' + formName + '_buyerName').attr('readonly', 'true');
		$('#' + formName + '_totalHoliday').attr('readonly', 'true');
		$('#' + formName + '_isLearningTime').attr('readonly', 'true');

		$('#' + formName + '_ppAppdate').attr('disabled', 'true');
		$('#' + formName + '_shipmentDate').attr('disabled', 'true');
		$('#' + formName + '_orderName').attr("placeholder", "Type Order here");
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		$('#' + formName + '_productionHour').attr('readonly', 'true');
		$('#' + formName + '_productionDay').attr('readonly', 'true');
		$('#' + formName + '_productionMinute').attr('readonly', 'true');
		$('#' + formName + '_inputDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_inputDate').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate').attr('readonly', 'true');
		$('#' + formName + '_outputStartDate_i18n').attr('readonly', 'true');
		$('#' + formName + '_outputEndDate').attr('readonly', 'true');
		//$('#' + formName + '_targetDayQty').attr('readonly', 'true');
		NumericOnly(formName + "_orderQty");
		$('#' + formName + '_orderQty').attr('readonly', 'true');
		NumericOnly(formName + "_buyerName");
		$('#' + formName + '_buyerName').attr('readonly', 'true');
		NumericOnly(formName + "_allowQty");
		$('#' + formName + '_allowQty').attr("placeholder", "Enter Allow Qty");
		var companyId = $('#' + formName + '_companyId').val();
	}
	/*if (formName == 'formAddCapacityPlanInfo') {
		getCapacityPlanProdLineInfo(formName);
		//alert(formName+"_efficiency");
		InYear(formName+"_year");
		NumericOnly(formName+"_year");
		NumericOnly(formName+"_totalLine");
		NumericOnly(formName+"_workingDay");NumericOnly(formName+"_man");NumericOnly(formName+"_hour");
		InPercentage(formName+"_efficiency");
		NumericOnly(formName+"_efficiency");$('#'+formName+'_efficiency').attr('placeholder','Enter efficiency.');
			
	}else if (formName == 'formUpdateCapacityPlanInfo') {
		InYear(formName+"_year");
		NumericOnly(formName+"_year");
		NumericOnly(formName+"_totalLine");
		NumericOnly(formName+"_workingDay");NumericOnly(formName+"_man");NumericOnly(formName+"_hour");
		InPercentage(formName+"_efficiency");
		NumericOnly(formName+"_efficiency");$('#'+formName+'_efficiency').attr('placeholder','Enter efficiency.');
	
	}else if (formName == 'updatePlanningBoardInfoPopup') {
		
	}*/
}
function emptyAll(formName) {

	if (formName == 'formAddCapacityPlanInfo'
			|| formName == 'formUpdateCapacityPlanInfo') {

	}

}
function PBoardAlertMessage(leftLocation,topLocation,msg, duration) {
	var el = document.createElement("div");
	el
			.setAttribute("style",
					"	border: 2px solid;border-radius: 10px; position:fixed;top:"+topLocation+"px;left:"+leftLocation+"px;margin-right:5px; font-size:20px;background-color:skyblue;");
	el.innerHTML = msg;
	setTimeout(function() {
		el.parentNode.removeChild(el);
	}, duration);
	document.body.appendChild(el);
}
function planningAlertMessage(textColor,msg, duration) {
	var el = null;
	if ($('#alertMessagediv')) {
		$('#alertMessagediv').html ('');
		$('#alertMessagediv').remove();
	}
	
	el = document.createElement("alertMessagediv");
	
	el.setAttribute("style","z-index: 88; border: 2px solid; color:'"+textColor+"'; border-radius: 10px; position:fixed;top:85%;left:75%;margin-right:5px; font-size:20px;background-color:skyblue;");
	el.innerHTML = msg;
	setTimeout(function() {
		el.parentNode.removeChild(el);
	}, duration);
	document.body.appendChild(el);
	
}

function showMonthlyOrDateRange(checkbox){
	var monthOrDateRange = checkbox.value;
	if (monthOrDateRange == 'monthly') {
		$('.monthRow').show();
		$('.daterangeRow').hide();
		
		$('#fromDate').val('');$('#fromDate_i18n').val('');
		$('#thruDate').val('');$('#thruDate_i18n').val('');
	}else{
		$('.daterangeRow').show();
		$('.monthRow').hide();
		$('#month').val('-1');
		
	}
	
}
function validateScheduleFindForm(formName){
	var validForm = false;
	if ($('#fromDate_i18n').val() !== null && $('#thruDate_i18n').val() !== null) {
		var fromDate = new Date($('#fromDate').val());
		var thruDate = new Date($('#thruDate').val());
		
		if (fromDate>thruDate) {
			planningAlertMessage("black",'from date cannot be greater than thru date!',3000);
		}else{
			validForm = true;
		}
	}
	return validForm;
}
function showTimeAndActionForOrder(transactionId){
	var url = 'ScheduleTnAInfo';
	url = url + '?transactionId='+transactionId;
	prottayUICommonPopup('Time And Action', '#planInfoPopup', url, 400, 500);
	//planningBoardCommonPopup('Time And Action', '#popupScreenContainer', url, 400, 500);
}
function generateSplitBars(){
	var parentBarQty = $('#parentBarQty').val();
	var noOfBars = $('#noOfBars').val();
	//alert(noOfBars);
	var preparedHtml = '';
	if (parseInt(noOfBars)>0) {
		var perBarQty = parseInt(parentBarQty) / parseInt(noOfBars);
		var distributedQty = 0;
		
		for (var int = 0; int < parseInt(noOfBars)-1; int++) {
			distributedQty = distributedQty + parseInt(perBarQty);
			preparedHtml = preparedHtml + '<input type="number" class="splittedBar" name="splittedBarQty" onchange="calculateBalanceQty()" onkeyup="calculateBalanceQty()" value="'+parseInt(perBarQty)+'" id="splittedBar_'+int+'"/><br/>';
		}
		var remainingQty = parseInt(parentBarQty) - parseInt(distributedQty);
		var lastIndex = parseInt(noOfBars) - 1;
		preparedHtml = preparedHtml + '<input type="number" class="splittedBar" name="splittedBarQty" onchange="calculateBalanceQty()" onkeyup="calculateBalanceQty()" value="'+remainingQty+'" id="splittedBar_'+lastIndex+'"/><br/>';
		
		preparedHtml = preparedHtml + '<input type="button" onclick="splitIntoMultipleBars()" value="Split"/>';
		preparedHtml = preparedHtml + '<b> Balance : </b><span id="splitBalanceQty">0</span>';
	}
	
	$('#splitBars').html(preparedHtml);
}

function calculateBalanceQty(){
	var parentBarQty = $('#parentBarQty').val();
	var noOfBars = $('#noOfBars').val();
	var splitBalanceQty = 0;
	var totalTakenQty = 0;
	for (var int = 0; int < parseInt(noOfBars); int++) {
		var barQty = $('#splittedBar_'+int).val();
		//alert(barQty);
		if (barQty!==undefined || barQty!='') {
			totalTakenQty = totalTakenQty+ parseInt(barQty);			
		}
	}
	splitBalanceQty = parseInt(parentBarQty) - parseInt(totalTakenQty);
	$('#splitBalanceQty').html(splitBalanceQty);
}
function splitIntoMultipleBars(){
	var parentBarQty = $('#parentBarQty').val();
	var noOfBars = $('#noOfBars').val();
	var totalBarQty = 0;
	for (var int = 0; int < parseInt(noOfBars); int++) {
		var barQty = $('#splittedBar_'+int).val();
		if (parseInt(barQty)<=0) {
			alert('Quantity cannot be less than equals to zero.');
			return false;
		}
		totalBarQty = totalBarQty + parseInt(barQty);
	}
	if (totalBarQty>parentBarQty || totalBarQty<parentBarQty) {
		//alert('Quantity division mismatch! totalBarQty:'+totalBarQty+", parentBarQty: "+parentBarQty);
		alert('Quantity division mismatch!');
		return false;
	}else{
		//alert('Split in progress...'+totalBarQty+", parentBarQty: "+parentBarQty);
		splitPlanningBoardBar();
	}
}

function splitPlanningBoardBar(){
	var lineLoadingId = $('#lineLoadingId').val();
	var splitType = $('#splitType').val();
	var splittedBarList = [];

	$(".splittedBar").each(function(i){
		splittedBarList.push($(this).val());
	});
	//alert(splittedBarList);
	//return null;
	
	$("#loadingDiv").show();
	$.ajax({
		   url: "splitPlanningBoardBar",
		   type: "POST",
	       data: {
	    	   "lineLoadingId" : lineLoadingId,
	    	   "splittedBarJsonList" : JSON.stringify(splittedBarList),
	    	   "splitType" : splitType
			 },
		   success: function(data){
			 // alert("Successfully Splitted.");
				$("#loadingDiv").hide();
				loadPlanningBoard(null);
		   },
		   error: function(data){
				$("#loadingDiv").hide();			   
		   }
	});
}
