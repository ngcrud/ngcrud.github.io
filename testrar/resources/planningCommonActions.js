
function getFloors(formName){
	var companyId = $('#'+formName+'_companyId').val();
	$.ajax({
		url : "getFloors?organizationPartyId="+companyId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var prodFloorId = document.getElementById(formName+"_prodFloorId");	
			while(prodFloorId.options.length > 0 ){
				prodFloorId.remove(0);
			}
			if (data.floorList!="") {
				for(var i=0; i<data.floorList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.floorList[i].floorName;;
	     			option.value = data.floorList[i].prodFloorId;	     								
	     			prodFloorId.add(option);
	     				     		
			}
			 $('#'+formName+'_prodFloorId').prepend("<option value='' selected='selected'>--select floor--</option>");
			}else{
				$('#'+formName+'_prodFloorId').prepend("<option value='' selected='selected'>--no floor--</option>");
			}
			
		
		}
	});
	
}
function getProdLines(formName){
	
	var prodFloorId = $('#'+formName+'_prodFloorId').val();
	$.ajax({
		url : "getProdLines?prodFloorId="+prodFloorId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var line = document.getElementById(formName+"_lineId");	
			while(line.options.length > 0 ){
				line.remove(0);
			}
			if (data.lineList!="") {
				for(var i=0; i<data.lineList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.lineList[i].lineName;;
	     			option.value = data.lineList[i].lineId;	     								
	     			line.add(option);
	     				     		
				}
				$('#'+formName+'_lineId').prepend("<option value='' selected='selected'>--select line--</option>");
			}else{
				$('#'+formName+'_lineId').prepend("<option value='' selected='selected'>--no line--</option>");
			}
			//alert(data);
		
		}
	});
	
}

function getProdColors(formName){
	//alert($('#prodFloorId').val());
	var styleId = $('#'+formName+'_styleId').val();
	
	$.ajax({
		url : "getProdColors?styleId="+styleId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var color = document.getElementById(formName+"_colorId");	
			while(color.options.length > 0 ){
				color.remove(0);
			}
			var colorIdList = data.colorIdList;
				if (colorIdList!="") {
					for(var i=0; i<data.colorIdList.length; i++){
						var option = document.createElement("option");										                    
					    option.text = data.colorIdList[i].colorName;;
		     			option.value = data.colorIdList[i].colorId;	     								
		     			color.add(option);
		     				     		
				}
				$('#'+formName+'_colorId').prepend("<option value='' selected='selected'>--select color--</option>");
			}else
				$('#'+formName+'_colorId').prepend("<option value='' selected='selected'>--No color--</option>");
		
		}
	});
	
}
///////////////////////////////////////// Line Loading Update form//////////////////////////
function getOrderJsonDataForPrdLineLoading(formName,companyId){
	
	$.ajax({
		url: "getOrderJsonData",
		type: "POST",
		data: {"orgPartyId":companyId},
		success:function(data){
			var datajson = data.orderList;
			//for create
			$('#'+formName+'_orderName').autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				change: function(event,ui){
					var orderName = $('#'+formName+'_orderName').val();		
					if (ui.item!==null) {
						if(orderName == ui.item.label){
							return true;
						}else{
							$('#'+formName+'_orderName').val('');
							$('#'+formName+'_orderId').val('');	
						}
					}else{
						$('#'+formName+'_orderName').val('');
						$('#'+formName+'_orderId').val('');	
					}
					
				},
				select: function(event, ui) {
					event.preventDefault();
					$('#'+formName+'_orderId').val(ui.item.value);
					
					$(this).val(ui.item.label);
					getOrderDetailsForPrdLineLoading(formName);
					
					$('#'+formName+'_orderName').change(function(){
						
					});	
				}
			});
		}
	});
}

