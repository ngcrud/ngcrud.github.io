//Global variable
var tarnsctionList = [];
var transctionCounter = 0;
var tarnsctionIDList = [];
var concateLineAndApprovalDateList = [];
var directLoadCounter = 0;
var tempDiv = document.createElement("div");
tempDiv.setAttribute("id","tempDiv");
tempDiv.setAttribute("style","cursor: move;z-index: 99;filter: alpha(opacity=90);border: 1px solid;border-radius: 7px;position:fixed;margin-right:5px;font-size:15px;background-color:skyblue;");
tempDiv.setAttribute("class","ui-draggable");

var unplannedBarMenu = [{
	  'Delete': {
	    onclick: function(menuItem, menu) {
	    	var id = $(this).attr('id');
	        var idValue = id.indexOf('_');
	        var mergeSequenceId = id.substring(idValue+1,id.length);
	        
	        deletePrdChosenStyle(mergeSequenceId);
	    },
	    //icon: 'delete_icon.png',
	    disabled: false
	  }
	},{
		 'Quick Plan': {
			    onclick: function(menuItem, menu) {
			    	var id = $(this).attr('id');
			        var idValue = id.indexOf('_');
			        var mergeSequenceId = id.substring(idValue+1,id.length);
			        //updateMovePlan(lineLoadingId, lineId, outputStartDate);
			    	var title = "Quick Plan";
			    	var companyId = $('#companyId').val();
			    	var url = "QuickDirectSchedulePlanScreen?companyId="+companyId+"&mergeSequenceId="+mergeSequenceId;
			    	var height = "480";
			    	var width = "450";
			    	prottayUIDefaultPopup(title, url, height, width);
			    	
			    },
			    disabled: false,
			    title: 'Quick Plan',
			    subMenu: [{
			            name: 'merge',
			            title: 'It will merge row',
			            img:'images/merge.png',
			            fun: function () {
			                alert('It will merge row')
			            }
			   }]
		 }  
	},{'Style Info': {
	    onclick: function(menuItem, menu) {
	    	var id = $(this).attr('id');
	        var idValue = id.indexOf('_');
	        var mergeSequenceId = id.substring(idValue+1,id.length);
	        unplannedStyleDetails(mergeSequenceId);	    	
	    },
	    disabled: false,
	    title: 'Style Info'
	  }
}, {
	'Sample Info' : {
		onclick : function(menuItem, menu) {
			var id = $(this).attr('id');
			var idValue = id.indexOf('_');
			var mergeSequenceId = id.substring(idValue + 1, id.length);
			unplannedStyleSampleInfo(mergeSequenceId);
		},
		disabled : false,
		title : 'Sample Info'
	}
}, {
	'Order Breakdown Info' : {
		onclick : function(menuItem, menu) {
			var id = $(this).attr('id');
			var idValue = id.indexOf('_');
			var mergeSequenceId = id.substring(idValue + 1, id.length);
			unplannedStyleBreakDownList(mergeSequenceId);
		},
		disabled : false,
		title : 'Order Breakdown Info'
	}
}, {
	'Inventory Info' : {
		onclick : function(menuItem, menu) {
			var id = $(this).attr('id');
			var idValue = id.indexOf('_');
			var mergeSequenceId = id.substring(idValue + 1, id.length);
			unplannedMaterialsInfo(mergeSequenceId);
		},
		disabled : false,
		title : 'Inventory Info'
	}
}, {
	'BOM Info' : {
		onclick : function(menuItem, menu) {
			var id = $(this).attr('id');
			var idValue = id.indexOf('_');
			var mergeSequenceId = id.substring(idValue + 1, id.length);
			unplannedBillOfMaterialsInfo(mergeSequenceId);
		},
		disabled : false,
		title : 'BOM Info'
	}
}, {
	'RnD Info' : {
		onclick : function(menuItem, menu) {
			var id = $(this).attr('id');
			var idValue = id.indexOf('_');
			var mergeSequenceId = id.substring(idValue + 1, id.length);
			unplannedStyleRndInfo(mergeSequenceId);
		},
		disabled : false,
		title : 'RnD Info'
	}
}, {'Cancel': {
		    hoverItem: function(c) {
		      $(this).addClass(c).find('div').html('Cancel');
		    },
		    hoverItemOut: function(c) {
		      $(this).removeClass(c).find('div').html('Cancel');
		    }
		  }
	}/*, {
	  "Exit": {
	    disabled: true
	  }
	}*/];

