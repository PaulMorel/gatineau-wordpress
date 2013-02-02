<?php
/**
 * @package WordPress
 * @subpackage Gatineau
 *
 * Template Name: Portfolio Page
 *
 * Selectable from a dropdown menu on the edit page screen.
 */
get_header(); ?>
<div class="content layout-blog clearfix">
	<h1><?php _e('Work','gatineau'); ?></h1>

	<ul class="portfolio clearfix">

	<?php 	// -----------------------------------------------
			// WEB CATEGORY LOOP
			// ----------------------------------------------- ?>	
	<?php $web_query = new WP_Query('post_type=portfolio&cat=22'); ?>
	<?php // query_posts('post_type=portfolio&cat=23'); 
	global $web_query;
	$web_query->in_the_loop = true;  
	?>
	<?php if ($web_query->have_posts()) : ?>
	
	<li class="portfolio-title"><h2><?php _e('Web','gatineau'); ?></h2></li>


	<?php while ($web_query->have_posts()) : $web_query->the_post(); ?>
        
		<li id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
			<a href="<?php the_permalink(); ?>" title="<?php _e('Permalink to ','gatineau'); the_title(); ?>"><img src="<?php bloginfo('template_directory'); ?>/inc/thumb.php?src=<?php get_custom_field_value('preview', true); ?>&w=220&h=140&zc=1&q=100"
            alt="<?php the_title(); ?>" width="220" height="140"/><span><?php the_title(); ?><br />
			<?php	$posttags = wp_get_post_terms( get_the_ID() , 'post_tag' , 'fields=names' );
					if( $posttags ) { 
						echo '<em>(' . implode( ', ' , $posttags )  . ')</em>';
					}; ?></span></a>
		</li>

		<?php endwhile; ?>

	<?php endif; ?>
	<?php 	// -----------------------------------------------
			// DESIGN CATEGORY LOOP
			// ----------------------------------------------- ?>		
	<?php $desing_query = new WP_Query('post_type=portfolio&cat=15'); ?>
	<?php // query_posts('post_type=portfolio&cat=23'); 
	global $desing_query;
	$desing_query->in_the_loop = true;  
	?>
	<?php if ($desing_query->have_posts()) : ?>
	
	<li class="portfolio-title"><h2><?php _e('Design','gatineau'); ?></h2></li>


	<?php while ($desing_query->have_posts()) : $desing_query->the_post(); ?>
        
		<li id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
			<a href="<?php the_permalink(); ?>" title="<?php _e('Permalink to ','gatineau'); the_title(); ?>"><img src="<?php bloginfo('template_directory'); ?>/inc/thumb.php?src=<?php get_custom_field_value('preview', true); ?>&w=220&h=140&zc=1&q=100"
            alt="<?php the_title(); ?>" width="220" height="140"/><span><?php the_title(); ?><br />
			<?php	$posttags = wp_get_post_terms( get_the_ID() , 'post_tag' , 'fields=names' );
					if( $posttags ) { 
						echo '<em>(' . implode( ', ' , $posttags )  . ')</em>';
					}; ?></span></a>
		</li>

		<?php endwhile; ?>

	<?php endif; ?>	
	<?php 	// -----------------------------------------------
			// PHOTO CATEGORY LOOP
			// ----------------------------------------------- ?>		
	<?php $photo_query = new WP_Query('post_type=portfolio&cat=23'); ?>
	<?php // query_posts('post_type=portfolio&cat=23'); 
	global $photo_query;
	$photo_query->in_the_loop = true;  
	?>
	<?php if ($photo_query->have_posts()) : ?>
	
	<li class="portfolio-title"><h2><?php _e('Photography','gatineau'); ?></h2></li>


	<?php while ($photo_query->have_posts()) : $photo_query->the_post(); ?>
        
		<li id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
			<a href="<?php the_permalink(); ?>" title="<?php _e('Permalink to ','gatineau'); the_title(); ?>"><img src="<?php bloginfo('template_directory'); ?>/inc/thumb.php?src=<?php get_custom_field_value('preview', true); ?>&w=220&h=140&zc=1&q=100"
            alt="<?php the_title(); ?>" width="220" height="140"/><span><?php the_title(); ?><br />
			<?php	$posttags = wp_get_post_terms( get_the_ID() , 'post_tag' , 'fields=names' );
					if( $posttags ) { 
						echo '<em>(' . implode( ', ' , $posttags )  . ')</em>';
					}; ?></span></a>
		</li>

		<?php endwhile; ?>
	<?php endif; ?>
	</ul>
    <?php if (  $wp_query->max_num_pages > 1 ) : ?>
		<div class="pagination">
			<div class="next-page"><?php previous_posts_link('&laquo; Newer posts'); ?></div>
			<div class="prev-page"><?php next_posts_link('Older posts &raquo;'); ?></div>
		</div>
	<?php endif; ?>			
	</section>
</div>
<?php get_footer(); ?>