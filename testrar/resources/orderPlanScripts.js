////////////////////////////////////////////// all update methods ///////////////////////////////////////////////////////
function updateOrderPlanInfoPopup(orderPlanId,companyId){/*alert(capacityPlanId);*/
	var formName = 'formUpdateOrderPlanInfo';
	var url= "EditOrderPlanInfo?orderPlanId="+orderPlanId;
	$('#'+formName+'_smv').attr('readonly','true');
	
	prottayPlanningCommonPopup('Update Order Planning Info','#planInfoPopup',url,'550','900',formName);
	//getOrderJsonData(formName,companyId);
	
} 

//////////////////////////////////////////////////////////////  common Methods   ///////////////////////////////////////////////////
$(document).ready(function(){
	//tempAlertMessage("order Plan Script",50000);
	if (document.getElementById('formAddOrderPlanInfo')!==null) {
		initFormFields('formAddOrderPlanInfo');
	}
	if (document.getElementById('formAddOrderPlanInfo')!==null) {
		initFormFields('formFindOrderPlanInfo');
	}
});
function InPercentage(fieldId){
	$('#'+fieldId).change(function(){
		var value = $('#'+fieldId).val();
		if (!(parseInt(value)>=0 && parseInt(value)<=100)) {
			//alert('Enter valid parcentage value');
			tempAlertMessage("Enter valid parcentage value",2000);
			$('#'+fieldId).val("");
		}
	});
}

function emptyAll(formName){
	if (formName == 'formAddOrderPlanInfo' || formName == 'formUpdateOrderPlanInfo') {
		$('#'+formName+'_orderName').val("");
		$('#'+formName+'_orderId').val("");
		$('#'+formName+'_orderQty').val("");
		$('#'+formName+'_cuttingDate').val("");
		$('#'+formName+'_cuttingDate_i18n').val("");
		$('#'+formName+'_deliveryDate').val("");
		$('#'+formName+'_deliveryDate_i18n').val("");
		$('#'+formName+'_smv').val("");
		$('#'+formName+'_efficiency').val("");
		$('#'+formName+'_hourlyTarget').val("");
		$('#'+formName+'_dayTargetQty').val("");
		$('#'+formName+'_wastage').val("");
		$('#'+formName+'_actualOrderQty').val("");
		$('#'+formName+'_totalHour').val("");
		$('#'+formName+'_productionDay').val("");
		$('#'+formName+'_leadTime').val("");
		$('#'+formName+'_throughputTime').val("");
		$('#'+formName+'_feedingTime').val("");
		$('#'+formName+'_learningTime').val("");
		$('#'+formName+'_productionTime').val("");
		
		$('#'+formName+'_finalPrdMinute').val("");
		$('#'+formName+'_finalPrdHour').val("");
		$('#'+formName+'_finalPrdDay').val("");
		
		$('#'+formName+'_wash').val("");
		$('#'+formName+'_printing').val("");
		$('#'+formName+'_embroidery').val("");
	}
	
}


////////////////////////////////////////////////// orderPlanInfo  /////////////////////////////////////////////////////////////////////////

