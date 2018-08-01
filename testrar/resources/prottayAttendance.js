
	var timer = setInterval(function refreshCurrentEmployeeInfo() {
		var myElem = document.getElementById('golobalCurrentEmpInfodiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "GolobalCurrentEmpInfo", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#golobalCurrentEmpInfodiv").html(data);
					}
				});
			
		}
			
	
 }, 2000);
	
	
	var timer = setInterval(function refreshCurrentEmployeeLog() {
		var myElem = document.getElementById('deviceCurrentEmpStatusdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "DeviceCurrentEmpStatus", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#deviceCurrentEmpStatusdiv").html(data);
					}
				});
			
		}
			
	
 }, 2000);



	var timer = setInterval(function refreshEmployeeLog() {
		var myElem = document.getElementById('employeelogdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "AttendanceList", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#employeelogdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	
	var timer = setInterval(function refreshGateList() {
		var myElem = document.getElementById('gateListdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "GateList", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#gateListdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	
	
	var timer = setInterval(function refreshEmployeesCurrentStatus() {
		var myElem = document.getElementById('empCurrentStatusdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "EmpCurrentStatus", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#empCurrentStatusdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	var timer = setInterval(function refreshEmpCurrentStatus() {
		var myElem = document.getElementById('employeesCurrentStatusdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "EmployeesCurrentStatus", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#employeesCurrentStatusdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	
	
	var timer = setInterval(function refreshFloorList() {
		var myElem = document.getElementById('floorListdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "FloorList", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#floorListdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	var timer = setInterval(function refreshBuildingList() {
		var myElem = document.getElementById('buildingListdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "BuildingList", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#buildingListdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	var timer = setInterval(function refreshDeviceList() {
		var myElem = document.getElementById('deviceListdiv');
		if (myElem != null){ 
				
				$.ajax({
					url : "DeviceList", //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#deviceListdiv").html(data);
					}
				});
			
		}
			
	
 }, 10000);
	
	var timer = setInterval(function refreshEmployeeList() {

		
		var myElem = document.getElementById('employeesdiv');
		if (myElem != null){ 
			
			$.ajax({
				url : "EmployeeList", //This URL view request map
				type : "POST",
				data : getRequestData(),
				success : function(data) {
					$("#employeesdiv").html(data);
				}
			});
		}
		
		
	
 }, 10000);

 
 function getRequestData() {
	var data = {
		"test" : "data"
		
			
	};
	return data;
};

$(document).ready(function() {
	$("#addLocationIcon").click(function() {
		$("#addLocationPopUp").dialog({
			autoOpen : true,
			title : "Add Form",
			height : 225,
			width : 500,
			modal : true,
			open : function() {
				$.ajax({
					url : "AddLocationPopup",
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#addLocationPopUp").html(data);
					}
				});
			}

		});
	});
	$("#addDeviceIcon").click(function() {
		$("#addDevicePopUp").dialog({
			autoOpen : true,
			title : "Add Form",
			height : 500,
			width : 500,
			modal : true,
			open : function() {
				$.ajax({
					url : "AddLocationPopup",
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#addDevicePopUp").html(data);
					}
				});
			}

		});
	});
});


$(document).ready(function() {
	var div1 = document.getElementById('div1');
	var div2 = document.getElementById('div2');
	var employeesCurrentStatusdiv = document
			.getElementById('employeesCurrentStatusdiv');

	$("#deviceCurrentEmpStatusdivMax").click(function() {
		$("#deviceCurrentEmpStatusdiv").animate({
			/*width : 1010*/
		}, 600);

		div1.style.display = 'none';
		div2.style.display = 'none';
		$('.profile-right').css({
			float : 'left',
			height : 'auto',
			width : '100%'
		});

		employeesCurrentStatusdiv.style.display = 'none';
		
		$( "#deviceCurrentEmpStatusdiv" ).addClass( "deviceCurrentEmpStatusCenter" );
		
		$('#deviceCurrentEmpStatusdivMax').hide();
	    $('#deviceCurrentEmpStatusdivMin').show();

	});
});

$(document).ready(function() {
	var div1 = document.getElementById('div1');
	var div2 = document.getElementById('div2');
	var employeesCurrentStatusdiv = document.getElementById('employeesCurrentStatusdiv');
	
	$('#deviceCurrentEmpStatusdivMin').css({
		display : 'none',
	});
	
	$('.screenlet-title-bar ul li').css({
		border : '0',
	});
	
	$("#deviceCurrentEmpStatusdivMin").click(function() {
		$("#deviceCurrentEmpStatusdiv").animate({

			color : "#000",
		}, 100);

		div1.style.display = 'block';
		div2.style.display = 'block';
		employeesCurrentStatusdiv.style.display = 'block';
		$('.profile-right').css({
			float : 'right',
			width : '47%'
		});
		$('#deviceCurrentEmpStatusdivMax').show();
	    $('#deviceCurrentEmpStatusdivMin').hide();
	    $( ".deviceCurrentEmpStatusCenter" ).switchClass( "deviceCurrentEmpStatusCenter", "temp", 10 )
	});
});


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

function prottayHolidayPopup(title,containerId,url,height,width){
	
	
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
					jQuery(document).ready(function() {
						
						if(document.getElementById("AddAltHolidayEmplForm_employeeId")){
							var selectedValue = $( "#AddAltHolidayEmplForm_employeeId option:selected" ).val();
						    if(selectedValue!=null){    
						    	toggleCheck(selectedValue);
						    }
						    $('#AddAltHolidayEmplForm_employeeId').tokenize({					    
							     nbDropdownElements:10,
							     searchType:'STARTS_WITH,ENDS_WITH',
						         onAddToken: function(value, text, e){ 
						         },onRemoveToken: function(value, e){    
						         }
						    	});
						    $("div.Tokenize ul.TokensContainer").css("height", "305px");
						    $("div.Tokenize ul.TokensContainer").css("width", "740px"); 


						}
						if(document.getElementById("AddAltHolidayEmplForm2_employeeId")){
							var selectedValue = $( "#AddAltHolidayEmplForm2_employeeId option:selected" ).val();
						    if(selectedValue!=null){    
						    	toggleCheck(selectedValue);
						    }
						    $('#AddAltHolidayEmplForm2_employeeId').tokenize({					    
							     nbDropdownElements:10,
							     searchType:'STARTS_WITH,ENDS_WITH',
						         onAddToken: function(value, text, e){ 
						         },onRemoveToken: function(value, e){    
						         }
						    	});
						    $("div.Tokenize ul.TokensContainer").css("height", "220px"); 

						}
						
					});
				}
			});
		}

	});
}

function prottayPopupAttenEdit(title,containerId,url,height,width){
	
	
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
				
						 /*For Employee Attendance Preference*/
						 $('#EmployeeAttendancePreferenceForm_entryTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_exitTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_lunchTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_maximumStayTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_lateEntryTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_earlyOutTime').timepicker();

						 $('#EmployeeAttendancePreferenceForm_oTStartTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_oTEndTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_extraOTStartTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_extraOTEndTime').timepicker();
						 
						 $('#EmployeeAttendancePreferenceForm_firstTiffinStartTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_firstTiffinEndTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_secondTiffinStartTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_secondTiffinEndTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_nightStartTime').timepicker();
						 $('#EmployeeAttendancePreferenceForm_nightEndTime').timepicker();
		
						 
						 /*For Employee Attendance Day Preference*/
						 $('#DayAttendancePreferenceForm_entryTime').timepicker();
						 $('#DayAttendancePreferenceForm_exitTime').timepicker();
						 $('#DayAttendancePreferenceForm_lunchTime').timepicker();
						 $('#DayAttendancePreferenceForm_maximumStayTime').timepicker();
						 $('#DayAttendancePreferenceForm_lateEntryTime').timepicker();
						 $('#DayAttendancePreferenceForm_earlyOutTime').timepicker();
						 
						 $('#DayAttendancePreferenceForm_oTStartTime').timepicker();
						 $('#DayAttendancePreferenceForm_oTEndTime').timepicker();
						 $('#DayAttendancePreferenceForm_extraOTStartTime').timepicker();
						 $('#DayAttendancePreferenceForm_extraOTEndTime').timepicker();
						 $('#DayAttendancePreferenceForm_extraOTAddStartTime').timepicker();
						 $('#DayAttendancePreferenceForm_extraOTAddEndTime').timepicker();
						 
						 $('#DayAttendancePreferenceForm_firstTiffinStartTime').timepicker();
						 $('#DayAttendancePreferenceForm_firstTiffinEndTime').timepicker();
						 $('#DayAttendancePreferenceForm_secondTiffinStartTime').timepicker();
						 $('#DayAttendancePreferenceForm_secondTiffinEndTime').timepicker();
						 $('#DayAttendancePreferenceForm_nightStartTime').timepicker();
						 $('#DayAttendancePreferenceForm_nightEndTime').timepicker();
						
						 /*For Employee Attendance Organization Preference*/
						 $('#OrganizationPreferenceForm_entryTime').timepicker();
						 $('#OrganizationPreferenceForm_exitTime').timepicker();
						 $('#OrganizationPreferenceForm_lunchTime').timepicker();
						 $('#OrganizationPreferenceForm_maximumStayTime').timepicker();
						 $('#OrganizationPreferenceForm_lateEntryTime').timepicker();
						 $('#OrganizationPreferenceForm_earlyOutTime').timepicker();
						 $('#OrganizationPreferenceForm_oTStartTime').timepicker();
						 $('#OrganizationPreferenceForm_oTEndTime').timepicker();
						 $('#OrganizationPreferenceForm_extraOTStartTime').timepicker();
						 $('#OrganizationPreferenceForm_extraOTEndTime').timepicker();
						 $('#OrganizationPreferenceForm_extraOTAddStartTime').timepicker();
						 $('#OrganizationPreferenceForm_extraOTAddEndTime').timepicker();
						 
						 $('#OrganizationPreferenceForm_firstTiffinStartTime').timepicker();
						 $('#OrganizationPreferenceForm_firstTiffinEndTime').timepicker();
						 $('#OrganizationPreferenceForm_secondTiffinStartTime').timepicker();
						 $('#OrganizationPreferenceForm_secondTiffinEndTime').timepicker();
						 $('#OrganizationPreferenceForm_nightStartTime').timepicker();
						 $('#OrganizationPreferenceForm_nightEndTime').timepicker();
						 $('#half_Day_Morning_Start').timepicker();
						 $('#half_Day_Morning_End').timepicker();
						 $('#half_Day_Evening_Start').timepicker();
						 $('#half_Day_Evening_End').timepicker();
						 
						 /*For Roster Preference*/
						 $('#RosterPreferenceForm_rosterStartTime').timepicker();
						 $('#RosterPreferenceForm_rosterEndTime').timepicker();
						 $('#RosterPreferenceForm_entryTime').timepicker();
						 $('#RosterPreferenceForm_exitTime').timepicker();
						 $('#RosterPreferenceForm_lunchTime').timepicker();
						 $('#RosterPreferenceForm_maximumStayTime').timepicker();
						 $('#RosterPreferenceForm_lateEntryTime').timepicker();
						 $('#RosterPreferenceForm_earlyOutTime').timepicker();
						 $('#RosterPreferenceForm_oTStartTime').timepicker();
						 $('#RosterPreferenceForm_oTEndTime').timepicker();
						 $('#RosterPreferenceForm_extraOTStartTime').timepicker();
						 $('#RosterPreferenceForm_extraOTEndTime').timepicker();
						 $('#RosterPreferenceForm_extraOTAddStartTime').timepicker();
						 $('#RosterPreferenceForm_extraOTAddEndTime').timepicker();
						 
						 $('#RosterPreferenceForm_firstTiffinStartTime').timepicker();
						 $('#RosterPreferenceForm_firstTiffinEndTime').timepicker();
						 $('#RosterPreferenceForm_secondTiffinStartTime').timepicker();
						 $('#RosterPreferenceForm_secondTiffinEndTime').timepicker();
						 $('#RosterPreferenceForm_nightStartTime').timepicker();
						 $('#RosterPreferenceForm_nightEndTime').timepicker();
						 	
							
						 
						 
						 /*For Designation Preference*/
						 $('#entryTime').timepicker();
						 $('#exitTime').timepicker();
						 $('#lunchTime').timepicker();
						 $('#maximumStayTime').timepicker();
						 $('#lateEntryTime').timepicker();
						 $('#earlyOutTime').timepicker();
						 $('#oTStartTime').timepicker();
						 $('#oTEndTime').timepicker();
						 $('#extraOTStartTime').timepicker();
						 $('#extraOTEndTime').timepicker();
						 $('#firstTiffinStartTime').timepicker();
						 $('#firstTiffinEndTime').timepicker();
						 $('#secondTiffinStartTime').timepicker();
						 $('#secondTiffinEndTime').timepicker();
						 $('#nightStartTime').timepicker();
						 $('#nightEndTime').timepicker();
		 
						 $('#lunchStartTime').timepicker();
						 $('#lunchEndTime').timepicker();
						 
						 $('#extraOTAddEndTime').timepicker();
						 $('#extraOTAddStartTime').timepicker();
	
	
						
						/*For Attendance Employee Preference */
						NumericOnly("EmployeeAttendancePreferenceForm_oTCalculationOperand");
						NumericOnly("EmployeeAttendancePreferenceForm_bonusDeductionAmount");
						NumericOnly("EmployeeAttendancePreferenceForm_yearlyBonusAmount");
						NumericOnly("EmployeeAttendancePreferenceForm_montlyBonusAmount");
						NumericOnly("EmployeeAttendancePreferenceForm_lateEntryDaysForAttenBonusDisable");
						NumericOnly("EmployeeAttendancePreferenceForm_lateEntryDaysForAttenBonusDeduction");
						NumericOnly("EmployeeAttendancePreferenceForm_yearlyLateEntryDaysForAttenBonusDisable");
						NumericOnly("EmployeeAttendancePreferenceForm_yearlylateEntryDaysForAttenBonusDeduction");
						NumericOnly("EmployeeAttendancePreferenceForm_lunchDuration");
						
						/*For Attendance Day Preference */
						NumericOnly("DayAttendancePreferenceForm_oTCalculationOperand");
						NumericOnly("DayAttendancePreferenceForm_bonusDeductionAmount");
						NumericOnly("DayAttendancePreferenceForm_yearlyBonusAmount");
						NumericOnly("DayAttendancePreferenceForm_montlyBonusAmount");
						NumericOnly("DayAttendancePreferenceForm_lateEntryDaysForAttenBonusDisable");
						NumericOnly("DayAttendancePreferenceForm_lateEntryDaysForAttenBonusDeduction");
						NumericOnly("DayAttendancePreferenceForm_lunchDuration");
						
						/*For Attendance Organization Preference */
						NumericOnly("OrganizationPreferenceForm_montlyBonusAmount");
						NumericOnly("OrganizationPreferenceForm_YearlyBonusAmount");
						NumericOnly("OrganizationPreferenceForm_bonusDeductionAmount");
						NumericOnly("OrganizationPreferenceForm_oTCalculationOperand");
						NumericOnly("OrganizationPreferenceForm_lateEntryDaysForAttenBonusDisable");
						NumericOnly("OrganizationPreferenceForm_lateEntryDaysForAttenBonusDeduction");
						NumericOnly("OrganizationPreferenceForm_yearlyLateEntryDaysForAttenBonusDisable");
						NumericOnly("OrganizationPreferenceForm_yearlylateEntryDaysForAttenBonusDeduction");
						NumericOnly("OrganizationPreferenceForm_yearlyBonusAmount");
						NumericOnly("OrganizationPreferenceForm_lunchDuration");
						
						
						/*For Roster Preference */
						NumericOnly("RosterPreferenceForm_montlyBonusAmount");
						NumericOnly("RosterPreferenceForm_YearlyBonusAmount");
						NumericOnly("RosterPreferenceForm_bonusDeductionAmount");
						NumericOnly("RosterPreferenceForm_oTCalculationOperand");
						NumericOnly("RosterPreferenceForm_lateEntryForAttenBonusDisable");
						NumericOnly("RosterPreferenceForm_lateEntryForAttenBonusDeduction");
						NumericOnly("RosterPreferenceForm_lateEntryDaysForAttenBonusDisable");
						NumericOnly("RosterPreferenceForm_lateEntryDaysForAttenBonusDeduction");
						NumericOnly("RosterPreferenceForm_yearlyLateEntryDaysForAttenBonusDisable");
						NumericOnly("RosterPreferenceForm_yearlylateEntryDaysForAttenBonusDeduction");
						NumericOnly("RosterPreferenceForm_yearlyBonusAmount");
						
							
						NumericOnly("RosterPreferenceForm_lunchDuration");
						
						NumericOnly("firstTiffinRate");
						NumericOnly("secondTiffinRate");
						NumericOnly("nightRate");
						NumericOnly("attBonDeductAmnt");
						NumericOnly("confirmationAfter");
						NumericOnly("lateEntryDaysForAttenBonusDisable");
						NumericOnly("lateEntryDaysForAttenBonusDeduction");
						NumericOnly("yearlyLateEntryDaysForAttenBonusDisable");
						NumericOnly("yearlylateEntryDaysForAttenBonusDeduction");
						NumericOnly("montlyBonusAmount");
						NumericOnly("yearlyBonusAmount");
						NumericOnly("bonusDeductionAmount");
						NumericOnly("oTCalculationOperand");
						
						NumericOnly("leOrAbsForattbnDis");
						NumericOnly("halfLesForattbnDed");
						NumericOnly("lunchDuration");
			
					//});
				}
			});
		}
	
	});
	

}

