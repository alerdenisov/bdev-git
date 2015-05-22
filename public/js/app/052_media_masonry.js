$(function() {
    $.fn.media = function () {
        this.each(function () {
            var $mediaList = $(this);
            var $container = $mediaList.parent();
            var $items = $mediaList.find('.masonry__list_item');
            var $mega = $items.filter(function () { return $(this).hasClass('item_mega'); });
            
            var containerHeight = $container.height();// - 20;
            $mediaList.height(containerHeight);
            
            var small = containerHeight < 600;
            var baseHeight = containerHeight / 6;//0.15;
            var baseWidth = baseHeight / 0.5625;
            
            var index = 0;
            $items.each(function () {
                var $item = $(this);
                $item.height(baseHeight * (2 + (small ? 1 : 0)));
                $item.width(baseWidth * (2 + (small ? 1 : 0)));
                $item.attr("tabindex", index++);
            });
            
            $mega.each(function () {
                var $item = $(this);
                $item.height(baseHeight * (4 + (small ? 2 : 0)));
                $item.width(baseWidth * (4 + (small ? 2 : 0)));
            });
            
            $mediaList.isotope({
                layoutMode: 'masonryHorizontal',
                masonryHorizontal: {
                    rowHeight: baseHeight
                },
                itemSelector: '.masonry__list_item'
            });
        });
    };
    
    $(".masonry__list").livequery(
        function () {
            var masonry = $(this);
            masonry.media();

            $(window).resize(function () {
                masonry.media();
            });
        },
        function () {

        }
    );
});