/*
 * Terraform CDK Resources:
 *  https://developer.hashicorp.com/terraform/cdktf/concepts/providers
 */
/*
 * First Terraform CDK example project
 */
import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack, TerraformLocal } from "cdktf";
import { OpennebulaProvider } from "./.gen/providers/opennebula/opennebula-provider";
import { NullProvider } from "./.gen/providers/null/null-provider";
import { Image, VirtualMachine, VirtualMachineDisk } from "./.gen/providers/opennebula";
import * as cfg from "./config";
import * as path from 'path';

// for latest provider version see https://registry.terraform.io/providers/OpenNebula/opennebula/latest

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const projectDir = path.resolve();

    new OpennebulaProvider(this, "opennebula", cfg.nebulaApi);
    new NullProvider(this, "null");

    const vmImage = new Image(this, "os-vm-image", {
        name: cfg.normalNode.vmImageName,
        datastoreId: cfg.normalNode.vmDatastoreId,
        persistent: false,
        path: cfg.normalNode.vmImageUrl,
        permissions: "600"
    });
    
    const imageId = new TerraformLocal(this, "imageId", vmImage.id);

    const vmName = "test-node-vm";

    const vmDisk: VirtualMachineDisk = {
      imageId: imageId.asNumber,
      target: "vda",
      size: 12000 // 12G
    };

    const vm = new VirtualMachine(this, "test-node-vm",
    {
      name: vmName,
      description: "First testing VM",
      cpu: 1,
      vcpu: 1,
      memory: 1024,
      permissions: "600",
      group: "users",
      context: {
        NETWORK: "yes",
        HOSTNAME: vmName,
        SSH_PUBLIC_KEY: cfg.normalNode.vmPubkey,
        // FILES: "init-scripts/init-start.sh init-scripts/init-node.sh init-scripts/init-users.sh init-scripts/init-finish.sh",
        // INIT_SCRIPTS: "init-start.sh init-node.sh init-users.sh init-finish.sh"
      },
      os: cfg.normalNode.vmOs,
      disk: [ vmDisk ],
      graphics: cfg.normalNode.vmGraphics,
      nic: [ cfg.normalNode.vmNic0 ]
    });
  
    vm.addOverride("connection", {
      type: "ssh",
      user: "root",
      host: "${self.ip}"
    });
    vm.addOverride("provisioner", [
      {
        "file": {
          "source": projectDir + "/init-scripts/",
          "destination": "/tmp/"
        }
      }, {
        "remote-exec": {
          "inline": [
            "export INIT_USER=" + cfg.normalNode.vmAdmin,
            "export INIT_PUBKEY='" + cfg.normalNode.vmPubkey + "'",
            "export INIT_LOG=" + cfg.normalNode.vmInitLog,
            "export INIT_HOSTNAME=${self.name}",
            "touch " + cfg.normalNode.vmInitLog,
            "sh /tmp/init-node.sh",
            "sh /tmp/init-users.sh",
            "reboot"
          ]      
        }
      }
    ]);
    new TerraformOutput(this, "vm-ip-addr", {
      value: vm.ip
    });
  }  
}

const app = new App();
new MyStack(app, "step-04");
app.synth();

/*
 * EOF
 */
