$.widget("rb.info", {
    options: {
        width: "1061px",
        height: "1918px",
        mainmenu: "",
        fixed: "",
        id_company: 0,
        id_address: 0
    },
    _create: function() {
	    var $this = $(this),    data = $this.data('info');
	    // Если плагин еще не был инициализирован
	    if (!data) {
		    $(this).data('info', {
			    data: {}
		    });
	    }

        var html = new EJS({url: 'templates/info/info.ejs'}).render();
        $(".cont").html(html);

        this.options.mainmenu = {};
        this.options.fixed = {};

	    var v_info_ = new v_info();
	    v_info_.init();
    },

    update: function(){

	    var self = $(this).data('info');
	    self.data = m_info(this.options.id_address, this.options.id_company, "info", this.options.mainmenu, this.options.fixed).info;
	    var c_info_ = new c_info(self.data, this.options.fixed);
	    c_info_.init();

	    this.bindSave();

	    self.data.upadate;
    },

	bindSave: function(){
		var self = $(this).data('info');
		var id = this.options.id_address;
		$("#save_btn").bind("click", function(){ save_info(id, self.data); });
	},

    setOptions: function(obj){
        this.options.fixed = obj.fixed;
        this.options.mainmenu = obj.mainmenu;
	    this.options.id_company = obj.id_company;
	    this.options.id_address = obj.id_address;

	    this.update();
    },

    destroy: function(){
	    $.Widget.prototype.destroy.call(this);
    }
})
