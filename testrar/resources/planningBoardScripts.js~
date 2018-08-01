var top = $('#ganttBoardLegend').offset().top - parseFloat($('#ganttBoardLegend').css('margin-top').replace(/auto/, 0));

function getProductionFloorListJson(){
	//loadMonthwisePlanningBoard(0);
	$('#loadingDiv').hide();
	var companyId = $('#companyId').val();
	jQuery.ajax({
		url : 'getProductionFloorListJson',
		type : 'POST',
		data : {
			"companyId" : companyId
		},
		error : function(data) {
			loadMonthwisePlanningBoard(0);
		},
		success : function(data) {
			var floors = document.getElementById("prodFloorId");
			while (floors.options.length > 0) {
				floors.remove(0);
			}
			
			var floorList = data.floorList;
			
			if (floorList != "") {
				for (var i = 0; i < floorList.length; i++) {
					var option = document.createElement("option");
					option.text = floorList[i].label;;
					option.value = floorList[i].value;
					floors.add(option);
				}
				$('#prodFloorId').prepend("<option value='' selected='selected'>All Floor</option>");
			}else{ 
				$('#prodFloorId').prepend("<option value='' selected='selected'>No Floor</option>");
			}
			
			loadMonthwisePlanningBoard(0);
		}
	});
}
function splitWithProductionInfo(lineLoadingId) {
	$('#loadingDiv').hide();
	jQuery.ajax({
		//url : 'splitWithProductionInfo',
		url : 'splitPlanningBarsWithProductionInfo',
		type : 'POST',
		data : {
			"lineLoadingId" : lineLoadingId
		},
		error : function(data) {
			planningAlertMessage("black",data.splitMessage,2000);
			loadPlanningBoard(null,true);
			console.log('An error occured to delete.');
		},
		success : function(data) {
			planningAlertMessage("black",data.splitMessage,2000);
			loadPlanningBoard(null,true);
		}
	});
}
function unplannedBarShowAction(){
	$( ".unplannedTasks_holdingRow" ).slideDown( "slow" );
	hideUnplanned = false;
	$('#hideUnplannedOrdersDiv').show();
	$('#showUnplannedOrdersDiv').hide();
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_holding_row_hidden');
	$('#MonthlyGanttDivgcharthead').addClass('fixedPosition');
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_planning_board_legend_hidden');
	
 }
function unplannedBarHideAction(){
	$( ".unplannedTasks_holdingRow" ).slideUp( "slow" );
	hideUnplanned = true;
	$('#showUnplannedOrdersDiv').show();
	$('#hideUnplannedOrdersDiv').hide();
	$('#MonthlyGanttDivgcharthead').addClass('fixedPosition_holding_row_hidden');
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition');
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_planning_board_legend_hidden');
 }
function planningBoardDockHideAction(){
	$( ".unplannedTasks_holdingRow" ).slideDown( "slow" );
	hideUnplanned = false;
	$( "#ganttBoardLegend" ).slideUp( "slow" );
	$('#hidePlanningBoardDock').hide();
	$('#showPlanningBoardDock').show();
	$('#MonthlyGanttDivgcharthead').addClass('fixedPosition_planning_board_legend_hidden');
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition');
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_holding_row_hidden');
}
function planningBoardDockShowAction(){
	$( ".unplannedTasks_holdingRow" ).slideDown( "slow" );
	hideUnplanned = false;
	$( "#ganttBoardLegend" ).slideDown( "slow" );
	$('#hidePlanningBoardDock').show();
	$('#showPlanningBoardDock').hide();
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_planning_board_legend_hidden');
	$('#MonthlyGanttDivgcharthead').addClass('fixedPosition');
	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_holding_row_hidden');
}
function planningBoardGlobalSetup(){
	var year = $('#year').val();
	var companyId = $('#companyId').val();
	var url= "PlanningBoardGlobalSetup?year="+year+"&companyId="+companyId;
	var height = '500';
	var width = '800';
	var title = 'Planning Board Global Setup';
	//prottayUIDefaultPopup(title, url, height, width);
	planningBoardCommonPopup(title, '#popupScreenContainer', url, height, width); 
}

function updateAllowedProductionLines(element,lineId){
	var enabled = $(element).prop( "checked" );
	jQuery.ajax({
		url : 'updateAllowedProductionLines',
		type : 'POST',
		data : {
			"enabled" : enabled,
			"lineId" : lineId
		},
		error : function(data) {
			
		},
		success : function(data) {
			
		}
	});
}
$(document).ready(function() {
	if ($('#PlanningBoardTitle')) {
		var year = $('#year').val();
		$('#PlanningBoardTitle').html("Production Planning Board: " + year);
	}
	$('#MonthlyGanttDivchartTable').contextMenu(planningBoardContextMenus, {
	    theme: 'vista'
	});

	//$('#MonthlyGanttDivchartTable').contextMenu(menu);
});

$(function() {
	$('.topScroll').on('scroll', function(e) {
		scrollXPosition = $('.topScroll').scrollLeft();		
		$('#MonthlyGanttDivgchartbody').scrollLeft(scrollXPosition);
	 });
	 
	  $(document).on('ready', function(e) {
		  var currentMonth = new Date().getMonth();
		  $('#month').val(currentMonth);
		  initialSingleScroll();
      });
	}); 
	
	function initialSingleScroll(){
		$('#MonthlyGanttDiv').scrollTop(scrollYPosition);
		
		if (typeof chartTableWidth !== 'undefined') {
			$('.planningBoardTopDiv').width(chartTableWidth+60);
		}else{
			var tableWidth = $('#MonthlyGanttDivchartTable').width();
			var bodyWidth = $( '#MonthlyGanttDivgchartbody').width();
			$('.planningBoardTopDiv').width(bodyWidth+5880);
		}
		
		
		$('.topScroll').scrollLeft(scrollXPosition);
		$('#MonthlyGanttDivgchartbody').scrollLeft(scrollXPosition);	
		$(window).on('scroll',function(e){
			$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition');
		});
		 $('#MonthlyGanttDiv').on('scroll', function(e) {
			    scrollYPosition = $('#MonthlyGanttDiv').scrollTop();
			    scrollXPosition = $('#MonthlyGanttDivgchartbody').scrollLeft();
			    $('.topScroll').scrollLeft(scrollXPosition);
			    ///new
			    if( $('#MonthlyGanttDiv').scrollTop() > 0 ){
			    	//var isShownLegend = $('#hideDock').css('display');
			    	//alert(isShowLegend);
			    	if (hideUnplanned) {
			    		$('#MonthlyGanttDivgcharthead').addClass('fixedPosition_holding_row_hidden');
					}else{
						$('#MonthlyGanttDivgcharthead').addClass('fixedPosition');
					}
			    	
			    	//$('#MonthlyGanttDivglisthead').addClass('fixedPosition');
			    } 
			    else if ($('#MonthlyGanttDiv').scrollTop() <= 55 && $('#MonthlyGanttDiv').scrollTop() >= 0 ){
			    	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition');
			    	$('#MonthlyGanttDivgcharthead').removeClass('fixedPosition_holding_row_hidden');
			    	//$('#MonthlyGanttDivglisthead').removeClass('fixedPosition');
			    }
		  });
		  
		  $('#MonthlyGanttDivgchartbody').on('scroll', function(e) {
			    scrollXPosition = $('#MonthlyGanttDivgchartbody').scrollLeft();
			    $('.topScroll').scrollLeft($('#MonthlyGanttDivgchartbody').scrollLeft());
		  });
	}
	function loadDefaultPlanningBoard(){
		$.ajax({	
			url : "loadDefaultPlanningBoard",
			type : "POST",
			data : {
			},
			success : function(data) {
			   $('#month').val(data.month);
			   $('#year').val(data.year);
			   document.getElementById("month_"+data.month).checked = true;
			   loadPlanningBoard(null,true);
			}	
	 	});
	}

	function togglePlanningBoard(){
		if ($(".glineitem").is(":visible") == true) { 
		   $(".glineitem").hide();
		   $(".gfoldercollapse").text('+');
		}else{
		   $(".glineitem").show();
		   $(".gfoldercollapse").text('-');
		}
	}
	   
	$(document).on('contextmenu', function(event)
		{
			 event.preventDefault();
		});
		$(document).scroll(function() {
		   $("#MonthlyGanttDiv").addClass('bottom');
	   });
	   $(window).load(function() {
	 		// $('.gtasktable').hide();	
	 		// $('#MonthlyGanttDivglisthead').hide();
	 		// $('.glabelfooter').val();
	 		// $('.gchartcontainer').css("float","left");
		});
 function deletePrdChosenStyle(mergeSequenceId){
	var confirmation = confirm("Are you sure?");
	if(confirmation){
	
	$('#loadingDiv').hide();
		jQuery.ajax({
		url : 'deletePrdChosenStyle',
		type : 'POST',
		data : {
			"mergeSequenceId":mergeSequenceId
		},
		error : function(data) {
			loadPrdChosenStyles();
			console.log('An error occured to delete.');
		},
		success : function(data) {
			console.log(data.deleteMessage);
			loadPlanningBoard(null,true);
		}
		 });
	}
}
function deleteLineLoadingInfoFtl(lineLoadingId) {
	var confirmResult = confirm('Do you want to delete ?');
	if (confirmResult == true) {
	$("#loadingDiv").show();
		$.ajax({
			url : "deletePrdLineLoadingInfoJson",
			type : "POST",
			data : {
				"lineLoadingId" : lineLoadingId
			},
			success : function(deleteResult) {
			$("#loadingDiv").hide();
				if (deleteResult.deleteMessage!="") {
					planningAlertMessage("black",deleteResult.deleteMessage,2000);
				}
				var formName = 'searchPlanningBoardJson';
				loadPlanningBoard(null,true);					
			}
		});
	}
}
function deleteLineLoadingInfoPopup(lineLoadingId) {
	var confirmResult = confirm('Do you want to delete ?');
	if (confirmResult == true) {
	$("#loadingDiv").show();
		$.ajax({
			url : "deletePrdLineLoadingInfoJson",
			type : "POST",
			data : {
				"lineLoadingId" : lineLoadingId
			},
			success : function(deleteResult) {
			$("#loadingDiv").hide();
			var month = $('#month').val();
			loadMonthlyOrderInfo(month);
			
			}
		});
	}
}
function loadMonthlyOrderInfo(month){
	var companyId = $('#companyId').val();
	var year = $('#year').val();
	
	var url= "MonthlyPlanningBoardDetails?companyId="+companyId+"&month="+month+"&year="+year;
	prottayCommonScreenRenderer(url,'#planInfoPopup');
}
function deleteLineLoadingInfoFromSummery(lineLoadingId) {
	var confirmResult = confirm('Do you want to delete ?');
	if (confirmResult == true) {
	$("#loadingDiv").show();
		$.ajax({
			url : "deletePrdLineLoadingInfoJson",
			type : "POST",
			data : {
				"lineLoadingId" : lineLoadingId
			},
			success : function(deleteResult) {
			$("#loadingDiv").hide();
			var month = $('#month').val();
			//loadMonthlyOrderInfo(month);
			var companyId = $('#companyId').val();
			var url = "PlanningBoardSummary?companyId="+companyId;
			prottayCommonScreenRenderer(url,'#popupScreenContainer');
			}
		});
	}
}
function yearlyCapacityInfo(){
	var companyId = $('#companyId').val();
	var year = $('#year').val();
	
	var url= "YearlyCapacityInfo?companyId="+companyId+"&month="+month+"&year="+year;
	//prottayCommonScreenRenderer(url,'#planInfoPopup');
	prottayUICommonPopup("Yearly Capacity Info Details", "#popupScreenContainer", url, 600, 900)
}

function updateLineLoadingbyResizePlan(orginalSize,currentSize,lineLoadingId) {
	 
	 planningAlertMessage("black",'Order plan resize in progress.',4000);
	 $("#loadingDiv").show();
	 var dayId = $('#MonthlyGanttDivformatdaytop').attr("class");
		 if(dayId.indexOf('gselected') > -1){
		 		 $.ajax({
						url : "updateLineLoadingbyResizePlan",
						type : "POST",
						data : {
							"lineLoadingId" : lineLoadingId,
							"orginalSize" : orginalSize,
							"currentSize" : currentSize,
							"columnWidth" : columnWidth+1
						},
						success : function(data) {
						$("#loadingDiv").hide();
							if (data.updateMessage!="") {
								planningAlertMessage("black",data.updateMessage,2000);
							}
							var formName = 'searchPlanningBoardJson';
							loadPlanningBoard(null,false);					
						}
			 });
		 }
	 }

//directLineLoadingFromScheduleInfo(transactionId,cellId,false);
function directLineLoadingFromScheduleInfo(mergeSequenceId, cellId, endDatePlan) {
	if (cellId != "") {
		var startDate = cellId.substring(6, cellId.length);
		planningAlertMessage("black", "Start Date: " + startDate, 5000);
	} else {
		planningAlertMessage("black", "Wrong Movement try again!", 5000);
	}
	var dayId = $('#MonthlyGanttDivformatdaytop').attr("class");
	var companyId = $('#companyId').val();
	if (companyId != "" || companyId != null) {
		if (dayId.indexOf('gselected') > -1) {
			$("#loadingDiv").show();
			$.ajax({
				url : "directLineLoadingFromScheduleInfo",
				type : "POST",
				data : {
					"companyId" : companyId,
					"mergeSequenceId" : mergeSequenceId,
					"endDatePlan" : endDatePlan,
					"cellId" : cellId
				},
				success : function(data) {
					$("#loadingDiv").hide();
					if (data.resultMessage != "") {
						planningAlertMessage("black", "Msg: " + data.resultMessage, 2000);
					}
					loadPlanningBoard(null,true);
					// loadMonthwisePlanningBoard(data.month);
				}
			});
		}
	} else {
		alert("Company Not found!");
	}

} 			 

