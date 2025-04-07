if [ -e /etc/TF_INIT_DONE ]; then
    echo "INIT already done." >> ${INIT_LOG}
    exit 0
fi
touch ${INIT_LOG}
echo "INIT started." >> ${INIT_LOG}