$(document).ready(function() {
	$("#addEmpPreferenceIcon").click(function() {
		prottayPopupAttenEdit('Add Employee Preference','#editEmployeePreference','EditEmpPreference?&title=Add Employee Preference','650','850');
	});
});

$(document).ready(function() {
	$("#addAltHolidayIcon").click(function() {
		prottayPopupAttenEdit('Add Alternate Holiday','#editAltHoliday','AddAlternateHoliday?&title=Add Alternate Holiday','450','900');
	});
});
$(document).ready(function() {
	/*	$("#FindDailyLateReport1_fromTime").click(function() {*/
			$('#FindDailyLateReport1_fromTime').timepicker({ 'timeFormat': 'H:i' });
			$('#FindDailyLateReport1_toTime').timepicker({ 'timeFormat': 'H:i' });
	/*	});*/
	});
	
$(document).ready(function() {
	/*	$("#FindThreeDaysLate_fromTime").click(function() {*/
			$('#FindThreeDaysLate_fromTime').timepicker({ 'timeFormat': 'H:i' });
			$('#FindThreeDaysLate_toTime').timepicker({ 'timeFormat': 'H:i' });
	/*	});*/
	});
$(document).ready(function() {
	$("#addDayPreferenceIcon").click(function() {
		prottayPopupAttenEdit('Add Day Preference','#editDayPreference','EditDayPreference?&title=Add Day Preference','650','750');
		
	});
});