function addOrderNameToOrderHeader(){
		jQuery.ajax({
	        url: "addOrderNameToOrderHeader",
	        type: "POST",
	        async: false,
	        success: function(data) {
				if (data.result == "true") {
					//alert('success');
					tempAlertMessage("success",2000);
				}else if (data.result == "false") {
					tempAlertMessage("failed",2000);
				}else{
					tempAlertMessage("something else!",2000);
				}
	        }
	    });
}
function getOrderJsonData(formName,companyId){
	
	//emptyAll(formName);
	$.ajax({
		url: "getOrderJsonData",
		type: "POST",
		data: {"orgPartyId":companyId},
		
		success:function(data){
			var datajson = data.orderList;
			//for create
			$('#'+formName+'_orderName').autocomplete({
				source: datajson,
				change: function(event,ui){
					var orderName = $('#'+formName+'_orderName').val();
					if (orderName == ui.item.label) {
						return true;
					} else {
						$('#'+formName+'_orderName').val('');
						$('#'+formName+'_orderId').val('');
						$('#'+formName+'_transactionId').val('');
					}
				},
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$('#'+formName+'_transactionId').val(ui.item.value);
					
					$(this).val(ui.item.label);
					var transactionId = $('#'+formName+'_transactionId').val();
					getOrderDetails(formName);
					
				}
			});
		}
	});
}
function getOrderDetails(formName){
	var transactionId = $('#'+formName+'_transactionId').val();
	var companyId = $('#'+formName+'_companyId').val();
	jQuery.ajax({
        url: "getOrderDetails?transactionId="+transactionId+"&companyId="+companyId,
        type: "POST",
        async: false,
        success: function(data) {
        	
        	$('#'+formName+'_orderId').val(data.orderId);
        	$('#'+formName+'_custRequestId').val(data.custRequestId);
        	$('#'+formName+'_styleId').val(data.styleId);
			$('#'+formName+'_orderQty').val(data.orderQty);
			$('#'+formName+'_smv').val(data.smv);
			$('#'+formName+'_scheduleSmv').val(data.smv);$('#'+formName+'_scheduleSmv').attr('readonly','true');
			$('#'+formName+'_leadTime').val(data.leadTimeInDay);
			$('#'+formName+'_leadTimeInMinute').val(data.leadTimeInMinute);
			$('#'+formName+'_wastage').val(0);
			if (data.manQty!="0" && data.manQty=="") {
				$('#'+formName+'_manQty').val(data.manQty);
			}else{
				$('#'+formName+'_manQty').val(80);
			}
			if (data.efficiency!="0") {
				$('#'+formName+'_efficiency').val(data.efficiency);
			}else{
				$('#'+formName+'_efficiency').val(80);
			}
			if (data.ppAppdate!="0") {	
				var formattedPpAppdate = $.datepicker.formatDate( "dd/mm/yy",new Date(data.ppAppdate));
				$('#'+formName+'_ppApprovalDate_i18n').val(formattedPpAppdate);
				var formattedPpAppdate2 = $.datepicker.formatDate( "yy-mm-dd",new Date(data.ppAppdate));
				$('#'+formName+'_ppApprovalDate').val(formattedPpAppdate2);
				formattedPpAppdate2 = $.datepicker.formatDate( "yy-mm-dd",new Date(data.ppAppdate));
				$('#'+formName+'_cuttingDate').val(formattedPpAppdate2);//alert($('#'+formName+'_cuttingDate').val());
			}else{
				$('#'+formName+'_ppApprovalDate_i18n').val("");	
				$('#'+formName+'_ppApprovalDate').val("");
			}
			if (data.cuttingDate!="0") {
				var formattedCuttingDate = $.datepicker.formatDate( "dd/mm/yy",new Date(data.cuttingDate));
				$('#'+formName+'_cuttingDate_i18n').val(formattedCuttingDate);
				var formattedCuttingDate2 = $.datepicker.formatDate( "yy-mm-dd",new Date(data.cuttingDate));
				$('#'+formName+'_cuttingDate').val(formattedCuttingDate2);
			}else{
				$('#'+formName+'_cuttingDate_i18n').val("");	
				$('#'+formName+'_cuttingDate').val("");
			}
			if (data.deliveryDate!="0") {
				var formattedDeliveryDate = $.datepicker.formatDate( "dd/mm/yy",new Date(data.deliveryDate));
				$('#'+formName+'_deliveryDate_i18n').val(formattedDeliveryDate);
				var formattedDeliveryDate2 = $.datepicker.formatDate( "yy-mm-dd",new Date(data.deliveryDate));
				$('#'+formName+'_deliveryDate').val(formattedDeliveryDate2);
				$('#'+formName+'_shipmentDate').val(formattedDeliveryDate);
			}else{
				$('#'+formName+'_deliveryDate_i18n').val("");
				//$('#'+formName+'_deliveryDate').val($.datepicker.formatDate( "yy-mm-dd",new Date()));
				$('#'+formName+'_deliveryDate').val("");
			}

				$('#'+formName+'_custRequestId').val(data.custRequestId);
	
				$('#'+formName+'_wash').val(data.wash);

                $('#'+formName+'_embroidery').val(data.embroidery);

				$('#'+formName+'_printing').val(data.printing);
				
				$('#'+formName+'_monthNo').val(data.monthNo);
				
				$('#'+formName+'_year').val(data.year);
				
				$('#'+formName+'_sampleReqSeqId').val(data.sampleReqSeqId);
				
			
			
			if (data.orderExists == "true") {
				//alert('The order already exists in order plan.');
				tempAlertMessage("The order already exists in order plan.",2000);
				emptyAll(formName);
			}
			
        }
	//alert(orderId);
    });
	
	var efficiency = $('#'+formName+'_efficiency').val();
	if (efficiency!==""&&efficiency!=="0") {
		calculateHourlyTarget(formName);
	}
}
//calculateHourlyTarget calculateActualOrderQty calculateTotalHour  calculateProductionDay calculateProductionTime
function calculateHourlyTarget(formName){	
	var smv = $('#'+formName+'_smv').val();
	var manQty = $('#'+formName+'_manQty').val();
	var efficiency = $('#'+formName+'_efficiency').val();
	if (parseInt(smv) <0 ) {
		//alert('smv cannot be zero!'); 
		tempAlertMessage("smv cannot be less than zero!",2000);
	}else if (parseInt(manQty)<0 ) {
		//alert('Man Qty cannot be zero!');
		tempAlertMessage("Man Qty cannot be less than zero!",2000);
	}else if (parseInt(efficiency)<0) {
		//alert('efficiency cannot be zero!');
		tempAlertMessage("efficiency cannot be less than zero!",2000);
		$('#'+formName+'_efficiency').val(55);
	}else if (parseInt(efficiency)>100) {
		//alert('efficiency cannot be zero!');
		tempAlertMessage("efficiency cannot be greater than 100!",2000);
		$('#'+formName+'_efficiency').val(55);
	}else{
		jQuery.ajax({
	        url: "calculateHourlyTarget?smv="+smv+"&manQty="+manQty+"&efficiency="+efficiency,
	        type: "POST",
	        async: false,
	        success: function(data) {
				$('#'+formName+'_hourlyTarget').val(data.hourlyTarget);	
	        }
	    });//alert('1 calculateHourlyTarget success');
		
		var wastage = $('#'+formName+'_wastage').val();
		if (wastage!=="") {
			calculateTotalHour(formName);
			calculateActualOrderQty(formName);
		}
	}
	
}
function calculateActualOrderQty(formName){	
	//orderQty, wastage ==== companyId, smv, workingHour, hourlyTarget,
	var orderQty = $('#'+formName+'_orderQty').val();
	var wastage = $('#'+formName+'_wastage').val();
	var productionDay = $('#'+formName+'_productionDay').val();

	var manQty = $('#'+formName+'_manQty').val();
	var companyId = $('#'+formName+'_companyId').val();
	var smv = $('#'+formName+'_smv').val();
	var workingHour = $('#'+formName+'_workingHour').val();
	var hourlyTarget = $('#'+formName+'_hourlyTarget').val();
	if (parseInt(wastage)>=0 && parseInt(wastage)<=100) {
		jQuery.ajax({
	        url: "calculateActualOrderQty?orderQty="+orderQty+"&wastage="+wastage+"&manQty="+manQty+
	        "&companyId="+companyId+"&smv="+smv+"&workingHour="+workingHour+"&hourlyTarget="+hourlyTarget+"&productionDay="+productionDay,
	        type: "POST",
	        async: false,
	        success: function(data) {//alert(data.learningTime);
				$('#'+formName+'_actualOrderQty').val(data.actualOrderQty);
				$('#'+formName+'_dayTargetQty').val(data.dayTargetQty);
				//$('#'+formName+'_learningTime').val(data.learningTime);
	        }
	    });//alert('2 calculateActualOrderQty success');
		if (wastage!=="") {
			calculateTotalHour(formName);
		}
	}
	
	
}