function updateLineLoadingbyMovePlan(cellId, lineLoadingId) {
	var outputStartDate = "";
	if (cellId != "") {
		outputStartDate = cellId.substring(6, cellId.length);
		planningAlertMessage("black", "Start Date: " + outputStartDate, 5000);
	} else {
		planningAlertMessage("black", "Wrong Movement try again!", 5000);
	}
	var dayId = $('#MonthlyGanttDivformatdaytop').attr("class");
	if (dayId.indexOf('gselected') > -1) {
		var lineId = cellId.substring(0, cellId.indexOf("_"));
		var outputStartDate = cellId.substring(lineId.length + 1, cellId.length);
		var validLine = lineId.indexOf("bardiv") !== -1 ? false : true;
		// alert(lineId + '->' + outputStartDate);
		if (validLine) {
			updateMovePlan(lineLoadingId, lineId, outputStartDate, null, false);// outputStartDate,outputEndDate,enableEndDate
		}
	}

}
function updateMovePlan(lineLoadingId,lineId,outputStartDate,outputEndDate,enableEndDate){
	var cellId = lineId + '_'+outputStartDate;
	$("#loadingDiv").show();
 	$.ajax({
		url : "updateLineLoadingbyMovePlan",
		type : "POST",
		data : {
			"lineLoadingId" : lineLoadingId,
			"lineId" : lineId,
			"outputStartDate" : outputStartDate,
			"outputEndDate" : outputEndDate,
			"enableEndDate" : enableEndDate
		},
		success : function(data) {
		$("#loadingDiv").hide();
			if (data.updateMessage!="") {
				planningAlertMessage("black","Msg: "+data.updateMessage,2000);
			}
			var formName = 'searchPlanningBoardJson';
			//planningBoardEvent(cellId, lineLoadingId, eventType);
			
			//poppedPlanningBoardCellIds.push(data.cellId);
			poppedPlanningBoardCellIds.push(cellId);
			poppedPlanningBoardLineLoadingIds.push(lineLoadingId);
			poppedPlanningBoardActions.push("MovePlanBar");
			
	      	//loadMonthwisePlanningBoard(data.month);
			loadPlanningBoard(null,false);					
		}
	});
}	
function showProductionLineDetails(lineId) {
	var url = "ProductionLineDetails?lineId=" + lineId;
	prottayUICommonPopup('Production Line Info Details','#planInfoPopup', url, '500', '1000');
}
function showStyleDetails(mergeSequenceId) {
	var url = "ShowStyleDetails?mergeSequenceId=" + mergeSequenceId;
	prottayUICommonPopup('Styles Schedule Info Details','#planInfoPopup', url, '500', '1000');
}
function showSampleInfo(lineLoadingId) {
	var url = "ShowSampleInfo?lineLoadingId=" + lineLoadingId;
	prottayUICommonPopup('Styles Sample Info Details','#planInfoPopup', url, '500', '650');
}
function showMaterialsInfo(lineLoadingId) {
	var url = "ShowMaterialsInfo?lineLoadingId=" + lineLoadingId;
	prottayUICommonPopup('Styles Materials Info Details','#planInfoPopup', url, '500', '1000');

}
function showOrderBreakdownInfo(lineLoadingId){
	var url = "StyleBreakDownList?lineLoadingId="+lineLoadingId;
	var containerId = '#popupScreenContainer';
	var height = 400;
	var width = 700;
	var title="Styles Order Breakdown List";
	prottayUICommonPopup(title, containerId, url, height, width);
}
function showBillOfMaterials(lineLoadingId) {
	var url = "ShowBillOfMaterials?lineLoadingId=" + lineLoadingId;
	prottayUICommonPopup('Styles Bill Of Materials','#planInfoPopup', url, '500', '1000');
}
function showRndInfo(lineLoadingId) {
	var url = "ShowRndInfo?lineLoadingId=" + lineLoadingId;
	prottayUICommonPopup('Styles R&D / Industrial Engineering Info','#planInfoPopup', url, '500', '1000');
}
function showProductionInfo(lineLoadingId) {
	var url = "ShowProductionInfo?lineLoadingId="+lineLoadingId;
	prottayUICommonPopup('Styles Production Info Details','#planInfoPopup', url, '500', '1000');
}
 //----- Unplanned
function unplannedStyleDetails(mergeSequenceId) {
	var url = "UnplannedStyleDetails?mergeSequenceId="+mergeSequenceId;
	prottayUICommonPopup('Styles Details','#planInfoPopup', url, '500', '1000');
}

function unplannedStyleSampleInfo(mergeSequenceId) {
	var url = "UnplannedStyleSampleInfo?mergeSequenceId="+mergeSequenceId;
	prottayUICommonPopup('Sample Info','#planInfoPopup', url, '500', '1000');
}
function unplannedMaterialsInfo(mergeSequenceId) {
	var url = "UnplannedMaterialsInfo?mergeSequenceId="+mergeSequenceId;
	prottayUICommonPopup('Materials Info','#planInfoPopup', url, '500', '1000');
}
function unplannedBillOfMaterialsInfo(mergeSequenceId) {
	var url = "UnplannedBillOfMaterialsInfo?mergeSequenceId="+mergeSequenceId;
	prottayUICommonPopup('Bill Of Materials','#planInfoPopup', url, '500', '1000');
}

function unplannedStyleRndInfo(mergeSequenceId) {
	var url = "UnplannedStyleRndInfo?mergeSequenceId="+mergeSequenceId;
	prottayUICommonPopup('Style R&D Info','#planInfoPopup', url, '500', '1000');
}

function unplannedStyleBreakDownList(mergeSequenceId) {
	var url = "UnplannedStyleBreakDownList?mergeSequenceId="+mergeSequenceId;
	prottayUICommonPopup('Style Breakdown Details','#planInfoPopup', url, '500', '1000');
}

function lineWisePBoardSynchronizationPopup(lineId){
	//lineId = lineId.substring(0,lineId.length-1);

	var formName = 'lineWisePBoardSyncForm';
	var companyId = $('#companyId').val();
	var month = $('#month').val();
	var year = $('#year').val();
	
	var url= "LineWisePBoardSync?companyId="+companyId+"&lineId="+lineId+"&month="+month+"&year="+year;
	
	prottayPlanningCommonPopup('Line Wise Synchronization','#planInfoPopup',url,'350','700',formName);
}
function loadLinesStyleHistory(lineId){
	//lineId = lineId.substring(0,5);
	var companyId = $('#companyId').val();
	var month = $('#month').val();
	var year = $('#year').val();
	
	var url= "ProductionLineDetails?companyId="+companyId+"&lineId="+lineId+"&month="+month+"&year="+year;
	
	prottayPlanningCommonPopup('Lines Style History','#planInfoPopup',url,'450','550',null);
}

function monthlyPlanningBoardDetails(){
	var companyId = $('#companyId').val();
	var month = $('#month').val();
	var year = $('#year').val();
	
	var url= "MonthlyPlanningBoardTabs?companyId="+companyId+"&month="+month+"&year="+year;
	
	prottayPlanningCommonPopup('Monthly Planning Board','#planInfoPopup',url,'600','1150',null);
}
function savePlanningPrdSettingsData(){
	var endDatePriority = $('#endDatePriority').val();
	var extraQtyPerc = $('#extraQtyPerc').val();
	if (!$.isNumeric(extraQtyPerc)) {
		alert("Please Enter Numeric Value.");
		return;
	}
	$('#waitingDiv').show();
	$.ajax({
		url : "savePlanningPrdSettingsData",
		type : "POST",
		data : {
			"endDatePriority" : endDatePriority,
			"extraQtyPerc" : extraQtyPerc
		},
		success : function(syncResult) {
			$('#waitingDiv').hide();
			alert("Settings Information Saved.");
			console.log("Saved Planning Settings Data.");			
		}
	});	
}
function allLineSynchronization(totalLines,companyId,fromDateSync,thruDateSync,targetDateSync,barMovementType){
	$('#waitingDiv').show();
	 for(var i=0;i<totalLines;i++){
		    var checked = $('#lineId_'+i).prop('checked');
		    var lineId = $('#lineId_'+i).val();
		    
		    if(checked){
		    	$.ajax({
		    		url : "lineWiseSingleDateSynchronization",
		    		type : "POST",
		    		async : false,
		    		data : {
		    			"lineId" : lineId,
		    			"toLineId" : lineId,
		    			"companyId" : companyId,
		    			"fromDate" : fromDateSync,
		    			"thruDate" : thruDateSync,
		    			"targetDate" : targetDateSync,
		    			"barMovementType" : barMovementType
		    		},
		    		success : function(syncResult) {
		    			planningAlertMessage("black",3000,"Line Wise Synchronization is in progress.");
		    		}
		    	});
		    } 
	 }
	 $('#waitingDiv').hide();
	loadPlanningBoard(null,false);
	
}
function lineWiseSingleDateSynchronizeCommon(formName){
	planningAlertMessage("black",3000,"Line Wise Synchronization is in progress.");
	
	var companyId = $('#'+formName+"_companyId").val();
	var lineId = $('#'+formName+"_lineId").val();
	var toLineId = $('#'+formName+"_toLineId").val();
	var fromDate = $('#'+formName+"_fromDate").val();
	var thruDate = $('#'+formName+"_thruDate").val();
	var targetDate = $('#'+formName+"_targetDate").val();
	var barMovementType = $('#barMovementType').val();
	
	singleDateSync(lineId,toLineId, companyId, fromDate, thruDate,targetDate, barMovementType);
}
function singleDateSync(lineId,toLineId,companyId,fromDate,thruDate,targetDate,barMovementType){
	if (lineId===null) {
		alert("Please Choice Line");
	}else if (companyId === null) {
		alert("Please Enter Company");
	}else{
		$("#loadingDiv").show();
		$.ajax({
			url : "lineWiseSingleDateSynchronization",
			type : "POST",
			async : false,
			data : {
				"lineId" : lineId,
				"toLineId" : toLineId,
				"companyId" : companyId,
				"fromDate" : fromDate,
				"thruDate" : thruDate,
				"targetDate" : targetDate,
				"barMovementType" : barMovementType
			},
			success : function(syncResult) {
				$("#loadingDiv").hide();
				$('.ui-dialog').dialog('destroy').remove();
				if (syncResult.syncMessage !== "") {
					planningAlertMessage("black",3000,syncResult.syncMessage);
				}
				if (document.getElementById('MonthlyGanttDiv') !== null) {
					  loadPlanningBoard(null,false);
				}else{
					var orderPlanId = $('#orderPlanId').val();
					var companyId = $('#companyId').val();
					var orderName = $('#orderName').val();
					loadOrders(companyId,orderPlanId,orderName);
				}
				
			}
		});	
	}
}

function lineWisePBoardSynchronizeCommon(formName){
	planningAlertMessage("black",3000,"Line Wise Synchronization is in progress.");
	
	var companyId = $('#'+formName+"_companyId").val();
	var lineId = $('#'+formName+"_lineId").val();
	var fromDate = $('#'+formName+"_fromDate").val();
	var thruDate = $('#'+formName+"_thruDate").val();
	var barMovementType = $('#barMovementType').val();
	
	
	if (lineId===null) {
		alert("Please Choice Line");
	}else if (companyId === null) {
		alert("Please Enter Company");
	}else{
		$("#loadingDiv").show();
		$.ajax({
			url : "lineWiseSynchronization",
			type : "POST",
			data : {
				"lineId" : lineId,
				"companyId" : companyId,
				"fromDate" : fromDate,
				"thruDate" : thruDate,
				"barMovementType" : barMovementType
			},
			success : function(syncResult) {
				$("#loadingDiv").hide();
				$('.ui-dialog').dialog('destroy').remove();
				if (syncResult.syncMessage !== "") {
					planningAlertMessage("black",3000,syncResult.syncMessage);
				}
				if (document.getElementById('MonthlyGanttDiv') !== null) {
					  loadPlanningBoard(null,false);
				}else{
					var orderPlanId = $('#orderPlanId').val();
					var companyId = $('#companyId').val();
					var orderName = $('#orderName').val();
					loadOrders(companyId,orderPlanId,orderName);
				}
				
			}
		});	
	}
	
}
function updatePrdLineLoadingInfoPopup(lineLoadingId, orderPlanId, companyId) {/* alert(capacityPlanId); */
	var formName = 'formUpdatePrdLineLoadingInfo';
	var url = "EditPrdLineLoadingInfo?lineLoadingId=" + lineLoadingId
			+ "&orderPlanId=" + orderPlanId;

	planningBoardCommonPopup('Update Production Line Loading Info',
			'#planInfoPopup', url, '500', '1000', formName);
	// getOrderJsonDataLineLoading(formName,companyId);
	// getOrderJsonDataForPrdLineLoading->getOrderJsonDataLineLoading

}
function updatePlanningBoardInfoPopup(lineLoadingId) {
	var formName = 'updatePlanningBoardInfoPopup';
	var url = "EditPlanningBoardInfo?lineLoadingId=" + lineLoadingId;

	planningBoardCommonPopup('Update Production Line Loading Info',
			'#planInfoPopup', url, '600', '1000', formName);
	// getOrderJsonDataLineLoading(formName,companyId);
	// getOrderJsonDataLineLoading
}
/*
 * function planningBoardPopup(title, containerId, url, height, width, formName) {
 * $(containerId).html(''); $(containerId).dialog({ autoOpen : true, title :
 * title, height : height, width : width, modal : true, open : function() {
 * $.ajax({ url : url, type : "POST", data : getRequestData(), success :
 * function(data) { $(containerId).html(data); } }); }
 * 
 * }); }
 */

// //////////////////////////////////////////////////////////// common Methods
// ///////////////////////////////////////////////////
/*
 * $(document).ready(function(){ //planningAlertMessage("black","planningBoard
 * script...",3000); //initFormFields('formAddCapacityPlanInfo');
 * //initFormFields('formAddOrderPlanInfo');
 * //initFormFields('formAddPrdLineLoadingInfo'); //addOrderNameToOrderHeader();
 * });
 */

