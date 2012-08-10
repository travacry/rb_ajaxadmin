function v_info(){
	var self = this;
	self.init = function(){
		$("button").button();
		$("#opening_date_right").datepicker({
			showButtonPanel: true,
			changeMonth: true,
			changeYear: true,
			nextText: "",
			prevText: ""
		});
	}
}