function calculateEfficiency(formName){
	var dayTargetQty = $('#'+formName+'_dayTargetQty').val();
	var workingHour = $('#'+formName+'_workingHour').val();
	var smv = $('#'+formName+'_smv').val();
	var manQty = $('#'+formName+'_manQty').val();
	
	jQuery.ajax({
        url: "calculateEfficiency?dayTargetQty="+dayTargetQty+"&workingHour="+workingHour+"&smv="+smv+"&manQty="+manQty,
        type: "POST",
        async: false,
        success: function(data) {
        	if (data.crossHundred == "true") {
				tempAlertMessage("Efficiency Cross 100%",3000);
			}else{
				
	        	$('#'+formName+'_efficiency').val(data.efficiency);
	        	$('#'+formName+'_hourlyTarget').val(data.hourlyTarget);
			}
        }
    });
	var wastage = $('#'+formName+'_wastage').val();
	if (wastage!="") {
		calculateActualOrderQty(formName);
	}
}
function calculateTotalHour(formName){	
	var actualOrderQty = $('#'+formName+'_actualOrderQty').val();
	var hourlyTarget = $('#'+formName+'_hourlyTarget').val();
	jQuery.ajax({
        url: "calculateTotalHour?actualOrderQty="+actualOrderQty+"&hourlyTarget="+hourlyTarget,
        type: "POST",
        async: false,
        success: function(data) {
			$('#'+formName+'_totalHour').val(data.totalHour);
        }
    });//alert('3 calculateTotalHour success');
	
	var totalHour = $('#'+formName+'_totalHour').val();
	if (totalHour!="") {
		calculateProductionDay(formName);
	}
	
}
function calculateProductionDay(formName){	
	var totalHour = $('#'+formName+'_totalHour').val();
	var workingHour = $('#'+formName+'_workingHour').val();
	jQuery.ajax({
        url: "calculateProductionDay?totalHour="+totalHour+"&workingHour="+workingHour,
        type: "POST",
        async: false,
        success: function(data) {
			$('#'+formName+'_productionDay').val(data.productionDays);		
        }//productionMinute
    });
	calculateLearningTime(formName);
	
	//alert('4 calculateProductionDay success');
}
function calculateLearningTime(formName){	
	var manQty = $('#'+formName+'_manQty').val();
	var companyId = $('#'+formName+'_companyId').val();
	var smv = $('#'+formName+'_smv').val();
	var workingHour = $('#'+formName+'_workingHour').val();
	var dayTargetQty = $('#'+formName+'_dayTargetQty').val();
	var productionDay = $('#'+formName+'_productionDay').val();

	jQuery.ajax({
        url: "calculateLearningTime?manQty="+manQty+
        "&companyId="+companyId+"&smv="+smv+"&workingHour="+workingHour+"&dayTargetQty="+dayTargetQty+"&productionDay="+productionDay,
        type: "POST",
        async: false,
        success: function(data) {
			$('#'+formName+'_learningTime').val(data.learningTime);
        }
    });
	calculateProductionTime(formName);
	
}
function calculateProductionTime(formName){	
	var productionDays = $('#'+formName+'_productionDay').val();
	var leadTime = $('#'+formName+'_leadTimeInMinute').val();
	var throughPutTime = $('#'+formName+'_throughPutTime').val();
	var feedingTime = $('#'+formName+'_feedingTime').val();
	var learningTime = $('#'+formName+'_learningTime').val();
	var workingHour = $('#'+formName+'_workingHour').val();
	jQuery.ajax({
        url: "calculateProductionTime?workingHour="+workingHour+"&productionDays="+productionDays+"&leadTime="+leadTime+"&throughPutTime="+throughPutTime+"&feedingTime="+feedingTime+"&learningTime="+learningTime,
        type: "POST",
        async: false,
        success: function(data) {
			$('#'+formName+'_finalPrdMinute').val(data.finalPrdMinute);	
			$('#'+formName+'_finalPrdHour').val(data.finalPrdHour);	
			$('#'+formName+'_finalPrdDay').val(data.finalPrdDay);	
        }
    });
	/*alert('calculation success');*/
}