//Calling context menu
var plannedBarMenu = [{'Plan Details': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        updatePlanningBoardInfoPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Plan Details'
  }
},{'Split': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        splitPlannedBarIntoOrderPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Simple Planned Bar'
  }
},{'Set Day Target': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        setDayTargetPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Set Day Target'
  }
}/*,{'Split Into Order Breakdown': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        splitPlannedBarIntoOrderBreakdownPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Simple Split With Two Partition'
  }
}*/,{'Split With Production': {
onclick: function(menuItem, menu) {
	var id = $(this).attr('id');
    var idValue = id.indexOf('_');
    var lineLoadingId = id.substring(idValue+1,id.length);
	splitWithProductionInfo(lineLoadingId);
},
disabled: false,
title: 'Simple Split With Two Partition'
}
},{'Quick Plan': {
		    onclick: function(menuItem, menu) {
		    	var id = $(this).attr('id');
		        var idValue = id.indexOf('_');
		        var lineLoadingId = id.substring(idValue+1,id.length);
		        //updateMovePlan(lineLoadingId, lineId, outputStartDate);
		    	var title = "Quick Plan";
		    	var companyId = $('#companyId').val();
		    	var url = "QuickLineLoadingScreen?companyId="+companyId+"&lineLoadingId="+lineLoadingId;
		    	var height = "280";
		    	var width = "350";
		    	prottayUIDefaultPopup(title, url, height, width);
		    	
		    },
		    disabled: false,
		    title: 'Quick Plan'
		  }
	},{'Focus Style': {
	    onclick: function(menuItem, menu) {
	    	var id = $(this).attr('id');
	        var idValue = id.indexOf('_');
	        var lineLoadingId = id.substring(idValue+1,id.length);
	        focusSelectedStyle(lineLoadingId);
	    },
	    disabled: false,
	    title: 'Focus Style'
	  }
		}, {
			'Focus Buyer' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					focusSelectedBuyer(lineLoadingId);

				},
				disabled : false,
				title : 'Focus Buyer'
			}
		}, {
			'Sample Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showSampleInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Sample Info'
			}
		}, {
			'Order Breakdown Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showOrderBreakdownInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Order Breakdown Info'
			}
		}, {
			'Inventory Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showMaterialsInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Inventory Info'
			}
		}, {
			'BOM Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showBillOfMaterials(lineLoadingId);
				},
				disabled : false,
				title : 'BOM Info'
			}
		}, {
			'RnD Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showRndInfo(lineLoadingId);
				},
				disabled : false,
				title : 'RnD Info'
			}
		}, {
			'Production Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showProductionInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Production Info'
			}
		},/*
			 * ,{'Split With Order Qty': { onclick: function(menuItem, menu) {
			 * alert("Split With Order Qty"); }, disabled: false, title: 'Split
			 * By Orders' } },{'Split With Order Breakdown': { onclick:
			 * function(menuItem, menu) { alert("Split By Order Breakdown"); },
			 * disabled: false, title: 'Split With Order Breakdown' } }
			 */, {'Delete': {
	    onclick: function(menuItem, menu) {
	    	var id = $(this).attr('id');
	        var idValue = id.indexOf('_');
	        var lineLoadingId = id.substring(idValue+1,id.length);
	    	deleteLineLoadingInfoFtl(lineLoadingId);
	        //if (confirm('Are you sure?')) {//$(this).remove();}
	    },
	    //icon: 'delete_icon.png',
	    disabled: false
	  }
	}, {'Cancel': {
		    hoverItem: function(c) {
		      $(this).addClass(c).find('div').html('Cancel');
		    },
		    hoverItemOut: function(c) {
		      $(this).removeClass(c).find('div').html('Cancel');
		    }
		  }
	}/*, {
	  "Exit": {
	    disabled: true
	  }
	}*/];