function getOrderDetailsForPrdLineLoading(formName) {
	var transactionId = $('#' + formName + '_transactionId').val();
	var companyId = $('#' + formName + '_companyId').val();
	jQuery
			.ajax({
				url : 'getOrderDetailsForPrdLineLoading?transactionId='
						+ transactionId + '&companyId=' + companyId,
				type : 'POST',
				async : false,
				success : function(data) {
					$('#' + formName + '_shipmentOrderQty').val(data.orderQty);
					$('#' + formName + '_orderQty').val(data.actualOrderQty);
					$('#' + formName + '_allowQty').val(data.allowQty);
					$('#' + formName + '_allowQty_hidden').val(data.allowQty);
					$('#' + formName + '_orderPlanId').val(data.orderPlanId);
					$('#' + formName + '_orderId').val(data.orderId);
					$('#' + formName + '_buyerId').val(data.buyerId);
					$('#' + formName + '_buyerName').val(data.buyerName);
					$('#' + formName + '_targetDayQty').val(data.targetDayQty);
					$('#' + formName + '_productionMinute').val(
							data.productionMinute);
					$('#' + formName + '_productionHour').val(
							data.productionHour);
					$('#' + formName + '_productionDay')
							.val(data.productionDay);
					
					
					$('#' + formName + '_feedingTime').val(data.feedingTime);
					$('#' + formName + '_learningTime').val(data.learningTime);
					var ppAppdate = $.datepicker.formatDate("dd/mm/yy",
							new Date(data.ppAppdate));
					$('#' + formName + '_ppAppdate').val(ppAppdate);
					var deliveryDate = $.datepicker.formatDate("dd/mm/yy",
							new Date(data.deliveryDate));
					$('#' + formName + '_shipmentDate').val(deliveryDate);

					ppAppdate = $.datepicker.formatDate("yy-mm-dd", new Date(
							data.ppAppdate));
					
					var feedingTime = $('#' + formName + '_feedingTime').val();
					feedingTime = Math.ceil((parseInt(feedingTime) / 60) / 10);
					var dateOffset = (24 * 60 * 60 * 1000) * feedingTime; // 5
					// days
					var myDate = new Date(ppAppdate);
					myDate.setTime(myDate.getTime() + dateOffset);

					// deliveryDate = new
					// Date(deliveryDate).getDate()-productionDay;
					ppAppdate = $.datepicker.formatDate("yy-mm-dd", new Date(
							myDate));
					
					var today = new Date();
					today = $.datepicker.formatDate("yy-mm-dd", new Date(today));
					//alert(today);
					// alert(deliveryDate);
					$('#' + formName + '_inputDate').val(today);
					$('#' + formName + '_outputStartDate').val(today);
					if (parseInt(data.allowQty) == 0) {
						alert('All quantities of this order is allocated!');
						emptyAll(formName);
					}

				}
			});
}


