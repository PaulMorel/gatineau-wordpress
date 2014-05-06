# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  
  config.vm.box = "precise64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"
  
  config.vm.hostname= "gatineau.dev"
  
  config.vm.network :forwarded_port, guest: 80, host: 8080

  config.vm.synced_folder "build/", "/var/www/wordpress/wp-content/themes/gatineau"
  
  config.vm.provision "shell", inline: "chown vagrant /var/www/"
  
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "src/puppet/manifests"
    puppet.module_path = "src/puppet/modules"
    puppet.manifest_file  = "init.pp"
    puppet.options="--verbose --debug"
  end
end
