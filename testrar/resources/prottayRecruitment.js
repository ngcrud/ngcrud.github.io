$(document).ready(function() {
	
	$("#addRequisitionBtn").click(function() {
		$("#addRequisitionPopUp").dialog({
			autoOpen : true,
			title : "Form",
			height : 500,
			width : 500,
			modal : true,
			open : function() {
				$.ajax({
					//url : "RequisitionAddPopUp?emplPositionId="+emplPositionId, //This URL view request map
					
					url : "RequisitionAddPopUp?emplPositionId="+document.getElementById('PositionInfo_emplPositionId').value,

					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#addRequisitionPopUp").html(data);
					}
				});
			}

		});
	});
	
	
	
	
	$("#addApplicantIncrementBtn").click(function() {
		$("#addApplicantIncrementPopUp").dialog({
			autoOpen : true,
			title : "Form",
			height : 300,
			width : 400,
			modal : true,
			open : function() {
				$.ajax({
					
					url : "ApplicantIncAddPopUp?partyId="+document.getElementById('ApplicantSalaryNegotiation_partyId').value + "&payGradeId="+document.getElementById('ApplicantSalaryNegotiation_applicantPayGradeId').value,

					type : "POST",
					data : getRequestData(),
					success : function(data) {
						
						$("#addApplicantIncrementPopUp").html(data);
					}
				});
			}

		});
	});

	
});


function approveRequisitionForm(form, value){
	
	if (value == ""){
		alert("Please select an action.");
	}else{
		var formName = form.name;
	    form.submit(); 
	}
}

function updateRequisition(jobRequisitionId){
	
	$("#addRequisitionPopUp").dialog({
		autoOpen : true,
		title : "Form",
		height : 500,
		width : 500,
		modal : true,
		open : function() {
			$.ajax({
				//url : "RequisitionAddPopUp?emplPositionId="+emplPositionId + "&jobRequisitionId="+jobRequisitionId, //This URL view request map
				
				url : "RequisitionAddPopUp?emplPositionId="+document.getElementById('PositionInfo_emplPositionId').value+ "&jobRequisitionId="+jobRequisitionId,

				type : "POST",
				data : getRequestData(),
				success : function(data) {
					$("#addRequisitionPopUp").html(data);
				}
			});
		}

	});
}





function showRequisitionDetail(jobRequisitionId){
	
	$("#addRequisitionPopUp").dialog({
		autoOpen : true,
		title : "Form",
		height : 300,
		width : 400,
		modal : true,
		open : function() {
			$.ajax({
				url : "RequisitionDetail?emplPositionId="+emplPositionId + "&jobRequisitionId="+jobRequisitionId, //This URL view request map
				type : "POST",
				data : getRequestData(),
				success : function(data) {
					$("#addRequisitionPopUp").html(data);
				}
			});
		}

	});
}
$(document).ready(function() {
	$("#discardBtn").click(function() { //ImageBtn ID into the menu
		$("#discardBtnPopUp").dialog({ //Id where PopUp display
			autoOpen : true,
			title : "&nbsp;",
			height : 150,
			width : 350,
			modal : true,
			open : function() {
				$.ajax({
					url : "discardApplicant?partyId="+partyId, //This URL view request map
					type : "POST",
					data : getRequestData(),
					success : function(data) {
						$("#discardBtnPopUp").html(data);
					}
				});
			}

		});
	});
});

function selectJobRequisition() {
	
	 var jobSelect = document.getElementById("EditJobPosting_jobRequisitionId");
	 var jobDescriptuion = jobSelect.options[jobSelect.selectedIndex].text;
	 var jobTitle = jobDescriptuion.split("[");
	 
	document.getElementById("EditJobPosting_jobTitle").value = jobTitle[0];

}

function ageValidationFromBirthDate(form, value) {
	 var now = new Date();
	    var birthdate = value.split("-");
	    var born = new Date(birthdate[0], birthdate[1]-1, birthdate[2]);
	    age=get_age(born,now);
	    console.log(birthdate[2]+" : "+birthdate[1]+" : "+birthdate[0]);
	    console.log(age);

	    if (age<18)
	    {
	    	alert("Age should be greater then or equal to 18");
	    	var field= document.getElementById('EditProttayApplicant_birthDate_i18n');
	    	document.getElementById("EditProttayApplicant_birthDate_i18n").value = field.defaultValue;
	       
	        return false;
	    }

}

