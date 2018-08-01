$(document).ready(function(){
	$(".entryDatePicker").datepicker({ dateFormat: 'dd/mm/yy' }).val();
	$(".entryDatePicker").datetimepicker({ dateFormat : 'dd/mm/yy' });
});

$(".commonDateTimePicker").datepicker({
		dateFormat : 'dd/mm/yy'
	}).val();
var opts = {
			  lines: 11 // The number of lines to draw
			, length: 30 // The length of each line
			, width: 23 // The line thickness
			, radius: 38 // The radius of the inner circle
			, scale: 1.5 // Scales overall size of the spinner
			, corners: 0.9 // Corner roundness (0..1)
			, color: '#000' // #rgb or #rrggbb or array of colors
			, opacity: 0.25 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 0.5 // Rounds per second
			, trail: 60 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
	}
			var target = document.getElementById('loadingDiv');
			var spinner = new Spinner(opts).spin(target);
			

			target = document.getElementById('waitingDiv');
			spinner = new Spinner().spin(target);
			
			$('#loadingDiv').hide();
			$('#waitingDiv').hide();

	function prottayUICommonPopup(title, containerId, url, height, width) {
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
						$('#loadingDiv').hide();
						$(containerId).css("z-index","24000");
						$(containerId).html(data);
						draggableEvent();
						
						numericOnlyFunction();// numericField
						readonlyFunction();// readonly-field
						characterOnlyFunction();
						yearOnlyFunction();
						//inPercentageOnly();
						
					},
					error : function(){
						$('#loadingDiv').hide();
					}
				});
				$('#loadingDiv').hide();
			}

		});
	}
	function prottayUIDefaultPopup(title, url, height, width) {
		var containerId = '#popupScreenContainer';
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
						$('#loadingDiv').hide();
						$(containerId).html(data);
						draggableEvent();
						
						numericOnlyFunction();// numericField
						readonlyFunction();// readonly-field
						characterOnlyFunction();
						yearOnlyFunction();
						//inPercentageOnly();
						
					},
					error : function(){
						$('#loadingDiv').hide();
					}
				});
				$('#loadingDiv').hide();
			}

		});
	}
	//prottayCommonScreenRenderer("ListScreen?param="+param, "#listContainer");
	function prottayCommonScreenRenderer(url,containerId){
		
		$('#loadingDiv').show();
		$.ajax({
			url: url,
			type: "POST",
			data: {
				
			},
			success:function(data){
				$(containerId).html(data);
				$('#loadingDiv').hide();
			},
			error:function(){
				$('#loadingDiv').hide();
				console.log('Error to render screen')
			}
		});
	}
	//prottayCommonScreenRenderer("ListScreen?param="+param, "#listContainer");
	function prottaySimpleScreenRenderer(url,containerId){
		
		$('#waitingDiv').show();
		$.ajax({
			url: url,
			type: "POST",
			data: {
				
			},
			success:function(data){
				$(containerId).html(data);
				$('#waitingDiv').hide();
			},
			error:function(){
				$('#waitingDiv').hide();
				console.log('Error to render screen')
			}
		});
	}
	function prottaySimpleScreenRenderer(url,containerId){
		
		//$('#loadingDiv').show();
		$.ajax({
			url: url,
			type: "POST",
			data: {
				
			},
			success:function(data){
				$(containerId).html(data);
				//$('#loadingDiv').hide();
			},
			error:function(){
				//$('#loadingDiv').hide();
				console.log('Error to render screen')
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
							// tempAlertMessage(event.keyCode, 100);

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

					// tempAlertMessage(event.keyCode, 100);

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
					tempAlertMessage($(this).val(), 1000);
					//chars = chars + $(this).val();

				});
	}
	function inPercentageOnly() {
		$(".percentageField").on(
				"keyup change",
				function(event) {
					alert($(this).val());
					// tempAlertMessage(event.keyCode, 100);

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
					tempAlertMessage($(this).val(), 1000);
					//chars = chars + $(this).val();

				});
	}
	
	function emergencyNotificationMessage(msg, duration) {
		if ($('#alertMessagediv')) {
			$('#alertMessagediv').html ('');
		}
		var el = document.createElement("alertMessagediv");
		el.setAttribute("style",
						"	z-index: 88; border: 1px solid;border-radius: 10px; position:fixed;top:8%;left:15%;margin-right:5px; font-size:20px;background-color:skyblue;");
		el.innerHTML = msg;
		setTimeout(function() {
			el.parentNode.removeChild(el);
		}, duration);
		document.body.appendChild(el);
		
	}
	//alert(parseInt("44")>4);
	
	//checkEmergencyNotification();
	function checkEmergencyNotification(){
		$.ajax({
			url: "checkEmergencyNotification",
			type: "POST",
			data: {},
			success:function(data){
				var duration = 60000;
				if(data.isVisible == "Y"){
					duration = parseInt(data.duration)*60*1000;
					emergencyNotificationMessage("Emergency Message: "+data.message, duration);
					
				}else{
					console.log("No emergency notification.");
				}
				setTimeout(checkEmergencyNotification, 30000);
			}
		});
	}
	function numericOnlyField(field) {
	    var regExpr = new RegExp("^\d*\.?\d*$");
	    if (!regExpr.test(field.value)) {
	      field.value = "0";
	      alert("Enter Numeric Value");
	    }
	}
	
	
	function processWhenInactive( timeOutMillisecond, functionToBeExecute){
		
		var time = new Date().getTime();
	     $(document.body).bind("mousemove keypress", function(e) {
	         time = new Date().getTime();
	     });
	     
	     function getSetTime(){
		     if(new Date().getTime() - time >= timeOutMillisecond) 
		    	 window[functionToBeExecute]();
	         else 
	             setTimeout(getSetTime, 10000);
	     }
	     setTimeout(getSetTime, 10000);
	}
	String.prototype.toDate = function(format){
		
	  var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
	  var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
	  var formatItems     = normalizedFormat.split('-');
	  var dateItems       = normalized.split('-');

	  var monthIndex  = formatItems.indexOf("mm");
	  var dayIndex    = formatItems.indexOf("dd");
	  var yearIndex   = formatItems.indexOf("yyyy");
	  var hourIndex     = formatItems.indexOf("hh");
	  var minutesIndex  = formatItems.indexOf("ii");
	  var secondsIndex  = formatItems.indexOf("ss");

	  var today = new Date();

	  var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
	  var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
	  var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

	  var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
	  var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
	  var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

	  return new Date(year,month,day,hour,minute,second);
	  
	};
	var dateStr1 = "22/03/2016".toDate("dd/mm/yyyy");
	var dateStr2 = "2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:ii:ss");
	//alert(dateStr1);
	
	
	function stringToDate(_date,_format,_delimiter){
	    var formatLowerCase=_format.toLowerCase();
	    var formatItems=formatLowerCase.split(_delimiter);
	    var dateItems=_date.split(_delimiter);
	    var monthIndex=formatItems.indexOf("mm");
	    var dayIndex=formatItems.indexOf("dd");
	    var yearIndex=formatItems.indexOf("yyyy");
	    var month=parseInt(dateItems[monthIndex]);
	    month-=1;
	    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
	    return formatedDate;
	}
	function dateToString(_date, _deliminator) {
		var dateString = "";

		var date = parseInt(_date.getDate());
		date = date < 10 ? "0" + date : date;

		var month = parseInt(_date.getMonth()) + 1;
		month = month < 10 ? "0" + month : month;

		var year = parseInt(_date.getFullYear());
		year = year < 10 ? "0" + year : year;

		switch (_deliminator) {
		case "/":
			dateString = date + "/" + month + "/" + year;
			break;
		case "-":
			dateString = yar + "-" + month + "-" + date;
			break;

		default:
			var month = parseInt(_date.getMonth()) + 1;
			dateString = date + "/" + month + "/" + year;
			break;
		}
		return dateString;
	}
	function commonAutocompleteAction(url,payload,labelElement,valueElement){
		$.ajax({
			url : url,
			type : "POST",
			async: false,
			data : payload,
			success : function(returnData) {
				var datajson = returnData.jsonDataList;
				//console.log(datajson);
				prottayCommonAutocomplete(labelElement, valueElement, datajson);
			}
		});

	}
	function prottayCommonAutocomplete(labelElement,valueElement,datajson){			
		$(labelElement).autocomplete({
			source : datajson,
			minLength: 0,
			open: function(){
		        setTimeout(function () {
		            $('.ui-autocomplete').css('z-index', 99999999999999);
		        }, 0);
		    },				
			focus : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
			},
			change : function(event, ui) {
				if (ui.item !== undefined && ui.item !== null) {
					var label = $(labelElement).val();
					if (label == ui.item.label) {
						return true;
					} else {
						$(nameElement).val('');
					}
				} else {
					$(labelElement).val('');
					$(valueElement).val('');
				}
			},
			select : function(event, ui) {
				event.preventDefault();
				$(valueElement).val(ui.item.value);
				$(this).val(ui.item.label);
			}
		}).focus(function(){            
		    $(this).autocomplete('search', $(this).val())
		});

	}
	
	function getInitializedJsonData(url, payload) {
		var datajson;
		$.ajax({
			url : url,
			type : "POST",
			data : payload,
			async : false,
			success : function(returnData) {
				datajson = returnData.jsonDataList;
				callback.call(datajson);
			},
			error : function() {
			}
		});
		return datajson;
	}
