/***********************************************
APACHE OPEN FOR BUSINESS
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
***********************************************/

/*********************
JQuery Columns
*********************/
var j = 1;
var progressId;
var emailToApprSent = false; 
 
(function(jQuery) {
	jQuery.fn.columns = function(options) {
	
	var defaults = {			
		colNumber: 2,
		direction: 'vertical'
	};
			
	this.each(function() {
		
		var obj = jQuery(this);
		var settings = jQuery.extend(defaults, options);
		var totalListElements = jQuery(this).children('li').size();
		var baseColItems = Math.ceil(totalListElements / settings.colNumber);
		var listClass = jQuery(this).attr('class');
		
		for (i=1;i<=settings.colNumber;i++) {	
			if(i==1){
				jQuery(this).addClass('listCol1').wrap('<div class="listContainer'+j+'"></div>');
			} 
			else if(jQuery(this).is('ul')) {
				jQuery(this).parents('.listContainer'+j).append('<ul class="listCol'+i+'"></ul>');
			} 
			else {
				jQuery(this).parents('.listContainer'+j).append('<ol class="listCol'+i+'"></ol>');
			}
				jQuery('.listContainer'+j+' > ul,.listContainer'+j+' > ol').addClass(listClass);
		}
		
		var listItem = 0;
		var k = 1;
		var l = 0;	
		
		if(settings.direction == 'vertical') {			
			jQuery(this).children('li').each(function() {
				listItem = listItem+1;
				if (listItem > baseColItems*(settings.colNumber-1) ) {
					jQuery(this).parents('.listContainer'+j).find('.listCol'+settings.colNumber).append(this);
				} 
				else {
					if(listItem<=(baseColItems*k)) {
						jQuery(this).parents('.listContainer'+j).find('.listCol'+k).append(this);
					} 
					else {
						jQuery(this).parents('.listContainer'+j).find('.listCol'+(k+1)).append(this);
						k = k+1;
					}
				}
			});
			
			jQuery('.listContainer'+j).find('ol,ul').each(function(){
				if(jQuery(this).children().size() == 0) {
				jQuery(this).remove();
				}
			});	
			
		}
		
		else {
			jQuery(this).children('li').each(function(){
				l = l+1;
				if(l <= settings.colNumber) {
					jQuery(this).parents('.listContainer'+j).find('.listCol'+l).append(this);
				} 
				else {
					l = 1;
					jQuery(this).parents('.listContainer'+j).find('.listCol'+l).append(this);
				}				
			});
		}
		
		jQuery('.listContainer'+j).find('ol:last,ul:last').addClass('last');
		j = j+1;
		
	});
    };
    //sending email to approvers for pending leave request
    if(!emailToApprSent){
    	setTimeout(sendEmailToApprovers, 500);
    	emailToApprSent = true;
    }
})(jQuery);

/*********************
JQuery Formalize
*********************/
jQuery(document).ready(function() {
	FORMALIZE.go();
});

var FORMALIZE = (function($, window, document, undefined) {
	var PLACEHOLDER_SUPPORTED = 'placeholder' in document.createElement('input');
	var AUTOFOCUS_SUPPORTED = 'autofocus' in document.createElement('input');
	var WEBKIT = 'webkitAppearance' in document.createElement('select').style;
	var IE6 = !!($.browser.msie && parseInt($.browser.version, 10) === 6);
	var IE7 = !!($.browser.msie && parseInt($.browser.version, 10) === 7);
	return {
		go: function() {
			for (var i in FORMALIZE.init) {
				FORMALIZE.init[i]();
			}
		},
		init: {
			detect_webkit: function() {			
				if (!WEBKIT) {
					return;
				}
				$('html').addClass('is_webkit');
			},
			full_input_size: function() {
				if (!IE7 || !$('textarea, input.input_full').length) {
					return;
				}
				$('textarea, input.input_full').wrap('<span class="input_full_wrap"></span>');
			},
			ie6_skin_inputs: function() {
				if (!IE6 || !$('input, select, textarea').length) {
					return;
				}
				var button_regex = /button|submit|reset/;
				var type_regex = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;
				$('input').each(function() {
					var el = $(this);
					if (this.getAttribute('type').match(button_regex)) {
						el.addClass('ie6_button');
						if (this.disabled) {
							el.addClass('ie6_button_disabled');
						}
					}
					else if (this.getAttribute('type').match(type_regex)) {
						el.addClass('ie6_input');
						if (this.disabled) {
							el.addClass('ie6_input_disabled');
						}
					}
				});
				$('textarea, select').each(function() {
					if (this.disabled) {
						$(this).addClass('ie6_input_disabled');
					}
				});
			},
			placeholder: function() {
				if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
					return;
				}
				$(':input[placeholder]').each(function() {
					var el = $(this);
					var text = el.attr('placeholder');
					function add_placeholder() {
						if (!el.val() || el.val() === text) {
							el.val(text).addClass('placeholder_text');
						}
					}
					add_placeholder();
					el.focus(function() {
						if (el.val() === text) {
							el.val('').removeClass('placeholder_text');;
						}
					}).blur(function() {
						add_placeholder();
					});
					el.closest('form').submit(function() {
						if (el.val() === text) {
							el.val('');
						}
					}).bind('reset', function() {
						setTimeout(add_placeholder, 50);
					});
				});
			},
			autofocus: function() {
				if (AUTOFOCUS_SUPPORTED || !$(':input[autofocus]').length) {
					return;
				}
				$(':input[autofocus]:visible:first').select();
			}
		}
	};
})(jQuery, this, this.document);



function selectInvoiceType(form, value) {
	if (value != "Order") {
		document.getElementById("AddLcInvoice_orderId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcInvoice_styleId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_ctnQuantity_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcInvoice_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcInvoice_pcsQuantity_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcInvoice_pcsQuantityId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcInvoice_amount_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcInvoice_currencyUom_title").parentNode.parentNode.style.display = "none";

		
    } else {
		document.getElementById("AddLcInvoice_orderId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_ctnQuantity_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_pcsQuantity_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_pcsQuantityId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_amount_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_currencyUom_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcInvoice_styleId_title").parentNode.parentNode.style.display = "none";

    }

}

$(document).ready(function() {
	
	 var  obj= document.getElementById("AddLcInvoice_invoiceFor");
	 if(obj!=null){
		if (obj.value != "Order") {
			document.getElementById("AddLcInvoice_orderId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcInvoice_styleId_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_ctnQuantity_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcInvoice_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcInvoice_pcsQuantity_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcInvoice_pcsQuantityId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcInvoice_amount_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcInvoice_currencyUom_title").parentNode.parentNode.style.display = "none";

			
	    } else {
			document.getElementById("AddLcInvoice_orderId_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_ctnQuantity_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_pcsQuantity_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_pcsQuantityId_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_amount_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_currencyUom_title").parentNode.parentNode.style.display = "";
			document.getElementById("AddLcInvoice_styleId_title").parentNode.parentNode.style.display = "none";

	    }}
	 

});


function selectRelatedTo(form, value) {
	if (value != "MAS_LC_INVOICE") {
		document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "none";
		
    } else {
		document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "";
    }

}