$(document).ready(function() {
	$("#addOrgPreferenceIcon").click(function() {
		prottayPopupAttenEdit('Add Organization Preference','#editOrgPreference','EditOrgPreference?&title=Add Organization Preference','650','650');
		
	});
});

$(document).ready(function() {
	$("#addRosterIcon").click(function() {
		prottayPopupAttenEdit('Add Roster','#editRoster','EditRoster?&title=Add Roster ','170','400');
		
	});
});
$(document).ready(function() {
	$("#addHolidayRosterIcon").click(function() {
		prottayPopupAttenEdit('Add Holiday Roster','#editHolidayRoster','EditHolidayRoster?&title=Add Holiday Roster ','170','400');
		
	});
});
$(document).ready(function() {
	$("#addNoteTypesIcon").click(function() {
		prottayPopupAttenEdit('Add Note Type','#editNoteTypes','EditNoteTypes?&title=Add Note Type ','190','400');
		
	});
});

$(document).ready(function() {
	$("#addRosPreferenceIcon").click(function() {
		prottayPopupAttenEdit('Add Roster Preference','#editRosterPreference','EditRosterPreference?&title=Add Roster Preference','650','700');
		
	});
});

$(document).ready(function() {
	$("#addDesignationPreferenceIcon").click(function() {
		prottayPopupAttenEdit('Add Designation Preference','#editDesignationPreference','AddDesignationPreference','650','650');
		
	});
});

$(document).ready(function() {
	$("#addEmployeeIcon").click(function() {
		var rosterPreferenceId = document.getElementById('RosterPreIdForm_rosterPreferenceId').value;
		var rosterPrefRevision = document.getElementById('RosterPreIdForm_rosterPrefRevision').value;
		var rosterName = document.getElementById('RosterPreIdForm_rosterName').value;
		var url= "AddEmployeeIntoRoster?rosterPreferenceId="+rosterPreferenceId+"&rosterPrefRevision="+rosterPrefRevision+"&rosterName="+rosterName;
	
		prottayPopup('Add Employee Into Roster','#addRosterEmpContainer',url,'310','450');
		
	});
	
	$("#addHldEmployeeIcon").click(function() {
		var rosterPreferenceId = document.getElementById('RosterPreIdForm_rosterPreferenceId').value;
		var rosterPrefRevision = document.getElementById('RosterPreIdForm_rosterPrefRevision').value;
		var rosterName = document.getElementById('RosterPreIdForm_rosterName').value;
		var url= "AddHldEmployeeIntoRoster?rosterPreferenceId="+rosterPreferenceId+"&rosterPrefRevision="+rosterPrefRevision+"&rosterName="+rosterName;
	
		prottayHolidayPopup('Add Employee Into Holiday Roster','#addRosterEmpContainer',url,'420','820');
		
	});
});


