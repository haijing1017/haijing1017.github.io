// fixed body when modal open
$('.modal').on('show.bs.modal', function () {
	$("body").css('overflow', 'hidden');
}).on("hidden", function () {
        $("body").css('overflow', 'auto');
});