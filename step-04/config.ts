export const nebulaApi = {
    endpoint: "https://your-opennebula-server/RPC2",
    username: "your-username",
    password: "your-login-token-6f41e9a367b9660etc..."
}

export const normalNode = {
    vmImageName: "CICD - Alpine Linux 3.21",
    vmImageUrl: "https://marketplace.opennebula.io/appliance/9ea07f80-beb8-013d-a75b-7875a4a4f528/download/0",
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
//      networkId: 1 // "vlan121 (aether)"

    }
}
