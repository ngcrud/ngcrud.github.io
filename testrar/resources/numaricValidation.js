$(document).ready(function() {
	
	/*For Attendance Employee Preference */
	NumericOnly("EmployeeAttendancePreferenceForm_oTCalculationOperand");
	NumericOnly("EmployeeAttendancePreferenceForm_bonusDeductionAmount");
	NumericOnly("EmployeeAttendancePreferenceForm_yearlyBonusAmount");
	NumericOnly("EmployeeAttendancePreferenceForm_montlyBonusAmount");
	NumericOnly("EmployeeAttendancePreferenceForm_lateEntryForAttenBonusDisable");
	NumericOnly("EmployeeAttendancePreferenceForm_lateEntryForAttenBonusDeduction");
	NumericOnly("EmployeeAttendancePreferenceForm_lunchDuration");
	NumericOnly("chargeAmount");
	NumericOnlyWithQuot("heightForMedicalTest");
	NumericOnlyWithQuot("AddPhysicalFitnessInfo_formattedHeight");
	NumericOnlyWithQuot("EditProttayApplicant_height");
	NumericOnlyWithQuot("UpdateApplicantInfo_formattedHeight");
	NumericOnlyWithQuot("EditProttayPerson_height");
	NumericOnly("LeftySetupForm_days");
	$(".allowNumericOnly").on("keypress keyup blur",function (event) {
		
		if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190,110]) !== -1 ||
	             // Allow: Ctrl+A
	            (event.keyCode == 65 && event.ctrlKey === true) || 
	             // Allow: home, end, left, right
	            (event.keyCode >= 35 && event.keyCode <= 39)) {
	                 // let it happen, don't do anything
	                 return;
	        }
		
	     		$(this).val($(this).val().replace(/[^0-9\.]/g,''));
	            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	                event.preventDefault();
	            }
    });
	
});


function NumericOnly(fieldId){
	
	$("#" + fieldId).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190,110]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
        
    });
	
	
}

function numbersOnly(fieldId){
	
	$("#" + fieldId).on("keypress keyup blur",function (event) {
		if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190,110]) !== -1 ||
	             // Allow: Ctrl+A
	            (event.keyCode == 65 && event.ctrlKey === true) || 
	             // Allow: home, end, left, right
	            (event.keyCode >= 35 && event.keyCode <= 39)) {
	                 // let it happen, don't do anything
	                 return;
	        }
		
	     		$(this).val($(this).val().replace(/[^0-9\.]/g,''));
	            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	                event.preventDefault();
	            }
    });
}

function NumericOnlyWithQuot(fieldId){
	
	$("#"+ fieldId).bind("paste",function(e) {
	      e.preventDefault();
	  });
	$("#" + fieldId).keydown(function (e) {
        if(e.keyCode == 190){
            // stop . character 
			e.preventDefault();
		}
		if(e.keyCode == 222){
            // let single quot & double quot happen, don't do anything
            return;
		}
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)){
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
}