function getOrderJsonDataLineLoading(formName, companyId) {
	// emptyAll(formName);

	$.ajax({
		url : "getOrderData",
		type : "POST",
		data : {
			"orgPartyId" : companyId
		},
		success : function(data) {
			var datajson = data.orderList;
			// for create

			$('#' + formName + '_orderName').autocomplete({
				source : datajson,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				change : function(event, ui) {
					var orderName = $('#' + formName + '_orderName').val();
					if (ui.item !== null) {
						if (orderName == ui.item.label) {
							return true;
						} else {
							$('#' + formName + '_orderName').val('');
							$('#' + formName + '_transactionId').val('');
						}
					} else {
						$('#' + formName + '_orderName').val('');
						$('#' + formName + '_transactionId').val('');
					}

				},
				select : function(event, ui) {
					event.preventDefault();
					$('#' + formName + '_transactionId').val(ui.item.value);

					$(this).val(ui.item.label);
					getOrderDetailsForPrdLineLoading(formName);
				}
			});
		}
	});
}
function emptyAll(formName) {

	if (formName == 'formAddPrdLineLoadingInfo'
			|| formName == 'formUpdatePrdLineLoadingInfo') {

		$('#' + formName + '_deliveryDate').val("");
		$('#' + formName + '_orderId').val("");
		$('#' + formName + '_orderName').val("");
		$('#' + formName + '_orderQty').val("");

		$('#' + formName + '_buyerId').val("");
		$('#' + formName + '_buyerName').val("");
		$('#' + formName + '_allowQty').val("");
		$('#' + formName + '_targetDayQty').val("");
		$('#' + formName + '_shipmentDate').val("");
		$('#' + formName + '_productionDay').val("");

		$('#' + formName + '_styleId').val("");
		$('#' + formName + '_styleName').val("");

		/*
		 * var styleId = document.getElementById(formName+"_styleId");
		 * while(styleId.options.length > 0 ){ styleId.remove(0); }
		 */

		// $('#'+formName+'_inputDate_i18n').val("");
		// $('#'+formName+'_inputDate').val("");
		$('#' + formName + '_outputStartDate_i18n').val("");
		$('#' + formName + '_outputStartDate').val("");
		$('#' + formName + '_outputEndDate_i18n').val("");
		$('#' + formName + '_outputEndDate').val("");
		$('#' + formName + '_deliveryDate_i18n').val("");
		$('#' + formName + '_deliveryDate').val("");

	}

}

// //////////////////////////////////////////////// Production Line Loading Info
// //////////////////////////////////

// //////////////////////////////// new planning board json actions
// /////////////////////////////
function showPlanningBoardByStatusId(statusId){
	$('#statusId').val(statusId);
	loadPlanningBoard(null,false);	
}
function loadPlanningBoard(formName,directLineLoadingOrDeletePlanOrder) {
		
	if (document.getElementById('loadUnPlannedOrdersSerachForm')) {
		var fromDate = $('#loadUnPlannedOrdersSerachForm_fromDate').val();
		//var month = new Date('2011-04-11');
	}
	
	
	if (formName !== null) {
		//var companyId = $('#' + formName + '_companyId').val();
		//$('#companyId').val(companyId);
		//var prodFloorId = $('#' + formName + '_prodFloorId').val();$('#prodFloorId').val(prodFloorId);
		var year = $('#' + formName + '_year').val();$('#year').val(year);
		var month = $('#' + formName + '_month').val();$('#month').val(month);
		var orderId = $('#' + formName + '_orderId').val();$('#orderId').val(orderId);
		var styleId = $('#' + formName + '_styleId').val();$('#styleId').val(styleId);
		var buyerId = $('#' + formName + '_buyerId').val();$('#buyerId').val(buyerId);
		var statusId = $('#' + formName + '_statusId').val();$('#statusId').val(statusId);
		
	} else {
		var companyId = $('#companyId').val();
		var year = $('#year').val();
		var month = $('#month').val();
		if (month == "") {
			var currentDate = new Date();
			month = currentDate.getMonth();
			$('#month').val(month);
		}
		var orderId = $('#orderId').val();
		var styleId = $('#styleId').val();
		var buyerId = $('#buyerId').val();
		var statusId = $('#statusId').val();
	}
	var prodFloorId = $('#prodFloorId').val();
	var criteriaText="";
	if (orderId!=="" && orderId!=="0") {
		criteriaText = criteriaText + "Order, ";
	}
	if (buyerId!=="" && buyerId!=="0") {
		criteriaText = criteriaText + "Buyer, ";
	}
	if (styleId!=="" && styleId!=="0") {
		criteriaText = criteriaText + "Style, ";
	}
	/*if (month!=="-1" && month!=="") {
		criteriaText = criteriaText + "Month, ";
	}*/
	if (statusId!=="0" && statusId!=="") {
		criteriaText = criteriaText + "Status, ";
	}
	
	if (year == "") {
		$('#' + formName + '_year').val(new Date().getFullYear());
		year = $('#' + formName + '_year').val();
	}
	if (month == "") {
		var currentDate = new Date();
		month = currentDate.getMonth();
		$('#month').val(month);
	}
	if ($('#PlanningBoardTitle')) {
		var selectedMonth = getMonthYear(month, year);
		if (criteriaText!=="") {
			$('#PlanningBoardTitle').html("Production Planning Board: " + selectedMonth + " @Criteria:"+criteriaText);
		}else{
			$('#PlanningBoardTitle').html("Production Planning Board: " + selectedMonth);
		}
		
	}
	//$('#loadingDiv').hide();
	
	//////////////////////////////////////////////////////////////////////////////////
	// first direct plan from selected unplanned list
	
	var unplannedOrderString = $('#selectedConLineIds').val();
	var unplannedTransactionIds = $('#selectedtransctionIds').val();
	
	if (unplannedOrderString!=="" && unplannedTransactionIds!=="") {
		console.log(unplannedOrderString + "-->" +unplannedTransactionIds );
		
		var listOfUnplannedOrders = unplannedOrderString.split(',');
		var listOfUnplannedTrIds = unplannedTransactionIds.split(',');
		
		var arrayLength = listOfUnplannedOrders.length;
		var allPlanned = false;
		
		for (var i = 0; i < arrayLength; i++) {
			
		    var line_date_string = listOfUnplannedOrders[i];
		    var transactionId = listOfUnplannedTrIds[i];
		    
		    $("#loadingDiv").show();
		 	$.ajax({
				url : "directLineLoadingFromScheduleInfo",
				type : "POST",
				data : {
					"transactionId" : transactionId,
					"cellId" : line_date_string
				},
				success : function(data) {
					allPlanned = true;
				}
			});
		}
		//loadSelectedUnplannedOrders(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId);
		getFilteredLineOrderListJson(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId,directLineLoadingOrDeletePlanOrder);
	}else{
		//loadSelectedUnplannedOrders(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId);
		getFilteredLineOrderListJson(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId,directLineLoadingOrDeletePlanOrder);
	}
	$('#selectedConLineIds').val("");
	$('#selectedtransctionIds').val("");
	tarnsctionIDList = [];
	concateLineAndApprovalDateList = [];
	directLoadCounter = 0;

	// then place those unplanned orders to the unplanned order list	
	
}
function loadHoldingRowTopBar(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId){
	var choosenUnplannedOrders = "empty";
	if (document.getElementById('unplannedOrderIds')!==null) {
		choosenUnplannedOrders = $('#unplannedOrderIds').val();
	}
	var unplannedBuyerId = $('#unplannedBuyerId').val();
	var unplannedCompanyId = $('#unplannedCompanyId').val();
	var unplannedSortBy = $('#unplannedSortBy').val();
	
	jQuery.ajax({
		url : 'PlanningBoardJson',
		type : 'POST',
		data : {
			"companyId" : companyId,
			"year" : year,
			"month" : month,
			"orderId" : orderId,
			"styleId" : styleId,
			"buyerId" : buyerId,
			"statusId": statusId,
			"unplannedBuyerId": unplannedBuyerId,
			"unplannedCompanyId": unplannedCompanyId,
			"unplannedSortBy": unplannedSortBy,
			"prodFloorId": prodFloorId,
			"choosenUnplannedOrders" : choosenUnplannedOrders
		},
		error : function(content) {
			$('#loadingDiv').hide();
			planningAlertMessage("black","An error occured loading content! : " + content,
					2000);
		},
		success : function(content) {
			//jQuery('#planningBoardId').html(content);
			//statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId, choosenUnplannedOrders
			getFilteredLineOrderListJson(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId);
			$('#totalUndoRemain').html(planningBoardCellIds.length);
			$('#totalRedoRemain').html(poppedPlanningBoardLineLoadingIds.length);
			//loadCapacityInfoDetails();
			
			$('.ui-dialog').dialog('destroy').remove();
			//planningAlertMessage("black","Planning Board Loaded!", 2000);
			
			initialSingleScroll();
			if (hideUnplanned) {
				$('.unplannedTasks_holdingRow').hide();
				$('#unplannedOrdersDiv').val("show");
			}else{
				$('.unplannedTasks_holdingRow').show();
				$('#unplannedOrdersDiv').val("hide");				
			}
			$('#MonthlyGanttDivchartTable').contextMenu(planningBoardContextMenus, {
			    theme: 'vista'
			  });
			$('#loadingDiv').hide();
			//alert(hideUnplanned);
		}
	});
}

/*loadBuyersOnPlanningBoard();
loadStylesOnPlanningBoard();
loadOrdersOnPlanningBoard();*/
function loadBuyersOnPlanningBoard(){
	clearSearchFields();
	var companyId = $('#companyId').val();
	var payload = {
			"companyId" : companyId
	};
	var url = 'loadBuyersOnPlanningBoard';
	
	var labelElement = '#buyerNameToSearch';
	var valueElement = '#buyerIdToSearch';
	$(labelElement).val('');
	$(valueElement).val('0');
	commonAutocompleteAction(url, payload, labelElement, valueElement);
	
}

/*var payload = {
		"companyId" : companyId
};
var url = 'loadStylesOnPlanningBoard';

var stylesJson = getInitializedJsonData(url, payload);


url = 'loadBuyersOnPlanningBoard';
var buyersJson = getInitializedJsonData(url, payload);

url = 'loadOrdersOnPlanningBoard';
var ordersJson = getInitializedJsonData(url, payload);*/
/*loadStylesOnPlanningBoard();
loadBuyersOnPlanningBoard();
loadOrdersOnPlanningBoard();*/
$(window).load(function(){
	$('#buyerNameToSearch').focus();
	$('#buyerNameToSearch').blur();
	$('#styleNameToSearch').focus();
	$('#styleNameToSearch').blur();
	$('#orderNameToSearch').focus();
	$('#orderNameToSearch').blur();
	//alert();
});

function loadStylesOnPlanningBoard(){
	clearSearchFields();
	var companyId = $('#companyId').val();
	var payload = {
			"companyId" : companyId
	};
	var url = 'loadStylesOnPlanningBoard';
	var labelElement = '#styleNameToSearch';
	var valueElement = '#styleIdToSearch';
	
	$(labelElement).val('');
	$(valueElement).val('0');
	commonAutocompleteAction(url, payload, labelElement, valueElement);
}
function loadOrdersOnPlanningBoard(){
	clearSearchFields();
	var companyId = $('#companyId').val();
	var payload = {
			"companyId" : companyId
	};
	var url = 'loadOrdersOnPlanningBoard';
	var labelElement = '#orderNameToSearch';
	var valueElement = '#orderIdToSearch';
	$(labelElement).val('');
	$(valueElement).val('0');
	
	commonAutocompleteAction(url, payload, labelElement, valueElement);
}
function clearSearchFields(){
	$('#buyerNameToSearch').val('');
	$('#buyerIdToSearch').val('0');
	$('#styleNameToSearch').val('');
	$('#styleIdToSearch').val('0');
	$('#orderNameToSearch').val('');
	$('#orderIdToSearch').val('0');
}
function searchOnWholePlanningBoard(){
	var statusId = $('#statusId').val();
	
	var orderId = $('#orderIdToSearch').val();
	var styleId = $('#styleIdToSearch').val();
	var buyerId = $('#buyerIdToSearch').val();
	//alert("Order "+buyerId + " Order "+orderId +" Style"+styleId +" ");
	var year = $('#year').val();
	var month = $('#month').val();
	var companyId = $('#companyId').val();
	var prodFloorId = $('#prodFloorId').val();
	
	getFilteredLineOrderListJson(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId);
}

var lineLoadedOrderList = [];

