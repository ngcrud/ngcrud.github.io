


function changeReportController(form, value, firstController,secondController) {
	//alert(" hi ");
	if(value == "pdf" || value == "Pdf" || value == "PDF"){
		form.action = firstController;
		//alert("form : "+form+" reportType : "+value+"  firstController :  " +firstController);
	}else{
		form.action = secondController;
		//alert("form : "+form+" reportType : "+value+"  secondController :  " +secondController);
	}
    return true;
}


function submitPrdPlanningReport() {
	var companyId = $( "#companyId option:selected").val();	
	var year = $("#year").val();
	var month = $("#month").val();
	
	var orderId = $( "#orderId option:selected").val();
	var styleId = $( "#styleId option:selected").val();
	var buyerId = $( "#buyerId option:selected").val();
	var lineId = $( "#lineId option:selected").val();
	var reportType = $( "#reportType option:selected").val();
	var url = "/planning/control/PlanningReport.pdf?companyId="+companyId+"&year="+year+"&month="+month+"&orderId="+orderId+"&styleId="+styleId+"&buyerId="+buyerId+"&lineId="+lineId+"&reportType="+reportType
	window.open(url, "_blank");
	
	
}
