

$(document).ready(function() {
	$("#addProcRequirementRole").click(function() {
		$("#ajaxRequirementRoleAdd").dialog({
			autoOpen : true,
			title : "Add Requirement Role",
			height : 250,
			width : 400,
			modal : true,
			open : function() {
				$.ajax({
					url : "AjaxRequirementRole?requirementId="+document.getElementById('DisplayRequirement_requirementId').value, //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#ajaxRequirementRoleAdd").html(data);
					}
				});
			}

		});
	});
});

/*
$(document).ready(function() {
	$("#addProcRequirementRole").click(function() {
		
		var myElem = document.getElementById('DisplayRequirement_requirementId').value;
		var url = "AjaxRequirementRole?requirementId="+myElem;//This URL view request map
		
		prottayPopup('Add Requirment Role','#ajaxRequirementRoleAdd',url,'500','500');
	});
});
*/


$(document).ready(function() {
	$("#addProcRequirement").click(function() {
		$("#addProcRequirementUpdate").dialog({
			autoOpen : true,
			title : "&nbsp;",
			height : 410,
			width : 450,
			modal : true,
			open : function() {
				$.ajax({
					url : "AjaxRequirementRole?requirementId="+document.getElementById('EditRequirementRole_requirementId').value, //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#addProcRequirementUpdate").html(data);
					}
				});
			}

		});
	});
});


function getRequestData() {
	var data = {
		"test" : "data"
	};
	return data;
};





function updateProductPricePopup(productId, partyId){

var url= "UpdateProductSuppliers?productId="+productId+"&partyId="+partyId;
//alert(url);
//"&currencyUomId="+currencyUomId+"&minimumOrderQuantity="+minimumOrderQuantity+"&availableFromDate="+availableFromDate;
	
prottayPopup('Update product price','#suProduct',url,'210','450');

}



function showUpdateOrderItemHistory(orderId, productId){

var url= "UpdateHistoryForOrderItem?orderId="+orderId+"&productId="+productId;
//alert(url);
//"&currencyUomId="+currencyUomId+"&minimumOrderQuantity="+minimumOrderQuantity+"&availableFromDate="+availableFromDate;
	
prottayPopup('Order Item Updated History for'+' '+productId,'#orderItemHistory',url,'210','450');

}

function updatePreCostingProductQuantity(productId, orderId, productIdTo, quantity ,currencyUomId){	

var url= "UpdatePreCostQuantity?productId="+productId+"&orderId="+orderId+"&productIdTo="+productIdTo+"&quantity="+quantity+"&currencyUomId="+currencyUomId;

prottayPopup('Update Quantity','#updateQuantity',url,'210','450');

}


function updatePreCostingProductPrice(productId,orderId, productIdTo, lastprice, currencyUomId){
	
var url= "UpdatePreCostPrice?productId="+productId+"&orderId="+orderId+"&productIdTo="+productIdTo+"&lastprice="+lastprice+"&currencyUomId="+currencyUomId;

prottayPopup('Update Price','#updateQuantityPrice',url,'210','450');

}
/*

function prottayPopup(title,containerId,containerId1,url,height,width){
	
	
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


function getMprJsonData(){
	var organizationPartyId = $("#organizationPartyId").val();
	$.ajax({
		url: "getMprJsonData",
		type: "POST",
		data: {organizationPartyId},
		success: function(data) {
			var datajson = data.ordersListJson;
			$("#orderName").autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#orderId").val(ui.item.value);
					$("#orderName").blur(function() {
						var orderName = $("#orderName").val();
						if (orderName == ui.item.label) {
							$("#orderId").val(ui.item.value);

							return true;
						} else {
							$("#orderId").val(null);
						}
					});

				}
			});
		},
		error: function(data) {
			alert("Error occured while processing" + data);
		}
	});
}

function getAllRequisitionIdList() {

	var organizationPartyId = $("#organizationPartyId").val();
	$.ajax({
		url: "getAllRequisitionIdList",
		type: "POST",
		data: {organizationPartyId},
		success: function(data) {
			var datajson = data.requisitionListJson;
			$("#requisitionIdShow").autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.requisitionId);
					$("#requisitionIdShow").val(ui.item.label);
					
					$("#requisitionIdShow").blur(function() {
						
						var requisitionIdShow = $("#requisitionIdShow").val();
						if (requisitionIdShow == ui.item.label) {
							$("#requisitionId").val(ui.item.requisitionId);

							return true;
						} else {
							$("#requisitionId").val(null);
						}
					});
				}
			});
		},
		error: function(data) {
			alert("Error occured while processing" + data);
		}
	});
}

function getAllCompleteRequisitionIdList() {

	var organizationPartyId = $("#organizationPartyId").val();
	$.ajax({
		url: "getAllCompleteRequisitionIdList",
		type: "POST",
		data: {organizationPartyId},
		success: function(data) {
			var datajson = data.requisitionListJson;
			$("#requisitionIdShow").autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.requisitionId);
					$("#requisitionIdShow").val(ui.item.label);
					
					$("#requisitionIdShow").blur(function() {
						
						var requisitionIdShow = $("#requisitionIdShow").val();
						if (requisitionIdShow == ui.item.label) {
							$("#requisitionId").val(ui.item.requisitionId);

							return true;
						} else {
							$("#requisitionId").val(null);
						}
					});
				}
			});
		},
		error: function(data) {
			alert("Error occured while processing" + data);
		}
	});
}

function getCategoryListJSONSingleForm() {

	var organizationPartyId = $("#organizationPartyId").val();
	//alert("in general inventory js");
	$.ajax({
		url: "getCategoryJsonData",
		type: "POST",
		data:{
			"organizationPartyId" : organizationPartyId
		},
		success: function(data) {
			var datajson = data.categoryList;
			$("#categoryName").autocomplete({
				source: datajson,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#categoryId").val(ui.item.value);
				}
			});
		},
		error: function(data) {
			alert("Error occured while processing" + data);
		}
	});
}

function tempAlertSuccessMessage(msg, duration,style) {
	if ($('#alertMessagediv')) {
		$('#alertMessagediv').html ('');
	}
	var el = document.createElement("alertMessagediv");
	el.setAttribute("style",style);
	el.innerHTML = msg;
	setTimeout(function() {
		el.parentNode.removeChild(el);
	}, duration);
	document.body.appendChild(el);

}