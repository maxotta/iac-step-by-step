export const nebulaApi = {
    endpoint: "https://your-opennebula-server/RPC2",
    username: "your-username",
    password: "your-login-token-6f41e9a367b9660etc..."
}

export const normalNode = {
    vmImageName: "Alpine Linux 3.16",
    vmImageUrl: "https://marketplace.opennebula.io//appliance/73867a80-7ae7-013b-d6ef-7875a4a4f528/download/0",
    vmAdmin: "nodeadm",
    vmPubkey: "your-public-ssh-key AAAAE2VjZHNhLX...etc...== user@host",
    vmInitLog: "/var/log/node-init.log",
    vmDatastoreId: 101, // nuada_pool
    vmOs: {
        arch: "x86_64",
        boot: "disk0"
    },
    vmGraphics: {
        listen: "0.0.0.0",
        type: "vnc"
    },
    vmNic0: {
        networkId: 3 // vlan173
    }
}