$(document).ready(function() {
	$("#addPositionIcon").click(function() {
		var designationPreferenceId = document.getElementById('DesignationPreIdForm_designationPreferenceId').value;
		var url= "AddPositionIntoDesignationPreference?designationPreferenceId="+designationPreferenceId;
		prottayPopup('Add Postion Into Designation Preference','#addPosition',url,'450','800');
	});
});

$(document).ready(function() {
	$("#addBatchPositionIcon").click(function() {
		var designationPreferenceId = document.getElementById('DesignationPreIdForm_designationPreferenceId').value;
		var url= "AddBatchPositionIntoDesignationPreference?designationPreferenceId="+designationPreferenceId;
		prottayPopup('Add Bacth Position Into Designation Preference','#addBatchPosition',url,'310','450');
		
	});
});


$(document).ready(function() {
	$('#a').datepicker( {
	    changeMonth: true,
	    changeYear: true,
	    showButtonPanel: true,
	    
	    dateFormat: 'MM yy',
	    onClose: function(dateText, inst) { 
	        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	        $(this).datepicker('setDate', new Date(year, month, 1));
	    }
	
	
	});

	$('#a').datepicker('widget').addClass( "ui-month-only" );
	

});
$(document).ready(function() {
	$('input[name="deviceName"]').change(function(e) {
	    alert( $(this).val() ); 
	    alert( $('input[name="deviceName"]').val() ); 
	});


});

$(document).ready(function() {
});
function getFieldsForAddDevice(deviceNameParam){
	//alert(document.getElementById('pegasusAddress'));	
	if(deviceNameParam=='Pegasus'){
		$('#pegasusAddress').attr('disabled', false);
		$('#terminalType').attr('disabled', true);
		$('#firmewareVersion').attr('disabled', true);
		$('#fliVersion').attr('disabled', true);
		$('#userName').attr('disabled', true);
		$('#userPass').attr('disabled', true);
		$('#endPointIP').attr('disabled', true);
		$('#agentVersion').attr('disabled', true);
		$('#type').attr('disabled', true);
	}
	if(deviceNameParam=='Actatek'){
		$('#pegasusAddress').attr('disabled', true);
		$('#terminalType').attr('disabled', false);
		$('#firmewareVersion').attr('disabled', false);
		$('#fliVersion').attr('disabled', false);
		$('#userName').attr('disabled', false);
		$('#userPass').attr('disabled', false);
		$('#endPointIP').attr('disabled', false);
		$('#agentVersion').attr('disabled', false);
		$('#type').attr('disabled', false);
	}
}

$(document).ready(function() {
	$("#timelinePopup").click(function() {
		//var custRequestId = document.getElementById('FilterCalendarEvents_custRequestId').value;
		var orderId = document.getElementById('FilterCalendarEvents_orderId').value;
	
		$("#timelineContainer").dialog({
			autoOpen : true,
			title : "Time Line View",
			height : 700,
			width : 1000,
			modal : true,
			open : function() {
				$.ajax({
					//url : "TimelinePopup?custRequestId="+custRequestId+"&orderId="+orderId,
					url : "TimelinePopup?orderId="+orderId,
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#timelineContainer").html(data);
					}
				});
			
			     $('#eventTimeline').b1njTimeline({
			                'height' : 550
			      });
	       		
			}

		});
	});
});


$(document).ready(function() {
	
	NumericOnly("chargeAmount");
	$('#inTime').timepicker({
		'step': '10',
		'minTime': '0:00',
		'maxTime': '23:59',
		'timeFormat': 'H:i',
    });
	$('#outTime').timepicker({
		'step': '10',
		'minTime': '0:00',
		'maxTime': '23:59',
		'timeFormat': 'H:i',
    });
		
});

$(document).ready(function() {
	$("#RosterEmployeeListForm_swap_title").click(function() {
		var rosterListLength = document.getElementById('listLength_o_0').value;
		var rosterPreferenceId = document.getElementById('rosterPreferenceId_o_0').value;
		var rosterPrefRevision = document.getElementById('rosterRevision_o_0').value;
		var orgPartyId = document.getElementById('orgPartyId_o_0').value;
		var rosterName = document.getElementById('rosterName_o_0').value;
		var partyId ="";
		var rosterEmpRevesion="";
		var employeeId="";
		var employeeFullName="";
		var flag=false;
		if(rosterListLength>200){
			rosterListLength=200;
		}
		
		for(i=0;i<rosterListLength;i++){
			if(document.getElementById("RosterEmployeeListForm_swap_o_"+i).checked==true){
				if(partyId!=null && partyId!=""){
					partyId=partyId+","+document.getElementById("RosterEmployeeListForm_partyId_o_"+i).value;
				}else{
					partyId=document.getElementById("RosterEmployeeListForm_partyId_o_"+i).value;
				}
				if(employeeId!=null && employeeId!=""){
					employeeId=employeeId+","+document.getElementById("RosterEmployeeListForm_employeeId_o_"+i).value;
				}else{
					employeeId=document.getElementById("RosterEmployeeListForm_employeeId_o_"+i).value;
				}	
				
				if(employeeFullName!=null && employeeFullName!=""){
					employeeFullName=employeeFullName+","+document.getElementById("RosterEmployeeListForm_employeeFullName_o_"+i).value;
				}else{
					employeeFullName=document.getElementById("RosterEmployeeListForm_employeeFullName_o_"+i).value;
				}	
				flag=true;
			}
		}
		if(flag){
			url="SwapEmployeeBtnRoster?rosterPreferenceId="+rosterPreferenceId+"&rosterPrefRevision="+rosterPrefRevision+"&orgPartyId="+orgPartyId+"&rosterName="+rosterName+"&partyId="+partyId+"&rosterEmpRevesion="+rosterEmpRevesion+"&employeeFullName="+employeeFullName+"&employeeId="+employeeId;;
			prottayPopup('Swap Employee Between Roster','#addRosterEmpContainer',url,'350','350');
		}
/*		alert(rosterPreferenceId);
		if(document.getElementById("RosterEmployeeListForm_swap_o_0").checked==true){
			prottayPopup('Swap Employee Between Roster','#addRosterEmpContainer','SwapEmployeeBtnRoster?&amp;rosterPreferenceId=${rosterPreferenceId}&amp;rosterPrefRevision=${rosterPrefRevision}&amp;orgPartyId=${orgPartyId}&amp;rosterName=${rosterName}&amp;partyId=${partyId}&amp;rosterEmpRevesion=${rosterEmpRevesion}&amp;employeeFullName=${employeeFullName}&amp;employeeId=${employeeId}','350','350');
		};*/
		
		
	});
});

$(document).ready(function() {
	$("#addAuditIcon").click(function() {
		prottayPopupAuditEdit('Audit Time Setting','#editAuditSetting','AddAuditTimeSetting?&title=Audit Time Setting','340','650');
		
	});
});

function prottayPopupAuditEdit(title,containerId,url,height,width){
		
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
					 $('#AuditTimeSettingForm_startTime').timepicker();
					 $('#AuditTimeSettingForm_endTime').timepicker();
					 NumericOnly("AuditTimeSettingForm_beforeTimeDuration");
					 NumericOnly("AuditTimeSettingForm_afterTimeDuration");
	
				}
			});
		}
	
	});
	

}


