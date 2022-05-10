#
# Basic node initialization
#

# Setup hostname
echo "${INIT_HOSTNAME}" > /etc/hostname
sed -i "s/127\.0\.0\.1 localhost.*/127.0.0.1 localhost ${INIT_HOSTNAME}/g" /etc/hosts

# Update the outdated stuff
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y

echo "INIT Node done." >> ${INIT_LOG}

# EOF