function updateOrderPlanInfo(formName) {
	var orderPlanId = $("#"+formName+"_orderPlanId").val();
	var companyId = $("#"+formName+"_companyId").val();
	var transactionId = $("#"+formName+"_transactionId").val();
	var orderId = $("#"+formName+"_orderId").val();
	var orderName = $("#"+formName+"_orderName").val();
	var orderQty = $("#"+formName+"_orderQty").val();
	var ppApprovalDate = $("#"+formName+"_ppApprovalDate").val();
	
	var cuttingDate = $("#"+formName+"_cuttingDate").val();
	var deliveryDate = $("#"+formName+"_deliveryDate").val();
	
	var smv = $("#"+formName+"_smv").val();
	var manQty = $("#"+formName+"_manQty").val();
	var efficiency = $("#"+formName+"_efficiency").val();
	
	var hourlyTarget = $("#"+formName+"_hourlyTarget").val();
	var dayTargetQty = $("#"+formName+"_dayTargetQty").val();
	var wastage = $("#"+formName+"_wastage").val();
	var actualOrderQty = $("#"+formName+"_actualOrderQty").val();
	var workingHour = $("#"+formName+"_workingHour").val();
	
	var totalHour = $("#"+formName+"_totalHour").val();
	var productionDay = $("#"+formName+"_productionDay").val();
	//var productionHour = $("#"+formName+"_isLearningTime").val();
	//var productionMinute = $("#"+formName+"_isLearningTime").val();
	var leadTime = $("#"+formName+"_leadTime").val();
	var throughputTime = $("#"+formName+"_throughputTime").val();
	var feedingTime = $("#"+formName+"_feedingTime").val();
	var learningTime = $("#"+formName+"_learningTime").val();
	var finalPrdDay = $("#"+formName+"_finalPrdDay").val();
	var finalPrdHour = $("#"+formName+"_finalPrdHour").val();
	var finalPrdMinute = $("#"+formName+"_finalPrdMinute").val();
	
	var styleId = $("#"+formName+"_isLearningTime").val();
	

	$('#waitingDiv').show();
	if (orderId=="") {
		tempAlertMessage('Select Order!',2000);
	}else if (styleId=="") {
		tempAlertMessage('Select Style!',2000);
	}else {
		$.ajax({
			url : "updateOrderPlanInfoJson",
			type : "POST",
			data : {
				"orderPlanId" : orderPlanId,
				"companyId":companyId,
				"transactionId" : transactionId,
				"orderId" : orderId,
				"orderName" : orderName,
				"orderQty" : orderQty,
				"ppApprovalDate" : ppApprovalDate,
				"cuttingDate" : cuttingDate,
				"deliveryDate" : deliveryDate,
				"smv" : smv,
				"manQty" : manQty,
				"efficiency" : efficiency,
				"hourlyTarget" : hourlyTarget,
				"dayTargetQty" : dayTargetQty,
				"wastage" : wastage,
				"actualOrderQty" : actualOrderQty,
				"workingHour" : workingHour,
				"totalHour" : totalHour,
				"productionDay" : productionDay,
				"leadTime" : leadTime,
				
				"throughputTime":throughputTime,
				"feedingTime":feedingTime,
				"learningTime":learningTime,
				"finalPrdDay":finalPrdDay,
				"finalPrdHour":finalPrdHour,
				"finalPrdMinute":finalPrdMinute,
				"styleId":styleId,
			},
			success : function(updateResult) {
				$('#waitingDiv').hide();
				if ($('#updatePlanningBoardInfoPopup_orderQty')) {
					$('#updatePlanningBoardInfoPopup_orderQty').val(actualOrderQty);
				}
				if (updateResult.updateMessage!="") {
					//$('.ui-dialog').dialog('destroy').remove();
					alert(updateResult.updateMessage);
					tempAlertMessage(updateResult.updateMessage,2000);
				}
				/*var formName = 'formUpdatePrdLineLoadingInfo';
				var lineLoadingId = $("#"+formName+"_lineLoadingId").val();
				var url= "EditPrdLineLoadingInfo?lineLoadingId="+lineLoadingId+"&orderPlanId="+orderPlanId;
				
				prottayPlanningCommonPopup('Update Production Line Loading Info','#planInfoPopup',url,'500','1000',formName);
				 */
				
				/*if (document.getElementById('MonthlyGanttDiv') !== null) {
					  loadPlanningBoard(null);
					  if (updateResult.updateMessage!="") {
						$('.ui-dialog').dialog('destroy').remove();
						tempAlertMessage(updateResult.updateMessage,2000);
					}
				}else{
					orderPlanId = $("#orderPlanId").val();
					companyId = $("#companyId").val();
					var orderName = $("#orderName").val();
					loadOrders(companyId,orderPlanId,orderName);
					if (updateResult.updateMessage!="") {
						$('.ui-dialog').dialog('destroy').remove();
						tempAlertMessage(updateResult.updateMessage,3000);
					}
				}*/
			}
		});
	}
	
}