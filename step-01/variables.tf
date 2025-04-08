variable "one_endpoint"  {
    description = "Open Nebula endpoint URL"
    default = "https://your-opennebula-server/RPC2"
}
variable "one_username"  {
    description = "Open Nebula username"
}
variable "one_password"  {
    description = "Open Nebula login token"
}
variable "vm_ssh_pubkey" {
    description = "SSH public key used for login as root into the VM instance"
}
variable "vm_startup_script" {
    description = "VM Startup script"
}
variable "vm_imagedatastore_id" {
    description = "Open Nebula datastore ID"
    default = 101 # => nuada_pool
}
variable "vm_network_id" {
    description = "ID of the virtual network to attach to the virtual machine"
    default = 3 # => "vlan173"
    # default = 1 # => "vlan121 (aether)"
}
variable "vm_image_name" {
    description = "VM OS image name"
}
variable "vm_image_url"  {
    description = "VM OS image URL"
}