function checkDateRange(formName) {
	if (formName!==null) {
		var lineLoadingId = $('#' + formName + '_lineLoadingId').val();
		var lineId = $('#' + formName + '_lineId').val();
		var outputStartDate = $('#' + formName + '_outputStartDate').val();
		var outputEndDate = $('#' + formName + '_outputEndDate').val();
	}else{
		var lineLoadingId = $('#lineLoadingId').val();
		var lineId = $('#lineId').val();
		var outputStartDate = $('#outputStartDate').val();
		var outputEndDate = $('#outputEndDate').val();
	}
	if (lineId != "" && outputStartDate != "" && outputEndDate != "") {
		$.ajax({
			url : "checkDateRange?lineLoadingId=" + lineLoadingId + "&lineId="
					+ lineId + "&outputStartDate=" + outputStartDate + "&outputEndDate="
					+ outputEndDate,
			type : "GET",
			data : getRequestData(),
			success : function(data) {// alert(data.dateRangeInvalid);
				if (data.dateRangeInvalid == "true") {
					alert('The line is engaged with the date range.');
					if (formName!==null) {
						$('#' + formName + '_lineId').val("");
					}else{
						$('#lineId').val("");
					}
				}
			}
		});
	}
}
function clearDates(formName) {
	//$('#'+formName+'_inputDate').val("");
	//$('#'+formName+'_inputDate_i18n').val("");
	//$('#'+formName+'_outputStartDate_i18n').val("");
	if (formName!==null) {
		$('#'+formName+'_outputEndDate').val("");
		$('#'+formName+'_outputEndDate_i18n').val("");
	}else{
		$('#outputEndDate').val("");
		$('#outputEndDate_i18n').val("");
	}
	
}
function compareWithOrderQty(formName) {// alert();
	if (formName!==null) {
		var allowQty_hidden = $('#' + formName + '_allowQty_hidden').val();
		allowQty_hidden = allowQty_hidden.replace(/,/g, "");
		var allowQty = $('#' + formName + '_allowQty').val();
		var orderQty = $('#' + formName + '_orderQty').val();
		
		if (parseInt(allowQty) > parseInt(orderQty)) {
			var orderId = $('#' + formName + '_orderId').val();
			checkAllowQty(orderId, allowQty, formName);
		} else {
			orderId = $('#' + formName + '_orderId').val();// alert(companyId);
			if (allowQty != "" && orderId != "") {
				checkAllowQty(orderId, allowQty, formName);
			}
		}
	}else{
		
		var allowQty = $('#allowQty').val();
		var orderQty = $('#orderQty').val();
		
		if (parseInt(allowQty) > parseInt(orderQty)) {
			var orderId = $('#orderId').val();
			checkAllowQty(orderId, allowQty, null);
		} else {
			orderId = $('#orderId').val();// alert(companyId);
			if (allowQty != "" && orderId != "") {
				checkAllowQty(orderId, allowQty, null);
			}
		}
	}
	
}
function updateBoardsOrderPlanInfoPopup(lineLoadingId,orderPlanId,companyId,month,year){/*alert(capacityPlanId);*/
	var formName = 'formUpdateOrderPlanInfo';
	var url= "EditPlanningBoardOrderPlanInfo?orderPlanId="+orderPlanId;
	$('#'+formName+'_smv').attr('readonly','true');
	
	prottayPlanningCommonPopup('Update Order Planning Info','#planInfoPopup',url,'550','900',formName);
	//getOrderJsonData(formName,companyId);
	
} 
function checkAllowQty(orderId, allowQty, formName) {
	
	if (formName!==null) {
		var allowQty_hidden = $('#' + formName + '_allowQty_hidden').val();
		allowQty_hidden = allowQty_hidden.replace(/,/g, "");
		var orderPlanId = $('#' + formName + '_orderPlanId').val();
	}else{
		var balanceQty = $('#balanceQty').val();
		balanceQty = balanceQty.replace(/,/g, "");
		var orderPlanId = $('#orderPlanId').val();
	}
	// alert(companyId);
	// var orderId = $('#'+formName+'_orderId').val();//alert(companyId);
	var forUpdate = 'N';
	var lineLoadingId = "";
	var str = 'Update';
	if (formName!==null) {
		if (formName.indexOf('Update') != -1 || formName.indexOf('update') != -1) {
			forUpdate = 'Y';
			if (formName!==null) {
				lineLoadingId = $('#' + formName + '_lineLoadingId').val();
			}else{
				lineLoadingId = $('#lineLoadingId').val();
			}
		}
	}
	
	$('#waitingDiv').show();
	$.ajax({
				url : "checkAllowQty?lineLoadingId=" + lineLoadingId
						+ "&orderPlanId=" + orderPlanId + "&orderId=" + orderId
						+ "&allowQty=" + allowQty + "&forUpdate=" + forUpdate,
				type : "GET",
				data : getRequestData(),
				success : function(data) {
					$('#waitingDiv').hide();
					if (formName!==null) {
						if (data.crossActualAllowQty == "false") {
							clearDates(formName);
							$('#' + formName + '_allowQty').val(allowQty);
							//getProductionDay(orderId, allowQty, formName);
							getProductionEndDate(formName,"efficiency");
						} else {
							alert('Allow Qty greater than Actual Allow Qty ! You can enter allow Qty: '
									+ data.allowQty);
							//$('#' + formName + '_allowQty').val(data.allowQty);
							$('#' + formName + '_allowQty').val(parseInt(allowQty_hidden));
							//getProductionDay(orderId, allowQty_hidden, formName);
							getProductionEndDate(formName,"efficiency");
						}
					}else{
						if (data.crossActualAllowQty == "false") {
							clearDates(null);
							$('#allowQty').val(allowQty);
							//getProductionDay(orderId, allowQty, formName);
							getProductionEndDate(null,"efficiency");
						} else {
							planningAlertMessage("black",'Allow Qty greater than Actual Allow Qty ! You can enter allow Qty: '
									+ data.allowQty,3000);
							//$('#' + formName + '_allowQty').val(data.allowQty);
							$('#allowQty').val(parseInt(balanceQty));
							//getProductionDay(orderId, allowQty_hidden, formName);
							getProductionEndDate(null,"efficiency");
						}
					}
				}
			});
	
}

function getProductionDay(orderId, allowQty, formName) {
	if (formName!==null) {
		var orderPlanId = $('#' + formName + '_orderPlanId').val();
	}else{
		var orderPlanId = $('#orderPlanId').val();
	}
	
	$.ajax({
		url : "getProductionDay?orderPlanId=" + orderPlanId + "&orderId="
				+ orderId + "&allowQty=" + allowQty,
		type : "GET",
		data : getRequestData(),
		success : function(data) {
			if (formName!==null) {
				$('#' + formName + '_productionMinute').val(data.productionMinute);
				$('#' + formName + '_productionHour').val(data.productionHour);
				$('#' + formName + '_productionDay').val(data.productionDay);
			}else{
				$('#productionMinute').val(data.productionMinute);
				$('#productionHour').val(data.productionHour);
				$('#productionDay').val(data.productionDay);
			}
			var productionDay = data.productionDay;
			if (formName!==null) {
				var ppAppdate = $('#' + formName + '_ppAppdate').val();
				var splittedDate = $('#' + formName + '_ppAppdate').val().split("/");// ---- DD/MM/YYYY
				ppAppdate = new Date(splittedDate[2], splittedDate[1] - 1,splittedDate[0]);// yyyy-mm-dd

				var feedingTime = $('#' + formName + '_feedingTime').val();
				feedingTime = Math.ceil((parseInt(feedingTime) / 60) / 10);
				var dateOffset = (24 * 60 * 60 * 1000) * feedingTime; // 5 days
			}else{
				var ppAppdate = $('#ppAppdate').val();
				var splittedDate = $('#ppAppdate').val().split("/");// ---- DD/MM/YYYY
				ppAppdate = new Date(splittedDate[2], splittedDate[1] - 1,splittedDate[0]);// yyyy-mm-dd

				var feedingTime = $('#feedingTime').val();
				feedingTime = Math.ceil((parseInt(feedingTime) / 60) / 10);
				var dateOffset = (24 * 60 * 60 * 1000) * feedingTime; // 5 days
			}
			
			var myDate = new Date(ppAppdate);
			myDate.setTime(myDate.getTime() + dateOffset);
			ppAppdate = $.datepicker.formatDate("yy-mm-dd", new Date(myDate));
		}
	});
}