var plannedBarFilteredMenu = [{'Plan Details': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        updatePlanningBoardInfoPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Plan Details'
  }
},{'Split': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        splitPlannedBarIntoOrderPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Simple Planned Bar'
  }
},{'Set Day Target': {
    onclick: function(menuItem, menu) {
    	var id = $(this).attr('id');
        var idValue = id.indexOf('_');
        var lineLoadingId = id.substring(idValue+1,id.length);
        setDayTargetPopup(lineLoadingId);
    },
    disabled: false,
    title: 'Set Day Target'
  }
	},
    {'Split With Production' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					splitWithProductionInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Simple Split With Two Partition'
			}
	},{'Quick Plan': {
		    onclick: function(menuItem, menu) {
		    	var id = $(this).attr('id');
		        var idValue = id.indexOf('_');
		        var lineLoadingId = id.substring(idValue+1,id.length);
		        //updateMovePlan(lineLoadingId, lineId, outputStartDate);
		    	var title = "Quick Plan";
		    	var companyId = $('#companyId').val();
		    	var url = "QuickLineLoadingScreen?companyId="+companyId+"&lineLoadingId="+lineLoadingId;
		    	var height = "280";
		    	var width = "350";
		    	prottayUIDefaultPopup(title, url, height, width);
		    	
		    },
		    disabled: false,
		    title: 'Quick Plan'
		  }
	},{'Focus Style': {
	    onclick: function(menuItem, menu) {
	    	var id = $(this).attr('id');
	        var idValue = id.indexOf('_');
	        var lineLoadingId = id.substring(idValue+1,id.length);
	        focusSelectedStyle(lineLoadingId);
	    },
	    disabled: false,
	    title: 'Focus Style'
	  }
		}, {
			'Focus Buyer' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					focusSelectedBuyer(lineLoadingId);

				},
				disabled : false,
				title : 'Focus Buyer'
			}
		}, {
			'Sample Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showSampleInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Sample Info'
			}
		}, {
			'Order Breakdown Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showOrderBreakdownInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Order Breakdown Info'
			}
		}, {
			'Inventory Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showMaterialsInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Inventory Info'
			}
		}, {
			'BOM Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showBillOfMaterials(lineLoadingId);
				},
				disabled : false,
				title : 'BOM Info'
			}
		}, {
			'RnD Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showRndInfo(lineLoadingId);
				},
				disabled : false,
				title : 'RnD Info'
			}
		}, {
			'Production Info' : {
				onclick : function(menuItem, menu) {
					var id = $(this).attr('id');
					var idValue = id.indexOf('_');
					var lineLoadingId = id.substring(idValue + 1, id.length);
					showProductionInfo(lineLoadingId);
				},
				disabled : false,
				title : 'Production Info'
			}
		}, {'Delete': {
	    onclick: function(menuItem, menu) {
	    	var id = $(this).attr('id');
	        var idValue = id.indexOf('_');
	        var lineLoadingId = id.substring(idValue+1,id.length);
	    	//deleteLineLoadingInfoFtl(lineLoadingId);
	        //if (confirm('Are you sure?')) {//$(this).remove();}
	    },
	    //icon: 'delete_icon.png',
	    disabled: true
	  }
	}, {'Cancel': {
		    hoverItem: function(c) {
		      $(this).addClass(c).find('div').html('Cancel');
		    },
		    hoverItemOut: function(c) {
		      $(this).removeClass(c).find('div').html('Cancel');
		    }
		  }
	}/*, {
	  "Exit": {
	    disabled: true
	  }
	}*/];