function getFilteredLineOrderListJson(statusId, orderId, styleId, buyerId, year, month, companyId, prodFloorId,directLineLoadingOrDeletePlanOrder){
	var choosenUnplannedOrders = "empty";
	if (document.getElementById('unplannedOrderIds')!==null) {
		choosenUnplannedOrders = $('#unplannedOrderIds').val();
	}
	$('#loadingDiv').show();
	jQuery.ajax({
		url : 'getFilteredLineOrderListJson',
		type : 'POST',
		data : {
			"statusId": statusId,
			"orderId" : orderId,
			"styleId" : styleId,
			"buyerId" : buyerId,
			"year"    : year,
			"month"   : month,
			"companyId" : companyId,
			"prodFloorId": prodFloorId,
			"choosenUnplannedOrders" : choosenUnplannedOrders
		},
		error : function(content) {
			//$('#loadingDiv').hide();
			planningAlertMessage("black","An error occured loading content! : " + content, 2000);
		},
		success : function(data) {
			lineLoadedOrderList = data.lineLoadedOrderList;
			redrawPlanningBoard(lineLoadedOrderList,directLineLoadingOrDeletePlanOrder);
		}
	});
}
function redrawPlanningBoard(lineLoadedOrderList,directLineLoadingOrDeletePlanOrder){
	console.log("Planning Board Load Count: "+lineLoadedOrderList.length);
	var isVisible = $('#MonthlyGanttDiv').is(":visible");
	  var gantt = '';
	  if(isVisible){
		  gantt = new JSGantt.GanttChart(document.getElementById('MonthlyGanttDiv'), 'day' );
	  }
		
		if( gantt.getDivId() != null ) {
			gantt.setCaptionType('Complete');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
			gantt.setQuarterColWidth(36);
			gantt.setDateTaskDisplayFormat('DAY , dd month yyyy'); // Shown in tool tip box
			gantt.setDayMajorDateDisplayFormat('mon yyyy - Week ww') // Set format to display dates in the "Major" header of the "Day" view
			gantt.setWeekMinorDateDisplayFormat('dd mon') // Set format to display dates in the "Minor" header of the "Week" view
			gantt.setShowTaskInfoLink(1); //Show link in tool tip (0/1)
			gantt.setShowEndWeekDate(0); // Show/Hide the date for the last day of the week in header for daily view (1/0)
			gantt.setUseSingleCell(10000); // Set the threshold at which we will only use one cell per table row (0 disables).  Helps with rendering performance for large charts.
				//g.setFormatArr('Day', 'Week', 'Month', 'Quarter'); // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
			gantt.setFormatArr('Day'); // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
			gantt.setShowRes(0);
			gantt.setUseMove(1);
			gantt.setShowDur(0);
			gantt.setShowComp(0);
			gantt.setShowStartDate(0);
			gantt.setShowEndDate(0);
			gantt.setShowTaskInfoLink(1);
			gantt.setUseSort(0);
			// Parameters(pID, pName,pStart,pEnd,pStyle,pLink (unused)  pMile, pRes,pComp,pGroup, pParent, pOpen, pDepend, pCaption, pNotes, pGantt)
			lineLoadedOrderList.forEach(function(loadedOrder) {
			var pID = loadedOrder.pID;
			var pStyleId = loadedOrder.pStyleId;
			var pLineId = loadedOrder.pLineId;
			var orderQty = loadedOrder.orderQty;
			var orderAllowQty = loadedOrder.orderAllowQty;
			var orderComQty = loadedOrder.orderComQty;
			var pName = loadedOrder.pName;
			var shortPName = loadedOrder.shortPName;
			var ppApprovalDate = loadedOrder.ppApprovalDate;
			var pStart = loadedOrder.pStart;
			var pEnd = loadedOrder.pEnd;
			var deliveryDate = loadedOrder.deliveryDate;
			var pStyle = loadedOrder.pStyle;
			var orderType = loadedOrder.orderType;
			var orderPlanId = loadedOrder.orderPlanId;
			var pMile = loadedOrder.pMile;
			var pRes = loadedOrder.pRes;
			var pComp = loadedOrder.pComp;
			var pGroup = loadedOrder.pGroup;
			var pParent = loadedOrder.pParent;
			var pOpen = loadedOrder.pOpen;
			var pDepend = loadedOrder.pDepend;
			var pCaption = loadedOrder.pCaption;
			var pNotes = loadedOrder.pNotes;
			var pID = loadedOrder.pID;
			var pID = loadedOrder.pID;
			var pID = loadedOrder.pID;
			var pID = loadedOrder.pID;
			
			 if (pStyle != 'ggroupblack' && orderType=='Planned'  && pLineId!='88888888'){
			 	var taskItem = new JSGantt.TaskItem(pID,pStyleId, pLineId, 
			 			orderQty,orderAllowQty,orderComQty,
			 			pName,shortPName,ppApprovalDate,pStart,
			 			pEnd,deliveryDate, pStyle,
			 			'javascript:updatePlanningBoardInfoPopup("'+pID+'","'+orderPlanId+'","'+companyId+'","'+month+'","'+year+'")',
			 			pMile , pRes, pComp, pGroup, 
			 			pParent, pOpen, pDepend,
			 			pCaption,pNotes, g);
			 gantt.AddTaskItem(taskItem);
			 }
			 else if(orderType=='Unplanned'){
				 var taskItem = new JSGantt.TaskItem(pID,pStyleId, pLineId, 
						 orderQty, orderAllowQty, orderComQty, pName,
						 shortPName,ppApprovalDate,pStart,pEnd,
						 deliveryDate, pStyle,
						 'javascript:showStyleDetails(pID)',pMile , pRes, 
						 pComp, pGroup,pParent, pOpen, 
						 pDepend, pCaption,pNotes, g);
			gantt.AddTaskItem(taskItem); 
			 }
			 else if(pLineId=='88888888') {
				 var taskItem = new JSGantt.TaskItem(pID,pStyleId, pLineId,
						 orderQty, orderAllowQty, orderComQty, 
						 pName, shortPName,ppApprovalDate,
						 pStart,pEnd,deliveryDate, pStyle,
						 'javascript:updateBoardsOrderPlanInfoPopup(pID,orderPlanId,companyId,month,year)',
						 pMile , pRes, pComp,pGroup, 
						 pParent, pOpen, pDepend, pCaption,
						 pNotes, g);
			gantt.AddTaskItem(taskItem); 
			 }
			 else{
				 var taskItem = new JSGantt.TaskItem(pID,pStyleId, 
						 pLineId, orderQty, orderAllowQty, 
						 orderComQty, pName, shortPName, 
						 ppApprovalDate, pStart, pEnd ,
						 deliveryDate, pStyle,"",pMile , pRes, 
						 pComp, pGroup, pParent, pOpen, 
						 pDepend, pCaption,pNotes, g);
			gantt.AddTaskItem(taskItem); 
			 }
				 
			});    
		gantt.Draw();
			if (directLineLoadingOrDeletePlanOrder) {
				loadTopHoldingRowScreen();						
			}
			$('#loadingDiv').hide();
			lineLoadedOrderList.forEach(function(loadedOrder) {
				if(loadedOrder.planBarType=='SHIP_DATE_COUNTRY_COLOR_SPLITTED'){
					$("#MonthlyGanttDivtaskbar_"+loadedOrder.pID).resizable({
					    handles: 'e',
					    minWidth: 36,
					    start: function(event,ui){
					    
					    },
					    resize: function( event, ui ) {
					    ui.size.width = Math.round( ui.size.width / resizeSize ) * resizeSize;
					  	},
					  	stop: function( event, ui ) {
					  	  //alert('${loadedOrder}');
					  	  var orginalSize = ui.originalSize.width;
					  	  var currentSize = ui.size.width;
					  	  updateLineLoadingbyResizePlan(orginalSize,currentSize,loadedOrder.pID)
					  	}
				     });
				}
		  	  
				$("#MonthlyGanttDivbardiv_"+loadedOrder.pID).click(function() {
			        $(this).addClass('top').removeClass('bottom');
			        $('#MonthlyGanttDivJSGanttToolTip').addClass('top').removeClass('bottom');
			        $(this).siblings().removeClass('top').addClass('bottom');
		   		 });
				/*$("#MonthlyGanttDivtaskbar_"+loadedOrder.pID).on('mousedown',function(event){
					  event.preventDefault();
				      if(event.which == 3)
				      {
				        splitPlannedBarPopup(loadedOrder.pID);    
				      }
				     //SPLITTED_FROM_COLOR 
				});*/
				if(loadedOrder.planBarType=='SPLITTED_FROM_COLOR'){
					  $('#MonthlyGanttDivbardiv_'+loadedOrder.pID).contextMenu(plannedBarFilteredMenu, {
					        theme: 'vista'
					   });
				} else{
					 $('#MonthlyGanttDivbardiv_'+loadedOrder.pID).contextMenu(plannedBarMenu, {
					      theme: 'vista'
					  });
				}
				
				$("#MonthlyGanttDivtaskbar_"+loadedOrder.pID).mouseover(function(event) {//alert();
				  planningBoardPlannedBarMouseOverEvent(event,loadedOrder.pStyleId,loadedOrder.pName,loadedOrder.pID,loadedOrder.deliveryDate,loadedOrder.orderQty, loadedOrder.orderAllowQty, loadedOrder.orderComQty, loadedOrder.geoId,loadedOrder.colorName);
				   
				}).mouseout(function(event){
				   $('.mouseoverBar').html('');
				   $('.mouseoverBar').hide();
				});
				
				$("#MonthlyGanttDivbardiv_"+loadedOrder.pID).click(function(event) {
				   planningBoardPlannedBarClickEvent(event,loadedOrder.pStyleId,loadedOrder.pID,loadedOrder.orderPlanId,companyId,month,year);
				});
				$('#MonthlyGanttDivbardiv_'+loadedOrder.pID ).draggable({  
		  		  	cursorAt: { bottom: 2 },
		  		  	grid: [ 70, 120 ],
		  		  	scroll: true,
		  		  	start: function(event, ui) {				
		  		  	  $(this).addClass('top').removeClass('bottom');
					  $(this).siblings().removeClass('top').addClass('bottom');
					  var cellId = event.target.id;
					},
		  		  	drag: function( event, ui ) {
			           $('.mouseoverBar').html('');
					   $('.mouseoverBar').hide();
				   
		  		  	   if ( event.target.className == "gtaskcell" ||event.target.className=="gtaskcellholidaydflt" || event.target.className == "gtaskcellholiday" || event.target.className == "gtaskcellhrholiday"|| event.target.className == "gtaskcellfriday") {
		  		  	     var cellId = event.target.id;
			  		  	 if(visited==0){
			  		  	   visited = 1;
			  		  	   planningBoardEvent(cellId,loadedOrder.pID,"MovePlanBar");
			  		  	 }
			  		  	 if(event.target.className == "gtaskcellholiday"){
			  		  	 	event.target.style.border = "4px dotted red";
			  		  	 	showSuggestions("red",cellId,"Holiday: ");	
			  		  	 }else if(event.target.className == "gtaskcellfriday"){
			  		  	 	event.target.style.border = "4px dotted yellow";
			  		  	 	showSuggestions("red",cellId,"Friday: ");		
			  		  	 }else if(cellId==''){
			  		  	 
			  		  	 }else{
			  		  	 	event.target.style.border = "4px dotted green";
			  		  	 	showSuggestions("black",cellId,"Working Day: ");
			  		  	 	selectedCell = cellId;  		  	 
			  		  	 }
		  		  	 	  
		  		  	}
			  		   	setTimeout(function() {
							 event.target.style.border = "";
						}, 2000);			
					},
					stop: function( event, ui ) {
						direction = {};
					    var cellId = event.target.id;
					    if(selectedCell!=''){
		   					updateLineLoadingbyMovePlan(selectedCell,loadedOrder.pID);
					    }else{
					    	loadPlanningBoard(null,true);
					    }
					}
				});
				
				
				if(loadedOrder.orderType=='Unplanned'){

					$('#MonthlyGanttDivtaskbar_'+loadedOrder.pID).contextMenu(unplannedBarMenu, {
				      theme: 'vista'
				    });
					$("#MonthlyGanttDivbardiv_"+loadedOrder.pID).hover(function(event) {
					  tempDiv.innerHTML = "Style: <b>"+loadedOrder.pName+"</b><br>Order Qty:<b>"+loadedOrder.orderQty+"</b> <br> Approval Date: <b><i>"+loadedOrder.ppApprovalDate+"</i></b><br> Shipment Date:  <i><b>"+loadedOrder.deliveryDate+"</i></b>";
					  document.body.appendChild(tempDiv);
					  $(tempDiv).css({
					    top: event.clientY,
					    left: event.clientX
					  }).show();
					}, function() {
					  $(tempDiv).hide();
					});
					$("#MonthlyGanttDivbardiv_"+loadedOrder.pID).draggable({  
			  		  	cursorAt: { bottom: 2 },
			  		  	grid: [ 19, 35 ],
			  		  	scroll: true,
			  		  	start: function(event, ui) {				
			  		  	  $(this).addClass('top').removeClass('bottom');
						  $(this).siblings().removeClass('top').addClass('bottom');
						},
			  		  	drag: function( event, ui ) {
			  		  	// for showing the order info details
			        	
						//	alert();
			  		  	if ( event.target.className == "gtaskcell" ||event.target.className=="gtaskcellholidaydflt" || event.target.className == "gtaskcellholiday" || event.target.className == "gtaskcellhrholiday"|| event.target.className == "gtaskcellfriday") {
			  		  	  
			  		  	 var cellId = event.target.id;
			  		  	 if(event.target.className == "gtaskcellholiday"){
			  		  	 	event.target.style.border = "4px dotted red";  
			  		  	 	showSuggestions("black",cellId,"Weekend: ");	
			  		  	 }else if(event.target.className == "gtaskcellfriday"){
			  		  	 	event.target.style.border = "4px dotted yellow";
			  		  	 	showSuggestions("black",cellId,"Friday: ");
			  		  	 }else{
			  		  	 	event.target.style.border = "4px dotted green";
			  		  	 	showSuggestions("black",cellId,"Working Day: ");	 
			  		  	 }
			  		  	 	  
			  		  	}
			  		   	setTimeout(function() {
							 event.target.style.border = "";
						}, 2000);			
						},
						stop: function( event, ui ) {
							$(tempDiv).hide();
							
						    var cellId = event.target.id;
						    var transactionId = loadedOrder.pID;
						    
						    if(cellId != null && cellId != ''){			       
						    if(cellId.indexOf('bardiv') > -1){
							  loadPlanningBoard(null,true);
							  planningAlertMessage("red","Wrong Movement try again!",5000);	
						    }else if(cellId.indexOf('111111')> -1){
							  loadPlanningBoard(null,true);
							  planningAlertMessage("black","Wrong Movement try again!",5000);	
						    }else if(cellId.indexOf('222222')> -1){
							  loadPlanningBoard(null,true);
							  planningAlertMessage("red","Wrong Movement try again!",5000);	
						    }else{
						      directLineLoadingFromScheduleInfo(transactionId,cellId,false);
						    }
							}else{
							  loadPlanningBoard(null,true);
							  planningAlertMessage("red","Wrong Movement try again!",5000);	
							}
						}
					});							
				}	
			
				
			});
			
			//g.AddTaskItem(taskItemArray[0])
		} else {
			alert("Error, unable to create Gantt Chart");
		}
		var scrolling = false;
		
		var visited = 0;
		var resizeSize = columnWidth +1;
		
		var selectedCell = '';

}
function clearAllSearchCriterias() {	
	var companyId = $('#companyId').val();$('#companyId').val(companyId);
	var year = $('#year').val();//$('#year').val(year);
	var month = $('#month').val();
	var currentDate = new Date();
		
	$('#orderId').val("0");
	$('#styleId').val("0");
	$('#buyerId').val("0");

	$('#buyerNameToSearch').val("");
	$('#styleNameToSearch').val("");
	$('#orderNameToSearch').val("");
	
	$('#buyerIdToSearch').val("0");
	$('#styleIdToSearch').val("0");
	$('#orderIdToSearch').val("0");
	
	
	$('#statusId').val("0");
	
	if (year == "") {
		year = $('#year').val();
	}
	
	
	if ($('#PlanningBoardTitle')) {
		$('#PlanningBoardTitle').html("Production Planning Board: " + year);
	}
	$('#loadingDiv').hide();
	loadPlanningBoard(null,false);
}
function loadCapacityInfoDetails(formName){

	var fromDate = $('#'+formName+'_fromDate').val();
	var thruDate = $('#'+formName+'_thruDate').val();
	
	var companyId = $('#companyId').val();
	var year = $('#year').val();
	var month = $('#month').val();
	if (companyId!=="" && year>=1 && month>=0) {
		jQuery.ajax({
			url : 'CapacityInfoDetails',
			type : 'POST',
			async: false,
			data : {
				"companyId" : companyId,
				"year" : year,
				"month" : month,
				"fromDate" : fromDate,
				"thruDate" : thruDate
			},
			error : function(content) {
				$('#loadingDiv').hide();
				planningAlertMessage("black","An error occured loading content! : " + content,
						2000);
			},
			success : function(content) {
				jQuery('#capacityInfoContainer').html(content);
				$('#loadingDiv').hide();
			}
		});
	}
	
}
function getMonthYear(month, year) {
	var monthYear = "mon,year";
	switch (month) {
	case '-1':
		monthYear = " " + year;
		break;
	case '0':
		monthYear = "Jan," + year;
		break;
	case '1':
		monthYear = "Feb," + year;
		break;
	case '2':
		monthYear = "Mar," + year;
		break;
	case '3':
		monthYear = "Apr," + year;
		break;
	case '4':
		monthYear = "May," + year;
		break;
	case '5':
		monthYear = "Jun," + year;
		break;
	case '6':
		monthYear = "Jul," + year;
		break;
	case '7':
		monthYear = "Aug," + year;
		break;
	case '8':
		monthYear = "Sep," + year;
		break;
	case '9':
		monthYear = "Oct," + year;
		break;
	case '10':
		monthYear = "Nov," + year;
		break;
	case '11':
		monthYear = "Dec," + year;
		break;
	default:
		monthYear = " " + year;
		break;
	}
	return monthYear;
}

