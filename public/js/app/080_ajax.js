$(function () {
	var loadingHolder = function() {
		var loadingTmpl =
			'<div class="flex layout vertical center">' +
			'<div class="flex"></div>' +
			'<div class="whirly-loader center">' +
			'Loading…'+
			'</div>' +
			'<div class="flex"></div>' +
			'</div>';
		$("#content").html(loadingTmpl);
	};
	
    var loadContentAsync = function(url) {
		loadingHolder();
        $("#content").load(url + " #content > *");
    };
	
    $("a").livequery(
        function() {
            $(this).click(function () {
                var url = $(this).attr('href');
                loadContentAsync(url);
                window.history.pushState({ url: url }, document.title, url);
                return false;
            });
        }, 
        function() {
            
        }
    );

    $(document).on({
        ajaxStart: function () { },
         ajaxStop: function() { }
    });

    window.addEventListener('popstate', function (event) {
        loadContentAsync(event.state.url);
    });

    
    window.history.replaceState({ url: document.location.href }, document.title, document.location.href);
});
