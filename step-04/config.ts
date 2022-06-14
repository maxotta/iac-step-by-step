export const nebulaApi = {
    endpoint: "https://your-opennebula-server/RPC2",
    username: "your-username",
    password: "your-login-token-6f41e9a367b9660-and-so-on"
}

export const normalNode = {
    vmImageName: "Ubuntu Minimal 22.04",
    vmImageUrl: "https://marketplace.opennebula.io/appliance/9fc4becb-a667-40a0-ba92-b580999150b5/download/0",
    vmAdmin: "nodeadm",
    vmPubkey: "your-public-ssh-key AAAAE2VjZHNhLX-and-so-on",
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