function selectOrderParent(form, value) {
	
	if (value == "Style") {
		
		document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_ctnQuantity_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_pcsQuantity_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_amount_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_currencyUom_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_discount_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_invoiceId_title").parentNode.parentNode.style.display = "none";

		
    } else if (value == "MasterLc") {
    	
		document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_ctnQuantity_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_pcsQuantity_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_amount_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_currencyUom_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_discount_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_invoiceId_title").parentNode.parentNode.style.display = "none";

		


    } else {
    	
    	document.getElementById("AddLcOrder_invoiceId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "none";
		document.getElementById("AddLcOrder_ctnQuantity_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_pcsQuantity_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_amount_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_currencyUom_title").parentNode.parentNode.style.display = "";
		document.getElementById("AddLcOrder_discount_title").parentNode.parentNode.style.display = "";


    }
}



$(document).ready(function() {
	
	 var  parentObj= document.getElementById("AddLcOrder_parent_title");
	
	 if(parentObj!=null){

/*		if (parentObj.value != "MasterLc") {
			document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "";			
	    } else {
	    	document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "";
	    }*/
		 
			if (parentObj.value == "Style") {
				document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_ctnQuantity_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_pcsQuantity_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_amount_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_currencyUom_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_discount_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_invoiceId_title").parentNode.parentNode.style.display = "none";

				
		    } else if (parentObj.value == "MasterLc") {
				document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_ctnQuantity_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_pcsQuantity_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_amount_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_currencyUom_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_discount_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_invoiceId_title").parentNode.parentNode.style.display = "none";

				


		    } else {
		    	document.getElementById("AddLcOrder_invoiceId_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_mastarLcId_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_styleId_title").parentNode.parentNode.style.display = "none";
				document.getElementById("AddLcOrder_ctnQuantity_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_ctnQuantityUnitId_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_pcsQuantity_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_amount_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_currencyUom_title").parentNode.parentNode.style.display = "";
				document.getElementById("AddLcOrder_discount_title").parentNode.parentNode.style.display = "";


		    }
		
	 }
});
//tomal mahdi
function selectStyleParent(form,value){
	if(document.getElementById("AddLcStyle_parent")!=null){
		if (value!= "Order") {
			document.getElementById("AddLcStyle_orderId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcStyle_mastarLcId_title").parentNode.parentNode.style.display = "";
			
	    } else {
			document.getElementById("AddLcStyle_mastarLcId_title").parentNode.parentNode.style.display = "none";
			document.getElementById("AddLcStyle_orderId_title").parentNode.parentNode.style.display = "";
		}	
	}
}
jQuery(document).ready(function() {
	selectStyleParent();
});

//tomal mahdi
function getUdInfo(form,value){
	var udId = document.getElementById("AddUdInfo_udId");
	udId = $(udId).val();
	var e = document.getElementById("AddUdInfo_fileId");
	var fileIdList = $(e).val();
	var previousBtb = document.getElementById("AddUdInfo_previousBtbId").value;
	if(value!=null){
		$.ajax({
			url : "getUdData?fileId="+fileIdList+"&udId="+udId,
			type : "GET",
			data : getRequestData(),
			success : function(data){
				// set mastar lc data by file no. ....
				$("#AddUdInfo_mastarLcId").val(data.mastarLcNosList);
				var checkList;
				var test = "";
				$("#AddUdInfo_btbLcId").replaceWith($('<div>').attr({ id: 'AddUdInfo_btbLcId', name: 'btbLcId', value: 'AddUdInfo_btbLcId' }));
				// add table
				$("#AddUdInfo_btbLcId").append('<table>');
				//set column width...
				$("#AddUdInfo_btbLcId").append('<col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'>');
				//add table header row ...
				$("#AddUdInfo_btbLcId").append('<tr>');
				$("#AddUdInfo_btbLcId").append('<th>btb lc no</th><th>btb lc value</th><th>total btb lc value</th><th>quantity</th><th>total quantity</th><th>supplier name</th>');
				$("#AddUdInfo_btbLcId").append('</tr>');
				var totalBtbLcIds = "";
				for(var i=0;i<data.btbCheckList.length;i++){
					var btbLcNo = data.btbCheckList[i].btbLcNo;
					var btbLcId = data.btbCheckList[i].btbLcId;
					var supplierName = data.btbCheckList[i].supplierId;
					var lcValue = data.btbCheckList[i].lcValue;
					var totalLcValue = data.btbCheckList[i].amendment;
					var lcQuantity = data.btbCheckList[i].dateOfOrgDocReceived;
					var totalLcQuantity = data.btbCheckList[i].dateOfCopyDocReceived;
					
					totalBtbLcIds += btbLcId+",";
					btbLcIdG = btbLcId+"";
					var lcValSep = ",";
					$("#AddUdInfo_btbLcId").append('<tr>');
					// for 1st col...
					$("#AddUdInfo_btbLcId").append('<td><input type="checkbox" id="' + btbLcIdG +'" value="'+ btbLcId+lcValSep+lcValue+lcValSep+lcQuantity+ '" name="btbLcId" '+""+'> <label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					//$("#AddUdInfo_btbLcId").append('<label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					// for 2nd col...
					$("#AddUdInfo_btbLcId").append('<td>'+lcValue+'</td>');
					// for 3rd col...
					$("#AddUdInfo_btbLcId").append('<td>'+totalLcValue+'</td>');
					// for 4th col...
					$("#AddUdInfo_btbLcId").append('<td>'+lcQuantity+'</td>');
					// for 5th col...
					$("#AddUdInfo_btbLcId").append('<td>'+totalLcQuantity+'</td>');
					// for 6th col...
					$("#AddUdInfo_btbLcId").append('<td>'+supplierName+'</td>');
					$("#AddUdInfo_btbLcId").append('</tr>');
					
				}
				$("#AddUdInfo_btbLcId").append('</table>');
				
				var totalQuantityValue = data.totalQuantityValue;
				var tolerableQuantity = data.tolerableQuantity;
				$("#AddUdInfo_totGarQuantity").val(totalQuantityValue);
				$("#tolerableQuantity").val(tolerableQuantity);
				var totalLcValue = data.totalLcValue;
				$("#AddUdInfo_totalLcValue").val(totalLcValue);
				
				// for editing ud info generate previous btb lc information ...
				for(var i=0;i<data.udBtbInfo.length;i++){
						var udBtbId = data.udBtbInfo[i].btbLcId;
						udBtbId = udBtbId.trim();
						var inputField = document.getElementById(udBtbId);
						inputField.checked = true;
				}
				
				// for orders .... 
				//var orderNos = data.orderNos;
				//$("#AddUdInfo_orderNos").val(orderNos);
				$("#AddUdInfo_orderNos").replaceWith($('<div>').attr({ id: 'AddUdInfo_orderNos', name: 'orderNos', value: 'AddUdInfo_orderNos' }));
				// add table
				$("#AddUdInfo_orderNos").append('<table>');
				//set column width...
				$("#AddUdInfo_orderNos").append('<col width='+"130"+'><col width='+"130"+'>');
				//add table header row ...
				$("#AddUdInfo_orderNos").append('<tr>');
				$("#AddUdInfo_orderNos").append('<th>Order No</th><th>Consumption</th><th>Unit</th>');
				$("#AddUdInfo_orderNos").append('</tr>');
				
				
			    
				for(var i=0;i<data.orderForConsumption.length;i++){
					
					var lcOrderId = data.orderForConsumption[i].lcOrderId;
					var orderNo = data.orderForConsumption[i].orderNo;
					lcOrderId = lcOrderId.trim();
					orderNo = orderNo.trim();
					var lcOrderIdG = lcOrderId+"";
					var consumptionsG = lcOrderId+1000+"";
					var consumptionsUnit = lcOrderId+10000+"";
					var lcValSep = ",";
					$("#AddUdInfo_orderNos").append('<tr>');
					// for 1st col...
					$("#AddUdInfo_orderNos").append('<td><input type="checkbox" id="' + lcOrderIdG +'" value="'+ lcOrderId+lcValSep+orderNo+ '" name="orderNos" '+""+'> <label for=' + lcOrderIdG +'>'+ orderNo+ '</label></td>');
					//$("#AddUdInfo_btbLcId").append('<label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					// for 2nd col...
					$("#AddUdInfo_orderNos").append('<td><input type="text" id="' + consumptionsG +'" name="consumptions" '+""+'onkeyup="udOrderConsumptionValidation('+lcOrderIdG+","+consumptionsG+","+consumptionsUnit+')"'+'></td>');
					var cnt;
					$("#AddUdInfo_orderNos").append('<td>'+
							'<select name="consumptionsUnit" id="'+consumptionsUnit+'">'+
							'<option value=" "></option>'+
					'</select>'
							+'</td>');
					
					//for unit dropdown list -------
					var sel = document.getElementById(consumptionsUnit);
				    for (var ij = 0; ij < data.ConsumptionUnitInfo.length; ij++) {
				        var opt = document.createElement('option');
				        opt.innerHTML = data.ConsumptionUnitInfo[ij].consumptionUnit;
				        opt.value = data.ConsumptionUnitInfo[ij].consumptionUnitId;
				        sel.appendChild(opt);
			        }
					
					$("#AddUdInfo_orderNos").append('</tr>');
				}
				$("#AddUdInfo_orderNos").append('<table>');
				
				// for previous udOrderConsumptionInfo
				for(var i=0;i<data.udOrderConsumptionInfo.length;i++){
					var lcOrderId = data.udOrderConsumptionInfo[i].lcOrderId;
					var consumptionValue = data.udOrderConsumptionInfo[i].consumptionValue;
					var consumptionUnitId = data.udOrderConsumptionInfo[i].consumptionUnit;
					var lcOrderIdInputField = document.getElementById(lcOrderId+"");
					lcOrderIdInputField.checked = true;
					// for consumption value set...
					document.getElementById(lcOrderId+1000+"").value = consumptionValue;
					// for consumption unit set...
					if(consumptionUnitId!=''){
						document.getElementById(lcOrderId+10000+"").value = consumptionUnitId;
					}
					
				}
				
				
				
				//set values in fields ....
				var garmentsQuan = document.getElementById("AddUdInfo_garQuantity").value;
				var udValue = document.getElementById("AddUdInfo_udValue").value;
				/*alert(garmentsQuan+"   "+udValue);*/
				if(udId=='') return 0;
				if(udId=='undefined') return 0;
				if(udId==null) return 0;
				checkTotalGarmentsQuantity(form,garmentsQuan);
				checkTotalUdValues(form,udValue);
			}
		});
	}
}
function udOrderConsumptionValidation(lcOrderIdG,consumptionsG,consumptionsUnit){
	var inputField = document.getElementById(lcOrderIdG);
	if(inputField.checked == false){
		alert('you should select the order first');
		document.getElementById(consumptionsG).value = "";
		return;
	}
}
//tomal mahdi 
// this function is for set parameter value in the screen...
function getUdInfoForEdit(){
	var uDFileInfo = document.getElementById("AddUdInfo_udIdInfo");
	uDFileInfo = $(uDFileInfo).val();
	
	var  AddUdInfo_udId= document.getElementById("AddUdInfo_udId");
	AddUdInfo_udId = $(AddUdInfo_udId).val();
	 
	if(AddUdInfo_udId=='') return 0;
	if(AddUdInfo_udId=='undefined') return 0;
	if(AddUdInfo_udId==null) return 0;
	var result = "";
	$.ajax({
		
		/*url : "getUdDataForMastarLc?udId="+AddUdInfo_udId,*/
		url : "getUdDataForFileInfo?udId="+AddUdInfo_udId,
		type : "GET",
		async: false,
		data : getRequestData(),
		/*dataType : 'html',*/
		success : function(data){
			result = data;
			var FileArray = [];
			for(var i=0;i<data.uDFileInfo.length;i++){
				/*MastarArray.push(data.uDMastarLcInfo[i].mastarLcId);*/
				var udFileData = data.uDFileInfo[i].fileId;
				udFileData = udFileData.trim();
				FileArray.push(udFileData);
			}
			$("#AddUdInfo_previousBtbId").val(data.udBtbInfo);
			jQuery("#AddUdInfo_fileId").val(FileArray).click().change();
		}
	});
}
$(document).ready(function() {
	$("#AddUdInfo_btbLcId").replaceWith($('<div>').attr({ id: 'AddUdInfo_btbLcId', value: '',name: 'btbLcId' }));
	/*var cars = ["10087", "10089", "10088"];
	jQuery("#AddUdInfo_mastarLcId").val(cars).click().change();*/
	getUdInfoForEdit();
	
});
//tomal mahdi
function getUdAmendmentInfo(form,value){
	var udAmendmentId = "";
	try{
		udAmendmentId = document.getElementById("AddUdAmmendmentInfo_udAmendmentId").value;
	}catch(e){}
	var udId = document.getElementById("AddUdInfo_udId").value;
	$("#AddUdAmmendmentInfo_udId").val(udId);
	var e = document.getElementById("AddUdAmmendmentInfo_fileId");
	var fileIdList = $(e).val();
	var previousBtb = document.getElementById("AddUdInfo_previousBtbId").value;
	if(value!=null){
		$.ajax({
			url : "getUdAmendmentData?fileId="+fileIdList+"&udId="+udId+"&udAmendmentId="+udAmendmentId,
			type : "GET",
			data : getRequestData(),
			success : function(data){ 
				// set mastar lc data by file no. ....
				$("#AddUdAmmendmentInfo_mastarLcId").val(data.mastarLcNosList);
				var checkList;
				var test = "";
				$("#AddUdAmmendmentInfo_btbLcId").replaceWith($('<div>').attr({ id: 'AddUdAmmendmentInfo_btbLcId', name: 'btbLcId', value: 'AddUdAmmendmentInfo_btbLcId' }));
				// add table
				$("#AddUdAmmendmentInfo_btbLcId").append('<table>');
				//set column width...
				$("#AddUdAmmendmentInfo_btbLcId").append('<col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'>');
				//add table header row ...
				$("#AddUdAmmendmentInfo_btbLcId").append('<tr>');
				$("#AddUdAmmendmentInfo_btbLcId").append('<th>btb lc no</th><th>lc value</th><th>total lc value</th><th>quantity</th><th>total quantity</th><th>supplier name</th>');
				$("#AddUdAmmendmentInfo_btbLcId").append('</tr>');
				var totalBtbLcIds = "";
				for(var i=0;i<data.btbCheckList.length;i++){
					
					var btbLcNo = data.btbCheckList[i].btbLcNo;
					var btbLcId = data.btbCheckList[i].btbLcId;
					var supplierName = data.btbCheckList[i].supplierId;
					var lcValue = data.btbCheckList[i].lcValue;
					var totalLcValue = data.btbCheckList[i].amendment;
					var lcQuantity = data.btbCheckList[i].dateOfOrgDocReceived;
					var totalLcQuantity = data.btbCheckList[i].dateOfCopyDocReceived;
					
					totalBtbLcIds += btbLcId+",";
					btbLcIdG = btbLcId+"";
					var lcValSep = ",";
					$("#AddUdAmmendmentInfo_btbLcId").append('<tr>');
					// for 1st col...
					$("#AddUdAmmendmentInfo_btbLcId").append('<td><input type="checkbox" id="' + btbLcIdG +'" value="'+ btbLcId+lcValSep+lcValue+lcValSep+lcQuantity+ '" name="btbLcId" '+""+'> <label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					//$("#AddUdInfo_btbLcId").append('<label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					// for 2nd col...
					$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+lcValue+'</td>');
					// for 3rd col...
					$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+totalLcValue+'</td>');
					// for 4th col...
					$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+lcQuantity+'</td>');
					// for 5th col...
					$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+totalLcQuantity+'</td>');
					// for 6th col...
					$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+supplierName+'</td>');
					$("#AddUdAmmendmentInfo_btbLcId").append('</tr>');
					
				}
				// previous information ....
				try {
					var udAmendmentId = document.getElementById("AddUdAmmendmentInfo_udAmendmentId").value;
					var udAmendBtbLcInfoArray = [];
					for(var i=0;i<data.udAmendBtbLcInfo.length;i++){
						
						var btbLcId = data.udAmendBtbLcInfo[i].btbLcId;
						var supplierName = data.SupplierInfo[i];
						var lcValue = data.udAmendBtbLcInfo[i].lcValue;
						var quantityValue = data.udAmendBtbLcInfo[i].lcQuantity;
						var quantityTotalValue = data.quantityInfo[i];
						var btbLcNo = data.btbLcValue[i].btbLcNo;
						var totalLcValue = data.btbLcValue[i].lcValue;
						btbLcIdG = btbLcId+i+"";
						var lcValSep = ",";
						$("#AddUdAmmendmentInfo_btbLcId").append('<tr>');
						// for 1st col...
						$("#AddUdAmmendmentInfo_btbLcId").append('<td><input type="checkbox" id="' + btbLcIdG +'" value="'+ btbLcId+lcValSep+lcValue+lcValSep+quantityValue+ '" name="btbLcId" '+"checked"+'> <label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
						//$("#AddUdInfo_btbLcId").append('<label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
						// for 2nd col...
						$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+lcValue+'</td>');
						// for 3rd col...
						$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+totalLcValue+'</td>');
						// for 4th col...
						$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+quantityValue+'</td>');
						// for 5th col...
						$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+quantityTotalValue+'</td>');
						// for 6th col...
						$("#AddUdAmmendmentInfo_btbLcId").append('<td>'+supplierName+'</td>');
						$("#AddUdAmmendmentInfo_btbLcId").append('</tr>');
					}
				} catch (e){}
				
				var orderNos = data.orderNos;
				$("#AddUdAmmendmentInfo_orderNos").val(orderNos);
				
				var totalGarmentsQun = data.totalGarmentsQun;
				var totalLcValuesForUdAmendment = data.totalLcValuesForUdAmendment;
				$("#AddUdAmmendmentInfo_totGarQuantity").val(totalGarmentsQun);
				var previouslyUsedGarQuant = document.getElementById("AddUdAmmendmentInfo_previouslyUsedGarQuant").value;
				previouslyUsedGarQuant = previouslyUsedGarQuant.replace(",", ""); 
				$("#AddUdAmmendmentInfo_totalLcValue").val(totalLcValuesForUdAmendment);
				var previouslyUsedUdValue = document.getElementById("AddUdAmmendmentInfo_previouslyUsedUdValue").value;
				previouslyUsedUdValue = previouslyUsedUdValue.replace(",", "");
				var garQuantity = document.getElementById("AddUdAmmendmentInfo_garQuantity").value;
				if(garQuantity=='' || garQuantity=='undefined' || garQuantity==null){
					$("#AddUdAmmendmentInfo_gQuantityBalance").val(Number(totalGarmentsQun)-Number(previouslyUsedGarQuant));
				}else{
					$("#AddUdAmmendmentInfo_gQuantityBalance").val(Number(totalGarmentsQun)-Number(garQuantity)-Number(previouslyUsedGarQuant));
				}
				
				var udValue = document.getElementById("AddUdAmmendmentInfo_udValue").value;
				if(udValue=='' || udValue=='undefined' || udValue==null){
					$("#AddUdAmmendmentInfo_udBalance").val(Number(totalLcValuesForUdAmendment)-Number(previouslyUsedUdValue));
				}else{
					$("#AddUdAmmendmentInfo_udBalance").val(Number(totalLcValuesForUdAmendment)-Number(udValue)-Number(previouslyUsedUdValue));
				}
				
				// for orders .... 
				//var orderNos = data.orderNos;
				//$("#AddUdAmmendmentInfo_orderNos").val(orderNos);
				$("#AddUdAmmendmentInfo_orderNos").replaceWith($('<div>').attr({ id: 'AddUdAmmendmentInfo_orderNos', name: 'orderNos', value: 'AddUdAmmendmentInfo_orderNos' }));
				// add table
				$("#AddUdAmmendmentInfo_orderNos").append('<table>');
				//set column width...
				$("#AddUdAmmendmentInfo_orderNos").append('<col width='+"200"+'><col width='+"300"+'>');
				//add table header row ...
				$("#AddUdAmmendmentInfo_orderNos").append('<tr>');
				$("#AddUdAmmendmentInfo_orderNos").append('<th>Order No</th><th>Consumption</th><th>Unit</th>');
				$("#AddUdAmmendmentInfo_orderNos").append('</tr>');
				for(var i=0;i<data.orderForConsumption.length;i++){
					var lcOrderId = data.orderForConsumption[i].lcOrderId;
					var orderNo = data.orderForConsumption[i].orderNo;
					lcOrderId = lcOrderId.trim();
					orderNo = orderNo.trim();
					var lcOrderIdG = lcOrderId+"1";
					var consumptionsG = lcOrderId+1000+"1";
					var consumptionsUnit = lcOrderId+10000+"1";
					var lcValSep = ",";
					$("#AddUdAmmendmentInfo_orderNos").append('<tr>');
					// for 1st col...
					$("#AddUdAmmendmentInfo_orderNos").append('<td><input type="checkbox" id="' + lcOrderIdG +'" value="'+ lcOrderId+lcValSep+orderNo+ '" name="orderNos" '+""+'> <label for=' + lcOrderIdG +'>'+ orderNo+ '</label></td>');
					//$("#AddUdInfo_btbLcId").append('<label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					// for 2nd col...
					$("#AddUdAmmendmentInfo_orderNos").append('<td><input type="text" id="' + consumptionsG +'" name="consumptions" '+""+'onkeyup="udOrderConsumptionValidation('+lcOrderIdG+","+consumptionsG+')"'+'></td>');
					
					// for 3rd col...
					$("#AddUdAmmendmentInfo_orderNos").append('<td>'+
							'<select name="consumptionsUnit" id="'+consumptionsUnit+'">'+
							'<option value=" "></option>'+
					'</select>'
							+'</td>');
					
					//for unit dropdown list -------
					var sel = document.getElementById(consumptionsUnit);
				    for (var ij = 0; ij < data.ConsumptionUnitInfo.length; ij++) {
				        var opt = document.createElement('option');
				        opt.innerHTML = data.ConsumptionUnitInfo[ij].consumptionUnit;
				        opt.value = data.ConsumptionUnitInfo[ij].consumptionUnitId;
				        sel.appendChild(opt);
				    }
				    
					$("#AddUdAmmendmentInfo_orderNos").append('</tr>');
				}
				$("#AddUdAmmendmentInfo_orderNos").append('<table>');
				
				// for previous udOrderConsumptionInfo
				for(var i=0;i<data.udAmendOrderConsumptionInfo.length;i++){
					
					var lcOrderId = data.udAmendOrderConsumptionInfo[i].lcOrderId;
					var consumptionValue = data.udAmendOrderConsumptionInfo[i].consumptionValue;
					var consumptionUnitId = data.udAmendOrderConsumptionInfo[i].consumptionUnitId;
					var lcOrderIdInputField = document.getElementById(lcOrderId+"1");
					lcOrderIdInputField.checked = true;
					document.getElementById(lcOrderId+1000+"1").value = consumptionValue;
					document.getElementById(lcOrderId+10000+"1").value = consumptionUnitId;
				}
				
				
			}
		});
	}
}