function getProductionEndDate(formName,fieldPriority) {
	
	if (formName!==null) {
		var outputStartDate = $('#' + formName + '_outputStartDate').val();
		var companyId = $('#' + formName + '_companyId').val();
		var orderPlanId = $('#' + formName + '_orderPlanId').val();
		var transactionId = $('#' + formName + '_transactionId').val();
		var allowQty = $('#' + formName + '_allowQty').val();
		var extraQtyPerc = $('#' + formName + '_extraQtyPerc').val();
		var lineId = $('#' + formName + '_lineId').val();// alert(companyId);
		var orderId = $('#' + formName + '_orderId').val();// alert(companyId);
		var lineLoadingId = $('#' + formName + '_lineLoadingId').val();
		var learningTime = $('#' + formName + '_learningTime').val();
		var efficiency = $('#' + formName + '_efficiency').val();
		var targetDayQty = $('#' + formName + '_targetDayQty').val();
		var workingHour = $('#' + formName + '_workingHour').val();
	}else{
		var outputStartDate = $('#outputStartDate').val();
		var companyId = $('#companyId').val();
		var orderPlanId = $('#orderPlanId').val();
		var transactionId = $('#transactionId').val();
		var allowQty = $('#allowQty').val();
		var extraQtyPerc = $('#extraQtyPerc').val();
		var lineId = $('#lineId').val();// alert(companyId);
		var orderId = $('#orderId').val();// alert(companyId);
		var lineLoadingId = $('#lineLoadingId').val();
		var learningTime = $('#learningTime').val();
		var efficiency = $('#efficiency').val();
		var targetDayQty = $('#targetDayQty').val();
		var workingHour = $('#workingHour').val();
	}
	//alert(extraQtyPerc);return;
	if (outputStartDate=="") {
		if (formName!==null) {
			alert('Please enter output start date!');
		}else{
			planningAlertMessage("black",'Please enter output start date!',3000);
		}
	}else if (lineId == "" ) {
		if (formName!==null) {
			alert('Please select line');
		}else{
			planningAlertMessage("black",'Please select line',3000);
		}
	} else if (orderId == "") {
		if (formName!==null) {
			alert('Please select order');
		}else{
			planningAlertMessage("black",'Please select order',3000);
		}
	} else if (allowQty == "" ) {
		if (formName!==null) {
			alert('Please enter allowQty');
		}else{
			planningAlertMessage("black",'Please enter allowQty',3000);
		}
	}else if (targetDayQty == "" ) {
		if (formName!==null) {
			alert('Please enter targetDayQty');
		}else{
			planningAlertMessage("black",'Please enter targetDayQty',3000);
		}
	}else if (learningTime == "" ) {
		if (formName!==null) {
			alert('Please enter learningTime');
		}else{
			planningAlertMessage("black",'Please enter learningTime',3000);
		}
	}else if (efficiency == "" ) {
		if (formName!==null) {
			alert('Please enter efficiency');
		}else{
			planningAlertMessage("black",'Please enter efficiency',3000);
		}
	} else {
		$('#waitingDiv').show();
		$.ajax({
			url : "getProductionEndDate",
			type : "GET",
			data : {
				"fieldPriority" : fieldPriority,
				"outputStartDate" : outputStartDate,
				"lineLoadingId" : lineLoadingId,
				"companyId" : companyId,
				"lineId" : lineId,
				"learningTime" : learningTime,
				"efficiency" : efficiency,
				"orderPlanId" : orderPlanId,
				"transactionId" : transactionId,
				"orderId" : orderId,
				"allowQty" : allowQty,
				"extraQtyPerc" : extraQtyPerc,
				"targetDayQty" : targetDayQty,
				"workingHour" : workingHour
			},
			success : function(data) {
				$('#waitingDiv').hide();
				/*$('#' + formName + '_totalProductionDays').val(
						data.totalProductionDays);*/
				if (formName!==null) {
					 $('#' + formName + '_productionMinute').val( data.productionMinute);
					 $('#' + formName + '_productionHour').val( data.productionHour);
					 $('#' + formName + '_productionDay').val( data.productionDay);
					 $('#' + formName + '_isLearningTime').val( data.isLearningTime);
					 $('#' + formName + '_outputStartDateAvailableHour').val( data.outputStartDateAvailableHour);
					 $('#' + formName + '_totalHoliday').val(data.totalHolidays);
					 
					 $('#' + formName + '_efficiency').val(data.efficiency);
					 $('#' + formName + '_targetDayQty').val(data.targetDayQty);
					 $('#' + formName + '_learningTime').val(data.learningTime);
				}else{
					$('#productionMinute').val( data.productionMinute);
					 $('#productionHour').val( data.productionHour);
					 $('#productionDay').val( data.productionDay);
					 $('#isLearningTime').val( data.isLearningTime);
					 $('#outputStartDateAvailableHour').val( data.outputStartDateAvailableHour);
					 $('#totalHolidays').val(data.totalHolidays);
					 
					 $('#efficiency').val(data.efficiency);
					 $('#targetDayQty').val(data.targetDayQty);
					 $('#learningTime').val(data.learningTime);
				}
				
				if (formName!==null) {
					formattedDate = $.datepicker.formatDate("yy-mm-dd", new Date(data.outputEndDate));
					$('#' + formName + '_outputEndDate').val(formattedDate);
					formattedDate = $.datepicker.formatDate("dd/mm/yy", new Date(data.outputEndDate));
					$('#' + formName + '_outputEndDate_i18n').val(formattedDate);
				}else{
					formattedDate = $.datepicker.formatDate("dd/mm/yy", new Date(data.outputEndDate));
					$('#outputEndDate').val(formattedDate);
					formattedDate = $.datepicker.formatDate("dd/mm/yy", new Date(data.outputEndDate));
					$('#outputEndDate_i18n').val(formattedDate);
				}
				if (data.outputStartDateBeforeToday == "true") {
					if (formName!==null) {
						$('#' + formName + '_outputStartDate_i18n').val("");
						$('#' + formName + '_outputEndDate').val("");
						$('#' + formName + '_outputEndDate_i18n').val("");
						alert('Start date cannot be before today');
					}else{
						$('#outputStartDate_i18n').val("");
						$('#outputEndDate').val("");
						$('#outputEndDate_i18n').val("");
						planningAlertMessage("black",'Start date cannot be before today',3000);
					}
					
				}else if (data.outputStartDateHoliday == "true") {
					if (formName!==null) {
						$('#' + formName + '_outputStartDate_i18n').val("");
						$('#' + formName + '_outputEndDate').val("");
						$('#' + formName + '_outputEndDate_i18n').val("");
						alert('Start date cannot be holiday');
					}else{
						$('#outputStartDate_i18n').val("");
						$('#outputEndDate').val("");
						$('#outputEndDate_i18n').val("");
						planningAlertMessage("black",'Start date cannot be holiday',3000);
					}
				} else if (data.crossPpAppdate == "true") {
					if (formName!==null) {
						$('#' + formName + '_outputStart_i18n').val("");
						$('#' + formName + '_outputEndDate').val("");
						$('#' + formName + '_outputEndDate_i18n').val("");
						alert('Start date cannot be before pp Approval date.');
					}else{
						$('#outputStart_i18n').val("");
						$('#outputEndDate').val("");
						$('#outputEndDate_i18n').val("");
						planningAlertMessage("black",'Start date cannot be before pp Approval date.',3000);
					}
				} else if (data.engagedLine == "true") {
					if (formName!==null) {
						//$('#'+formName+'_inputDate').val("");
						//$('#' + formName + '_inputDate_i18n').val("");
						$('#' + formName + '_outputStartDate').val("");
						$('#' + formName + '_outputStartDate_i18n').val("");
						$('#' + formName + '_outputEndDate').val("");
						$('#' + formName + '_outputEndDate_i18n').val("");
						alert('The line is engaged with the date range.');
					}else{
						$('#outputStartDate').val("");
						$('#outputStartDate_i18n').val("");
						$('#outputEndDate').val("");
						$('#outputEndDate_i18n').val("");
						planningAlertMessage("black",'The line is engaged with the date range.',3000);
					}
				} else if (data.crossDeliveryDate == "true") {
					if (formName!==null) {
						$('#' + formName + '_outputEndDate').val("");
						$('#' + formName + '_outputEndDate_i18n').val("");
						alert('Output end date must be before shipment date.');
						
					}else{
						$('#outputEndDate').val("");
						$('#outputEndDate_i18n').val("");
						planningAlertMessage("black",'Output end date must be before shipment date.',3000);
						
					}
				}else{
					if (formName!==null) {
						//showDateWiseOrderQty(formName);
					}else{
						//showDateWiseOrderQty(null);
					}
				}
				
			}
		});
	}
}
function getAllowQty(formName){
	if (formName!==null) {
		var outputStartDate = $('#'+formName+'_outputStartDate').val();
		var outputEndDate = $('#'+formName+'_outputEndDate').val();
		var lineLoadingId = $('#'+formName+'_lineLoadingId').val();
		var orderPlanId = $('#'+formName+'_orderPlanId').val();
		var lineId = $('#'+formName+'_lineId').val();
		var companyId = $('#'+formName+'_companyId').val();
		var efficiency = $('#'+formName+'_efficiency').val();
		var targetDayQty = $('#'+formName+'_targetDayQty').val();
	}else{
		var outputStartDate = $('#outputStartDate').val();
		var outputEndDate = $('#outputEndDate').val();
		var lineLoadingId = $('#lineLoadingId').val();
		var orderPlanId = $('#orderPlanId').val();
		var lineId = $('#lineId').val();
		var companyId = $('#companyId').val();
		var efficiency = $('#efficiency').val();
	}
	
	$.ajax({
		url : "getAllowQty",
		type : "POST",
		data : {
			"lineLoadingId" : lineLoadingId,
			"orderPlanId" : orderPlanId,
			"lineId" : lineId,
			"outputStartDate" : outputStartDate,
			"outputEndDate" : outputEndDate,
			"companyId" : companyId,
			"targetDayQty" : targetDayQty,
			"efficiency" : efficiency
		},
		success : function(result) {
			if (result.resultMessage == null) {
				if (formName!==null) {
					$('#'+formName+'_allowQty').val(result.allowQty);
					$('#'+formName+'_productionDay').val(result.productionDay);
					$('#'+formName+'_productionHour').val(result.productionHour);
					$('#'+formName+'_productionMinute').val(result.productionMinute);
					
					$('#' + formName + '_totalHoliday').val(result.totalHolidays);
					showDateWiseOrderQty(formName);
				}else{
					$('#allowQty').val(result.allowQty);
					$('#productionDay').val(result.productionDay);
					$('#productionHour').val(result.productionHour);
					$('#productionMinute').val(result.productionMinute);
					
					$('#totalHolidays').val(result.totalHolidays);
					showDateWiseOrderQty(null);
				}
				
			}else{
				alert(result.resultMessage);
				if (formName!==null) {
					$('#'+formName+'_productionDay').val(0);
					$('#'+formName+'_productionHour').val(0);
					$('#'+formName+'_productionMinute').val(0);
					$('#'+formName+'_outputEndDate').val('');
					$('#'+formName+'_outputEndDate_i18n').val('');
					
				}else{
					$('#productionDay').val(0);
					$('#productionHour').val(0);
					$('#productionMinute').val(0);
					$('#outputEndDate').val('');
					
				}
			}
			
		}
	});
}
function checkInputDateByDateRange(formName){
	var ppAppdate = $('#' + formName + '_ppAppdate').val();
	var shipmentDate = $('#' + formName + '_shipmentDate').val();
	
	if (ppAppdate=="") {
		alert("PP App date is empty!");
	}else if(shipmentDate==""){
		alert("Shipment date is empty!");
	}else{
		ppAppdate = $('#' + formName + '_ppAppdate').val().split('/');
		shipmentDate = $('#' + formName + '_shipmentDate').val().split('/');
		
		var ppAppdateD = new Date();
		ppAppdateD.setFullYear(ppAppdate[2],(ppAppdate[1] - 1),ppAppdate[0]);
		
		var shipmentDateD = new Date();
		shipmentDateD.setFullYear(shipmentDate[2],(shipmentDate[1] - 1),shipmentDate[0]);
		
		var inputDate = $('#' + formName + '_inputDate_i18n').val().split('/');
		
		var inputDateD = new Date();
		inputDateD.setFullYear(inputDate[2],(inputDate[1] - 1),inputDate[0]);
		
		if (inputDateD < ppAppdateD) {
			alert("Input date cannot be before approval date!");
			$('#' + formName + '_inputDate_i18n').val('');
		}
		if (inputDateD > shipmentDateD) {
			alert("Input date cannot be after shipment date!");
			$('#' + formName + '_inputDate_i18n').val('');
		}
		
	}
}


