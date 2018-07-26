$(".logout").click(function() {
	Cookies.remove("uid");
	Cookies.remove("euid");
	$(location).attr('href', '/');
})