one_username      = "your-username"
one_password      = "your-login-token-6f41e9a367b9660etc..."
one_endpoint      = "https://your-opennebula-server/RPC2"
vm_ssh_pubkey     = "your-public-ssh-key AAAAE2VjZHNhLX...etc...== user@host"

#vm_startup_script = "export DEBIAN_FRONTEND=noninteractive; apt-get update -y && apt-get upgrade -y"
vm_startup_script = "echo 'startup' > /tmp/startup.txt"

# vm_image_name = "CentOS 8"
# vm_image_url = "https://marketplace.opennebula.io//appliance/fab2e5fc-1113-11ea-b160-f0def1753696/download/0"

# vm_image_name = "Alpine Linux 3.15"
# vm_image_url = "https://marketplace.opennebula.io//appliance/6922c081-e6bf-40e4-aa0f-ec0e5a89ff07/download/0"
