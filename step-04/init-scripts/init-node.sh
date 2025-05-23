#
# Basic node initialization
#

# Setup hostname
echo "${INIT_HOSTNAME}" > /etc/hostname
sed -i "s/127\.0\.0\.1 localhost.*/127.0.0.1 localhost ${INIT_HOSTNAME}/g" /etc/hosts

# Update the outdated stuff
apk update
apk upgrade
apk add sudo

echo "INIT Node done." >> ${INIT_LOG}

# EOF
