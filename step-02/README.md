# Step 02 - Creating the first VM

This example shows basic script provisioning of a VM. The provisioning is done by two shell scripts, which perform a basic security setup by updating the installed software packages, disabling password authentication for SSH, ```root``` superuser login and add a new user ```nodeadm``` added to ```sudoers```:
* **```init-node.sh```** - sets the hostname and performs update of all installed packages.
* **```init-users.sh```** - creates a new user ```nodeadm``` with ```sudo``` enabled and install a public SSH key for SSH authentication. Further, the script changes SSH daemon configuration, so password authentication and ```root``` superuser login are disabled.

## Project setup

Check variable settings from your local environment in the **```terraform.tfvars```** file.

## Start the project

Just type ```terraform apply``` and the VM will be created and provisioned with the provided shell scripts. After a while you can ```ssh``` as ```nodeadm``` to the new VM.
At the end, finish you work with ```terraform destroy```