function concatTransactionId(counter) {
	
	var concateStr = $('#unplannedOrderIds').val();
	var checked = $('#isChecked_' + counter).prop('checked');
	if(checked){
		if(transctionCounter <= 60){
		tarnsctionList.push($('#isChecked_' + counter).val());
		++transctionCounter;
		//alert(tarnsctionList);
		}else{
			$('#isChecked_' + counter).attr('checked', false);
			alert("You can not select More than sixty Order at a time");
		}
	}else{
		--transctionCounter;
		var index = tarnsctionList.indexOf($('#isChecked_' + counter).val());
		if (index > -1) {
			tarnsctionList.splice(index, 1);
			//alert(tarnsctionList);
		}
	}
	$('#unplannedOrderIds').val(tarnsctionList);
	//alert($('#unplannedOrderIds').val());
}

function checkLineCondition(counter) {
	var lineId = $('#lineId_' + counter).val();
if(lineId !=""){
    var transctionId = $('#isChecked_' + counter).val();
    var aprovalDate= $('#ppApprovalDate_' + counter).val();
    var concatelineAndaprovalDate = lineId+'_'+aprovalDate;
    var quantity = $('#quantity_' + counter).val();
	var checked = $('#isDirLoad_' + counter).prop('checked');
	var companyId = $('#loadUnPlannedOrdersSerachForm_companyId').val();
	//alert(concatelineAndaprovalDate);
	if(checked){
		$.ajax({	
			url : "CheckLine",
			type : "POST",
			data : {
				"transctionId":transctionId,
				"lineId"  : lineId,
				"companyId"  : companyId,
				"quantity": quantity
			
				
			},
			success : function(data) {
			  // alert(data.isAvailable);
			   if(data.isAvailable){
				   alert("You can Not select the line");
				   $('#isDirLoad_' + counter).attr('checked', false);
			   }else{
				   
				   if(directLoadCounter<=2){
				   tarnsctionIDList.push(transctionId);
				   concateLineAndApprovalDateList.push(concatelineAndaprovalDate);
				   //alert(concateLineAndApprovalDateList);
				   $('#selectedtransctionIds').val(tarnsctionIDList);
				   $('#selectedConLineIds').val(concateLineAndApprovalDateList);
				   directLoadCounter++;
				   //alert(directLoadCounter);
				   }else{
					   $('#isDirLoad_' + counter).attr('checked', false);
					   alert("You can not select More then 3 orders at a time");
				   }
			   }
			}
		});
	 }else{
		//alert(lineId);
		var index = tarnsctionIDList.indexOf(transctionId);
		var index1 = concateLineAndApprovalDateList.indexOf(concatelineAndaprovalDate);
		if (index > -1 && index1 > -1) {
			directLoadCounter--;
			//alert(directLoadCounter);
			tarnsctionIDList.splice(index, 1);
			concateLineAndApprovalDateList.splice(index, 1);
			//alert(tarnsctionIDList);
			//alert(concateLineAndApprovalDateList);
			$('#selectedtransctionIds').val(tarnsctionIDList);
			$('#selectedConLineIds').val(concateLineAndApprovalDateList);
		}
	}
}else{
	   alert("Please select a Line");
	   $('#isDirLoad_' + counter).attr('checked', false);
}

}


function showUnplanedOrderList(){
	//clearAllSearchCriterias();
	var formName = 'loadUnPlannedOrdersSerachForm';
	var companyId = $('#'+formName+'_companyId').val();
	var year = $('#'+formName+'_year').val();
	var fromDate = $('#'+formName+'_fromDate').val();
	var thruDate = $('#'+formName+'_thruDate').val();
	if (fromDate!=="" && fromDate!==undefined) {
		var date = new Date(fromDate);
		$('#month').val(date.getMonth());
		//alert($('#month').val());
		$('#'+formName+'_month').val($('#month').val());
	}
	var month = $('#'+formName+'_month').val();
	var buyerId = $('#'+formName+'_buyerId').val();
	var styleId = $('#'+formName+'_styleId').val();
	var orderId = $('#'+formName+'_orderId').val();
	
	
	if (formName !== null) {
		var companyId = $('#' + formName + '_companyId').val();//$('#companyId').val(companyId);
		var year = $('#' + formName + '_year').val();$('#year').val(year);
		var month = $('#' + formName + '_month').val();$('#month').val(month);
		var orderId = $('#' + formName + '_orderId').val();$('#orderId').val(orderId);
		var styleId = $('#' + formName + '_styleId').val();$('#styleId').val(styleId);
		var buyerId = $('#' + formName + '_buyerId').val();$('#buyerId').val(buyerId);
		var statusId = $('#' + formName + '_statusId').val();$('#statusId').val(statusId);
		
	} else {
		var companyId = $('#companyId').val();
		var year = $('#year').val();
		var month = $('#month').val();
		var orderId = $('#orderId').val();
		var styleId = $('#styleId').val();
		var buyerId = $('#buyerId').val();
		var statusId = $('#statusId').val();
		
	}
	

	transctionCounter = 0;

	tarnsctionList = [];
	$('#unplannedOrderIds').val(tarnsctionList);
	
	/*if (fromDate=="") {
		alert("Enter from date.");
		return ;
	}else if (thruDate=="") {
		alert("Enter thru date.");
		return ;
	}*/
	
	$('#loadingDiv').hide();
	
	$.ajax({	
		url : "UnplanedOrderList",
		type : "POST",
		async: false,
		data : {
			"companyId":companyId,
			"year":year,
			"month":month,
			"fromDate":fromDate,
			"thruDate":thruDate,
			"buyerId":buyerId,
			"styleId":styleId,
			"orderId":orderId
		},
		success : function(data) {
			$('#unPlanedOrderList').html(data);
			loadCapacityInfoDetails(formName);
			$('#loadingDiv').hide();
		}
	});
	
	
}
function focusSelectedStyle(lineLoadingId){
	$.ajax({	
		url : "getStyleIdByLineLoadingId",
		type : "POST",
		data : {
			"lineLoadingId": lineLoadingId		
		},
		success : function(data) {
			$('#buyerId').val("0");
		    $('#styleId').val(data.styleId);
		   loadPlanningBoard(null,true);
		}
    });
}
function focusSelectedBuyer(lineLoadingId){
	$.ajax({	
		url : "getBuyerIdByLineLoadingId",
		type : "POST",
		data : {
			"lineLoadingId": lineLoadingId		
		},
		success : function(data) {
			$('#styleId').val("0");
		    $('#buyerId').val(data.buyerId);
		   loadPlanningBoard(null,true);
		}
    });
}
/*function loadMonthwisePlanningBoard(month){
	
	var year = $('#year').val();
	var companyId = $('#companyId').val();
	$('#month_' + month).prop( "checked", true );
	
	$('#month').val(month);
	$('#loadingDiv').hide();
	
	var isVisible = 'Y';	
	$('#loadingDiv').hide();
	$.ajax({	
		url : "loadMonthwisePlanningBoard",
		type : "POST",
		data : {
			"companyId": companyId,
		    "month": month,
			"year" : year,
			"isVisible": isVisible			
		},
		success : function(data) {	
		   loadPlanningBoard(null,true);
		}
    });
}*/
function loadMonthwisePlanningBoard(month){
	
	var year = $('#year').val();
	var companyId = $('#companyId').val();
	$('#month_' + month).prop( "checked", true );
	
	$('#month').val(month);	
	loadPlanningBoard(null,true);
}
function planningBoardCommonPopup(title, containerId, url, height, width) {
	$('#loadingDiv').hide();
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
					$(containerId).css("z-index","20000");
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
		},
		close: popupCloseEvent

	});
}
function popupCloseEvent(){
	clearAllSearchCriterias();
	loadPlanningBoard(null,true);
}
function planningBoardEvent(cellId,lineLoadingId,eventType){
	
	planningBoardCellIds.push(cellId);
	planningBoardLineLoadingIds.push(lineLoadingId);
	planningBoardActions.push(eventType);
	$('#totalUndoRemain').html(planningBoardCellIds.length);
	$('#totalRedoRemain').html(poppedPlanningBoardLineLoadingIds.length);
}
/*function planningBoardUndoAction(){
	
	var lineLoadingId = planningBoardLineLoadingIds.pop();
	var cellId = planningBoardCellIds.pop();
	var eventType = planningBoardActions.pop();
		
	if (cellId!=="" && cellId!==undefined) {
		updateLineLoadingbyMovePlan(cellId,lineLoadingId);
	}	

	$('#totalUndoRemain').html(planningBoardCellIds.length);
	$('#totalRedoRemain').html(poppedPlanningBoardLineLoadingIds.length);
}
function planningBoardRedoAction(){
	var currentCellId = poppedPlanningBoardCellIds.pop();
	var currentLineLoadingId = poppedPlanningBoardLineLoadingIds.pop();
	var currentPlanningBoardEvent = poppedPlanningBoardActions.pop();
	
	var cellId = poppedPlanningBoardCellIds.pop();	
	var lineLoadingId = poppedPlanningBoardLineLoadingIds.pop();	
	var eventType = poppedPlanningBoardActions.pop();
	
	planningBoardCellIds.push(currentCellId);
	planningBoardLineLoadingIds.push(currentLineLoadingId);
	planningBoardActions.push(currentPlanningBoardEvent);
	
	if (cellId!=="" && cellId!==undefined) {
		updateLineLoadingbyMovePlan(cellId,lineLoadingId);
	}

	$('#totalUndoRemain').html(planningBoardCellIds.length);
	$('#totalRedoRemain').html(poppedPlanningBoardLineLoadingIds.length);
}*/
////new methods for undo/redo functionality
function planningBoardUndoAction(){
	var companyId = $('#companyId').val();
	$("#loadingDiv").show();
	$.ajax({
		url : "planningBoardUndoAction",
		type : "POST",
		data : {
			"companyId" : companyId
		},
		success : function(changeResult) {
			var totalUndo = changeResult.totalUndoLineloadingIds;
			var totalRedo = changeResult.totalRedoLineloadingIds;
			$("#loadingDiv").hide();
			
			$('#totalUndoRemain').html(totalUndo);
			$('#totalRedoRemain').html(totalRedo);
			loadPlanningBoard(null,true);
		}
	});
}
function planningBoardRedoAction(){
	var companyId = $('#companyId').val();
	$("#loadingDiv").show();
	$.ajax({
		url : "planningBoardRedoAction",
		type : "POST",
		data : {
			"companyId" : companyId
		},
		success : function(changeResult) {
			var totalUndo = changeResult.totalUndoLineloadingIds;
			var totalRedo = changeResult.totalRedoLineloadingIds;
			$("#loadingDiv").hide();
			
			$('#totalUndoRemain').html(totalUndo);
			$('#totalRedoRemain').html(totalRedo);
			loadPlanningBoard(null,true);
		}
	});
}
function planningBoardHelpScreen(){
	var title = "Planning Board Help";
	var url = "PlanningBoardHelpScreen";
	var height = "400";
	var width = "400";
	prottayUIDefaultPopup(title, url, height, width);
}
function planningBoardNotification(){
	var companyId = $('#companyId').val();
	var title = "Planning Board Notifications";
	var url = "PlanningBoardNotificationScreen?companyId="+companyId;
	var height = "400";
	var width = "400";
	prottayUIDefaultPopup(title, url, height, width);
}
function planningBoardSummary(){
	var companyId = $('#companyId').val();
	var title = "Planning Board Summary";
	var url = "PlanningBoardSummary?companyId="+companyId;
	var height = "400";
	var width = "900";
	prottayUIDefaultPopup(title, url, height, width);
}
function synchronizePlanningBoard(){
	var companyId = $('#companyId').val();
	var year = $('#year').val();
	var month = $('#month').val();
	var title = "Synchronize Planning Board";
	var url = "SynchronizePlanningBoardScreen?companyId="+companyId+"&year="+year+"&month="+month;
	var height = "400";
	var width = "900";
	prottayUIDefaultPopup(title, url, height, width);
}
function KeyPress(e) {
	  var evtobj = window.event ? event : e;
	  
	  if (evtobj.keyCode == 90 && evtobj.ctrlKey){
		  planningBoardUndoAction(); 
		  return false;
	  }
	  else if (evtobj.keyCode == 89 && evtobj.ctrlKey){
		 planningBoardRedoAction();  
		  return false;
	  }	 
	  
	  if(evtobj.ctrlKey && evtobj.keyCode == 83){
			e.preventDefault();
			resetEditor();
			  return false;
	   }
	  if(evtobj.ctrlKey && evtobj.keyCode == 66){
			e.preventDefault();
			planningBoardSummary();
			return false;
	   }
	  if(evtobj.ctrlKey && evtobj.keyCode == 82){
			e.preventDefault();
			resetEditor();
			  return false;
	   }
	  
	  if(evtobj.ctrlKey && evtobj.keyCode == 188){
			e.preventDefault();
			
			return false;
	   }
	  if(evtobj.ctrlKey && evtobj.keyCode == 190){
			e.preventDefault();
			loadNextMonth();
			return false;
	   }
	  /*if (!(evtobj.keyCode == 115 && evtobj.ctrlKey) && !(evtobj.keyCode == 19)){ 
		return true;
	    alert("Ctrl-S pressed");
	    event.preventDefault();
	  }*/
}
/*
  "Approval Date: <b><i>"+ppApprovalDate+"</i></b><br>"+ 
  "Shipment Date:  <b><i>"+deliveryDate+"</i></b>"+
 * */
