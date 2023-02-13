# Step 04 - Terraform Cloud Development Kit (CDK)

## Step-02 using Terraform CDK

When creating a new project:
```
cdktf init
```

Add opennebula provider to cdktf.json:  (see https://registry.terraform.io/providers/OpenNebula/opennebula/latest)
Github: https://github.com/OpenNebula/terraform-provider-opennebula

```
  "terraformProviders": [
    "opennebula/opennebula@~>1.1.1"
  ],
```

Start here if you cloned the project from a repo:
```
cdktf get
npm install
```

```
cdktf synth
cdktf plan
```

```
cdktf apply
```


```
ssh nodeadm@147.228.173.116
```

```
ssh-keygen -f "/home/max/.ssh/known_hosts" -R "147.228.173.116"
```