///////////////////////////////////// lineLoadingInfo common methods 
function updateLineLoadingInfo(formName) {
	var companyId = $("#"+formName+"_companyId").val();
	var transactionId = $("#"+formName+"_transactionId").val();
	var lineLoadingId = $("#"+formName+"_lineLoadingId").val();
	var orderPlanId = $("#"+formName+"_orderPlanId").val();
	var lineId = $("#"+formName+"_lineId").val();
	var colorId = $("#"+formName+"_colorId").val();
	var orderId = $("#"+formName+"_orderId").val();
	var buyerId = $("#"+formName+"_buyerId").val();
	var styleId = $("#"+formName+"_styleId").val();
	var colorId = $("#"+formName+"_colorId").val();
	var orderQty = $("#"+formName+"_orderQty").val();
	var extraQtyPerc = $("#"+formName+"_extraQtyPerc").val();
	if (!$.isNumeric(extraQtyPerc)) {
		alert("Please Enter Numeric Value.");
		return;
	}
	var allowQty = $("#"+formName+"_allowQty").val();
	var targetDayQty = $("#"+formName+"_targetDayQty").val();
	var efficiency = $("#"+formName+"_efficiency").val();
	var workingHour = $("#"+formName+"_workingHour").val();
	var inputDate = $("#"+formName+"_inputDate").val();
	var outputStartDate = $("#"+formName+"_outputStartDate").val();
	var outputEndDate = $("#"+formName+"_outputEndDate").val();
	var productionDay = $("#"+formName+"_productionDay").val();
	var productionHour = $("#"+formName+"_productionHour").val();
	var productionMinute = $("#"+formName+"_productionMinute").val();
	var learningTime = $("#"+formName+"_learningTime").val();
	var isLearningTime = $("#"+formName+"_isLearningTime").val();
	
	var isFabricRecv = $("#"+formName+"_isFabricRecv").is(':checked') ? "Y" : "N";
	var isPreProdAproval = $("#"+formName+"_isPreProdAproval").is(':checked') ? "Y" : "N";
	var isTestCutting = $("#"+formName+"_isTestCutting").is(':checked') ? "Y" : "N";
	
	
	var statusId = $("#"+formName+"_statusId").val();
	$('#waitingDiv').show();
	if (orderId=="") {
		planningAlertMessage("black",'Select Order!',2000);
	}else if (styleId=="") {
		planningAlertMessage("black",'Select Style!',2000);
	}else if (outputStartDate == "") {
		planningAlertMessage("black",'Select outputStartDate',2000);
	}else {
		$.ajax({
			url : "updatePrdLineLoadingInfoJson",
			type : "POST",
			data : {
				"companyId" : companyId,
				"transactionId" : transactionId,
				"lineLoadingId" : lineLoadingId,
				"orderPlanId" : orderPlanId,
				"colorId":colorId,
				"lineId" : lineId,
				"orderId" : orderId,
				"buyerId" : buyerId,
				"styleId" : styleId,
				"colorId" : colorId,
				"orderQty" : orderQty,
				"extraQtyPerc" : extraQtyPerc,
				"allowQty" : allowQty,
				"targetDayQty" : targetDayQty,
				"workingHour" : workingHour,
				"efficiency" : efficiency,
				"inputDate" : inputDate,
				"outputStartDate" : outputStartDate,
				"outputEndDate" : outputEndDate,
				"productionDay" : productionDay,
				"productionHour" : productionHour,
				"productionMinute" : productionMinute,
				"isLearningTime" : isLearningTime,
				"learningTime" : learningTime,
				"statusId" : statusId,
				
				"isFabricRecv":isFabricRecv,
				"isPreProdAproval":isPreProdAproval,
				"isTestCutting":isTestCutting
			},
			success : function(updateResult) {
				$('#waitingDiv').hide();
				if (document.getElementById('MonthlyGanttDiv') !== null) {
					  loadPlanningBoard(null);
					  if (updateResult.updateMessage!="") {
						$('.ui-dialog').dialog('destroy').remove();
						planningAlertMessage("black",updateResult.updateMessage,2000);
					}
				}else{
					orderPlanId = $("#orderPlanId").val();
					companyId = $("#companyId").val();
					var orderName = $("#orderName").val();
					loadOrders(companyId,orderPlanId,orderName);
					if (updateResult.updateMessage!="") {
						$('.ui-dialog').dialog('destroy').remove();
						planningAlertMessage("black",updateResult.updateMessage,3000);
					}
				}
			}
		});
	}
	
}


