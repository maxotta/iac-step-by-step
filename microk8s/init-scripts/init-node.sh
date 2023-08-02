#
# Basic node initialization
#
# Disable IPv6 in order to avoid MicroK8S controller binding only to ':::' IP v6 address
sed -i 's/GRUB_CMDLINE_LINUX_DEFAULT=""/GRUB_CMDLINE_LINUX_DEFAULT="ipv6\.disable=1"/g' /etc/default/grub
update-grub

# Setup hostname
HOST_IP_ADDR=`ip -f inet address show dev eth0 | grep inet | tr '/' ' ' | awk '{ print $2 }'`
HOST_DNS_NAME=`host ${HOST_IP_ADDR} | sed 's/\.$//' | awk '{ print $5 }'`
echo "${HOST_DNS_NAME}" > /etc/hostname

# Update the outdated stuff
export DEBIAN_FRONTEND=noninteractive
apt-get -y update && apt-get -y upgrade
apt-get -y install net-tools

echo "INIT Node done." >> ${INIT_LOG}

# EOF
