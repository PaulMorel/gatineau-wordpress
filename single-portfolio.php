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
    <?php if (get_custom_field_value('completion_date', false)) : ?>
    <p class="elegant"><?php get_custom_field_value('completion_date', true); ?></p>
    <?php endif; ?>
	<section class="portfolio-images">
	<?php if (!get_custom_field_value('flickr_set', false)) : ?>
		<?php if (get_custom_field_value('preview_full1', false)) : ?>
			<a href="<?php get_custom_field_value('preview_full1', true); ?>" title="<?php the_title(); ?> Preview 1" >
			<img src="<?php bloginfo('template_directory'); ?>/inc/thumb.php?src=<?php get_custom_field_value('preview_full1', true); ?>&w=428&zc=0&q=100"
				alt="<?php the_title(); ?> Preview 1" width="428" /></a>
		<?php endif; ?>
		<?php if (get_custom_field_value('preview_full2', false)) : ?>
		<a href="<?php get_custom_field_value('preview_full2', true); ?>" title="<?php the_title(); ?> Preview 2" >
			<img src="<?php bloginfo('template_directory'); ?>/inc/thumb.php?src=<?php get_custom_field_value('preview_full2', true); ?>&w=428&zc=0&q=100"
				alt="<?php the_title(); ?> Preview 2" width="428" /></a>
		<?php endif; ?>
		<?php if (get_custom_field_value('preview_full3', false)) : ?>
			<a href="<?php get_custom_field_value('preview_full3', true); ?>" title="<?php the_title(); ?> Preview 3" >
			<img src="<?php bloginfo('template_directory'); ?>/inc/thumb.php?src=<?php get_custom_field_value('preview_full3', true); ?>&w=428&zc=0&q=100"
				alt="<?php the_title(); ?> Preview 3" title="<?php the_title(); ?> Preview 3" width="428" /></a>
		<?php endif; ?>
	<?php else : ?>
		<ul class="flickr-set clearfix">
		</ul>
	<?php endif?>
    </section>
    <section class="portfolio-info">
    	<h2><?php _e('What it is','gatineau'); ?></h2>
  		<?php the_content(); ?>
		<?php	$tasks = wp_get_post_terms( get_the_ID() , 'tasks' , 'fields=names' );
					if( $tasks ) {
						echo '<h2>' . __('What I Did', 'gatineau') . '</h2>';
						echo '<ul><li>' . implode( '</li><li>' , $tasks )  . '</li></ul>';
		}; ?>        
		<?php	$skills = wp_get_post_terms( get_the_ID() , 'skills' , 'fields=names' );
					if( $skills ) {
						echo '<h2>' . __('What I Used', 'gatineau') . '</h2>';
						echo '<ul><li>' . implode( '</li><li>' , $skills )  . '</li></ul>';
		}; ?>                
        
         <?php if (get_custom_field_value('designers', false) || get_custom_field_value('developers', false) || get_custom_field_value('integrators', false) || 											get_custom_field_value('other_credits', false) ) : ?>
            <h2><?php _e('Credits','gatineau'); ?></h2>
            <?php get_custom_field_value('designers', true); ?>
            <?php get_custom_field_value('developers', true); ?>
            <?php get_custom_field_value('integrators', true); ?>
            <?php get_custom_field_value('other_credits', true); ?>
        <?php endif; ?>

		<?php if (get_custom_field_value('visit_link', false)) : ?>
            <h2><?php _e('Visit','gatineau'); ?></h2>
            <p><a href="<?php get_custom_field_value('visit_link', true); ?>"><?php get_custom_field_value('visit_link', true); ?></a></p>
        <?php endif ;?>

    </section>
  
	</article>
</div>

<?php get_footer(); ?>