////////////////////////////////////////////// all update methods ///////////////////////////////////////////////////////

function showDateWiseOrderQty(formName){
	$('#waitingDiv').show();
	if (formName!==null) {
		var lineId = $('#'+formName+'_lineId').val();
		var orderPlanId = $('#'+formName+'_orderPlanId').val();
		var companyId = $('#'+formName+'_companyId').val();
		var outputStartDate = $('#'+formName+'_outputStartDate').val();
		var outputEndDate = $('#'+formName+'_outputEndDate').val();
	}else{
		var orderPlanId = $('#orderPlanId').val();
		var lineId = $('#lineId').val();
		var companyId = $('#companyId').val();
		var outputStartDate = $('#outputStartDate').val();
		var outputEndDate = $('#outputEndDate').val();
	}
	jQuery.ajax({
		url : "DateWiseOrderQty",
		type : "POST",
		data : {
			"orderPlanId" : orderPlanId,
			"lineId" : lineId,
			"companyId" : companyId,
			"outputStartDate" :outputStartDate ,
			"outputEndDate" :outputEndDate  
		},
		async : false,
		success : function(data) {
			$('#waitingDiv').hide();
			$('#dateWiseSuggestionContainer').html(data);
		}
	});
}

function showPlanningBoardBox(){
	$('#loadingDiv').show();
	var companyId = $('#companyId').val();
	var month = $('#month').val();
	var year = $('#year').val();
	var orderId = $('#orderId').val();
	var styleId = $('#styleId').val();
	var buyerId = $('#buyerId').val();
	var statusId = $('#statusId').val();
	
	var formName = 'searchPlanningBoardJson';
	var url= "PlanningBoardSearchBox?companyId="+companyId+"&month="+month+"&year="+year+"&orderId="+orderId+"&styleId="+styleId+"&buyerId="+buyerId+"&statusId="+statusId;

	
	prottayPlanningCommonPopup('Search Planning Board','#planInfoPopup',url,'300','800',formName);
	
	//$('#loadingDiv').hide();
}

