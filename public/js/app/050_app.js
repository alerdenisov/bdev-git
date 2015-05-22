$(function () {
    console.log("site is ready for js!!!");
    
    $("a").attr("tabindex", -1);
    
    
    $(window).bind('DOMMouseScroll mousewheel', function (e) {
        function scroll(obj, e) {
            if (obj === null) {
                console.log("Nothing scroll");
                return;
            }
            var evt = e.originalEvent;
            var direction = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
            
            if (direction > 0) {
                direction = obj.scrollLeft() - 120;
            }
            else {
                direction = obj.scrollLeft() + 120;
            }
            
            obj.scrollLeft(direction);
            obj.scrollTop(direction);
            
            e.preventDefault();
        }
        
        function scrollableRecursive($current, dir, e) {
            var $closest = $current.closest('.scroll');
            if ($closest.length === 0) return null;
            
            var max, cur, progress, space;
            var direction = typeof e.deltaY === "undefined" ? evt.wheelDelta : -e.deltaY;//evt.detail ? evt.detail * (-120) : evt.wheelDelta;
            
            var el = $closest[0];
            
            space = el.scrollHeight - el.clientHeight;
            progress = el.scrollTop / space;
            if (space > 0 && ((dir < 0 && progress > 0) || (dir > 0 && progress < 1))) {
                $closest.scrollTop($closest.scrollTop() - direction);
                return $closest;
            }
            
            space = el.scrollWidth - el.clientWidth;
            progress = el.scrollLeft / space;
            if (space > 0 && ((dir < 0 && progress > 0) || (dir > 0 && progress < 1))) {
                $closest.scrollLeft($closest.scrollLeft() - direction);
                return $closest;
            }
            
            return scrollableRecursive($closest.parent(), dir, e);
        }
        
        
        // текущий див
        var $trg = $(e.target);
        
        // событие
        var evt = e.originalEvent;
        
        // направление
        var direction = evt.detail ? -evt.detail : evt.wheelDelta / 120;
        
        // двигаем
        scrollableRecursive($trg, -direction, evt);
        
        //        console.log(evt);
        
        e.preventDefault();
    });
    
    document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;
    
    function requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    
    if (document.fullscreenEnabled) {
        requestFullscreen(document.documentElement);
    }
});
