
function setFromDateThruDate(){
	var firstDay = 1;
	var month = $('#month').val(); 
	var year = $('#year').val();
	
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var milliseconds = 0;
	var firstDateOfMonth = new Date(year, month-1, firstDay, hours, minutes, seconds, milliseconds);
	
	var formattedFirstDateOfMonth = $.datepicker.formatDate( "dd/mm/yy",new Date(firstDateOfMonth));
	$("#fromDate_i18n").val(formattedFirstDateOfMonth);
	var formattedFirstDateOfMonth2 = $.datepicker.formatDate( "yy-mm-dd",new Date(firstDateOfMonth));
	$('#fromDate').val(formattedFirstDateOfMonth2);
	
	var totalDays = new Date(year,month,1,-1).getDate();//alert(totalDays);
	var lastDay = totalDays;
	
	var lastDateOfMonth = new Date(year, month-1, lastDay, hours, minutes, seconds, milliseconds);
	
	var formattedLastDateOfMonth = $.datepicker.formatDate( "dd/mm/yy",new Date(lastDateOfMonth));
	$("#thruDate_i18n").val(formattedLastDateOfMonth);
	var formattedLastDateOfMonth2 = $.datepicker.formatDate( "yy-mm-dd",new Date(lastDateOfMonth));
	$('#thruDate').val(formattedLastDateOfMonth2);
	
	var workingDay = lastDay-firstDay+1;
	workingDay = totalDays - fridays(year,month-1);
	$("#workingDay").val(workingDay);//alert(fridays(year,month-1));
	//80×10×26×15×50% (0.5) ==> man×hour×workingDay×totalLine×Efficiency * 60mins
	
}

function dashboardOrderDetailsPopup(orderType,companyId,year){
	//alert(orderType);
	if (orderType=="totalOrder") {
		orderType="";
		var url= "OrderDetailsInfo?orderType="+orderType+"&companyId="+companyId+"&year="+year;
		orderDetailsCommonPopup('Order Details Information','#planInfoPopup',url,'500','1100');
		
	}else if(orderType=="PRODUCTION_FUT_PLAN"){
		var url= "OrderDetailsInfo?orderType="+orderType+"&companyId="+companyId+"&year="+year;
		orderDetailsCommonPopup('Order Details Information','#planInfoPopup',url,'500','1100');
	}else if(orderType=="PRODUCTION_READY"){
		var url= "OrderDetailsInfo?orderType="+orderType+"&companyId="+companyId+"&year="+year;
		orderDetailsCommonPopup('Order Details Information','#planInfoPopup',url,'500','1100');
	}else if(orderType=="PRODUCTION_RUNNING"){
		var url= "OrderDetailsInfo?orderType="+orderType+"&companyId="+companyId+"&year="+year;
		orderDetailsCommonPopup('Order Details Information','#planInfoPopup',url,'500','1100');
	}else if(orderType=="PRODUCTION_COMPLETED"){
		var url= "OrderDetailsInfo?orderType="+orderType+"&companyId="+companyId+"&year="+year;
		orderDetailsCommonPopup('Order Details Information','#planInfoPopup',url,'500','1100');
	}else if(orderType=="PRODUCTION_FAIL"){
		var url= "OrderDetailsInfo?orderType="+orderType+"&companyId="+companyId+"&year="+year;
		orderDetailsCommonPopup('Order Details Information','#planInfoPopup',url,'500','1100');
	}
	
}

function orderDetailsPopup(orderId,lineLoadingId,orderPlanId){
	//alert(orderId);
	
		orderType="";
		var url= "OrderDetails?orderId="+orderId+"&lineLoadingId="+lineLoadingId+"&orderPlanId="+orderPlanId;
		//alert(url);
		//orderDetailsCommonPopup('Order Information Details','#orderInfoPopup',url,'400','800');
		fancyboxPopup('#orderInfoPopup',url,'400','600');
		
}
function fancyboxPopup(contenId,url,height,width){
	
	$.fancybox({
        width: 600,
        height: 400,
        autoSize: true,
        href: url,
        type: 'ajax',
        onComplete: function() { 
            $.ajax({
                url: url,
                type: 'POST',
                success: function(data) {
                	//$(containerId).html(data);
                }
            });
        }
        	
        	
    });	

}

function orderDetailsCommonPopup(title,containerId,url,height,width){
	//alert(containerId);
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
					$(containerId).html(data);
				}
			});
		}

	});
}


function fridays(year, month) {

    var day, counter, date;

    day = 1;
    counter = 0;
    date = new Date(year, month, day);//alert(date);
    while (date.getMonth() === month) {
        if (date.getDay() === 6) { // Sun=0, Mon=1, Tue=2, Mon=3, Wed=4, Thu=5, Fri=6, Sat=7, etc.
            counter += 1;
        }
        day += 1;
        date = new Date(year, month, day);
    }
    return counter;
}