function chooseUnplannedOrder(){
	
	$('#loadingDiv').show();
	var companyId = $('#companyId').val();
	var month = $('#month').val();
	var year = $('#year').val();
	var orderId = $('#orderId').val();
	var styleId = $('#styleId').val();
	var buyerId = $('#buyerId').val();
	var statusId = $('#statusId').val();
	
	var formName = 'searchPlanningBoardJson';
	var url= "UnplanedOrderSearch?companyId="+companyId+"&month="+month+"&year="+year+"&orderId="+orderId+"&styleId="+styleId+"&buyerId="+buyerId+"&statusId="+statusId;

	
	planningBoardCommonPopup('Search Planning Board','#planInfoPopup',url,'600','1250',formName);
	
}


function getAllOrderJsonData(formName){
	var companyId = $('#'+formName+'_companyId').val();
	var orderName = $('#'+formName+'_orderName').val();
	
	$.ajax({
		url: "getAllOrderJsonData",
		type: "POST",
		data: {"orgPartyId":companyId,"orderName":orderName},
		success:function(data){
			var datajson = data.orderList;
			//for create
			$('#'+formName+'_orderName').autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
			change: function( event, ui ) {
				var orderName = $('#' + formName + '_orderName').val();
				if (ui.item!==undefined && ui.item!==null) {
					if (orderName == ui.item.label) {
						return true;
					} else {
						$('#' + formName + '_orderName').val('');
						$('#' + formName + '_orderId').val('');
					}
				}else{
					$('#' + formName + '_orderName').val('');
					$('#' + formName + '_orderId').val('');
				}
				
			},
				select: function(event, ui) {
					event.preventDefault();
					$('#'+formName+'_orderId').val(ui.item.value);
					
					$(this).val(ui.item.label);
					var orderId = $('#'+formName+'_orderId').val();					
					
				}
			});
		}
	});
}
function getAllStyleJsonData(formName){
	var companyId = $('#'+formName+'_companyId').val();
	var styleName = $('#'+formName+'_styleName').val();
	
	$.ajax({
		url: "getAllStyleJsonData",
		type: "POST",
		data: {"orgPartyId":companyId,"styleName":styleName},
		success:function(data){
			var datajson = data.styleList;
			//for create
			$('#'+formName+'_styleName').autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
			change: function( event, ui ) {
				var styleName = $('#' + formName + '_styleName').val();
				if (ui.item!==undefined && ui.item!==null) {
					if (styleName == ui.item.label) {
						return true;
					} else {
						$('#' + formName + '_styleName').val('');
						$('#' + formName + '_styleId').val('');
					}
				}else{
					$('#' + formName + '_styleName').val('');
					$('#' + formName + '_styleId').val('');
				}
				
			},
				select: function(event, ui) {
					event.preventDefault();
					$('#'+formName+'_styleId').val(ui.item.value);
					
					$(this).val(ui.item.label);
					var styleId = $('#'+formName+'_styleId').val();					
					
				}
			});
		}
	});
}
function requestFullScreen(){
	//launchFullscreen(document.documentElement);
}
function lineLoadingCheckBoxEvent(checkboxElement){
	if($(checkboxElement).is(':checked')){
		$(checkboxElement).val('Y');
	}else{
		$(checkboxElement).val('N');
	}
	
}