function getEmployeeFromRoster(value){
	
		$.ajax({
			url : "getEmployeeFromRoster?rosterPreferenceId="+value,
			type : "GET",
			data : getRequestData(),
			success : function(data){
				if(document.getElementById("JobCardMulti_employeeId")){
					$("#JobCardMulti_employeeId").replaceWith($('<div>').attr({ id: 'JobCardMulti_employeeId', name: 'employeeId', value: 'JobCardMulti_employeeId'}));
					if(Object.keys(data.partyList).length > 0){
						for(var i=0;i<data.partyList.length;i++){
							var employeeId = data.partyList[i].employeeId;
							$("#JobCardMulti_employeeId").append('<input type="checkbox" id="' + employeeId +'" value="'+ employeeId+ '" name="employeeId" '+"checked"+'> <label for=' + employeeId +'>'+ employeeId+ '</label>');
						}
					}
				}
				//tomal mahdi
				if(document.getElementById("AddAlternateHolidayForm_employeeId")){
					$("#AddAlternateHolidayForm_employeeId").replaceWith($('<div>').attr({ id: 'AddAlternateHolidayForm_employeeId', name: 'employeeId', value: 'AddAlternateHolidayForm_employeeId'}));
					if(Object.keys(data.partyList).length > 0){
						for(var i=0;i<data.partyList.length;i++){
							var employeeId = data.partyList[i].employeeId;
							$("#AddAlternateHolidayForm_employeeId").append('<input type="checkbox" id="' + employeeId +'" value="'+ employeeId+ '" name="employeeId" '+"checked"+'> <label for=' + employeeId +'>'+ employeeId+ '</label>');
						}
					}
				}

				
			}
		});
}
jQuery(document).ready(function() {
	if(document.getElementById("JobCardMulti_employeeId"))
	{
		$("#JobCardMulti_employeeId").replaceWith($('<div>').attr({ id: 'JobCardMulti_employeeId', name: 'employeeId', value: 'JobCardMulti_employeeId'}));
	}
});


//tomal mahdi
function getEmployeeFromRosterHolidayWise(value){
	
	//AddAlternateHolidayForm_holiday_i18n
	var holiday = $("#AddAlternateHolidayForm_holiday_i18n").val();
	if(holiday == '' || holiday == null ){
		alert("You must have to select holiday.");
		/*var select = $("#AddAlternateHolidayForm_rosterPreferenceId");*/
		$('#AddAlternateHolidayForm_rosterPreferenceId').val(1);
	}else{
		$.ajax({
			url : "getEmployeeFromRosterHolidayWise?rosterPreferenceId="+value+"&holiday="+holiday,
			type : "GET",
			data : getRequestData(),
			success : function(data){
				if(document.getElementById("AddAlternateHolidayForm_employeeId")){
					$("#AddAlternateHolidayForm_employeeId").replaceWith($('<div>').attr({ id: 'AddAlternateHolidayForm_employeeId', name: 'employeeId', value: 'AddAlternateHolidayForm_employeeId'}));
					if(Object.keys(data.partyList).length > 0){
						for(var i=0;i<data.partyList.length;i++){
							var employeeId = data.partyList[i].employeeId;
							//$("#AddAlternateHolidayForm_employeeId").append('<span style="border: .5px solid #D8D8D8;color: #107EA3;"><input type="checkbox" id="' + employeeId +'" value="'+ employeeId+ '" name="employeeId" '+"checked"+'> <label for=' + employeeId +'>'+ employeeId+ '</label></span>'+'</span>&nbsp;');
							$("#AddAlternateHolidayForm_employeeId").append('<span style="border: .5px solid #D8D8D8;color: #107EA3;"><input type="checkbox" id="' + employeeId +'" value="'+ employeeId+ '" name="employeeId" > <label for=' + employeeId +'>'+ employeeId+ '</label></span>'+'</span>&nbsp;');

						}
					}
				}
			/*	$('#checkId').click(function(){
					var status = $("#checkId").val();
					alert(status);
					if(status=="Y"){
						$("input:checkbox").attr('checked', true);	
					}else{
						$("input:checkbox").attr('checked', false);		
					}
				  });*/
			   
				
			}
		});
	}
	
}


function checkUncheckAll(value){
	
	if(document.getElementById("checkId").checked){
		
		$("input:checkbox").attr('checked', true);	
	}else{
		$("input:checkbox").attr('checked', false);	
	}

}

//tomal mahdi
function holidayCheckForValidation(value,orgPartyId){
	var company = orgPartyId.value;
	$.ajax({
		
		url : "holidayCheckForValidation?date="+value+"&orgPartyId="+company,
		type : "GET",
		data : getRequestData(),
		success : function(data){
			//alert(data.result);
			if(data.result != "success"){
				alert("no holiday found at this date");
				$("#AddAlternateHolidayForm_holiday_i18n").val('');
				$("#AddAltHolidayEmplForm_holiday_i18n").val('');
				
			}
		}
	});
}
//tomal mahdi
function viewAlternateHolidayEmplList(rosterPrefId,holiday,alternateHoliday){
	
	//alert(rosterPrefId+' '+holiday+' '+alternateHoliday);
	viewAlternateHolidayEmplListPopUp('Edit Employee for Alternate Holiday','#editAltHoliday','viewAlternateHolidayEmplList?&rosterPrefId='+rosterPrefId+"&holiday="+holiday+"&alternateHoliday="+alternateHoliday,'450','900');
}
//tomal mahdi
function viewAlternateHolidayEmplListPopUp(title,containerId,url,height,width){
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
					//cal for data collection ...
					//alert('dsd');
					var orgPartyId = $("#ViewAlternateHolidayForm_orgPartyId").val();
					var rosterPrefId = $("#ViewAlternateHolidayForm_rosterPrefId").val();
					var holiday = $("#ViewAlternateHolidayForm_holiday").val();
					var alternateHoliday = $("#ViewAlternateHolidayForm_alternateHoliday").val();
					//alert(orgPartyId+' '+rosterPrefId);
					$.ajax({	
						url : "findEmplListForAlternateHoliday?orgPartyId="+orgPartyId+"&rosterPrefId="+rosterPrefId+"&holiday="+holiday+"&alternateHoliday="+alternateHoliday,
						type : "GET",
						data : getRequestData(),
						success : function(data1) {
							//alert(data1.resultList);
							$("#ViewAlternateHolidayForm_employeeId").replaceWith($('<div>').attr({ id: 'ViewAlternateHolidayForm_employeeId', name: 'employeeId', value: 'ViewAlternateHolidayForm_employeeId' }));
							count=0;
							for(var i = 0 ; i <data1.resultList.length;i++){
								//alert(data1.resultList[i].employeeId);
								var idVal = data1.resultList[i].employeeId + i + "";
								var ValueVal = data1.resultList[i].employeeId;
								var isChecked = data1.resultList[i].value;
								/*alert(idVal+" "+ValueVal);*/
								if(isChecked == 'Y'){
							
								$("#ViewAlternateHolidayForm_employeeId").append('<span style="border: .5px solid #CCD5E3;color: #107EA3;"><input type="checkbox" id="' + idVal +'" checked value="'+ ValueVal+ '" name="employeeId" '+""+'><span><label for=' + ValueVal +'>'+ ValueVal+ '</label></span>'+'</span>&nbsp;');
									

								//	$("#ViewAlternateHolidayForm_employeeId").append('<input type="checkbox" id="' + idVal +'" checked value="'+ ValueVal+ '" name="employeeId" '+""+'> <label for=' + ValueVal +'>'+ ValueVal+ '</label>');
									
								}else{
									$("#ViewAlternateHolidayForm_employeeId").append('<span style="border: .5px solid #CCD5E3;color: #107EA3;"><input type="checkbox" id="' + idVal +'" value="'+ ValueVal+ '" name="employeeId" '+""+'> <label for=' + ValueVal +'>'+ ValueVal+ '</label>'+'</span>&nbsp;');
									count=1;
								}
								
							}
							if(count==0){
								document.getElementById("checkId").checked=true;	
							}
							$("#ViewAlternateHolidayForm_employeeId").append('</div>');
							
							
						}
					});
					
				
					
				}
			});
		}
	
	});
}



