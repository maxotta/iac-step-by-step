#!/usr/bin/env python
from constructs import Construct
from cdktf import App, TerraformLocal, TerraformOutput, TerraformStack
from imports.opennebula import Image, OpennebulaProvider, VirtualMachine, VirtualMachineDisk
from config import nebulaApi, normalNode

class MyStack(TerraformStack):
    def __init__(self, scope: Construct, ns: str):
        super().__init__(scope, ns)

        OpennebulaProvider(self, "opennebula",
            endpoint = nebulaApi['endpoint'],
            username = nebulaApi['username'],
            password = nebulaApi['password'])

        # Create the base image for all nodes:
        vm_image = Image(self, "os_vm_image",
            name = normalNode['vmImageName'],
            datastore_id = normalNode['vmDatastoreId'],
            persistent = False,
            path = normalNode['vmImageUrl'],
            permissions = "600",
            timeout = 10)
        # Store the image ID in a Terraform local variable for later use:
        vm_image_id = TerraformLocal(self, "vm_image_id", vm_image.id)

        # =========================================== The DB server node ===========================================
        db_vm_disk = VirtualMachineDisk(
            image_id = vm_image_id.as_number,
            target = "vda",
            size = 16000) # 16G

        db_vm = VirtualMachine(self, "db_vm",
            name = "dbserver",
            description = "Database server",
            cpu = 1,
            vcpu = 1,
            memory = 1024,
            permissions = "600",
            group = "users",
            context = {
                'NETWORK': "yes",
                'HOSTNAME': "dbserver",
                'SSH_PUBLIC_KEY': normalNode['vmPubkey']
            },
            os = normalNode['vmOs'],
            disk = [ db_vm_disk ],
            graphics = normalNode['vmGraphics'],
            nic = [ normalNode['vmNic0'] ],
            timeout = 10)

        # =========================================== The backend server node ===========================================
        backend_vm_disk = VirtualMachineDisk(
            image_id = vm_image_id.as_number,
            target = "vda",
            size = 16000) # 16G

        backend_vm = VirtualMachine(self, "backend_vm",
            name = "backendserver",
            description = "Backend server",
            cpu = 1,
            vcpu = 1,
            memory = 1024,
            permissions = "600",
            group = "users",
            context = {
                'NETWORK': "yes",
                'HOSTNAME': "backendserver",
                'SSH_PUBLIC_KEY': normalNode['vmPubkey']
            },
            os = normalNode['vmOs'],
            disk = [ db_vm_disk ],
            graphics = normalNode['vmGraphics'],
            nic = [ normalNode['vmNic0'] ],
            timeout = 10)

        # =========================================== The web server node ===========================================
        web_vm_disk = VirtualMachineDisk(
            image_id = vm_image_id.as_number,
            target = "vda",
            size = 16000) # 16G

        web_vm = VirtualMachine(self, "web_vm",
            name = "webserver",
            description = "Web server",
            cpu = 1,
            vcpu = 1,
            memory = 1024,
            permissions = "600",
            group = "users",
            context = {
                'NETWORK': "yes",
                'HOSTNAME': "webserver",
                'SSH_PUBLIC_KEY': normalNode['vmPubkey']
            },
            os = normalNode['vmOs'],
            disk = [ db_vm_disk ],
            graphics = normalNode['vmGraphics'],
            nic = [ normalNode['vmNic0'] ],
            timeout = 10)

        TerraformOutput(self, "dbserver-ip-address", value = db_vm.ip)
        TerraformOutput(self, "backendserver-ip-address", value = backend_vm.ip)
        TerraformOutput(self, "webserver-ip-address", value = web_vm.ip)

app = App()
MyStack(app, "cdk-python")

app.synth()
