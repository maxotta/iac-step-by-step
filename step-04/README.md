# Step 04 - Terraform Cloud Development Kit (CDK)

## First demo

When creating a new project:
```
cdktf init
```

Add opennebula provider to cdktf.json:  (see https://registry.terraform.io/providers/OpenNebula/opennebula/latest)

```
  "terraformProviders": [
    "opennebula/opennebula@~>0.4.3"
  ],
```

Start here if you cloned the project from a repo:
```
cdktf get
npm install
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
