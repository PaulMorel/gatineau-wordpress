<?php 
/**
 * @package WordPress
 * @subpackage Gatineau
 */
 
get_header(); ?>
<div class="content layout-blog clearfix">
<?php if (have_posts()) : ?>

	<?php if (is_category()) :?>
	<h1> Browsing the <?php single_cat_title(); ?> Category</h1>
	<?php elseif (is_month()) : ?>
	<h1> Browsing posts from <?php the_time('F, Y'); ?></h1>
	<?php elseif (is_year()) :?>
	<h1> Browsing posts from <?php the_time('Y'); ?></h1>
	<?php endif; ?>
	
		<?php while (have_posts()) : the_post(); ?>
        
		<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?>>
			<div class="article-content">
				<h1 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php _e('Permalink to ','gatineau'); the_title(); ?>" rel="bookmark" ><?php the_title(); ?></a></h1>
				<div class="post-icon ir"><?php $post_icon_category = get_the_category(); echo $post_icon_category[0]->cat_name; ?></div>
				<div class="post-content clearfix">
					<?php the_excerpt( __('Continue reading &raquo;', 'gatineau') ); ?>
				</div>
                <?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'gatineau' ), 'after' => '</div>' ) ); ?>
			</div>
			<div class="article-meta">
				<div class="meta-date"><span>Posted on <time datetime="<?php the_time('c'); ?>" pubdate><?php the_time(get_option('date_format')); ?></time></span></div>
				<div class="meta-comments"><span><a href="<?php the_permalink(); ?>#comments"><?php comments_number('No Comments','1 Comment','% Comments'); ?></a></span></div>
				<?php if (get_the_tags()) : ?>
				<div class="meta-tags"><span><?php _e('Filed under', 'gatineau') ?></span>
					<?php the_tags('<ul><li>','</li><li>','</li></ul>'); ?>
				</div>
				<?php endif; ?>
			</div>
		</article>

		<?php endwhile; ?>

	<?php endif; ?>
    <?php if (  $wp_query->max_num_pages > 1 ) : ?>
		<div class="pagination">
			<div class="next-page"><?php previous_posts_link('&laquo; Newer posts'); ?></div>
			<div class="prev-page"><?php next_posts_link('Older posts &raquo;'); ?></div>
		</div>
	<?php endif; ?>			
</div>
<?php get_footer(); ?>