function updatePrdLineLoadingInfoPopup(orderId){/*alert(capacityPlanId);*/
	var url= "EditPrdLineLoadingInfo?orderId="+orderId;
	prottayCapacityPlanningPopup('Update Production Line Loading Info','#planInfoPopup',url,'500','600');
}
function updateOrderPlanInfoPopup(orderPlanId){/*alert(capacityPlanId);*/
	var url= "EditOrderPlanInfo?orderPlanId="+orderPlanId;
	prottayCapacityPlanningPopup('Update Order Planning Info','#planInfoPopup',url,'600','600');
} 

/*function updateCapacityPlanInfoPopup(capacityPlanId){alert(capacityPlanId);
	var url= "EditCapacityPlanInfo?capacityPlanId="+capacityPlanId;
	prottayCapacityPlanningPopup('Update Capacity Planning Info','#planInfoPopup',url,'480','800');
} 



function prottayCapacityPlanningPopup(title,containerId,url,height,width){
	
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
					$(containerId).html(data);
				}
			});
		}

	});
}*/
function getHoliDayInfo(){
	var companyId = $("#companyId").val();
	var year = $("#year").val();
	var month =$("#month").val();
	//alert(companyId+" : "+year+" : "+month);
	jQuery.ajax({
        url: "findHolyDayInfo?companyId="+companyId+"&year="+year+"&month="+month,
        type: "POST",
        async: false,
        success: function(data) {
        	var day = data.day;
        	var holiDay = data.holiDay;
        	var workingDay;
        	workingDay = data.workingDay;//alert(totalLine);    
        	$("#day").val(day);
        	$("#holiDay").val(holiDay);
        	$("#workingDay").val(workingDay);
        	//alert(day+" : "+workingDay+" : "+holiDay);
        	tempAlertInfo(day+" : "+workingDay+" : "+holiDay,3000);
        }
    });
	//calculateProdMinutes();
}

function getProdLineInfo(){
	var companyId = $("#companyId").val();
	//alert("companyId="+companyId);
	jQuery.ajax({
        url: "getProdLineInfo?organizationPartyId="+companyId,
        type: "POST",
        async: false,
        success: function(data) {
        	var totalLine;
        	totalLine = data.totalLine;//alert(totalLine);    
        	$("#totalLine").val(totalLine);
        }
    });
	//calculateProdMinutes();
}
function getOrderDetails(){
	var orderId = $("#orderId").val();
	//alert("orderId="+orderId);
	$('#orderQty').val(orderId);
	jQuery.ajax({
        url: "getOrderDetails?organizationPartyId="+companyId,
        type: "POST",
        async: false,
        success: function(data) {
        	var totalLine;
        	totalLine = data.totalLine;//alert(totalLine);    
        	$("#totalLine").val(totalLine);
        }
    });
	//calculateProdMinutes();
}

/*function calculateProdMinutes(){
	var man = $("#man").val();
	var hour = $("#hour").val();
	var workingDay = $("#workingDay").val();
	var totalLine = $("#totalLine").val();
	var efficiency = $("#efficiency").val();
	var prodMinute = man*hour*workingDay*totalLine*(efficiency/100)*60;
	//alert(man +"-"+ hour +"-"+ workingDay +"-"+ totalLine +"-"+ efficiency);
	$('#prodMinute').val(Math.round(prodMinute));alert(prodMinute);
}*/
$(document).ready(function(){
	$("#orderName").attr("placeholder", "Type Order here");	
	$('#orderQty').attr('readonly','true');
	$('#smv').attr('readonly','true');
	$('#productionMinute').attr('readonly','true');
	
});

function getOrderJsonData(){
	var companyId = $("#companyId").val();
	//alert(companyId);
	$.ajax({
		url: "getOrderJsonData",
		type: "POST",
		data: {"orgPartyId":companyId},
		
		success:function(data){
			var datajson = data.orderList;
			$("#orderName").autocomplete({
				source: datajson,
				change: function(event,ui){
					var orderName = $("#orderName").val();						
					if (event.ui!==null) {
						if(orderName == ui.item.label){
							return true;
						}else{
							$("#orderName").val('');
							$("#orderId").val('');							
						}
					}else{
						$("#orderName").val('');
						$("#orderId").val('');
					}
				},
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$("#orderId").val(ui.item.value);
					//alert('orderId: '+$("#orderId").val());
					$(this).val(ui.item.label);
					//getBuyerInfo();
					
				}
			});
		}
	});
}

function getBuyerInfo(){
	 var transactionId = $("#orderId").val();
	    jQuery.ajax({
	        url: "getBuyerInfo",
	        type: "POST",
	        data: "transactionId="+transactionId,
	        success: function(data) {
	        	for (var i = 0; i < data.buyerList.length; i++) {
				   	$("#buyerName").val(data.buyerList[i].groupName);
				   	$("#buyerId").val(data.buyerList[i].partyId);
		        }

			},
	        error: function(responseJson) {
	        	waitSpinnerHide()
	        }
	    });
	
}

/*function changeController(form, value, firstController,secondController) {
	//alert(" hi ");
	if(value == "pdf" || value == "Pdf" || value == "PDF"){
		form.action = firstController;
		alert("form : "+form+" reportType : "+value+"  firstController :  " +firstController);
	}else{
		form.action = secondController;
		alert("form : "+form+" reportType : "+value+"  secondController :  " +secondController);
	}
    return true;
}*/