function availableAmendmentUdValues(form, value){
	NumericOnly("AddUdAmmendmentInfo_udValue");
	if(value!=null){
		var totalLcValue = document.getElementById("AddUdAmmendmentInfo_totalLcValue").value;
		var previouslyUsedUdValue = document.getElementById("AddUdAmmendmentInfo_previouslyUsedUdValue").value;
		
		value = value.replace(",", "");
		totalLcValue = totalLcValue.replace(",", "");
		previouslyUsedUdValue = previouslyUsedUdValue.replace(",", "");
		if(Number(totalLcValue)-Number(previouslyUsedUdValue)-Number(value)< 0){
			alert('you cannot input more than total garments value. (try again)');
			$("#AddUdAmmendmentInfo_udValue").val('');
			$("#AddUdAmmendmentInfo_udBalance").val('');
			
		}else{
			$("#AddUdAmmendmentInfo_udBalance").val(Number(totalLcValue)-Number(previouslyUsedUdValue)-Number(value));
		}
	}
}
function availableAmendmentUdQuantity(form, value){
	NumericOnly("AddUdAmmendmentInfo_garQuantity");
	if(value!=null){
		var totGarQuantity = document.getElementById("AddUdAmmendmentInfo_totGarQuantity").value;
		var previouslyUsedGarQuant = document.getElementById("AddUdAmmendmentInfo_previouslyUsedGarQuant").value;
		
		value = value.replace(",", "");
		totGarQuantity = totGarQuantity.replace(",", "");
		previouslyUsedGarQuant = previouslyUsedGarQuant.replace(",", ""); 
		if(Number(totGarQuantity)-Number(previouslyUsedGarQuant)-Number(value)< 0){
			alert('you cannot input more than total garments value. (try again)');
			$("#AddUdAmmendmentInfo_garQuantity").val('');
			$("#AddUdAmmendmentInfo_gQuantityBalance").val('');
			
		}else{
			$("#AddUdAmmendmentInfo_gQuantityBalance").val(Number(totGarQuantity)-Number(previouslyUsedGarQuant)-Number(value));
		}
	}
}
function getUdAmendmentEditInfo(){
	try {
		var udAmendmentId = document.getElementById("AddUdAmmendmentInfo_udAmendmentId").value;
		var udId = document.getElementById("AddUdAmmendmentInfo_udId").value;
		$.ajax({
			url : "GetDataUDAmendmentInformationForEdit?udAmendmentId="+udAmendmentId+"&udId="+udId,
			type : "GET",
			data : getRequestData(),
			success : function(data){ 
				var udAmendFileArray = [];
				for(var i=0;i<data.udAmendFileInfo.length;i++){
					var fileId = data.udAmendFileInfo[i].fileId;
					udAmendFileArray.push(fileId.trim());  
				}
				//alert(udAmendMastarLcInfoArray);
				jQuery("#AddUdAmmendmentInfo_fileId").val(udAmendFileArray).change();
			}
		});
		
	} catch (e) {
	}
	
}
function EditUdAmendmentInfo(title,containerId,url,height,width){
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
					getUdAmendmentEditInfo();
				}
			});
		}
	});
}
function checkTotalGarmentsQuantity(form, value){
	NumericOnly("AddUdInfo_garQuantity");
	if(value!=null){
		var totalQuantity = document.getElementById("AddUdInfo_totGarQuantity");
		var tolerableQuantity = document.getElementById("tolerableQuantity");
		if(tolerableQuantity.value-value < 0){
			alert('You Have already crossed the maximum limit of quantity. (try again)');
			$("#AddUdInfo_garQuantity").val('');
			$("#AddUdInfo_gQuantityBalance").val('');
			
		}else{
			$("#AddUdInfo_gQuantityBalance").val(totalQuantity.value-value);
		}
	}
	
}
//tomal mahdi
function checkTotalUdValues(form,value){
	NumericOnly("AddUdInfo_udValue");
	if(value!=null){
		var totalLcValue = document.getElementById("AddUdInfo_totalLcValue");
		var totalUdValue = document.getElementById("AddUdInfo_udValue");		
		$("#AddUdInfo_udBalance").val(totalLcValue.value-value);
	}
}


