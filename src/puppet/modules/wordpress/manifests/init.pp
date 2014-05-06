# Install latest Wordpress

class wordpress::install {

  # Create the Wordpress database
  exec { 'create-database':
    unless  => '/usr/bin/mysql -u root -pvagrant wordpress',
    command => '/usr/bin/mysql -u root -pvagrant --execute=\'create database wordpress\'',
  }

  exec { 'create-user':
    unless  => '/usr/bin/mysql -u wordpress -pwordpress wordpress',
    command => '/usr/bin/mysql -u root -pvagrant --execute="GRANT ALL PRIVILEGES ON wordpress.* TO \'wordpress\'@\'localhost\' IDENTIFIED BY \'wordpress\'"',
  }

  # Get a new copy of the latest wordpress release
  # FILE TO DOWNLOAD: http://wordpress.org/latest.tar.gz

  exec { 'download-wordpress': #tee hee
    command => '/usr/bin/wget http://wordpress.org/latest.tar.gz',
    cwd     => '/var/www/',
    creates => '/var/www/latest.tar.gz'
  }

  exec { 'untar-wordpress':
    cwd     => '/var/www/',
    command => '/bin/tar xzvf /var/www/latest.tar.gz',
    require => Exec['download-wordpress'],
    creates => '/var/www/wordpress',
  }

  # Import a MySQL database for a basic wordpress site.
  file { '/tmp/wordpress-db.sql':
    source => 'puppet:///modules/wordpress/wordpress-db.sql'
  }

  exec { 'load-db':
    command => '/usr/bin/mysql -u wordpress -pwordpress wordpress < /tmp/wordpress-db.sql && touch /var/www/db-created',
    creates => '/var/www/db-created',
  }

  # Copy a working wp-config.php file for the vagrant setup.
  file { '/var/www/wordpress/wp-config.php':
    source => 'puppet:///modules/wordpress/wp-config.php'
  }
  
   # Create the Wordpress Unit Tests database
  exec { 'create-tests-database':
    unless  => '/usr/bin/mysql -u root -pvagrant wp_tests',
    command => '/usr/bin/mysql -u root -pvagrant --execute=\'create database wp_tests\'',
  }

  exec { 'create-tests-user':
    unless  => '/usr/bin/mysql -u wordpress -pwordpress',
    command => '/usr/bin/mysql -u root -pvagrant --execute="GRANT ALL PRIVILEGES ON wp_tests.* TO \'wordpress\'@\'localhost\' IDENTIFIED BY \'wordpress\'"',
  }

  # Copy a working wp-tests-config.php file for the vagrant setup.
  file { '/var/www/wordpress/wp-tests-config.php':
    source => 'puppet:///modules/wordpress/wp-tests-config.php'
  }
}
