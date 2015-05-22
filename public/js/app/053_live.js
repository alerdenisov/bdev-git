$(function () {
    var $live = $('.live__page');
    $live.livequery(
        function () {
            console.log("LIVE PAGE");
            var live = function() {
                $(this).width(5000);
                $(this).find('.live__camera').each(
                    function () {
                        var $cam = $(this);
                        var isMain = $cam.is(".live__camera_main");
                        var isAlt = $cam.is(".live__camera_alt");
                        var $frame = $cam.find("object");
                        var container = $cam.parent();
                        var height = container.height();
                        var width = (height - 31) * (16 / 9);
                        
                        $frame.height(height).width(width);
                        $cam.height(height).width(width);
                        
                        if (isAlt) {
                            $cam.parent().width(width).parent().width(width);
                        }
                    }
                );
                
                var $l = $(this);
                var width = 0;
                
                $l.children().each(function () {
                    var $child = $(this);
                    width += parseInt($child.css('width'));
                });
                
                $l.width(width);
            }.bind(this);

            live();
            
            $(window).resize(function () {
                live();
            });
        },
        function () {
            
        }
    );
});