/*
 * 
 * 
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
				$("#AddUdInfo_totGarQuantity").val(totalQuantityValue);
				
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
				$("#AddUdInfo_orderNos").append('<col width='+"200"+'><col width='+"300"+'>');
				//add table header row ...
				$("#AddUdInfo_orderNos").append('<tr>');
				$("#AddUdInfo_orderNos").append('<th>order no</th><th>consumption</th>');
				$("#AddUdInfo_orderNos").append('</tr>');
				for(var i=0;i<data.orderForConsumption.length;i++){
					
					var lcOrderId = data.orderForConsumption[i].lcOrderId;
					var orderNo = data.orderForConsumption[i].orderNo;
					lcOrderId = lcOrderId.trim();
					orderNo = orderNo.trim();
					var lcOrderIdG = lcOrderId+"";
					var consumptionsG = lcOrderId+1000+"";
					var lcValSep = ",";
					$("#AddUdInfo_orderNos").append('<tr>');
					// for 1st col...
					$("#AddUdInfo_orderNos").append('<td><input type="checkbox" id="' + lcOrderIdG +'" value="'+ lcOrderId+lcValSep+orderNo+ '" name="orderNos" '+""+'> <label for=' + lcOrderIdG +'>'+ orderNo+ '</label></td>');
					//$("#AddUdInfo_btbLcId").append('<label for=' + btbLcIdG +'>'+ btbLcNo+ '</label></td>');
					// for 2nd col...
					$("#AddUdInfo_orderNos").append('<td><input type="text" id="' + consumptionsG +'" name="consumptions" '+""+'onkeyup="udOrderConsumptionValidation('+lcOrderIdG+","+consumptionsG+')"'+'></td>');
					$("#AddUdInfo_orderNos").append('</tr>');
				}
				$("#AddUdInfo_orderNos").append('<table>');
				
				// for previous udOrderConsumptionInfo
				for(var i=0;i<data.udOrderConsumptionInfo.length;i++){
					var lcOrderId = data.udOrderConsumptionInfo[i].lcOrderId;
					var consumptionValue = data.udOrderConsumptionInfo[i].consumptionValue;
					var lcOrderIdInputField = document.getElementById(lcOrderId+"");
					lcOrderIdInputField.checked = true;
					document.getElementById(lcOrderId+1000+"").value = consumptionValue;
				}
				
				
				
				//set values in fields ....
				var garmentsQuan = document.getElementById("AddUdInfo_garQuantity").value;
				var udValue = document.getElementById("AddUdInfo_udValue").value;
				if(udId=='') return 0;
				if(udId=='undefined') return 0;
				if(udId==null) return 0;
				checkTotalGarmentsQuantity(form,garmentsQuan);
				checkTotalUdValues(form,udValue);
			}
		});
		
 * 
 **/