function planningBoardUnplannedBarClickEvent(event,mergeSequenceId){
	//alert(mergeSequenceId);
	//,styleName,smv,styleImageFrontLink,orderQty,ppApprovalDate,deliveryDate
	var companyId = $('#companyId').val();
	$('#waitingDiv').show();
	$.ajax({
		url: 'loadUnplannedStyleDetails',
		type: "POST",
		data: {
			"companyId" : companyId,
			"mergeSequenceId":mergeSequenceId
		},
		success:function(data){
			var styleId = data.styleId;
			
			$('#waitingDiv').hide();
			  $('.plannedBar .prottayJGrid th').css("background-color", "#1c7f59");
			  $('.plannedBar .prottayJGrid th').css("color", "white");
			  $('.plannedBar .prottayJGrid a').css("color", "white");
			    
		    
			var colorWiseOrderBreakdownInfoJson = data.colorWiseOrderBreakdownInfoJson;
			//alert(data.orderBreakdownQty);
			var smvWiseLineSuggestions = data.smvWiseLineSuggestions;
			var lineSuggestionsFromHistoryJson = data.lineSuggestionsFromHistoryJson;
			//MonthlyGanttDivchild_100794
			//$('#MonthlyGanttDivchild_100794').attr('class','gname gtaskcell ggroupitem glineitem gitemhighlight');
			var materialInDate = data.materialsInDate;
			var breakdownTableHeaderStr="";
			var breakdownTableStr="";
			breakdownTableHeaderStr = breakdownTableHeaderStr + "<thead><th style='background-color: #1C7F59; color: white;' colspan='5'>Order Breakdown Details</th></thead>";
			breakdownTableHeaderStr = breakdownTableHeaderStr + "<thead><th  style='background-color: #1C7F59; color: white;'>Order</th><th  style='background-color: #1C7F59; color: white;'>Color</th><th  style='background-color: #1C7F59; color: white;'>Country</th><th  style='background-color: #1C7F59; color: white;'>Shipment Date</th><th  style='background-color: #1C7F59; color: white;'>Quantity</th></thead>";
			
			
			for (var i = 0; i < colorWiseOrderBreakdownInfoJson.length; i++) {
				breakdownTableStr = breakdownTableStr + "<tr><td>"+colorWiseOrderBreakdownInfoJson[i].orderName+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].colorName+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].countryCode+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].shipmentDate+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].orderQty+"</td></tr>";
			}
			var breakdownTable ="<br>";
			if (colorWiseOrderBreakdownInfoJson.length>0) {
				breakdownTable = "<table class='prottayJGrid'>"+
				  breakdownTableHeaderStr+
				  breakdownTableStr+
				  "</table>";
			}
			var lineSuggestionsFromHistoryTable = "<br>";
			var lineSuggestionsTableHeaderStr="";
			var lineSuggestionsTableStr="";
			lineSuggestionsTableHeaderStr = lineSuggestionsTableHeaderStr + "<thead><th style='background-color: #1C7F59; color: white;' colspan='3'>Production History</th></thead>";
			lineSuggestionsTableHeaderStr = lineSuggestionsTableHeaderStr + "<thead><th  style='background-color: #1C7F59; color: white;'>Line</th><th  style='background-color: #1C7F59; color: white;'>Entry Date</th><th  style='background-color: #1C7F59; color: white;'>Quantity</th></thead>";
			
			for (var i = 0; i < lineSuggestionsFromHistoryJson.length; i++) {
				lineSuggestionsTableStr = lineSuggestionsTableStr + "<tr><td style='color:green;'>"+lineSuggestionsFromHistoryJson[i].lineName+"</td><td>"+lineSuggestionsFromHistoryJson[i].entryDate+"</td><td>"+lineSuggestionsFromHistoryJson[i].totalSewingOutput+"</td></tr>";
			}
			if (lineSuggestionsFromHistoryJson.length>0) {
				lineSuggestionsFromHistoryTable = "<table class='prottayJGrid'>"+
				lineSuggestionsTableHeaderStr+
				  lineSuggestionsTableStr+
				  "</table>";
			}
			
			var associatedOrderListTable ="<br>";
			var associatedOrderListTableHeaderStr="";
			var associatedOrderListTableStr="";
			associatedOrderListTableHeaderStr = associatedOrderListTableHeaderStr + "<thead><th style='background-color: #1C7F59; color: white;' colspan='5'>Associated Order List</th></thead>";
			associatedOrderListTableHeaderStr = associatedOrderListTableHeaderStr + "<thead><th  style='background-color: #1C7F59; color: white;'>Order Name</th><th style='background-color: #1C7F59; color: white;'>SAM</th><th  style='background-color: #1C7F59; color: white;'>Order Quantity</th><th  style='background-color: #1C7F59; color: white;'>Shipment Date</th><th  style='background-color: #1C7F59; color: white;'>TnA</th></thead>";
			
			var associatedOrderListTableJson = data.associatedOrderListTableJson;
			for (var i = 0; i < associatedOrderListTableJson.length; i++) {
				associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>"+associatedOrderListTableJson[i].orderName+"</td><td style='color:green;'>"+associatedOrderListTableJson[i].sam+"</td><td>"+associatedOrderListTableJson[i].orderQuantity+"</td><td>"+associatedOrderListTableJson[i].bookingDate+"</td><td><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showTimeAndActionForOrder("+associatedOrderListTableJson[i].transactionId+")'>TnA</a></td></tr>";
			}
			
			/*associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Sample Approve</td><td>06/08/2017</td><td>06/08/2017</td><td>Done</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>IE Entry</td><td>07/08/2017</td><td>07/08/2017</td><td>Done</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Planing</td><td>08/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Cutting</td><td>12/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Sewing</td><td>13/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Finishing</td><td>14/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Q/A</td><td>15/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			*/
			if (lineSuggestionsFromHistoryJson.length>0) {
				/*associatedOrderListTable = "<table class='prottayJGrid'>"+
				associatedOrderListTableHeaderStr+
				associatedOrderListTableStr+
				  "</table>";*/
			}
			associatedOrderListTable = "<table class='prottayJGrid'>"+
			associatedOrderListTableHeaderStr+
			associatedOrderListTableStr+
			  "</table>";
			var specialLinkTable = "<table class='prottayJGrid' style='cursor:url;'>";
			var specialLinkTableHeaderStr="";
			
			specialLinkTableHeaderStr = specialLinkTableHeaderStr + "<thead><tr><th  style='background-color: #1C7F59; color: white;'>Special Links</th></tr></thead>";

			var specialLinkTableStr="";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".unplannedBar\").css(\"z-index\",\"100\");showSampleInfo("+styleId+")'>Sample Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".unplannedBar\").css(\"z-index\",\"100\");showOrderBreakdownInfo("+styleId+")'>Order Breakdown Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".unplannedBar\").css(\"z-index\",\"100\");showMaterialsInfo("+styleId+")'>Materials Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".unplannedBar\").css(\"z-index\",\"100\");showBillOfMaterials("+styleId+")'>BOM Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".unplannedBar\").css(\"z-index\",\"100\");showRndInfo("+styleId+")'>RnD Info</a></h3></td></tr>";
			
			specialLinkTable = specialLinkTable + specialLinkTableHeaderStr + specialLinkTableStr+"</table>";
			
			$(".tempDiv_"+styleId).html('');
			// hide all unplanned bar
			$(".unplannedBar").html('');
			$(".unplannedBar").hide();
			$(".plannedBar").html('');
			$(".plannedBar").hide();
			
			var tempDiv = document.createElement("div");
			tempDiv.setAttribute("style","cursor: move;filter: alpha(opacity=90);border: 1px solid;border-radius: 7px;position:fixed;margin-right:5px;font-size:15px;background-color:lightgreen;");
			tempDiv.setAttribute("class","unplannedBar "+" tempDiv_"+styleId);
			
			
			
			tempDiv.innerHTML = "<input style='float:left;' type='button' value='X' onclick=\"$(this).parent().hide();\"/><span  class='prottay-border-bottom'><b style='float:right;'>&nbsp;&nbsp;Style: <b>"+data.styleName+"</b></b></span>"+ 
			  "<div class='profile-full' style='margin:5px;padding:5px;background-color:lightyellow; font-size:8px;'>"+
			  "<div class='lefthalf'><table class='prottayJGrid'><thead><th style='background-color: #1C7F59; color: white;' colspan='3'>Style Summery</th></thead>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Fabrics In Date:</h2></th><td><b>"+materialInDate+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Company: </h2></th><td><b>"+data.companyName+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Buyer: </h2></th><td><b>"+data.buyerName+"</b></td></tr>"+
			  /*"<tr><th  style='background-color: #1C7F59; color: white;'><h2>Approval Date: </h2></th><td><b>"+data.ppApprovalDate+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Booking Date: </h2></th><td><b>"+data.deliveryDate+"</b></td></tr>"+*/
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Print Info: </h2></th><td><b>"+data.printInfo+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Embroidery Info: </h2></th><td><b>"+data.embroideryInfo+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Wash Info: </h2></th><td><b>"+data.washInfo+"</b></td></tr>"+
			  //"<tr><th  style='background-color: #1C7F59; color: white;'><h2>SAM:</h2></th><td><b>"+data.smv+"</b></td></tr>"+ 
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Order Qty:</h2></th><td><b>"+data.orderQty+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Production Day:</h2></th><td style='background-color:lightgreen;'><b>"+data.totalProductionDays+"</b></td></tr>"+
			  //"<tr><th  style='background-color: #1C7F59; color: white;'><h2>Breakdown Qty:</h2></th><td><b>"+data.orderBreakdownQty+"</b></td></tr>"+
			  "</table>"+
			  associatedOrderListTable +
			  "SAM wise Suggestion: <b style='color:green;'>"+smvWiseLineSuggestions+"</b>"+
			  "</div><div class='righthalf'>"+
			  "<table class='prottayJGrid'><thead><th style='background-color: #1C7F59; color: white;' colspan='2'>Style Image</th></thead>"+
			  "<tr><td><img src='"+data.styleImageFrontLink+"' style='float:left;height:80px;width:80px;vertical-align: middle;margin: 2px auto;float:right;margin-left:0px;'></td></tr>"+
			  "</table>"+
			  lineSuggestionsFromHistoryTable +
			  breakdownTable + 
			  //specialLinkTable+
			  "</div></div>";
			//$(tempDiv).append("Suggested Line: "+lineSuggestions);
			//$(tempDiv).siblings('div').css('z-index', 1);
			$(tempDiv).css("z-index", "1200");
			
			  document.body.appendChild(tempDiv);
			  var docWidth = $(document).width();
			  var eventXWidth = event.clientX;
			  var left = eventXWidth;
			  if ((docWidth-eventXWidth)<400) {
				left = docWidth - 500;
			  }
			  $(tempDiv).click(function(event){
				  $(this).siblings('div').css('z-index', 150);
				  //tempDiv.setAttribute("style","cursor: move;z-index: 99;");
				  $(tempDiv).css("z-index", "1200");
				  //$(tempDiv).show();
			  });
			  $(tempDiv).css({
			    top: event.clientY,
			    left: left,
			    position:"fixed"
			  }).show();
			  $(tempDiv).draggable();
		},
		error:function(){
			$('#waitingDiv').hide();
		}
	});
}
function planningBoardPlannedBarClickEvent(event,styleId,lineLoadingId,orderPlanId,companyId,month,year){
	//alert(styleId+','+lineLoadingId+","+orderPlanId);
	//,${line.pID},line.orderPlanId}",companyId}",${month},${year}
	$('#waitingDiv').show();
	var companyId = $('#companyId').val();
	$.ajax({
		url: 'loadPlannedStyleDetails',
		type: "POST",
		data: {
			"companyId" : companyId,
			"styleId":styleId,
			"lineLoadingId":lineLoadingId
		},
		success:function(data){
			$('#waitingDiv').hide();
		    $('.plannedBar .prottayJGrid th').css("background-color", "#1c7f59");
		    $('.plannedBar .prottayJGrid th').css("color", "white");
		    $('.plannedBar .prottayJGrid a').css("color", "white");
		    
			var colorWiseOrderBreakdownInfoJson = data.colorWiseOrderBreakdownInfoJson;
			//alert(data.orderBreakdownQty);
			var smvWiseLineSuggestions = data.smvWiseLineSuggestions;
			var lineSuggestionsFromHistoryJson = data.lineSuggestionsFromHistoryJson;
			//MonthlyGanttDivchild_100794
			//$('#MonthlyGanttDivchild_100794').attr('class','gname gtaskcell ggroupitem glineitem gitemhighlight');
			var materialInDate = data.materialsInDate;
			var breakdownTableHeaderStr="";
			var breakdownTableStr="";
			breakdownTableHeaderStr = breakdownTableHeaderStr + "<thead><th style='background-color: #1C7F59; color: white;' colspan='5'>Order Breakdown Details</th></thead>";
			breakdownTableHeaderStr = breakdownTableHeaderStr + "<thead><th  style='background-color: #1C7F59; color: white;'>Order</th><th  style='background-color: #1C7F59; color: white;'>Color</th><th  style='background-color: #1C7F59; color: white;'>Country</th><th  style='background-color: #1C7F59; color: white;'>Shipment Date</th><th  style='background-color: #1C7F59; color: white;'>Quantity</th></thead>";
			
			for (var i = 0; i < colorWiseOrderBreakdownInfoJson.length; i++) {
				breakdownTableStr = breakdownTableStr + "<tr><td>"+colorWiseOrderBreakdownInfoJson[i].orderName+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].colorName+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].countryCode+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].shipmentDate+"</td><td>"+colorWiseOrderBreakdownInfoJson[i].orderQty+"</td></tr>";
			}
			var breakdownTable ="<br>";
			if (colorWiseOrderBreakdownInfoJson.length>0) {
				breakdownTable = "<table class='prottayJGrid'>"+
				  breakdownTableHeaderStr+
				  breakdownTableStr+
				  "</table>";
			}
			var lineSuggestionsFromHistoryTable = "<br>";
			var lineSuggestionsTableHeaderStr="";
			var lineSuggestionsTableStr="";
			lineSuggestionsTableHeaderStr = lineSuggestionsTableHeaderStr + "<thead><th style='background-color: #1C7F59; color: white;' colspan='3'>Production History</th></thead>";
			lineSuggestionsTableHeaderStr = lineSuggestionsTableHeaderStr + "<thead><th  style='background-color: #1C7F59; color: white;'>Line</th><th  style='background-color: #1C7F59; color: white;'>Entry Date</th><th  style='background-color: #1C7F59; color: white;'>Quantity</th></thead>";
			
			for (var i = 0; i < lineSuggestionsFromHistoryJson.length; i++) {
				lineSuggestionsTableStr = lineSuggestionsTableStr + "<tr><td style='color:green;'>"+lineSuggestionsFromHistoryJson[i].lineName+"</td><td>"+lineSuggestionsFromHistoryJson[i].entryDate+"</td><td>"+lineSuggestionsFromHistoryJson[i].totalSewingOutput+"</td></tr>";
			}
			if (lineSuggestionsFromHistoryJson.length>0) {
				lineSuggestionsFromHistoryTable = "<table class='prottayJGrid'>"+
				lineSuggestionsTableHeaderStr+
				  lineSuggestionsTableStr+
				  "</table>";
			}

			var associatedOrderListTable ="<br>";
			var associatedOrderListTableHeaderStr="";
			var associatedOrderListTableStr="";
			associatedOrderListTableHeaderStr = associatedOrderListTableHeaderStr + "<thead><tr><th style='background-color: #1C7F59; color: white;' colspan='5'>Associated Order List</th></tr></thead>";
			associatedOrderListTableHeaderStr = associatedOrderListTableHeaderStr + "<thead><th  style='background-color: #1C7F59; color: white;'>Order Name</th><th style='background-color: #1C7F59; color: white;'>SAM</th><th  style='background-color: #1C7F59; color: white;'>Order Quantity</th><th  style='background-color: #1C7F59; color: white;'>Shipment Date</th><th  style='background-color: #1C7F59; color: white;'>TnA</th></thead>";
			
			var associatedOrderListTableJson = data.associatedOrderListTableJson;
			for (var i = 0; i < associatedOrderListTableJson.length; i++) {
				associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>"+associatedOrderListTableJson[i].orderName+"</td><td style='color:green;'>"+associatedOrderListTableJson[i].sam+"</td><td>"+associatedOrderListTableJson[i].orderQuantity+"</td><td>"+associatedOrderListTableJson[i].bookingDate+"</td><td><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showTimeAndActionForOrder("+associatedOrderListTableJson[i].transactionId+")'>TnA</a></td></tr>";
			}
			/*associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Sample Approve</td><td>06/08/2017</td><td>06/08/2017</td><td>Done</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>IE Entry</td><td>07/08/2017</td><td>07/08/2017</td><td>Done</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Planing</td><td>08/08/2017</td><td>08/08/2017</td><td>Done</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Cutting</td><td>12/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Sewing</td><td>13/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Finishing</td><td>14/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			associatedOrderListTableStr = associatedOrderListTableStr + "<tr><td style='color:green;'>Q/A</td><td>15/08/2017</td><td>Upcoming..</td><td>In Progress</td></tr>";
			*/
			if (lineSuggestionsFromHistoryJson.length>0) {
				/*associatedOrderListTable = "<table class='prottayJGrid'>"+
				associatedOrderListTableHeaderStr+
				associatedOrderListTableStr+
				  "</table>";*/
			}
			associatedOrderListTable = "<table class='prottayJGrid'>"+
			associatedOrderListTableHeaderStr+
			associatedOrderListTableStr+
			  "</table>";
			var specialLinkTable = "<table class='prottayJGrid' style='cursor:url;'>";
			var specialLinkTableHeaderStr="";
			
			specialLinkTableHeaderStr = specialLinkTableHeaderStr + "<thead><tr><th  style='background-color: #1C7F59; color: white;'>Special Links</th></tr></thead>";

			var specialLinkTableStr="";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");updatePlanningBoardInfoPopup("+lineLoadingId+")'>Plan Details</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showSampleInfo("+styleId+")'>Sample Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showOrderBreakdownInfo("+styleId+")'>Order Breakdown Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showMaterialsInfo("+styleId+")'>Materials Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showBillOfMaterials("+styleId+")'>BOM Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showRndInfo("+styleId+")'>RnD Info</a></h3></td></tr>";
			specialLinkTableStr = specialLinkTableStr + "<tr><td><h3><a class='buttontext' href='javascript:$(\".plannedBar\").css(\"z-index\",\"100\");showProductionInfo("+styleId+","+lineLoadingId+")'>Production Info</a></h3></td></tr>";
			
			specialLinkTable = specialLinkTable + specialLinkTableHeaderStr + specialLinkTableStr+"</table>";
			
			$(".unplannedBar").html('');
			$(".unplannedBar").hide();
			$(".plannedBar").html('');
			$(".plannedBar").hide();
			 
			var tempDiv = document.createElement("div");
			tempDiv.setAttribute("style","z-index: 125;filter: alpha(opacity=90);border: 1px solid;border-radius: 7px;position:fixed;margin-right:5px;font-size:15px;background-color:lightgreen;");
			tempDiv.setAttribute("class","plannedBar "+" tempDiv_"+styleId);
			
			
			tempDiv.innerHTML = "<input style='float:left;' type='button' value='X' onclick=\"$(this).parent().hide();\"/><span  class='prottay-border-bottom'><b style='float:right;'>&nbsp;&nbsp;Style: <b>"+data.styleName+"</b></b></span>"+ 
			  "<div class='profile-full' style='margin:5px;cursor:move;padding:5px;background-color:lightyellow; font-size:8px;'>"+
			  "<div class='lefthalf'><table class='prottayJGrid'><thead><th style='background-color: #1C7F59; color: white;' colspan='3'>Style Summery</th></thead>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Fabrics In Date:</h2></th><td><b>"+materialInDate+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Company: </h2></th><td><b>"+data.companyName+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Buyer: </h2></th><td><b>"+data.buyerName+"</b></td></tr>"+
			  /*"<tr><th  style='background-color: #1C7F59; color: white;'><h2>Approval Date: </h2></th><td><b>"+data.ppApprovalDate+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Booking Date: </h2></th><td><b>"+data.deliveryDate+"</b></td></tr>"+*/
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Print Info: </h2></th><td><b>"+data.printInfo+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Embroidery Info: </h2></th><td><b>"+data.embroideryInfo+"</b></td></tr>"+
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Wash Info: </h2></th><td><b>"+data.washInfo+"</b></td></tr>"+
			  //"<tr><th  style='background-color: #1C7F59; color: white;'><h2>SAM:</h2></th><td><b>"+data.smv+"</b></td></tr>"+ 
			  "<tr><th  style='background-color: #1C7F59; color: white;'><h2>Order Qty:</h2></th><td><b>"+data.orderQty+"</b></td></tr>"+
			  //"<tr><th  style='background-color: #1C7F59; color: white;'><h2>Production Day:</h2></th><td style='background-color:lightgreen;'><b>"+data.totalProductionDays+"</b></td></tr>"+
			  //"<tr><th  style='background-color: #1C7F59; color: white;'><h2>Breakdown Qty:</h2></th><td><b>"+data.orderBreakdownQty+"</b></td></tr>" +
			  "</table>"+
			  associatedOrderListTable +
			  "SAM wise Suggestion: <b style='color:green;'>"+smvWiseLineSuggestions+"</b>"+
			  "</div><div class='righthalf'>"+
			  "<table class='prottayJGrid'><thead><th style='background-color: #1C7F59; color: white;' colspan='2'>Style Image</th></thead>"+
			  "<tr><td><img src='"+data.styleImageFrontLink+"' style='float:left;height:80px;width:80px;vertical-align: middle;margin: 2px auto;float:right;margin-left:0px;'></td></tr>"+
			  "</table>"+
			  lineSuggestionsFromHistoryTable +
			  breakdownTable + 
			  //specialLinkTable+
			  "</div></div>";
			//$(tempDiv).append("Suggested Line: "+lineSuggestions);
			
			$(tempDiv).css("z-index", "1200");
			  document.body.appendChild(tempDiv);
			  var docWidth = $(document).width();
			  var eventXWidth = event.clientX;
			  var left = eventXWidth;
			  if ((docWidth-eventXWidth)<400) {
				left = docWidth - 500;
			  }
			  $(tempDiv).click(function(event){
				  $(this).siblings('div').css('z-index', 150);
				  $(this).siblings('table').css('z-index', 150);
				  //tempDiv.setAttribute("style","cursor: move;z-index: 99;");
				  $(tempDiv).css("z-index", "1200");
				  //$(tempDiv).show();
			  });
			  $(tempDiv).css({
			    top: event.clientY,
			    left: left,
			    position:"fixed"
			  }).show();
			  $(tempDiv).draggable();
		},
		error:function(){
			$('#waitingDiv').hide();
		}
	});
}
function setSecondSplitQty(formName){
	var formNameStr = formName!=null ? formName+"_" : "";
	var companyId = $('#searchPlanningBoardJson_companyId').val();
	var allowQty = parseInt($('#'+formNameStr+'allowQty').val());//
	var firstQty = parseInt($('#'+formNameStr+'firstSplitQty').val());//originalQty
	var value = allowQty-firstQty;
	//alert(value);
	$('#'+formNameStr+'secondSplitQty').val(value);

}
function splitPlannedBarIntoOrderPopup(lineLoadingId){
	var formName = 'lineWisePBoardSyncForm';
	var companyId = $('#companyId').val();
	
	var url= "SplitPlannedOrderScreen?lineLoadingId="+lineLoadingId+"&companyId="+companyId;
	prottayPlanningCommonPopup('Devide Planned Order','#planInfoPopup',url,'400','625',formName);
}
function setDayTargetPopup(lineLoadingId){
	var formName = 'dayTargetSetupForm';
	var companyId = $('#companyId').val();
	
	var url= "DayTargetSetupScreen?lineLoadingId="+lineLoadingId+"&companyId="+companyId;
	prottayPlanningCommonPopup('Day Target Setup','#planInfoPopup',url,'460','725',formName);
}
function splitPlannedBarIntoOrderBreakdownPopup(lineLoadingId){
	var formName = 'lineWisePBoardSyncForm';
	var companyId = $('#companyId').val();
	
	var url= "SplitPlannedOrderScreen?lineLoadingId="+lineLoadingId+"&companyId="+companyId;
	prottayPlanningCommonPopup('Devide Planned Order','#planInfoPopup',url,'400','625',formName);
}