function addOrder(form, value) {
	 var  fildValue= document.getElementById("totalOrder").value;
	 var orderFild = document.getElementById("totalOrder");
	 if(fildValue==null||fildValue==""||fildValue==''){
		 orderFild.value = value;
	 }else{
		 var moreValue = fildValue.concat(","+value); 
		 orderFild.value = moreValue;
	 }

}


//AnwarParvez
function getOrderInfo1(form, value){
	var  masterLcId = value;
	if(Number(value.indexOf("["))>=0){
		masterLcId=value.substring(value.indexOf("[")+1, value.indexOf("]")) ;
	}
	
	$.ajax({
		url : "getLcOrders?masterLcId="+masterLcId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var orderIds = document.getElementById("AddExportInfo_orderNOs1");
			while( orderIds.options.length ){
				orderIds.remove(0);
			}	
		
	for(var i=0; i<data.lcOrders.length; i++ ){			    
	    if(i==0){
		    var option1 = document.createElement("option");					
		    option1.text  = "Select Order";
		    option1.value = null;
		    orderIds.add(option1);
	      }		    	   
		    var option1 = document.createElement("option");					
		    option1.text  = data.lcOrders[i].orderNo;
		    option1.value = data.lcOrders[i].orderNo;
		    orderIds.add(option1);									
		}
	var lcStyles = document.getElementById("lcStyles");
	lcStyles.value=data.lcStyles;
	var bayerName = document.getElementById("exportBuyerName1");
	bayerName.value=data.buyerName;
	var companyName = document.getElementById("exportCompanyName");
	companyName.value=data.companyName;	
	var udNo = document.getElementById("udNo");
	udNo.value=data.udNo;
	var udDate = document.getElementById("udDate");
	udDate.value=data.udDate;
	var shipmentDate1 = document.getElementById("shipmentDate_i18n");
	var shipmentDate2 = document.getElementById("shipmentDate");

	shipmentDate2.value=data.shipmentDateInput;
	//shipmentDate1.value=data.shipmentDate;
	var tenureId = document.getElementById("tenureId");
	tenureId.value=data.tenureId; 
	document.getElementById("currency").innerHTML=data.currency; 
	var tenureId = document.getElementById("tenureId");
	tenureId.value=data.tenureId; 
	document.getElementById("currency").innerHTML=data.currency; 
	document.getElementById("paymentTerm").value=data.paymentTerm;
	document.getElementById("shipmentModeId").value=data.shipmentModeId;
	
	
		}
	
	});

}

function addOrder(form, value) {
	 var  fildValue= document.getElementById("totalOrder").value;
	 var orderFild = document.getElementById("totalOrder");
	 if(fildValue==null||fildValue==""||fildValue==''){
		 orderFild.value = value;
	 }else{
		 var moreValue = fildValue.concat(","+value); 
		 orderFild.value = moreValue;
	 }

}

$(document).ready(function() {
	$("#addPercentageIcon").click(function() {
		commercitialManagementPopup('Add Percentage','#editLcValuePercentage','AddLcValuePercentagePopUp?&title=Add Lc Value Percentage','210','480');
		
	});
	$("#addUdAmmendmentBtn").click(function() {
		var  AddUdInfo_udId = "";
		var totGarQuantity = "";
		var totalLcValue = "";
		try {
			AddUdInfo_udId= document.getElementById("AddUdInfo_udId");
			AddUdInfo_udId = $(AddUdInfo_udId).val();
			
			var totGarQuantity = document.getElementById("AddUdInfo_totGarQuantity");
			var totalLcValue = document.getElementById("AddUdInfo_totalLcValue");
			totGarQuantity = $(totGarQuantity).val();
			totalLcValue = $(totalLcValue).val();
			
		}catch (e) {
		}
		var url= "AddAmmendmentUdInfo?udId="+AddUdInfo_udId+"&totGarQuantity="+totGarQuantity+"&totalLcValue="+totalLcValue;
		prottayPopupAddUdAmendment('Add Amendment Ud Info','#addUdContainer',url,'600','800');
		
	});
	
	// for Trims Import Info ...
	var importCounter = 2;
	try {
		
		document.getElementById('AddImportInfo_addItems').type = "button";
		document.getElementById('AddImportInfo_addItems').value = "Add Item Details";
		
		// set balance amount  ....
		calculateBalanceAmountForTrimsImportInfo();
		// set balance quantity ...
		calculateBalanceQuantityForTrimsImportInfo();
		
		$("#AddImportInfo_items").replaceWith($('<div>').attr({ id: 'AddImportInfo_items', name: 'items', value: 'AddImportInfo_items' }));
		// add table
		$("#AddImportInfo_items").append('<table id="table">');
		//set column width...
		$("#AddImportInfo_items").append('<col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'><col width='+"200"+'>');
		//add table header row ...
		$("#AddImportInfo_items").append('<tr>');
		$("#AddImportInfo_items").append('<th>Item Name</th><th>Item Weight</th><th>Item Weight Unit</th><th>Quantity</th><th>Quantity Unit</th><th>Receive Quantity</th>');
		$("#AddImportInfo_items").append('</tr>');
		
		var importId = document.getElementById("AddImportInfo_importId").value;
		if(importId == ''|| importId == 'undefined' || importId == null){
			$("#AddImportInfo_items").append('<tr>');
			$("#AddImportInfo_items").append('<td><input type="text" size="15" id="itemId1" name="itemId" '+""+'></td>');
			$("#AddImportInfo_items").append('<td><input type="text" size="15" id="itemWeight1" name="itemWeight" '+""+'></td>');
			$("#AddImportInfo_items").append('<td><input type="text" size="15" id="itemWeightUnit1" name="itemWeightUnit" '+""+'></td>');
			$("#AddImportInfo_items").append('<td><input type="text" size="15" id="quantity1" name="quantity" '+"onkeyup=getTotalQuantityForTrimsImport('quantity1')"+'></td>');
			$("#AddImportInfo_items").append('<td><input type="text" size="15" id="quantityUnit1" name="quantityUnit" '+""+'></td>');
			$("#AddImportInfo_items").append('<td><input type="text" size="15" id="receiveQuantity1" name="receiveQuantity" '+"onkeyup=getTotalRecQuanTrimsImport('receiveQuantity1')"+'></td>');
			$("#AddImportInfo_items").append('</tr>');
		}else{
			$.ajax({
				url : "getImportItemInfo?importId="+importId,
				type : "GET",
				data : getRequestData(),
				success : function(data){ 
					for(var i=0;i<data.trimsImportItemInfo.length;i++){
						var itemName = data.trimsImportItemInfo[i].itemName;
						var itemWeight = data.trimsImportItemInfo[i].itemWeight;
						var itemWeightUnit = data.trimsImportItemInfo[i].itemWeightUnit;
						var quantity = data.trimsImportItemInfo[i].quantity;
						var quantityUnit = data.trimsImportItemInfo[i].quantityUnit;
						var receiveQuantity = data.trimsImportItemInfo[i].receiveQuantity;
						
						
						var col = 1;
						$("#AddImportInfo_items").append('<tr id="importItemsRow'+importCounter+'">');
						$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><input type="text" size="15" value="'+itemName+'" id="itemId'+(i+1)+'" name="itemId" '+""+'></td>');
						$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><input type="text" size="15" value="'+itemWeight+'" id="itemWeight'+(i+1)+'" name="itemWeight" '+""+'></td>');
						$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><input type="text" size="15" value="'+itemWeightUnit+'" id="itemWeightUnit'+(i+1)+'" name="itemWeightUnit" '+""+'></td>');
//						$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><input type="text" size="15" value="'+quantity+'" id="quantity'+(i+1)+'" name="quantity" '+"onkeyup=getTotalQuantityForTrimsImport('quantity"+(i+1)+"')"+'></td>');
						$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><input type="text" size="15" value="'+quantityUnit+'" id="quantityUnit'+(i+1)+'" name="quantityUnit" '+""+'></td>');
//						$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><input type="text" size="15" value="'+receiveQuantity+'" id="receiveQuantity'+(i+1)+'" name="receiveQuantity" '+"onkeyup=getTotalRecQuanTrimsImport('receiveQuantity"+(i+1)+"')"+'></td>');
						if(i!=0){
							$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+(i+1)+'"><button name="importItemsRow" id="'+(i+1)+'" class="deleteImportItems">Delete</button></td>');
						}
						$("#AddImportInfo_items").append('</tr>');
					}
				}
			});
		}
		
	} catch (e) {
		// TODO: handle exception
		
	}
	
	$("#AddImportInfo_addItems").click(function(){
		var col = 1;
		$("#AddImportInfo_items").append('<tr id="importItemsRow'+importCounter+'">');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><input type="text" size="15" id="itemId'+importCounter+'" name="itemId" '+""+'></td>');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><input type="text" size="15" id="itemWeight'+importCounter+'" name="itemWeight" '+""+'></td>');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><input type="text" size="15" id="itemWeightUnit'+importCounter+'" name="itemWeightUnit" '+""+'></td>');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><input type="text" size="15" id="quantity'+importCounter+'" name="quantity" '+"onkeyup=getTotalQuantityForTrimsImport('quantity"+importCounter+"')"+'></td>');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><input type="text" size="15" id="quantityUnit'+importCounter+'" name="quantityUnit" '+""+'></td>');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><input type="text" size="15" id="receiveQuantity'+importCounter+'" name="receiveQuantity" '+"onkeyup=getTotalRecQuanTrimsImport('receiveQuantity"+importCounter+"')"+'></td>');
		$("#AddImportInfo_items").append('<td id="importItemCol'+(col++)+importCounter+'"><button name="importItemsRow" id="'+importCounter+'" class="deleteImportItems">Delete</button></td>');
		$("#AddImportInfo_items").append('</tr>');
		
		importCounter++;
		return false;
	});
	$("body").on("click", ".deleteImportItems", function (e) {
		
		for(var i =1;i<=7;i++){
			$('#importItemCol'+i+this.id+'').remove();
		}
		return false;
	});
	
});

