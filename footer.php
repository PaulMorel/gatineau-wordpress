	<div class="mini-colophon clearfix">
		<p class="ir"><span class="canada" title="Made in Canada">Made in Canada</span></p>
		<p class="ir"><span class="wordpress" title="Powered by Wordpress">Powered by Wordpress</span></p>
        <p class="footer-copy">Copyright &copy; <?php echo date('Y'); ?> <a href="mailto:hello@paulmorel.com">Paul Morel.</a></p>    
	</div>
</div>
<?php wp_footer();?>
<script src="<?php bloginfo('template_url'); ?>/js/plugins.js"></script>
<script src="<?php bloginfo('template_url'); ?>/js/script.js"></script>
<?php if (get_custom_field_value('flickr_set', false)) : ?>
<script type="text/javascript">
/* <![CDATA[ */
	$(function() {
		var apiKey = '36ec55b990b14be2bf41a54d6d08d244';
		var userId = '40662000@N02';
		var tag = 'portfolio:sets=<?php get_custom_field_value('flickr_set', true); ?>';
		var perPage = '30';
		var showOnPage = '30';
		
		$.getJSON('http://api.flickr.com/services/rest/?format=json&method='+
			'flickr.photos.search&api_key=' + apiKey + '&user_id=' + userId + 
			'&tags=' + tag + '&per_page=' + perPage + '&jsoncallback=?', 
		function(data){
			var classShown = 'class="lightbox"';
			var classHidden = 'class="lightbox hidden"';
			
			$.each(data.photos.photo, function(i, rPhoto){
			  var basePhotoURL = 'http://farm' + rPhoto.farm + '.static.flickr.com/'
				+ rPhoto.server + '/' + rPhoto.id + '_' + rPhoto.secret;            
				
				var thumbPhotoURL = basePhotoURL + '_s.jpg';
				var mediumPhotoURL = basePhotoURL + '.jpg';
				
				var photoStringStart = '<li><a ';
				var photoStringEnd = 'title="' + rPhoto.title + '" href="'+ 
					mediumPhotoURL +'"><img src="' + thumbPhotoURL + '" alt="' + 
					rPhoto.title + '"/></a></li>;'                
				var photoString = (i < showOnPage) ? 
					photoStringStart /*+ classShown*/ + photoStringEnd : 
					photoStringStart /*+ classHidden*/  + photoStringEnd;
											
				$(photoString).appendTo(".flickr-set");
			});
			$(".flickr-set li a").colorbox({rel:'gallery'});
		});
	});
/* ]]> */
</script>
<?php endif; ?>
</body>
</html>