function getPreferenceValues(value){
	$.ajax({
		url : "getRosterPreferenceValues?rosterPreferenceId="+value,
		type : "GET",
		data : getRequestData(),
		success : function(data){ 
		
			var preferenceId ="",rosterPreferenceId="",rosterPrefRevision="",orgPartyId="",rosterName="";
			var rosterStartTime="",rosterEndTime="",oTallowances="",attendanceBonusAllowances="",extraOTallowances="";
			var entryTime="",exitTime="",lunchDuration="",lunchTime="",maximumStayTime="",lateEntryTime="",earlyOutTime="";
			var oTStartTime="",oTEndTime = "",extraOTStartTime="",extraOTEndTime="",firstTiffinStartTime="",firstTiffinEndTime="";
			var secondTiffinStartTime="",secondTiffinEndTime="",nightStartTime="",nightEndTime="",firstTiffinRate="";
			var secondTiffinRate="",nightRate="",leOrAbsForattbnDis="",halfLesForattbnDed="",lunchStartTime=""; 
			var lunchEndTime="",lateEntryDaysForAttenBonusDisable="",lateEntryDaysForAttenBonusDeduction="",yearlyLateEntryDaysForAttenBonusDisable="";
			var yearlylateEntryDaysForAttenBonusDeduction="",montlyBonusAmount="",yearlyBonusAmount="",bonusDeductionAmount="";
			var oTCalculationOperand="",spceialHolidayFlag="",firstHalfHolidayRate="",secondHalfHolidayRate="";
			
		
			if(data.attendanceRosterPreference.length>0){
				
			
				var i=0;
				
				preferenceId = data.attendanceRosterPreference[i].preferenceId;
				//var fromDate = data.attendanceRosterPreference[i].fromDate;
				//var thruDate = data.attendanceRosterPreference[i].thruDate;
				rosterPreferenceId = data.attendanceRosterPreference[i].rosterPreferenceId;
				rosterPrefRevision = data.attendanceRosterPreference[i].rosterPrefRevision;
				orgPartyId = data.attendanceRosterPreference[i].orgPartyId;
				rosterName = data.attendanceRosterPreference[i].rosterName;
				rosterStartTime = data.attendanceRosterPreference[i].rosterStartTime;
				rosterEndTime = data.attendanceRosterPreference[i].rosterEndTime;
				oTallowances = data.attendanceRosterPreference[i].oTallowances;
				attendanceBonusAllowances = data.attendanceRosterPreference[i].attendanceBonusAllowances;
				extraOTallowances = data.attendanceRosterPreference[i].extraOTallowances;
				entryTime = data.attendanceRosterPreference[i].entryTime;
				exitTime = data.attendanceRosterPreference[i].exitTime;
				lunchDuration = data.attendanceRosterPreference[i].lunchDuration;
				lunchTime = data.attendanceRosterPreference[i].lunchTime;
				maximumStayTime = data.attendanceRosterPreference[i].maximumStayTime;
				lateEntryTime = data.attendanceRosterPreference[i].lateEntryTime;
				earlyOutTime = data.attendanceRosterPreference[i].earlyOutTime;
				oTStartTime = data.attendanceRosterPreference[i].oTStartTime;
				oTEndTime = data.attendanceRosterPreference[i].oTEndTime;
				extraOTStartTime = data.attendanceRosterPreference[i].extraOTStartTime;
				extraOTEndTime = data.attendanceRosterPreference[i].extraOTEndTime;
				firstTiffinStartTime = data.attendanceRosterPreference[i].firstTiffinStartTime;
				firstTiffinEndTime = data.attendanceRosterPreference[i].firstTiffinEndTime;
				secondTiffinStartTime = data.attendanceRosterPreference[i].secondTiffinStartTime;
				secondTiffinEndTime = data.attendanceRosterPreference[i].secondTiffinEndTime;
				nightStartTime = data.attendanceRosterPreference[i].nightStartTime;
				nightEndTime = data.attendanceRosterPreference[i].nightEndTime;
				firstTiffinRate = data.attendanceRosterPreference[i].firstTiffinRate;
				secondTiffinRate = data.attendanceRosterPreference[i].secondTiffinRate;
				nightRate = data.attendanceRosterPreference[i].nightRate;
				leOrAbsForattbnDis = data.attendanceRosterPreference[i].leOrAbsForattbnDis;
				halfLesForattbnDed = data.attendanceRosterPreference[i].halfLesForattbnDed;
				lunchStartTime = data.attendanceRosterPreference[i].lunchStartTime;
				lunchEndTime = data.attendanceRosterPreference[i].lunchEndTime;
				lateEntryDaysForAttenBonusDisable = data.attendanceRosterPreference[i].lateEntryDaysForAttenBonusDisable;
				lateEntryDaysForAttenBonusDeduction = data.attendanceRosterPreference[i].lateEntryDaysForAttenBonusDeduction;
				yearlyLateEntryDaysForAttenBonusDisable = data.attendanceRosterPreference[i].yearlyLateEntryDaysForAttenBonusDisable;
				yearlylateEntryDaysForAttenBonusDeduction = data.attendanceRosterPreference[i].yearlylateEntryDaysForAttenBonusDeduction;
				montlyBonusAmount = data.attendanceRosterPreference[i].montlyBonusAmount;
				yearlyBonusAmount = data.attendanceRosterPreference[i].yearlyBonusAmount;
				bonusDeductionAmount = data.attendanceRosterPreference[i].bonusDeductionAmount;
				oTCalculationOperand = data.attendanceRosterPreference[i].oTCalculationOperand;
				spceialHolidayFlag = data.attendanceRosterPreference[i].spceialHolidayFlag;
				firstHalfHolidayRate = data.attendanceRosterPreference[i].firstHalfHolidayRate;
				secondHalfHolidayRate = data.attendanceRosterPreference[i].secondHalfHolidayRate;
			}	
				
				//document.getElementById("RosterPreferenceForm_fromDate_i18n").value = fromDate;
				//document.getElementById("RosterPreferenceForm_thruDate_i18n").value = thruDate;
				document.getElementById("RosterPreferenceForm_rosterStartTime").value = rosterStartTime;
				document.getElementById("RosterPreferenceForm_rosterEndTime").value = rosterEndTime;
				document.getElementById("entryTime").value = entryTime;
				document.getElementById("exitTime").value = exitTime;
				document.getElementById("maximumStayTime").value = maximumStayTime;
				document.getElementById("lateEntryTime").value = lateEntryTime;
				document.getElementById("earlyOutTime").value = earlyOutTime;
				document.getElementById("oTStartTime").value = oTStartTime;
				document.getElementById("oTEndTime").value = oTEndTime;
				document.getElementById("extraOTStartTime").value = extraOTStartTime;
				document.getElementById("extraOTEndTime").value = extraOTEndTime;
				document.getElementById("firstTiffinStartTime").value = firstTiffinStartTime;
				document.getElementById("firstTiffinEndTime").value = firstTiffinEndTime;
				document.getElementById("secondTiffinStartTime").value = secondTiffinStartTime;
				document.getElementById("secondTiffinEndTime").value = secondTiffinEndTime;
				document.getElementById("nightStartTime").value = nightStartTime;
				document.getElementById("nightEndTime").value = nightEndTime;
				document.getElementById("firstTiffinRate").value = firstTiffinRate;
				document.getElementById("secondTiffinRate").value = secondTiffinRate;
				document.getElementById("nightRate").value = nightRate;
				document.getElementById("lunchDuration").value = lunchDuration;
				document.getElementById("lunchStartTime").value = lunchStartTime;
				document.getElementById("lunchEndTime").value = lunchEndTime;
				document.getElementById("leOrAbsForattbnDis").value = leOrAbsForattbnDis;
				document.getElementById("halfLesForattbnDed").value = halfLesForattbnDed;
				
				document.getElementById("lateEntryDaysForAttenBonusDisable").value = lateEntryDaysForAttenBonusDisable;
				document.getElementById("lateEntryDaysForAttenBonusDeduction").value = lateEntryDaysForAttenBonusDeduction;
				document.getElementById("yearlyLateEntryDaysForAttenBonusDisable").value = yearlyLateEntryDaysForAttenBonusDisable;
				document.getElementById("yearlylateEntryDaysForAttenBonusDeduction").value = yearlylateEntryDaysForAttenBonusDeduction;
				document.getElementById("montlyBonusAmount").value = montlyBonusAmount;
				document.getElementById("yearlyBonusAmount").value = yearlyBonusAmount;
				document.getElementById("RosterPreferenceForm_firstHalfHolidayRate").value = firstHalfHolidayRate;
				document.getElementById("RosterPreferenceForm_secondHalfHolidayRate").value = secondHalfHolidayRate;
				document.getElementById("bonusDeductionAmount").value = bonusDeductionAmount;
				document.getElementById("oTCalculationOperand").value = oTCalculationOperand;
			
		}
	});
	
}
//tomal mahdi
function getRosterPreferenceValues(rosterPreferenceId,form){
	//alert(rosterPreferenceId+' '+form.name);
	$.ajax({
		url : "getRosterPreferenceValues?rosterPreferenceId="+rosterPreferenceId,
		type : "GET",
		data : getRequestData(),
		success : function(data){ 
		
			var preferenceId ="",rosterPreferenceId="",rosterPrefRevision="",orgPartyId="",rosterName="";
			var rosterStartTime="",rosterEndTime="",oTallowances="",attendanceBonusAllowances="",extraOTallowances="";
			var entryTime="",exitTime="",lunchDuration="",lunchTime="",maximumStayTime="",lateEntryTime="",earlyOutTime="";
			var oTStartTime="",oTEndTime = "",extraOTStartTime="",extraOTEndTime="",firstTiffinStartTime="",firstTiffinEndTime="";
			var secondTiffinStartTime="",secondTiffinEndTime="",nightStartTime="",nightEndTime="",firstTiffinRate="";
			var secondTiffinRate="",nightRate="",leOrAbsForattbnDis="",halfLesForattbnDed="",lunchStartTime=""; 
			var lunchEndTime="",lateEntryDaysForAttenBonusDisable="",lateEntryDaysForAttenBonusDeduction="",yearlyLateEntryDaysForAttenBonusDisable="";
			var yearlylateEntryDaysForAttenBonusDeduction="",montlyBonusAmount="",yearlyBonusAmount="",bonusDeductionAmount="";
			var oTCalculationOperand="",spceialHolidayFlag="",firstHalfHolidayRate="",secondHalfHolidayRate="";
			
		
			if(data.attendanceRosterPreference.length>0){
				
				var i=0;
				
				preferenceId = data.attendanceRosterPreference[i].preferenceId;
				//var fromDate = data.attendanceRosterPreference[i].fromDate;
				//var thruDate = data.attendanceRosterPreference[i].thruDate;
				rosterPreferenceId = data.attendanceRosterPreference[i].rosterPreferenceId;
				rosterPrefRevision = data.attendanceRosterPreference[i].rosterPrefRevision;
				orgPartyId = data.attendanceRosterPreference[i].orgPartyId;
				rosterName = data.attendanceRosterPreference[i].rosterName;
				rosterStartTime = data.attendanceRosterPreference[i].rosterStartTime;
				rosterEndTime = data.attendanceRosterPreference[i].rosterEndTime;
				oTallowances = data.attendanceRosterPreference[i].oTallowances;
				attendanceBonusAllowances = data.attendanceRosterPreference[i].attendanceBonusAllowances;
				extraOTallowances = data.attendanceRosterPreference[i].extraOTallowances;
				entryTime = data.attendanceRosterPreference[i].entryTime;
				exitTime = data.attendanceRosterPreference[i].exitTime;
				lunchDuration = data.attendanceRosterPreference[i].lunchDuration;
				lunchTime = data.attendanceRosterPreference[i].lunchTime;
				maximumStayTime = data.attendanceRosterPreference[i].maximumStayTime;
				lateEntryTime = data.attendanceRosterPreference[i].lateEntryTime;
				earlyOutTime = data.attendanceRosterPreference[i].earlyOutTime;
				oTStartTime = data.attendanceRosterPreference[i].oTStartTime;
				oTEndTime = data.attendanceRosterPreference[i].oTEndTime;
				extraOTStartTime = data.attendanceRosterPreference[i].extraOTStartTime;
				extraOTEndTime = data.attendanceRosterPreference[i].extraOTEndTime;
				firstTiffinStartTime = data.attendanceRosterPreference[i].firstTiffinStartTime;
				firstTiffinEndTime = data.attendanceRosterPreference[i].firstTiffinEndTime;
				secondTiffinStartTime = data.attendanceRosterPreference[i].secondTiffinStartTime;
				secondTiffinEndTime = data.attendanceRosterPreference[i].secondTiffinEndTime;
				nightStartTime = data.attendanceRosterPreference[i].nightStartTime;
				nightEndTime = data.attendanceRosterPreference[i].nightEndTime;
				firstTiffinRate = data.attendanceRosterPreference[i].firstTiffinRate;
				secondTiffinRate = data.attendanceRosterPreference[i].secondTiffinRate;
				nightRate = data.attendanceRosterPreference[i].nightRate;
				leOrAbsForattbnDis = data.attendanceRosterPreference[i].leOrAbsForattbnDis;
				halfLesForattbnDed = data.attendanceRosterPreference[i].halfLesForattbnDed;
				lunchStartTime = data.attendanceRosterPreference[i].lunchStartTime;
				lunchEndTime = data.attendanceRosterPreference[i].lunchEndTime;
				lateEntryDaysForAttenBonusDisable = data.attendanceRosterPreference[i].lateEntryDaysForAttenBonusDisable;
				lateEntryDaysForAttenBonusDeduction = data.attendanceRosterPreference[i].lateEntryDaysForAttenBonusDeduction;
				yearlyLateEntryDaysForAttenBonusDisable = data.attendanceRosterPreference[i].yearlyLateEntryDaysForAttenBonusDisable;
				yearlylateEntryDaysForAttenBonusDeduction = data.attendanceRosterPreference[i].yearlylateEntryDaysForAttenBonusDeduction;
				montlyBonusAmount = data.attendanceRosterPreference[i].montlyBonusAmount;
				yearlyBonusAmount = data.attendanceRosterPreference[i].yearlyBonusAmount;
				bonusDeductionAmount = data.attendanceRosterPreference[i].bonusDeductionAmount;
				oTCalculationOperand = data.attendanceRosterPreference[i].oTCalculationOperand;
				spceialHolidayFlag = data.attendanceRosterPreference[i].spceialHolidayFlag;
				firstHalfHolidayRate = data.attendanceRosterPreference[i].firstHalfHolidayRate;
				secondHalfHolidayRate = data.attendanceRosterPreference[i].secondHalfHolidayRate;
			}	
			
				//document.getElementById("RosterPreferenceForm_fromDate_i18n").value = fromDate;
				//document.getElementById("RosterPreferenceForm_thruDate_i18n").value = thruDate;
				/*document.getElementById(form.name+"_rosterStartTime").value = rosterStartTime;
				document.getElementById(form.name+"_rosterEndTime").value = rosterEndTime;*/
				//document.getElementById("entryTime").value = '10:55am';
				
				$('#entryTime').val(entryTime); 
				$("#exitTime").val(exitTime);
				$("#maximumStayTime").val(maximumStayTime);
				$("#lateEntryTime").val(lateEntryTime);
				$("#earlyOutTime").val(earlyOutTime);
				$("#oTStartTime").val(oTStartTime);
				$("#oTEndTime").val(oTEndTime);
				$("#extraOTStartTime").val(extraOTStartTime);
				$("#extraOTEndTime").val(extraOTEndTime);
				$("#firstTiffinStartTime").val(firstTiffinStartTime);
				$("#firstTiffinEndTime").val(firstTiffinEndTime);
				$("#secondTiffinStartTime").val(secondTiffinStartTime);
				$("#secondTiffinEndTime").val(secondTiffinEndTime);
				$("#nightStartTime").val(nightStartTime);
				$("#nightEndTime").val(nightEndTime);
				$("#firstTiffinRate").val(firstTiffinRate);
				$("#secondTiffinRate").val(secondTiffinRate);
				$("#nightRate").val(secondTiffinEndTime);
				$("#lunchDuration").val(secondTiffinEndTime);
				$("#lunchStartTime").val(secondTiffinEndTime);
				$("#lunchEndTime").val(secondTiffinEndTime);
				$("#leOrAbsForattbnDis").val(leOrAbsForattbnDis);
				$("#halfLesForattbnDed").val(halfLesForattbnDed);
				
				$("#lateEntryDaysForAttenBonusDisable").val(lateEntryDaysForAttenBonusDisable);
				$("#lateEntryDaysForAttenBonusDeduction").val(lateEntryDaysForAttenBonusDeduction);
				$("#yearlyLateEntryDaysForAttenBonusDisable").val(yearlyLateEntryDaysForAttenBonusDisable);
				$("#yearlylateEntryDaysForAttenBonusDeduction").val(yearlylateEntryDaysForAttenBonusDeduction);
				$("#montlyBonusAmount").val(montlyBonusAmount);
				$("#yearlyBonusAmount").val(yearlyBonusAmount);
				$("#"+form.name+"_firstHalfHolidayRate").val(firstHalfHolidayRate);
				$("#"+form.name+"_secondHalfHolidayRate").val(secondHalfHolidayRate);
				$("#bonusDeductionAmount").val(bonusDeductionAmount);
				$("#oTCalculationOperand").val(oTCalculationOperand);
			
		}
	});
	
}

$(document).ready(function() {
	$("#editHalfHourOTPreference").click(function() {
		prottayPopupAttenEdit('Add Half Hour Over Time Preference','#editRosterPreference','EditHalfHourOTPreference?&title=Add Half Hour OT Preference','150','400');
		
	});
});
