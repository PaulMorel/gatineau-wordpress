<?php
/**
 * @package WordPress
 * @subpackage Gatineau
 *
 * Template Name: Homepage
 */
 
 
get_header(); ?>

<div class="content layout-blog clearfix">

	<!-- <h1><?php the_title(); ?></h1> -->

	<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
	
	<?php the_post(); ?>
	<?php the_content(); ?>
    
	<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'gatineau' ), 'after' => '</div>' ) ); ?>
	</article>
	 <div class="widget-wrapper clearfix">
	 <?php if ( !function_exists('dynamic_sidebar')
       			 || !dynamic_sidebar() ) : ?>
 	 <?php endif; ?>
	</div>	
</div>
<?php get_footer(); ?>