function applicantFromValidation() {
	
	 var now = new Date();
	 var  value= document.getElementById("EditProttayApplicant_birthDate_i18n").value;

	    var birthdate = value.split("/");
	    var born = new Date(birthdate[2], birthdate[1]-1, birthdate[0]);
	    age=get_age(born,now);
	    console.log(birthdate[2]+" : "+birthdate[1]+" : "+birthdate[0]);
	    console.log(age);

	    if (age<18)
	    {
	    	alert("Age should be greater then or equal to 18");
	    	var field= document.getElementById('EditProttayApplicant_birthDate_i18n');
	    	document.getElementById("EditProttayApplicant_birthDate_i18n").value = field.defaultValue;
	       
	        return false;
	    }else{
	    	 return true;
	    }

}

function get_age(born, now) {
    var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());

        var age = (now.getFullYear()) - born.getFullYear();
        var m = now.getMonth() - born.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < born.getDate())) {
            age--;              
        }
        return age;
  }

function medicalTestValidation(medicalTest , applicationStatus) {
	var test = medicalTest;
	if ((test==null || test=="") && (applicationStatus!="APPLICANT_CREATED")){
		//alert("Medical Test Not Done Yet !!");
		//return false;
		return true;
	}else{
		return true;
	}

  }


function prottayRecruitmentPopup(title,containerId,url,height,width){
	
	
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

$(document).ready(function() {
	$("#addProcessGradeIcon").click(function() {
		prottayRecruitmentPopup('Add Process Grade','#editProcessGrade','AddProcessGradePopUp?&title=Add Process Grade','250','550');
		
	});
});

$(document).ready(function() {
	$("#addMultiProcessBenifitsPopUpIcon").click(function() {
		prottayRecruitmentPopup('Add Multi Process Benifits','#editProcessBenifits','MultiProcessBenifitsPopUp?&title=Add Multi Process Benifits','250','550');
		
	});
});

$(document).ready(function() {
	$("#addProcessSalaryPopUpIcon").click(function() {
		prottayRecruitmentPopup('Add PG and EG Based Process Salary','#editProcessSalary','AddProcessSalaryPopUp?&title=Add PG and EG Based Process Salary','400','500');
		
	});
});

function selectEmployeementType(value) {
	
	if(value == "WORKER"){
		document.getElementById("FormForAddIncrement_salaryStepSeqId").parentNode.parentNode.parentNode.style.display = "none";
		//alert(value);	
	}else if(value == "STAFF"){
		document.getElementById("FormForAddIncrement_salaryStepSeqId").parentNode.parentNode.parentNode.style.display = "";
		//alert(value);
		
	}
	

}


function approveSalaryForm(form, value) {
    if (value == "") {
        alert("Please select an action.");
    } else {
        var formName = form.name;
        form.submit();
    }
}

$(document).ready(function() {
	$("#approve").click(function() {
		var form = document.getElementById("increPro");
		if (confirm('Are you sure you want to Approve This?')) {
			form.submit();
		} else {
		  
		}
		
	});
});

function getRosterPreference(rostarId){
	alert("");
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
		$("#preferenceId").prepend("<option value='' selected='selected'></option>");
	
	}
});

}

///Author: EHASUN KHAN
$(document).ready(function() {
	$("#approveLoan").click(function() {
		var form = document.getElementById("aprrovedLoan");

		console.log("Approved called");
		if (confirm('Are you sure you want to Approve This?')) {
			$("#aprrovedLoan").attr("action", 'ApproveEmployeeLoan');
			form.submit();
			 //createApproveOrReject("REQ_CREATED");
			 
		} else {
		  
		}
		
	});

	$("#rejectLoan").click(function() {
		console.log("Reject called");
		var form = document.getElementById("aprrovedLoan");
		if (confirm('Are you sure you want to Reject This?')) {
			$("#aprrovedLoan").attr("action",  'RejectEmployeeLoan');
			form.submit();
			//createApproveOrReject("REQ_REJECTED");
				
			
		} else {
		  
		}
		
	});
	
});