// for trims import info 
function getTotalQuantityForTrimsImport(id){
	alert(id);
}
function getTotalRecQuanTrimsImport(id){
	var abc = document.getElementById(id).value;
	alert(abc+' '+id);
}
function calculateBalanceAmountForTrimsImportInfo(){
	var piAmount = Number(document.getElementById('AddImportInfo_piAmount').value);
	var docValue = Number(document.getElementById('AddImportInfo_docValue').value);
	
	document.getElementById('AddImportInfo_balanceAmount').value = (piAmount - docValue);
	
}
function calculateBalanceQuantityForTrimsImportInfo(){
	
}

function prottayPopupAddUdAmendment(title,containerId,url,height,width){
	
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

function commercitialManagementPopup(title,containerId,url,height,width){
	
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


//tomal
jQuery(document).ready(function() {
	// for multiple value selection in BatchAssignForm .... in roster preference screen
	if(document.getElementById("BatchAssignForm_employeeId")){
		var selectedValue = $( "#BatchAssignForm_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#BatchAssignForm_employeeId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddAltHolidayEmplForm_employeeId")){
		var selectedValue = $( "#AddAltHolidayEmplForm_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddAltHolidayEmplForm_employeeId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("FindTiffinBills_rosterPreferenceId")){
		
		var selectedValue = $( "#FindTiffinBills_rosterPreferenceId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#FindTiffinBills_rosterPreferenceId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}


	
	if(document.getElementById("AdjustManualLog_employeeId")){
		var selectedValue = $( "#AdjustManualLog_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AdjustManualLog_employeeId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	
	// for section wise strength summary report ...
	if(document.getElementById("FindSectionWiseReport_rosterPreferenceId")){
		var selectedValue = $( "#FindSectionWiseReport_rosterPreferenceId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#FindSectionWiseReport_rosterPreferenceId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	// for section wise daily strength summary report ...
	if(document.getElementById("FindSectionWiseReportV1_rosterPreferenceId")){
		var selectedValue = $( "#FindSectionWiseReportV1_rosterPreferenceId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#FindSectionWiseReportV1_rosterPreferenceId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	// for Ot Adjustment
	if(document.getElementById("ProcessOtAdjustment_employeeId")){
		var selectedValue = $( "#ProcessOtAdjustment_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#ProcessOtAdjustment_employeeId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}

	// for commercial export multi value selection ...
	if(document.getElementById("InvoiceItemAdd_exportId")){
		var selectedValue = $( "#InvoiceItemAdd_exportId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#InvoiceItemAdd_exportId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	// for logistic print id cards ...
	if(document.getElementById("PrintLogisticsIDCard_employeeId")){
		var selectedValue = $( "#PrintLogisticsIDCard_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#PrintLogisticsIDCard_employeeId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("PrintLogistics_employeeId")){
		var selectedValue = $( "#PrintLogistics_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#PrintLogistics_employeeId').tokenize({
	    
		     nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("FindExcessSummary_employeeId")){
		var selectedValue = $( "#FindExcessSummary_employeeId option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#FindExcessSummary_employeeId').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("AddSewingSectionSetting_emplPositionIdOperator")){
		var selectedValue = $( "#AddSewingSectionSetting_emplPositionIdOperator option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddSewingSectionSetting_emplPositionIdOperator').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("AddSewingSectionSetting_emplPositionIdHelper")){
		var selectedValue = $( "#AddSewingSectionSetting_emplPositionIdHelper option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddSewingSectionSetting_emplPositionIdHelper').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH, , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddSewingSectionSetting_emplPositionIdIronMan")){
		var selectedValue = $( "#AddSewingSectionSetting_emplPositionIdIronMan option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddSewingSectionSetting_emplPositionIdIronMan').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH , ENDS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddCuttingSectionSetting_emplPositionIdCuttingAssis")){
		var selectedValue = $( "#AddCuttingSectionSetting_emplPositionIdCuttingAssis option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddCuttingSectionSetting_emplPositionIdCuttingAssis').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("AddCuttingSectionSetting_emplPositionIdJuniorCut")){
		var selectedValue = $( "#AddCuttingSectionSetting_emplPositionIdJuniorCut option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddCuttingSectionSetting_emplPositionIdJuniorCut').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddCuttingSectionSetting_emplPositionIdCutter")){
		var selectedValue = $( "#AddCuttingSectionSetting_emplPositionIdCutter option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddCuttingSectionSetting_emplPositionIdCutter').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddCuttingSectionSetting_emplPositionIdSeniorCutter")){
		var selectedValue = $( "#AddCuttingSectionSetting_emplPositionIdSeniorCutter option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddCuttingSectionSetting_emplPositionIdSeniorCutter').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	/*finishing*/
	if(document.getElementById("AddFinishingSectionSetting_emplPositionIdFinisher")){
		var selectedValue = $( "#AddFinishingSectionSetting_emplPositionIdFinisher option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddFinishingSectionSetting_emplPositionIdFinisher').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddFinishingSectionSetting_emplPositionIdFolder")){
		var selectedValue = $( "#AddFinishingSectionSetting_emplPositionIdFolder option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddFinishingSectionSetting_emplPositionIdFolder').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddFinishingSectionSetting_emplPositionIdMetalDetector")){
		var selectedValue = $( "#AddFinishingSectionSetting_emplPositionIdMetalDetector option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddFinishingSectionSetting_emplPositionIdMetalDetector').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("AddFinishingSectionSetting_emplPositionIdPacker")){
		var selectedValue = $( "#AddFinishingSectionSetting_emplPositionIdPacker option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddFinishingSectionSetting_emplPositionIdPacker').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	if(document.getElementById("AddQualitySectionSetting_emplPositionIdQualityController")){
		var selectedValue = $( "#AddQualitySectionSetting_emplPositionIdQualityController option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddQualitySectionSetting_emplPositionIdQualityController').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	if(document.getElementById("AddQualitySectionSetting_emplPositionIdQualityInspector")){
		var selectedValue = $( "#AddQualitySectionSetting_emplPositionIdQualityInspector option:selected" ).val();
	    if(selectedValue!=null){    
	    	toggleCheck(selectedValue);
	    }
	    $('#AddQualitySectionSetting_emplPositionIdQualityInspector').tokenize({
	         nbDropdownElements:10,
		     searchType:'STARTS_WITH',
	         onAddToken: function(value, text, e){ 
	         },onRemoveToken: function(value, e){    
	         }
	    	});
	}
	
	
});

//tomal mahdi
function maternityLeaveCheck(form, value,fromDate1,toDate1){
	var fromDate = document.getElementById(form.name+"_"+fromDate1+"_i18n").value;
	if(fromDate==''){
		alert(fromDate1+' cant be empty');
		document.getElementById(form.name+"_"+toDate1+"_i18n").value='';
		return false;
	}else{
		var emplLeaveLeaveTypeId = document.getElementById("emplLeaveLeaveTypeId").value;
		// 1004 for maternity leave ...
		if(emplLeaveLeaveTypeId == '1004'){
			
			var fDate = fromDate.split("/");
		    var endDate = new Date(fDate[2], fDate[1]-1, fDate[0]);
		    var numberOfDaysToAdd = 111;
		    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
		    //alert(fromDate+" "+startDate);
		    endDate = getFormattedDate(endDate);
		    document.getElementById(form.name+"_"+toDate1+"_i18n").value=endDate;
		  
		    //jQuery("#AddUdInfo_fileId").val(FileArray).click()
		    /*$('#'+form.name+"_"+toDate1+"_i18n").prop('class','');*/
		    var toDateField = form.name+"_"+toDate1+"_i18n";
		    //alert(toDateField);
		    jQuery("#"+toDateField).val(endDate).click().change();
		}
		
		
	}
}
//tomal mahdi
function toDateValidateForApplyLeave(form,value,fromDate,toDate){
	var fromDateField = form.name+"_"+fromDate+"_i18n";
	var toDateField = form.name+"_"+toDate+"_i18n";
	
	var fromDateVal = $("#"+fromDateField).val();
	if(value == '1004'){
		$("#"+toDateField).prop('required',false);
		if(fromDateVal){
			maternityLeaveCheck(form,value,fromDate,toDate);
		}
	}else{
		$("#"+toDateField).prop('required',true);
	}
}
// tomal mahdi
function getFormattedDate(date) {
	  var year = date.getFullYear();
	  var month = (1 + date.getMonth()).toString();
	  month = month.length > 1 ? month : '0' + month;
	  var day = date.getDate().toString();
	  day = day.length > 1 ? day : '0' + day;
	  return day + '/' + month + '/' + year;
	}

// tomal mahdi ...
function dateValidation(form, value,fromDate1,toDate1) {
	var fromDate = document.getElementById(form.name+"_"+fromDate1+"_i18n").value;
	if(!fromDate){
		alert(fromDate1+' cant be empty');
		document.getElementById(form.name+"_"+toDate1+"_i18n").value='';
		return false;
	}
	
	var fDate = fromDate.split("/");
    var startDate = new Date(fDate[2], fDate[1]-1, fDate[0]);
	
    var toDate = value.split("-");
    var endDate = new Date(toDate[0], toDate[1]-1, toDate[2]);
    
    var longStartDate = new Date(startDate).getTime();
    var longEndDate = new Date(endDate).getTime();
    
    //alert(longStartDate+' '+longEndDate);
    if(longStartDate>longEndDate){
    	alert(toDate1+" need to be greater or equal to "+fromDate1);
    	document.getElementById(form.name+"_"+toDate1+"_i18n").value='';
        return false;
    }
    
    /*if(!isValidDate(startDate,endDate))
    {
    	alert(toDate1+" need to be greater or equal to "+fromDate1);
    	document.getElementById(form.name+"_"+toDate1+"_i18n").value='';
        return false;
    }*/

}
// tomal mahdi ...
function isValidDate(startDate,endDate) {
    if(startDate.getFullYear()>endDate.getFullYear()){
    	return false;
    }
    if(startDate.getMonth()>endDate.getMonth()){
    	return false;
    }
    if(startDate.getDate()>endDate.getDate()){
    	return false;
    }return true;
}

//Anwar Parvez
function getDepartments(division){
	$.ajax({
		url : "getDepartments?divPartyId="+division,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var department = document.getElementById("department");	
			while(department.options.length > 0 ){
				department.remove(0);
			}
			
			for(var i=0; i<data.deptList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.deptList[i].deptName;;
	     			option.value = data.deptList[i].partyIdDept;	     								
	     			department.add(option);
	     				     		
			}
			$("#department").prepend("<option value='' selected='selected'></option>");
		
		}
	});
	
}
//Anwar Parvez
function getSections(department){
		
	$.ajax({
		url : "getSections?partyIdDept="+department,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var section = document.getElementById("section");	
			while(section.options.length > 0 ){
				section.remove(0);
			}
			
			for(var i=0; i<data.sectionList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.sectionList[i].sectionName;;
	     			option.value = data.sectionList[i].partyIdSection;	     								
	     			section.add(option);
	     				     		
			}
			$("#section").prepend("<option value='' selected='selected'></option>");
		
		}
	});
	
}

//Anwar Parvez
function getLines(section){
		
	$.ajax({
		url : "getLines?partyIdSection="+section,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var line = document.getElementById("line");	
			while(line.options.length > 0 ){
				line.remove(0);
			}
			
			for(var i=0; i<data.lineList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.lineList[i].lineName;;
	     			option.value = data.lineList[i].partyIdLine;	     								
	     			line.add(option);
	     				     		
			}
			$("#line").prepend("<option value='' selected='selected'></option>");
		
		}
	});
	
}

//Anwar Parvez
function getSectionsWithPosition(department){
		
	$.ajax({
		url : "getSections?partyIdDept="+department,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var section = document.getElementById("section");	
			while(section.options.length > 0 ){
				section.remove(0);
			}
			
			var line = document.getElementById("line");	
			while(line.options.length > 0 ){
				line.remove(0);
			}
			
			for(var i=0; i<data.sectionList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.sectionList[i].sectionName;;
	     			option.value = data.sectionList[i].partyIdSection;	     								
	     			section.add(option);	     				     			
	     			
	     			$.ajax({
	     				url : "getLines?partyIdSection="+data.sectionList[i].partyIdSection,
	     				type : "GET",
	     				data : getRequestData(),
	     				success : function(data){
	     					
	     					for(var i=0; i<data.lineList.length; i++){
	     							var option = document.createElement("option");										                    
	     						    option.text = data.lineList[i].lineName;;
	     			     			option.value = data.lineList[i].partyIdLine;	     								
	     			     			line.add(option);
	     			     				     		
	     					}
	     				
	     				}
	     			});     				     			
	     				     		
			}
			$("#section").prepend("<option value='' selected='selected'></option>");
			$("#line").prepend("<option value='' selected='selected'></option>");
			
			$.ajax({
				url : "getPositionList?partyId="+department,
				type : "GET",
				data : getRequestData(),
				success : function(data){
					var pos = document.getElementById("incrementPromotion_emplPositionId");	
					while(pos.options.length > 0 ){
						pos.remove(0);
					}
					
					for(var i=0; i<data.positionList.length; i++){
							var option = document.createElement("option");										                    
						    option.text = data.positionList[i].description;;
			     			option.value = data.positionList[i].emplPositionId;	     								
			     			pos.add(option);
			     				     		
					}
					$("#incrementPromotion_emplPositionId").prepend("<option value=' ' selected='selected'></option>");
				
				}
			});
		
		}
	});
	
}

//Anwar Parvez
function getLinesWithPosition(section){
		
	$.ajax({
		url : "getLines?partyIdSection="+section,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var line = document.getElementById("line");	
			while(line.options.length > 0 ){
				line.remove(0);
			}
			
			for(var i=0; i<data.lineList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.lineList[i].lineName;;
	     			option.value = data.lineList[i].partyIdLine;	     								
	     			line.add(option);
	     				     		
			}
			$("#line").prepend("<option value='' selected='selected'></option>");
			
			$.ajax({
				url : "getPositionList?partyId="+section,
				type : "GET",
				data : getRequestData(),
				success : function(data){
					var pos = document.getElementById("incrementPromotion_emplPositionId");	
					while(pos.options.length > 0 ){
						pos.remove(0);
					}
					
					for(var i=0; i<data.positionList.length; i++){
							var option = document.createElement("option");										                    
						    option.text = data.positionList[i].description;;
			     			option.value = data.positionList[i].emplPositionId;	     								
			     			pos.add(option);
			     				     		
					}
					$("#incrementPromotion_emplPositionId").prepend("<option value=' ' selected='selected'></option>");
				
				}
			});
		
		}
	});
	
}


//Anwar Parvez
function getPositionList(partyId){
		
	$.ajax({
		url : "getPositionList?partyId="+partyId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var pos = document.getElementById("incrementPromotion_emplPositionId");	
			while(pos.options.length > 0 ){
				pos.remove(0);
			}

			for(var i=0; i<data.positionList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.positionList[i].description;;
	     			option.value = data.positionList[i].emplPositionId;	     								
	     			pos.add(option);
	     				     		
			}
			$("#incrementPromotion_emplPositionId").prepend("<option value=' ' selected='selected'></option>");
		
		}
	});
	
}

//Anwar Parvez

function getRosterPreference(rostarId){
	$.ajax({
		url : "getRosterPreference?rosterPreferenceId="+rostarId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var preferenceId = document.getElementById("preferenceId");	
			while(preferenceId.options.length > 0 ){
				preferenceId.remove(0);
			}
			
			for(var i=0; i<data.preferenceList.length; i++){
					var option = document.createElement("option");										                    
				    option.text = data.preferenceList[i].preferenceName;;
	     			option.value = data.preferenceList[i].preferenceId;	 
	     			preferenceId.add(option);
	     				     		
			}
 			$('#preferenceId').css('color','#E42E3A');
			$("#preferenceId").prepend("<option value='' selected='selected'></option>");
		
		}
	});
	
}


$(document).ready(function(){     
    var selectedValue = $( "#multiSelect option:selected" ).val();
    if(selectedValue!=null){    
    toggleCheck(selectedValue);
    }
    $('#multiSelect').tokenize({
    
     nbDropdownElements:10,
     searchType:'STARTS_WITH',
     
     onAddToken: function(value, text, e){ 
     },
     onRemoveToken: function(value, e){    
     }
});

});

function getBanglaQualifiaction(form,value){
	if(value!=null){
		$.ajax({
			url : "getBanglaQualifiaction?partyQualTypeId="+value,
			type : "GET",
			data : getRequestData(),
			success : function(data){
				$("#"+form.name+"_partyQualTypeIdBangla").val(data.descriptionInBangla);
	
			}
		});
	}
}

function prottayPopup(title,containerId,url,height,width){
	
	
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

/*$("document").ready(function () {
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"];

$("#textAreaWidth ").autocomplete({
    source: availableTags
});


});*/



function calculateMaxResDate(id){
	NumericOnly(id);
	var dateOfIssue = $("#dateOfIssue_i18n").val();
	if(dateOfIssue==null || dateOfIssue==''){
		alert('Date of Issue should not be empty');
		return false;
	}
	var dDate = dateOfIssue.split("/");
    var ddDate = new Date(dDate[2], dDate[1]-1, dDate[0]);
    var numberOfDaysToAdd = document.getElementById("maxResponseTime").value;
    ddDate.setDate(ddDate.getDate() + Number(numberOfDaysToAdd));
    var myDate = getFormattedDate(ddDate);
    $("#maxResponseDate_i18n").val(myDate);
    $("#lastDateResponse").val(myDate);
	return true;
}

function checkIssueDate(id){
	var dateOfIssue = $("#dateOfIssue_i18n").val();
	if(dateOfIssue==null || dateOfIssue==''){
		$("#"+id+"_i18n").val('');
		alert('Date of issue should not be empty');
		return false;
	}
	return true;
}

function changeActionType(id){

	var actiontype =  document.getElementById(id).value;
	if (actiontype == '10009' || actiontype == '10008' || actiontype == '10011') {
	$(".suspensionFromDate").hide();  
	$(".dateSuspensionForm").hide();
	$(".suspensionToDate").hide();
	$(".dateSuspensionTo").hide();
	
	}
	
}

function checkBox() {
	//alert($("[name='reasonTypeId']"));
	//alert(document.getElementsByName("reasonTypeId"));
	var chks = document.getElementsByName("reasonTypeId");
	for(var i = 0; i < chks.length; i++){
        if(chks[i].checked){
        	//alert('check result: '+chks[i].value);
        	return true;
        }
    }
	alert('Reason Of Action should not be empty ');
	return false;

}




/**Added for employee multiselect option in lefty search screen*/
$(document).ready(function(){     
   
    $('#FindLeftyEmployee_employeeIds').tokenize({
    
     nbDropdownElements:10,
     searchType:'STARTS_WITH,ENDS_WITH',
     
     onAddToken: function(value, text, e){ 
     },
     onRemoveToken: function(value, e){    
     }
});
    action();
});

function action(){
	var actionId = $("#GeneralDADetails_actionTypeId").val();
	//alert(actionId);
	if (actionId == '10009' || actionId == '10011') {
		$(".typeResponse").hide();  
		$(".typesResponse").hide();
		$(".actionNext").hide();
		$(".actionsNext").hide();
		$(".sub").hide();
		}
}


function changLastAction(id){
	
	var lastAction =  document.getElementById(id).value;
	//var lastActionId = $("#ForwardNextStage_nextActionType").val();
	//alert(lastAction);
	if (lastAction == '10066' ||
		lastAction == '10067' ||
		lastAction == '10068' ||
		lastAction == '10069' ||
		lastAction == '10071' ||
		lastAction == '10072' ||
		lastAction == '10073') {
		$(".suspensionFromDate").hide();  
		$(".dateSuspensionForm").hide();
		$(".suspensionToDate").hide();
		$(".dateSuspensionTo").hide();
		}
}




/*

function stage(){
	var stage = document.getElementById('GeneralDADetails_nextStageName');
	
	var stageId = $("#GeneralDADetails_actionTypeId").val();
	
	if (stageId == '10010') {
		var option = document.createElement("option");
		option.text = 'Inquiry';
		option.value = 'Inquiry';
		stage.add(option);
	}else if (stageId == '10011') {
		var option = document.createElement("option");
		option.text = 'Inquiry';
		option.value = 'Inquiry';
		stage.add(option);
		
		var option = document.createElement("option");
		option.text = 'Warning';
		option.value = 'Warning';
		stage.add(option);

		option = document.createElement("option");
		option.text = 'Final Warning';
		option.value = 'Final Warning';
		stage.add(option);
		
		option = document.createElement("option");
		option.text = 'Complain Withdrawal';
		option.value = 'Complain Withdrawal';
		stage.add(option);
	}else  {
		var option = document.createElement("option");
		option.text = '';
		option.value = '';
		stage.add(option);
	}
}



*/
//progress bar
//alert("OK");
$(document).ready(function(){
	$("#attendanceForm").submit(function(e){
		return false;
	});
});


function ShowProgress(){
//	alert("inside updateProgressBar");
	if($('#a').val().length != 0){
		var selectMonthYear =  $('#a').val();
		var orgPartyId = $('#orgPartyId').val();
		$('#progressContainer').dialog({
			autoOpen : true,
			title : "Progress",
			height : 100,
			width : 350,
			modal : true,
			position: top,
			open : function() {
//				alert("Process Started");
				//ajax call return view of screen and returned value is set to container as html content
				$.ajax({
					url:'ShowProgressBar',
					type:'POST',
					success: function(msg){
						$('#progressContainer').html(msg);
						$('#progressbar').progressbar({
							value:0
						});
						$('#progressval').text("0%");
						//get employee count 
						$.ajax({
							url: 'GetEmplCount',
							type: 'POST',
							data: {
								selectMonthYear: selectMonthYear,
								orgPartyId: orgPartyId
							},
							error: function(msg){
								alert("GetEmpCount Error!");
							},
							success: function(msg){
								$('#emplCount').val(msg.emplCount);
								updateProgress();
								//ajax call instead of form submission for attendance processing
								$.ajax({
									url: 'UpdateAttendanceProcess',
									type: 'POST',
									data:{
										selectMonthYear: selectMonthYear,
										orgPartyId: orgPartyId
//										orgPartyId: 'BGL'
									},
									error: function(data){
										alert("Error");
									},
									success: function(data){
										if (data._ERROR_MESSAGE_ != undefined) { 
											if(data._ERROR_MESSAGE_ != "Attendance is Processing. "){
												$('#progressContainer').dialog("close");
												clearTimeout(progressId);
											}
											alert(data._ERROR_MESSAGE_);	
										}
										if (data._EVENT_MESSAGE_ != undefined) { 
											clearTimeout(progressId);
											$('#progressContainer').dialog("close");
											alert(data._EVENT_MESSAGE_);
										}
									}
								});
							}
						});					
					}
				});				
			}		
		});
	}else{
		alert("Select Month!");
		/*$('#progressContainer').dialog({
			autoOpen : true,
			title : "Progress",
			height : 100,
			width : 350,
			modal : true,
			position: top,
			open : function() {
				//ajax call return view of screen and returned value is set to container as html content
				$.ajax({
					url:'ShowProgressBar',
					type:'POST',
					success: function(msg){
						$('#progressContainer').html(msg);
					}
				});
			}
		});*/
	}
	
	
	/*function progress(){
//		alert("inside progress");
		$.ajax({
			url:'updateProgressBar',
			type:'POST',
			data:{
				orgPartyId: orgPartyId,
				selectMonthYear: selectMonthYear
			},
			error: function(msg){
				alert("error");
			},
			success: function(msg){
				alert("success");
				percent = msg.percent;
				$('#progressbar').progressbar({
					value: currentRows
				});
				alert(percent);
				$('#progressContainer').dialog({
					autoOpen : true,
					title : "Progress",
					height : 20,
					width : 30,
					modal : false,
					open : function() {
						$('#progressbar').progressbar({
							value:percent
						});
					}
				
				});
			}
		});
		var id = setTimeout(progress, 3000 );
		count = count + 1;
		if(count == 3){
			clearTimeout(id);
		}
	}
	progress();*/
//	setTimeout(progress, 3000 );
}
function updateProgress(){
	var percent;
	var id;
	var selectMonthYear =  $('#a').val();
	var orgPartyId = $('#orgPartyId').val();
	var emplCount = $('#emplCount').val();
	$.ajax({
		url:'updateProgressBar',
		type:'POST',
		data:{
			selectMonthYear: selectMonthYear,
			orgPartyId: orgPartyId,
			emplCount: emplCount
//			orgPartyId: 'BGL'
		},
		success: function(msg){
//			alert("success");
			percent = msg.percent;
			$('#progressbar').progressbar({
				value:percent
			});
			$('#progressval').text(percent + "%");
			progressId = setTimeout(updateProgress, 180000);
			/*if(percent >= 100){
				clearTimeout(progressId);
				$('#progressContainer').dialog("close");
//				alert("Attendance Process is successful");
			}*/
		}
	});
	
}

function validateOtAdjustmentHour(type){
	var priorityOrFixedHour = $('#ProcessOtAdjustment_priorityOrFixedHour').val();
	if(priorityOrFixedHour=='setFixedHour'){
		var totalAdjustmentHour = $('#ProcessOtAdjustment_totalAdjustmentHour').val();
		var ot = $('#ProcessOtAdjustment_ot').val();
		var eot = $('#ProcessOtAdjustment_eot').val();
		var eotAdd = $('#ProcessOtAdjustment_eotAdd').val();
		if(totalAdjustmentHour=='' || totalAdjustmentHour == null){
			$('#ProcessOtAdjustment_ot').val('');
			$('#ProcessOtAdjustment_eot').val('');
			$('#ProcessOtAdjustment_eotAdd').val('');
			alert('please provide total adjustment hour');
			return false;
		}
		var totalValue = Number(ot) + Number(eot) + Number(eotAdd);
		if(totalValue > totalAdjustmentHour){
			if(type=='ot'){
				$('#ProcessOtAdjustment_ot').val('');
			}else if(type=='eot'){
				$('#ProcessOtAdjustment_eot').val('');
			}else if(type=='eotAdd'){
				$('#ProcessOtAdjustment_eotAdd').val('');
			}
			alert('OT + EOT + EOT ADD cant be bigger than total adjustment hour!');
			return false;
		}
		
		if(type =='' && totalValue != totalAdjustmentHour){
			alert('OT + EOT + EOT ADD should be equal to the total adjustment hour!')
			return false;
		}
		return true;
	}
	return true;
}
function applicationDateUpdate(partyId,applicationDate){
	//alert(partyId+' '+applicationDate);
	var answer = confirm("Are you sure you want to update application date?");
	if (answer) {
		$.ajax({
			url : "updateApplicationDate?partyId="+partyId+"&applicationDate="+applicationDate,
			type : "GET",
			data : getRequestData(),
			success : function(data){
			}
		});
	}
	
	
}
//sending email to approvers for pending leave request
function sendEmailToApprovers(){
//	alert("OK");
	/*$.ajax({
		url:'sendEmailToAppr',
		type:'POST',
		data:{
			
		},
		success: function(msg){
			
		}
	});*/
}

function getPassBook(){
	var companyId = $("#companyId").val();
	/*alert(companyId);*/
	
	if (companyId) {
		$.ajax({
			url : "passBookNoId?companyId="+companyId,
			type : "GET",
			data : getRequestData(),
			success : function(data){
				/*alert(data.passBookNo);*/
				$("#passBookNo").val(data.passBookNo);
			}
		});
	}
}

function getVolumeNo(){
	var companyId = $("#companyId").val();
	var volumeNo = $("#volumeNo").val();
	
	if (volumeNo) {
		$.ajax({
			url : "volumeNoId?companyId="+companyId+"&volumeNo="+volumeNo,
			type : "GET",
			data : getRequestData(),
			success : function(data){
				if(data.volumeNo != ""){
					$("#volumeNo").val(data.volumeNo);
					alert("Volume No Alreay Exist");
				}	
			}
		});
	}
}

function getOrderInformation(form, value){

	var  masterLcId = value;
//	alert("form: "+form+" Value: "+value);
	
	if(Number(value.indexOf("["))>=0){
		masterLcId=value.substring(value.indexOf("[")+1, value.indexOf("]")) ;
	}
	
	$.ajax({
		url : "getLcOrders?masterLcId="+masterLcId,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			var orderIds = document.getElementById("AddExportInfo_orderNOs1");
			while( orderIds.options.length ){
				orderIds.remove(0);
			}	
		
	for(var i=0; i<data.lcOrders.length; i++ ){			    
	    if(i==0){
		    var option1 = document.createElement("option");					
		    option1.text  = "Select Order";
		    option1.value = null;
		    orderIds.add(option1);
	      }		    	   
		    var option1 = document.createElement("option");					
		    option1.text  = data.lcOrders[i].orderNo;
		    option1.value = data.lcOrders[i].orderNo;
		    orderIds.add(option1);									
		}
	var lcStyles = document.getElementById("lcStyles");
	lcStyles.value=data.lcStyles;
	var bayerName = document.getElementById("exportBuyerName1");
	bayerName.value=data.buyerName;
	var companyName = document.getElementById("exportCompanyName");
	companyName.value=data.companyName;	
	var udNo = document.getElementById("udNo");
	udNo.value=data.udNo;
	var udDate = document.getElementById("udDate");
	udDate.value=data.udDate;
	var shipmentDate1 = document.getElementById("shipmentDate_i18n");
	var shipmentDate2 = document.getElementById("shipmentDate");

	shipmentDate2.value=data.shipmentDateInput;
	//shipmentDate1.value=data.shipmentDate;
	var tenureId = document.getElementById("tenureId");
	tenureId.value=data.tenureId; 
	document.getElementById("currency").innerHTML=data.currency; 
	var tenureId = document.getElementById("tenureId");
	tenureId.value=data.tenureId; 
	document.getElementById("currency").innerHTML=data.currency; 
	document.getElementById("paymentTerm").value=data.paymentTerm;
	document.getElementById("shipmentModeId").value=data.shipmentModeId;
	
	
		}
	
	});

}

function getMaterialListByOrderNo(orderNo){
	if( orderNo ){
		$.ajax({
			url : "getMaterialListByOrderNo",
			type : "POST",
			data : { "orderNo" : orderNo },
			success : function(data){
				var purchaseMaterials = data.merPurchaseMaterialList;
				if( purchaseMaterials ){
					alert(purchaseMaterials[0].styleName);					
				}
			}
		});
	}
}

function salesContactNoJsonData(id, name){
	var searchToken = $("#"+name).val();
//	var orgPartyId = $("#orgPartyId").val();	
//	alert("Search Token: "+searchToken+" Organization Party ID: "+orgPartyId);
		
	$.ajax({
		url: "salesContactNoList",
		type: "POST",
		data: { "searchToken" : searchToken },
		success:function(data){
			var datajson = data.salesContractNoList;
			$("#"+name).autocomplete({
				source: datajson,
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#"+id).val(ui.item.value);
					
					$("#"+name).blur(function(){
						var fieldName = $("#"+name).val();
						if(fieldName == ui.item.label){
							return true;
						}else{
							$("#"+id).val(null);
						}
					});
					loadExporOrderList(ui.item.value);
				}
			});			
		}
	});
}

function removeMasterLcOrder(row, element){
	var exportOrderId = $("#exportOrderId_"+row).val();
	
	if(exportOrderId){
		var confirmed = confirm("Are you sure to remove this record? ");				
		if( confirmed ){
			$.ajax({
				url : "removeExportOrder",
				type : "POST",
				data : { "exportOrderId" : exportOrderId },
				success : function(data){
					if( data._EVENT_MESSAGE_ ){
						$(element).closest('tr').remove();
						getTotalValue();
						getTotalInvoiceValue();
					}
					else if(data._ERROR_MESSAGE_){
						alert("This record can not be removed! \n"+data._ERROR_MESSAGE_);
					}
				}
			});
		}
	}
	else{
		getRemoveOrderValue(row);
		//getTotalValue();
		//getTotalInvoiceValue();
		$(element).closest('tr').remove();
		
	}
}

function getRemoveOrderValue (row){
	var ttlOrderVal =0;
	var orderValue = $('#value_'+row).val();
	var totalOrderValue = $('#totalValue').val();
	ttlOrderVal = totalOrderValue -orderValue;
	$('#totalValue').val(ttlOrderVal);
	//getRemoveOrderValue(orderValue);
}

/*function getRemoveInvoiceValue(orderValue){
	var discount = Number( $("#discount").val() );
	var discountOperator = $("#discountOperator").val();
	var totalInvoiceValue = $('#totalInvoiceValue').val();
	if (discount){
		var calculatedDiscount = 0;
		if(discountOperator == '$'){
			calculatedDiscount = discount;
		}
		else if(discountOperator == '%'){
			calculatedDiscount = (discount / 100) * orderValue;
		}
		
		$("#totalInvoiceValue").val( Number(totalInvoiceValue + calculatedDiscount-orderValue) );
	}
}*/
/*
function loadExporOrderList(masterLcId){
//	alert(masterLcId);
	$.ajax({
		url : "ExportOrderList",
		type : "POST",
		data : { "masterLcId" : masterLcId },
		success : function(data){
			$("#ExporOrderList").html(data);
			numericOnlyFunction();
		}
	});
}
*/
/*function loadExporOrders(element){
	var masterLcId = element.value;
	$.ajax({
		url : "ExportOrderList",
		type : "POST",
		data : { "masterLcId" : masterLcId },
		success : function(data){
			$("#ExporOrderList").html(data);
			numericOnlyFunction();
		}
	});
}*/

function getRowWiseTotal(row){
	var pieceQty = $("#pieceQty_"+row).val();
	var unitPrice = $("#unitPrice_"+row).val();

//	alert("PieceQty: "+pieceQty+" UnitPrice: "+unitPrice);
	
	if(pieceQty && unitPrice){
		var value = Number( pieceQty * unitPrice );
		$("#value_"+row).val(value.toFixed(2));
	}
	
	getTotalValue();
	getTotalInvoiceValue(row);
	
}

function getTotalValue(){
	var total = 0;
	$(".totalValue").each(function(){
		total = total + parseFloat( $(this).val());
	});
	$("#totalValue").val(total.toFixed(2));
}

function getTotalInvoiceValue(row){
	
	var totalInvoiceValue = 0;
	var totalValue = Number( $("#totalValue").val() );
	var handleFee = Number( $("#handleFee").val() );
	var discount = Number( $("#discount").val() );
	var handleFeeOperator = $("#handleFeeOperator").val();
	var discountOperator = $("#discountOperator").val();
	
	var calculatedHandleFee = 0;
	var calculatedDiscount = 0;
	
	var shortQty = $('#shortQty_'+row).val();
	var unitPrice = $('#unitPrice_'+row).val();
	var pieceQty = $('#pieceQty_'+row).val();
	var shortValue;
	if ( !isNaN(shortQty) && !isNaN(unitPrice)) {
		shortValue = shortQty * unitPrice; //alert("TotalVal: "+totalValue+"\nShort VAl: "+shortValue);
		pieceQty = +pieceQty - shortQty;
		var ordrVal = pieceQty * unitPrice;
		totalValue = totalValue - shortValue; //alert("Total: "+totalValue);
		$('#value_'+row).val(ordrVal.toFixed(2));
		$('#totalValue').val(totalValue.toFixed(2));
	}
	
	if(handleFeeOperator == '$'){
		calculatedHandleFee = handleFee;
	}
	else if(handleFeeOperator == '%'){
		calculatedHandleFee = (handleFee / 100) * totalValue;
	}
	
	if(discountOperator == '$'){
		calculatedDiscount = discount;
	}
	else if(discountOperator == '%'){
		calculatedDiscount = (discount / 100) * totalValue;
	}
	
	var totalInvVal = Number(totalValue + calculatedHandleFee - calculatedDiscount);
	$("#totalInvoiceValue").val( totalInvVal.toFixed(2) );
}

function makeCommExpCostTableRow(row){
	$("#commExportCostTable").append(
			'<tr>'
			+	'<td id="clone_costType_'+row+'"><input type="hidden" name="costSeqId" id="costSeqId_'+row+'" /> </td>'
			+	'<td id="clone_operator_'+row+'"><input type="text" name="cost" id="cost_'+row+'" class="allowNumericOnly cost" style="width: 80px;" /> </td>'
			+	'<td><input type="button" value="Save" onclick="saveCommExpCost('+row+', this);" /> <input type="button" value="Remove" onclick="removeCommExpCost('+row+', this);" /></td>'		
	+	'</tr>');
	
	$("#clonableCostType").clone().attr("id", "costType_"+row).appendTo("#clone_costType_"+row);

	numericOnlyFunction();
}

function calculateTtlCommExpCost(){
	var sum = 0;
	$(".cost").each(function(){
		sum = sum + parseFloat( $(this).val() );
	});
	$("#totalCost").text(sum);
}

function saveCommExpCost(row, element){
	
	var costSeqId = $("#costSeqId_"+row).val();	
	var costType = $("#costType_"+row).val();
	var cost = $("#cost_"+row).val();
	var exportId = $("#exportId").val();
	
//	alert("CostSeqId: "+costSeqId+" CostType: "+costType+" Cost: "+cost+" ExportId: "+exportId );
	
	$.ajax({
		url : "crupCommExportCostsIndiv",
		type : "POST",
		data : { "costSeqId" : costSeqId, "costType" : costType, "cost" : cost, "exportId" : exportId },
		success : function(data){
			if( data._EVENT_MESSAGE_ ){
				if( !costSeqId ){
					$("#costSeqId_"+row).val(data.costSeqId);
				}
				alert(data._EVENT_MESSAGE_);
			}
			else if ( data._ERROR_MESSAGE_ ){
				alert(data._ERROR_MESSAGE_);
				if( !costSeqId ){
					$(element).closest('tr').remove();
				}				
			}
		}
	});	
}

function removeCommExpCost(row, element){
	var costSeqId = $("#costSeqId_"+row).val();
	
	if( costSeqId ){
		var confirmed = confirm("Are you sure to remove this record? ");
		
		if( confirmed ){
			$.ajax({
				url : "removeCommExportCosts",
				type : "POST",
				data : { "costSeqId" : costSeqId },
				success : function(data){
					if( data._EVENT_MESSAGE_ ){
						$(element).closest('tr').remove();
					}
					else if(data._ERROR_MESSAGE_){
						alert("This record can not be removed! \n"+data._ERROR_MESSAGE_);
					}
				}
			});
		}
	}
	else{
		$(element).closest('tr').remove();
	}
}
