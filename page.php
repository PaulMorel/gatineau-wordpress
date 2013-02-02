<?php
/**
 * @package WordPress
 * @subpackage Gatineau
 */
 
get_header(); ?>

<div class="content layout-page clearfix">

	<h1><?php the_title(); ?></h1>

	<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
	
	<?php the_post(); ?>
	<?php the_content(); ?>
    
	<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'gatineau' ), 'after' => '</div>' ) ); ?>
	</article>
	<?php comments_template( '', true ); ?>	
		
</div>

<?php get_footer(); ?>