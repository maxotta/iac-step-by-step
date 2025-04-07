terraform init
terraform plan
terraform apply

export ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i dynamic_inventories/microk8s ansible/microk8s-cluster.yml

ssh nodeadm@1.2.3.4



# microk8s enable dashboard

kubectl describe secret -n kube-system microk8s-dashboard-token

kubectl port-forward --address=0.0.0.0 -n kube-system service/kubernetes-dashboard 10443:443 & ===> run in background

Access: https://147.228.173.35:10443

kubectl top pod --all-namespaces


TODO:
[DEPRECATION WARNING]: The CmdMixin used in classes CmdModuleHelper and CmdStateModuleHelper is being deprecated. Modules should use 
community.general.plugins.module_utils.cmd_runner.CmdRunner instead. This feature will be removed from community.general in version 8.0.0. 
Deprecation warnings can be disabled by setting deprecation_warnings=False in ansible.cfg.