var planningBoardContextMenus = [{
	  'Refresh': {
	    onclick: function(menuItem, menu) {
	    	loadPlanningBoard(null);
	    },
	    title: 'Refresh Planning board',
	    disabled: false,
	  }
	},{'Clear All Searching Criterias': {
	    onclick: function(menuItem, menu) {
	    	clearAllSearchCriterias();
	    },
	    disabled: false,
	    title: 'Clear All Searching Criterias'
	  }
	},{'Reset Planning Board': {
	    onclick: function(menuItem, menu) {
	    	resetPlanningBoard();
	    },
	    disabled: false,
	    title: 'Clear All Searching Criterias'
	  }
	},{'Remove All Unplanned Orders': {
	    onclick: function(menuItem, menu) {
	    	removeAllUnplannedOrders();
	    },
	    disabled: false,
	    title: 'Increase Day Width'
	  }
	},{'Clear Planning Board': {
	    onclick: function(menuItem, menu) {
	    	deleteAllPlannedLineLoadingInfo();
	    },
	    disabled: false,
	    title: 'Increase Day Width'
	  }
	},{'Increase Day Width (Ctrl + \'+\')': {
	    onclick: function(menuItem, menu) {
	    	increasePBoardColWidth();
	    },
	    disabled: false,
	    title: 'Increase Day Width'
	  }
	},{'Decrease Day Width (Ctrl + \'-\')': {
	    onclick: function(menuItem, menu) {
	    	decreasePBoardColWidth();
	    },
	    disabled: false,
	    title: 'Decrease Day Width'
	  }
	},{'Undo (Ctrl + Z)': {
	    onclick: function(menuItem, menu) {
	    	javascript:planningBoardUndoAction();
	    },
	    disabled: false,
	    title: 'Undo'
	  }
	},{'Redo (Ctrl + Y)': {
	    onclick: function(menuItem, menu) {
	    	javascript:planningBoardRedoAction();
	    },
	    disabled: false,
	    title: 'Redo'
	  }
	},{'Previous Month (Ctrl + <)': {
	    onclick: function(menuItem, menu) {
	    	loadPreviousMonth();
	    },
	    disabled: false,
	    title: 'Previous Month'
	  }
	},{
	  'Next Month (Ctrl + >)': {
	    onclick: function(menuItem, menu) {
	    	loadNextMonth();
	    },
	    disabled: false,
	    title: 'Next Month'
	  }
	},{'Reset Editor (Ctrl + R)': {
    onclick: function(menuItem, menu) {
    	resetEditor();
    },
    disabled: false,
    title: 'Reset Editor'
  }
}, {
	  'Cancel': {
	    hoverItem: function(c) {
	      $(this).addClass(c).find('div').html('Cancel');
	    },
	    hoverItemOut: function(c) {
	      $(this).removeClass(c).find('div').html('Cancel');
	    }
	  }
	}/*, {
	  "Exit": {
	    disabled: true
	  }
	}*/];

var menuWithSubmenu = [{
    name: 'create',
    img: 'images/create.png',
    title: 'create button',
    fun: function () {
        alert('i am add button')
    }
}, {
    name: 'update',
    img: 'images/update.png',
    title: 'update button',
    subMenu: [{
        name: 'merge',
        title: 'It will merge row',
        img:'images/merge.png',
        fun: function () {
            alert('It will merge row')
        }
    }, {
        name: 'replace',
        title: 'It will replace row',
        img:'images/replace.png',
        subMenu: [{
            name: 'replace top 100',
            img:'images/top.png',
            fun:function(){
            alert('It will replace top 100 rows');
            }

        }, {
            name: 'replace all',
            img:'images/all.png',
            fun:function(){
            alert('It will replace all rows');
            }
        }]
    }]
}, {
    name: 'delete',
    img: 'images/delete.png',
    title: 'delete button',
    subMenu: [{
        'name': 'soft delete',
        img:'images/soft_delete.png',
        fun:function(){
        alert('You can recover back');
        }
    }, {
        'name': 'hard delete',
        img:'images/hard_delete.png',
        fun:function(){
        alert('It will delete permanently');
        }
    }]

}];
 


var chartTableWidth = 0;
var columnWidth = 39;
var offset = 5;
var hideUnplanned = false;
var scrollXPosition = 0;
var scrollYPosition = 0;
var planningBoardActions = [];
var planningBoardLineLoadingIds = [];
var planningBoardCellIds = [];
var planningBoardStartDates = [];

var poppedPlanningBoardActions = [];
var poppedPlanningBoardLineLoadingIds = [];
var poppedPlanningBoardCellIds = [];
var poppedPlanningBoardStartDates = [];