function splitPBoardOrderCommon(formName){
	var formNameString = formName!=null ? formName+"_" : "";
	planningAlertMessage("black",3000,"Order Splitting is in progress.");
	var lineLoadingId = $('#'+formNameString+"lineLoadingId").val();
	var splitType = $('#'+formNameString+"splitType").val();
	
	$("#loadingDiv").show();
	$.ajax({
		url : "splitPlanningBoardBar",
		type : "POST",
		data : {
			"lineLoadingId" : lineLoadingId,
			"splitType" : splitType
		},
		success : function(splitOrderResult) {
			$("#loadingDiv").hide();
			if (document.getElementById('MonthlyGanttDiv') !== null) {
				  loadPlanningBoard(null,false);
			}else{
				var orderPlanId = $('#orderPlanId').val();
				var companyId = $('#companyId').val();
				var orderName = $('#orderName').val();
				loadOrders(companyId,orderPlanId,orderName);
			}
			$('.ui-dialog').dialog('destroy').remove();
			if (splitOrderResult.splitMessage !== null) {
				planningAlertMessage("black",3000,splitOrderResult.splitMessage);
			}
		}
	});
	
}
/*function splitPBoardOrderCommon_old(formName){
	var formNameString = formName!=null ? formName+"_" : "";
	planningAlertMessage("black",3000,"Order Splitting is in progress.");
	
	var lineLoadingId = $('#'+formNameString+"lineLoadingId").val();
	var secondSplitQty = $('#'+formNameString+"firstSplitQty").val();
	var splitType = $('#'+formNameString+"splitType").val();
	
	if (secondSplitQty.indexOf(",") >= 0) {
		secondSplitQty = secondSplitQty.replace(',', '');
	}
	var allowQty = $('#'+formNameString+'allowQty').val();
	var firstSplitQty = allowQty - secondSplitQty; 
	if (firstSplitQty>0) {
		$("#loadingDiv").show();
		$.ajax({
			url : "splitPlanningBoardBar",
			type : "POST",
			data : {
				"lineLoadingId" : lineLoadingId,
				"firstSplitQty" : firstSplitQty,
				"splitType" : splitType
			},
			success : function(splitOrderResult) {
				$("#loadingDiv").hide();
				if (document.getElementById('MonthlyGanttDiv') !== null) {
					  loadPlanningBoard(null,true);
				}else{
					var orderPlanId = $('#orderPlanId').val();
					var companyId = $('#companyId').val();
					var orderName = $('#orderName').val();
					loadOrders(companyId,orderPlanId,orderName);
				}
				$('.ui-dialog').dialog('destroy').remove();
				if (splitOrderResult.splitMessage !== null) {
					planningAlertMessage("black",3000,splitOrderResult.splitMessage);
				}
			}
		});
	}else{
		alert("Invalid Quantity!");
	}
	
}*/
function planningBoardPlannedBarMouseOverEvent(event,styleId,styleName,lineLoadingId,deliveryDate,orderQty, orderAllowQty, orderComQty, geoId, colorId){
	$('.mouseoverBar').html('');
	var tempDiv = document.createElement("div");
	tempDiv.setAttribute("style","z-index: 120;filter: alpha(opacity=90);border: 1px solid;border-radius: 4px;position:fixed;margin-right:5px;font-size:15px;background-color:lightyellow;");
	tempDiv.setAttribute("class","mouseoverBar "+" tempDiv__"+styleId);
	tempDiv.innerHTML = "<span> Shipment Date: "+deliveryDate+
	"<br/>Country:"+geoId+
	"<br/>Color:"+colorId+
	"<br/>Order Qty:"+orderAllowQty+
	//"<br/>Allow Qty:"+orderAllowQty+
	"<br/>Completed Qty:"+orderComQty+
	"</span>";
	
	 document.body.appendChild(tempDiv);
	  var docWidth = $(document).width();
	  var eventXWidth = event.clientX;
	  var left = eventXWidth;
	 
	  $(tempDiv).css({
	    top: event.clientY,
	    left: left,
	    position:"fixed"
	  }).show();
	  $(tempDiv).draggable();
}
function planningBoardUnPlannedBarMouseOverEvent(event,styleName,buyerName,orderDetailsList,orderQty,deliveryDate,geoId,colorName){
	$('.mouseoverBar').html('');
	var tempDiv = document.createElement("div");
	tempDiv.setAttribute("style","z-index: 120;filter: alpha(opacity=90);border: 1px solid;border-radius: 4px;position:fixed;margin-right:5px;font-size:15px;background-color:lightyellow;");
	tempDiv.setAttribute("class","mouseoverBar "+" tempDiv__"+styleId);
	var orderDetailsString = "<table>";
	for (var int = 0; int < orderDetailsList.length; int++) {
		orderDetailsString = orderDetailsString + "<tr><td>" +orderDetailsList[int] + "</td></tr>";
	}
	orderDetailsString = orderDetailsString + "</table>";
	tempDiv.innerHTML = "<span> <b>Style:</b> "+styleName+
	"<br/><span> <b>Buyer:</b> "+buyerName+
	"<br/><b><u>Associated Orders</u></b>"+orderDetailsString+
	"<br/><b>Order Qty:</b>"+orderQty+
	"<br/><b>Color:</b>"+colorName+
	"<br/><b>Country:</b>"+geoId+
	"<br/><b>Delivery Date:</b>"+deliveryDate+
	"</span>";
	
	 document.body.appendChild(tempDiv);
	  var docWidth = $(document).width();
	  var eventXWidth = event.clientX;
	  var left = eventXWidth;
	 
	  $(tempDiv).css({
	    top: event.clientY,
	    left: left,
	    position:"fixed"
	  }).show();
	  $(tempDiv).draggable();
}
function setTargetDate(element){
	if ($(element).val()=='left') {
		$('#lineWisePBoardSyncForm_targetDate_i18n').val($('#lineWisePBoardSyncForm_fromDate_i18n').val());
		$('#lineWisePBoardSyncForm_targetDate').val($('#lineWisePBoardSyncForm_fromDate').val());		
	}else{
		$('#lineWisePBoardSyncForm_targetDate_i18n').val($('#lineWisePBoardSyncForm_thruDate_i18n').val());
		$('#lineWisePBoardSyncForm_targetDate').val($('#lineWisePBoardSyncForm_thruDate').val());
	}
}
function stylesLineHistory(styleId){
	var url= "StylesLineHistory?styleId="+styleId;
	var height = '400';
	var width = '500';
	var title = 'Styles Line History';
	//prottayUIDefaultPopup(title, url, height, width);
	planningBoardCommonPopup(title, '#popupScreenContainer', url, height, width); 
}
function resetEditor(){
	planningBoardCellIds = [];
	poppedPlanningBoardLineLoadingIds = [];
	$('#totalUndoRemain').html(planningBoardCellIds.length);
	$('#totalRedoRemain').html(poppedPlanningBoardLineLoadingIds.length);
}
function loadPreviousMonth(){
	var month = $('#month').val();
	 month = parseInt(month);
	 month = month - 1;
	 month = (month<0) ? 11 : month;
	loadMonthwisePlanningBoard(month);
}
function loadNextMonth(){
	var month = $('#month').val();
	 month = parseInt(month);
	 month = month +1;
	 month = (month>11) ? 0 : month;
	loadMonthwisePlanningBoard(month);
}
function increasePBoardColWidth(){
	columnWidth = columnWidth + offset;	
	loadPlanningBoard(null,true);
}
function decreasePBoardColWidth(){
	columnWidth = columnWidth - offset;	
	loadPlanningBoard(null,true);
}
	document.onkeydown = KeyPress;
	
	var visited = 0;
	var fieldIds = [ 0 ];
	var monthPeriodJson = [];
	var counter = $('#counter').val();
	for (var i = 0; i < counter; i++) {
		fieldIds[i] = i;
	}
	
	function copySplitQtyRow(element){
		var curRow = $(element).closest('tr');
		var newRow = curRow.clone(true);
		var rowcounter= 0;
		//var counter = $('#counter').val();
		rowcounter++;
		//fieldIds.push(counter);
		//$('#counter').val(counter);
		console.log(fieldIds);
		
		newRow.find("#firstSplitQty_"+rowcounter).removeAttr("onchange");

		newRow.find("#firstSplitQty_"+rowCounter).attr("id", "deleteRowButton_"+rowcounter);
		newRow.find("#firstSplitQty_"+rowcounter).prop('disabled', false);
		newRow.find("#firstSplitQty_"+rowcounter).attr("onclick", "deleteTableRow(this)");
		
		/*newRow.find("#addRowButton_"+rowCounter).attr("id", "addRowButton_"+counter);
		newRow.find("#addRowButton_"+counter).attr("onclick", "copyRowForBankDeposit("+counter+",this)");

		newRow.find("#monthPeriod_"+rowCounter).attr("id", "monthPeriod_"+counter);
		
		//newRow.find("#monthPeriod_"+counter).autocomplete("destroy");
		newRow.find("#monthPeriod_"+counter).removeAttr("onchange");
		newRow.find("#monthPeriod_"+counter).attr("onchange", "getMonthlyPfInformation("+counter+")");*/
		
		
		//$( "#depositeType_"+counter ).datepicker();
		//$( "#depositAmountHidden_"+counter ).datepicker();
		$( '.datePicker' ).datepicker();
		curRow.after(newRow);

		alert(curRow);
		//saveMultipleMonthlyPfDepositeInfo();
		//$('#dataChangeDiv').html("<span style='color:orange'>Change Occured! Please Save Changes.</span>");
	    return false;
	}
	function deleteTableRow(element) {
		   var curRow = $(element).closest('tr');
		   curRow.remove();

			var id = parseInt(this.id);
			id = $(element).attr("id"); 
			while (fieldIds.indexOf(id) !== -1) {
				delete fieldIds[fieldIds.indexOf(id)];
			}
			
			fieldIds = reindexArray(fieldIds);
			console.log(fieldIds);
			$('#dataChangeDiv').html("<span style='color:orange'>Change Occured! Please Save Changes.</span>");
		}
	function copyRowForBankDeposit(rowCounter, element){
		var curRow = $(element).closest('tr');
		var newRow = curRow.clone(true);
		var counter = $('#counter').val();
		counter++;
		fieldIds.push(counter);
		$('#counter').val(counter);
		console.log(fieldIds);

		newRow.find("#deleteRowButton_"+rowCounter).attr("id", "deleteRowButton_"+counter);
		newRow.find("#deleteRowButton_"+counter).prop('disabled', false);
		newRow.find("#deleteRowButton_"+counter).attr("onclick", "deleteTableRow(this)");
		
		newRow.find("#addRowButton_"+rowCounter).attr("id", "addRowButton_"+counter);
		newRow.find("#addRowButton_"+counter).attr("onclick", "copyRowForBankDeposit("+counter+",this)");

		newRow.find("#monthPeriod_"+rowCounter).attr("id", "monthPeriod_"+counter);
		
		//newRow.find("#monthPeriod_"+counter).autocomplete("destroy");
		newRow.find("#monthPeriod_"+counter).removeAttr("onchange");
		newRow.find("#monthPeriod_"+counter).attr("onchange", "getMonthlyPfInformation("+counter+")");
		
		
		//$( "#depositeType_"+counter ).datepicker();
		//$( "#depositAmountHidden_"+counter ).datepicker();
		$( '.datePicker' ).datepicker();
		curRow.after(newRow);
		//saveMultipleMonthlyPfDepositeInfo();
		$('#dataChangeDiv').html("<span style='color:orange'>Change Occured! Please Save Changes.</span>");
	    return false;
	}
	function loadTopHoldingRowScreen(){
		var unplannedCompanyId = $('#unplannedCompanyId').val();
		var unplannedBuyerId = $('#unplannedBuyerId').val();
		var month = $('#month').val();
		var year = $('#year').val();
		var unplannedSortBy = $('#unplannedSortBy').val();
		var prodFloorId = $('#prodFloorId').val();
		
		prottaySimpleScreenRenderer("TopHoldingRowScreen?unplannedCompanyId="+unplannedCompanyId+"&unplannedBuyerId="+unplannedBuyerId+"&month="+month+"&year="+year+"&unplannedSortBy="+unplannedSortBy+"&prodFloorId="+prodFloorId, "#holdingRowTopContainer");
	}
	function removeAllUnplannedOrders(){
		if (confirm("Are You Sure?")==false) {
			return false;
		}else{
			$("#waitingDiv").show();
			var companyId = $('#companyId').val();
			//alert(companyId);
			
			$.ajax({
				url : "removeAllUnplannedOrders",
				type : "POST",
				async : false,
				data : {
					"companyId" : companyId
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				}
			});
		}
	}
	function resetPlanningBoard(){
		if (confirm("Are You Sure?")==false) {
			return false;
		}else{
			$("#waitingDiv").show();
			var companyId = $('#companyId').val();
			//alert(companyId);
			
			$.ajax({
				url : "resetPlanningBoard",
				type : "POST",
				async : false,
				data : {
					"companyId" : companyId
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				}
			});
		}
	}
	
	function deleteAllPlannedLineLoadingInfo(){
		if (confirm("Are You Sure?")==false) {
			return false;
		}else{
			$("#waitingDiv").show();
			var companyId = $('#companyId').val();
			//alert(companyId);
			
			$.ajax({
				url : "deleteAllPlannedLineLoadingInfo",
				type : "POST",
				async : false,
				data : {
					"companyId" : companyId
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				}
			});
		}
	}
	function splitPlanningBarsWithProductionInfo(){
		if (confirm("Are You Sure?")==false) {
			return false;
		}else{
			$("#waitingDiv").show();
			var companyId = $('#companyId').val();
			//alert(companyId);
			
			$.ajax({
				url : "splitPlanningBarsWithProductionInfo",
				type : "POST",
				async : false,
				data : {
					"companyId" : companyId
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				},
				success : function(result) {
					$("#waitingDiv").hide();
					loadPlanningBoard(null,true);
				}
			});
		}
	}
	function showFilteredOrderQtyList(){
		var splitType = $('#splitType').val();
		var lineLoadingId = $('#lineLoadingId').val();
		
		if (splitType=='' || splitType==undefined) {
			$('#planningBarSplitDetailsListContainer').html('');
			return false;
		}
		if (splitType=='' || splitType==undefined) {
			$('#planningBarSplitDetailsListContainer').html('');
			return false;
		}
		$('#splitBars').html('');
		$('#waitingDiv').show();
		
		$.ajax({
			url : "PlanningBarSplitDetailsList",
			type : "POST",
			async : false,
			data : {
				"splitType" : splitType,
				"lineLoadingId" : lineLoadingId
			},
			success : function(data) {
				$('#planningBarSplitDetailsListContainer').html(data);
				$("#waitingDiv").hide();
			},
			error : function(data) {
				$("#waitingDiv").hide();
			}
		});
	}
	
	$("body").css("overflow", "hidden");
	