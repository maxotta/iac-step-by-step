/*
 * First Terraform CDK example project
 */
import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack, TerraformLocal } from "cdktf";
import { OpennebulaProvider } from "./.gen/providers/opennebula/opennebula-provider";
import { Image, VirtualMachine, VirtualMachineDisk } from "./.gen/providers/opennebula";
import * as cfg from "./config";
import * as fs from 'fs';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new OpennebulaProvider(this, "opennebula", cfg.nebulaApi);

    const vmImage = new Image(this, "os-vm-image", {
        name: cfg.normalNode.vmImageName,
        datastoreId: cfg.normalNode.vmDatastoreId,
        persistent: false,
        path: cfg.normalNode.vmImageUrl,
        permissions: "600",
        timeout: 10
    });
    
    const imageId = new TerraformLocal(this, "imageId", vmImage.id);

    const vmName = "test-node-vm";

    const vmDisk: VirtualMachineDisk = {
      imageId: imageId.asNumber,
      target: "vda",
      size: 16000 // 16G
    }

    const initEnv : Map<string, string> = new Map([
      ["INIT_USER", cfg.normalNode.vmAdmin],
      ["INIT_PUBKEY", cfg.normalNode.vmPubkey],
      ["INIT_LOG", cfg.normalNode.vmInitLog],
      ["INIT_HOSTNAME", vmName]
    ]);

    const setEnvScript = this.buildInitEnvScript(initEnv);
    const initScript = this.buildAndEncodeInitScript(
                      setEnvScript,
                      [ "init-start.sh",
                        "init-node.sh",
                        "init-users.sh",
                        "init-finish.sh" ]);

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
        START_SCRIPT_BASE64: initScript
      },
      os: cfg.normalNode.vmOs,
      disk: [ vmDisk ],
      graphics: cfg.normalNode.vmGraphics,
      nic: [ cfg.normalNode.vmNic0 ],
      timeout: 10
    })
  
    new TerraformOutput(this, "vm-ip-addr", {
      value: vm.ip
    })

  }
  
  protected buildInitEnvScript(env: Map<string, string>): string {
    let script = "";
    env.forEach((value, key) => {
      script += `export ${key}="${value}"\n`;
    });
    return script;
  }

  protected buildAndEncodeInitScript(inline: string, files: string[]): string {
    let merged  = inline;
    files.forEach(file => {
      merged += fs.readFileSync('init-scripts/' + file, 'utf8') + '\n';
    });
    return Buffer.from(merged, 'utf8').toString('base64');
  }

}

const app = new App();
new MyStack(app, "step-04");
app.synth();

/*
 * EOF
 */
