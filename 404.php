<?php
/**
 * @package WordPress
 * @subpackage Gatineau
 */
 
get_header(); ?>

<div class="content layout-page clearfix">
	<h1>Nothing found</h1>
	<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
		<h2>This normally isn't a good sign</h2>
		<p>I have a hunch that this wasn't what you were looking for. The page you were searching probably doesn't exist. If it should, contact me so we can get to the bottom of this. You should probably go head back now.</p>
		<p><a href="<?php echo get_option('home'); ?>">Go back to the home page</a></p>

	</article>
</div>

<?php get_footer(); ?>