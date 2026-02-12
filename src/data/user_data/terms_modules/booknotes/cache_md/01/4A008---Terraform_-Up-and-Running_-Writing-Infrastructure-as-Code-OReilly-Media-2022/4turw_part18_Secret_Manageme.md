# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 18)


**Starting Chapter:** Secret Management Tools with Terraform

---


#### Encryption Key Management
Background context: An encryption key is used to encrypt and decrypt data. Typically, it is managed by the service itself or relies on a cloud provider’s Key Management Service (KMS). The key can be stored in various secret management tools, which are designed to handle secure storage, retrieval, and usage of these keys.
:p How is an encryption key typically managed?
??x
An encryption key is usually managed by the service itself or through a cloud provider's Key Management Service (KMS).
x??

---


#### Example of Using API to Retrieve Secrets
Background context: APIs are often used by applications to retrieve secrets securely during boot-up or runtime. This ensures that sensitive information like database passwords can be fetched without being hardcoded in the application code.
:p How might an application use an API to retrieve a secret, such as a database password?
??x
An application can use an API call to fetch a database password from a centralized secret store when booting up or running. For example:

```java
public class SecretRetriever {
    private String getDatabasePassword() {
        // Example REST API call using HTTP client
        HttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet("https://secrets-store.example.com/api/secrets/db_password");
        
        try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
            if (response.getStatusLine().getStatusCode() == 200) {
                String password = EntityUtils.toString(response.getEntity());
                return password;
            } else {
                throw new RuntimeException("Failed to retrieve secret: " + response.getStatusLine());
            }
        } catch (IOException e) {
            throw new RuntimeException("Error during API call", e);
        }
    }
}
```
x??

---


#### Storing Secrets Directly in Code
Background context: The provided text emphasizes the importance of not storing secrets directly in the code, especially for providers like AWS. This method is insecure and impractical as it hardcodes credentials across all users and environments.

:p How should you store secrets when working with Terraform, specifically for authentication to a provider?
??x
Storing secrets directly in plain text within the code is not secure or practical. Instead, consider using more secure methods such as environment variables, secret management tools (e.g., HashiCorp Vault), or Terraform backend configurations.

Example of storing credentials securely:
```sh
export TF_VAR_aws_access_key=$(cat ~/.aws/credentials | grep aws_access_key_id | awk '{print$2}' | sed 's/"//g')
export TF_VAR_aws_secret_key=$(cat ~/.aws/credentials | grep aws_secret_access_key | awk '{print$2}' | sed 's/"//g')
```
This script reads the AWS credentials from a file and stores them as environment variables.

```sh
provider "aws" {
  region = "us-east-2"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}
```

x??

---


#### Secure Secrets for Machine Users
Background context: The text highlights the need for secure storage of credentials in environments where no human interaction is present, such as CI servers. This often involves more robust and centralized solutions.

:p How do you handle secrets management for automated systems (CI servers) running Terraform?
??x
For machine users like CI servers, use a more robust secret management solution such as HashiCorp Vault or another centralized service designed to securely store and manage credentials at scale.

Example: Using HashiCorp Vault with Terraform.
```hcl
provider "aws" {
  region = "us-east-2"
  access_key = "${lookup(var.aws_credentials, "access_key", null)}"
  secret_key = "${lookup(var.aws_credentials, "secret_key", null)}"
}

variable "aws_credentials" {
  type = map(string)
}
```

You can then use a Vault plugin or direct API calls to fetch these secrets:
```sh
vault read -field=access_key aws/creds/example
```
x??

---

---


---
#### Storing AWS Credentials Securely Using Environment Variables
Background context: When working with AWS, it is crucial to securely store your access keys and secret keys. Storing these credentials directly in code or plain text files can expose sensitive information. Instead, environment variables provide a safer alternative by keeping the credentials out of your source code.

:p How do you set up environment variables for AWS authentication?
??x
To set up environment variables for AWS authentication, follow these steps:

1. Open your terminal.
2. Set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables using the `export` command:
   ```sh
   export AWS_ACCESS_KEY_ID=(YOUR_ACCESS_KEY_ID)
   export AWS_SECRET_ACCESS_KEY=(YOUR_SECRET_ACCESS_KEY)
   ```

This method ensures that your credentials are not stored in plain text within your codebase, thereby reducing the risk of exposure.

??x
The answer with detailed explanations.
To securely authenticate to AWS using environment variables, you need to explicitly set these values before running any AWS CLI commands or Terraform scripts. This approach leverages the security principle of least privilege by requiring that each user sets their own credentials rather than having a shared secret stored in source control.

```sh
# Set up the access key and secret key as environment variables
export AWS_ACCESS_KEY_ID=(YOUR_ACCESS_KEY_ID)
export AWS_SECRET_ACCESS_KEY=(YOUR_SECRET_ACCESS_KEY)

# You can now use these environment variables to authenticate with AWS CLI commands or Terraform scripts.
```

This setup ensures that credentials are only stored in memory, providing an additional layer of security compared to storing them on disk.

---


#### Machine Users and Authentication in CI/CD Pipelines
Background context explaining that machine users, as opposed to human users, require secure authentication mechanisms for automation tasks. This is particularly important in CI/CD pipelines where automated processes need to authenticate to cloud services without storing secrets in plain text.

:p What are the challenges of authenticating a machine user in a CI/CD pipeline?
??x
The main challenge is ensuring that the machine can securely authenticate itself to another machine or service (like AWS API servers) without storing any secrets in plain text. This is crucial for maintaining security and compliance, especially when dealing with automated processes.

Example: In CircleCI, you might need to store IAM access keys as environment variables within a CircleCI context.
```shell
circleci context set my-context --key "AWS_ACCESS_KEY_ID" --value "my-access-key"
circleci context set my-context --key "AWS_SECRET_ACCESS_KEY" --value "my-secret-key"
```
x??

---


#### GitHub Actions as a CI/CD Server with OIDC (OpenID Connect)
Background context explaining the integration of OpenID Connect for authentication between GitHub and AWS. This approach leverages OAuth 2.0 to securely authenticate users or services.

:p How does OIDC-based authentication work in GitHub Actions?
??x
OIDC-based authentication works by configuring an OIDC identity provider in GitHub, which issues tokens that can be used to assume IAM roles in AWS. The workflow involves setting up a trust relationship between the OIDC provider and your AWS account. When GitHub Actions trigger Terraform code execution, it uses these tokens to gain temporary access to AWS services.

Example: Setting up an OIDC connection in AWS.
```shell
# Example using AWS CLI
aws iam create-open-id-connect-provider \
    --url "https://token.actions.githubusercontent.com" \
    --tags Key=Name,Value=GitHubActions
```
x??

---

---


#### EC2 Instance with IAM Roles for CI/CD Authentication
Background context: In this approach, you use an EC2 instance running Jenkins (a CI/CD server) and leverage AWS Identity and Access Management (IAM) roles to authenticate Terraform code. IAM roles provide temporary credentials, which are more secure than permanent access keys.

:p How does an IAM role differ from an IAM user?
??x
An IAM role differs from an IAM user in that it is not associated with any one person and has no permanent credentials like a password or access keys. Instead, roles can be assumed by other IAM entities such as services (like EC2) to grant them temporary permissions within the AWS account.

:p What steps are involved in creating an IAM role for an EC2 instance?
??x
To create an IAM role for an EC2 instance, you need to define an `assume role policy` and then use it when creating the IAM role. Here’s a step-by-step breakdown:
1. Define the `assume_role_policy` that allows the EC2 service to assume the role.
2. Use Terraform's `aws_iam_policy_document` data source to generate JSON for the `assume_role_policy`.
3. Create an `aws_iam_role` resource and set its `assume_role_policy` attribute to use the generated policy.

Example:
```hcl
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect   = "Allow"
    actions  = ["sts:AssumeRole"]
    principals {
      type         = "Service"
      identifiers  = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "instance" {
  name_prefix = var.name
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}
```
x??

---


#### Attaching IAM Policies to EC2 Instances via Instance Profiles
Background context: Once you have the policy defined, you need to attach it to an instance profile and then assign that instance profile to your EC2 instances. This ensures that only specific OS users can access metadata endpoints.

:p How do you attach a custom IAM policy to an IAM role using Terraform?
??x
You use the `aws_iam_role_policy` resource in Terraform to attach a custom IAM policy document to an existing IAM role. The policy document is obtained from the `data "aws_iam_policy_document"` block.

```hcl
resource "aws_iam_role_policy" "example" {
   role   = aws_iam_role.instance.id
   policy  = data.aws_iam_policy_document.ec2_admin_permissions.json
}
```
x??

---


#### IAM Role with OIDC for Terraform
Once you have set up the IAM OIDC identity provider, you can create an IAM role that allows specific GitHub repositories and branches to assume this role. The assumption policy is crucial for defining who can use these credentials.
:p How do you define a policy for assuming an IAM role via OIDC?
??x
You define a policy using `data "aws_iam_policy_document"` where the principal is set as the ARN of the OIDC provider and include conditions to restrict which repositories and branches are allowed to assume the role. Here’s an example:
```hcl
data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"
    principals {
      identifiers = [aws_iam_openid_connect_provider.github_actions.arn]
      type        = "Federated"
    }
    condition {
      test      = "StringEquals"
      variable  = "token.actions.githubusercontent.com:sub"
      values    = [
        for a in var.allowed_repos_branches : 
        "repo:${a.org}/${a.repo}:ref:refs/heads/${a.branch}"
      ]
    }
  }
}
```
This policy ensures that only specific GitHub repositories and branches are allowed to assume the IAM role.
??x

---


#### IAM Role and GitHub Actions Authentication

Background context: The text explains how to authenticate GitHub Actions to an AWS account using an IAM role. It discusses setting up temporary credentials for Terraform to use when running builds.

:p How do you configure a GitHub Action to assume an IAM role during a build?
??x
You need to provide the `id-token` permission and specify the IAM role to assume in the `configure-aws-credentials` action. Here's how:

```yaml
permissions:
  id-token: write

- uses: aws-actions/configure-aws-credentials@v1
  with:
    role-to-assume: arn:aws:iam::123456789012:role/example-role
    aws-region: us-east-2

- uses: hashicorp/setup-terraform@v1
  with:
    terraform_version: 1.1.0
    terraform_wrapper: false
  run: |
    terraform init
    terraform apply -auto-approve
```

x??

---


#### Using Environment Variables in Terraform

Background context: The text explains how to use environment variables as a secure way to pass secrets into your Terraform code. It provides an example of using these variables with the AWS database resource.

:p How do you pass sensitive values from environment variables to Terraform resources?
??x
You can pass sensitive values from environment variables to Terraform resources like this:

```hcl
resource "aws_db_instance" "example" {
  identifier_prefix = "terraform-up-and-running"
  engine            = "mysql"
  allocated_storage = 10
  instance_class    = "db.t2.micro"
  skip_final_snapshot = true
  db_name           = var.db_name

  # Pass the secrets to the resource
  username  = var.db_username
  password  = var.db_password
}
```

To set these environment variables, you would use:

```sh
export TF_VAR_db_username=YOUR_DB_USERNAME
export TF_VAR_db_password=YOUR_DB_PASSWORD
```

x??

---

---


#### Creating a CMK with AWS KMS
Creating a CMK involves defining its key policy, which is then used to create the CMK.

:p How do you create a CMK in AWS using Terraform?
??x
To create a CMK in AWS using Terraform, first define the key policy and then use it to create the CMK. Here’s an example:

```hcl
data "aws_caller_identity" "self" {}

data "aws_iam_policy_document" "cmk_admin_policy" {
  statement {
    effect = "Allow"
    resources = ["*"]
    actions  = ["kms:*"]

    principals {
      type         = "AWS"
      identifiers  = [data.aws_caller_identity.self.arn]
    }
  }
}

resource "aws_kms_key" "cmk" {
  policy = data.aws_iam_policy_document.cmk_admin_policy.json
}
```

This example creates a key policy that allows the current user to perform all KMS actions and then uses this policy to create a CMK.
x??

---


#### Key Concepts in AWS KMS and Terraform for Secret Management

Background context explaining the concept. This section covers how to use AWS Key Management Service (KMS) to securely manage secrets, particularly database credentials, using Terraform. The focus is on encrypting sensitive data, storing it safely in version control, and decrypting it within Terraform configurations.

:p What are the steps involved in encrypting a file with AWS KMS?
??x
The steps involve creating a ciphertext from plaintext by using the `aws kms encrypt` command. Here's an example of how to do this using a Bash script:

```bash
CMK_ID="$1"
AWS_REGION="$2"
INPUT_FILE="$3"
OUTPUT_FILE="$4"

echo "Encrypting contents of $INPUT_FILE using CMK$ CMK_ID..."
ciphertext=$(aws kms encrypt \
   --key-id "$CMK_ID" \
   --region "$AWS_REGION" \
   --plaintext "fileb://$INPUT_FILE" \
   --output text \
   --query CiphertextBlob )

echo "Writing result to $OUTPUT_FILE..."
echo "$ciphertext" > "$ OUTPUT_FILE"

echo "Done."
```

This script takes a KMS CMK ID, AWS region, input file path, and output file path as parameters. It encrypts the contents of the input file using the specified CMK and writes the ciphertext to the output file.

x??

---


#### Decrypting Secrets with Terraform

Background context explaining how to use `aws_kms_secrets` data source in Terraform to decrypt secrets stored in encrypted files.

:p How do you decrypt a secrets file within a Terraform configuration?
??x
You can use the `data aws_kms_secrets` data source to read and decrypt a secrets file. Here's an example:

```hcl
data "aws_kms_secrets" "creds" {
   secret {
     name     = "db"
     payload  = file("${path.module}/db-creds.yml.encrypted")
   }
}
```

This code reads the encrypted `db-creds.yml.encrypted` file from disk and decrypts it using KMS, assuming you have appropriate permissions.

Next, parse the YAML content:

```hcl
locals {
   db_creds = yamldecode(data.aws_kms_secrets.creds.plaintext["db"])
}
```

This local variable `db_creds` contains the decrypted secrets which can be accessed in your Terraform configuration as needed.

x??

---


#### Using Decrypted Secrets in Resources

Background context explaining how to use decrypted secrets in resource configurations, specifically with the AWS database instance example provided.

:p How do you use the decrypted secrets in an AWS database instance resource?
??x
After decrypting and parsing the secrets, you can pass them as variables to the relevant Terraform resources. For instance:

```hcl
resource "aws_db_instance" "example" {
   identifier_prefix = "terraform-up-and-running"
   engine             = "mysql"
   allocated_storage  = 10
   instance_class     = "db.t2.micro"
   skip_final_snapshot = true
   db_name            = var.db_name

   # Pass the secrets to the resource
   username  = local.db_creds.username
   password  = local.db_creds.password
}
```

This configuration ensures that the database instance is created with the correct credentials, while keeping the sensitive information safe by not checking the plaintext file into version control.

x??

---

---


#### Secret Management Practices
Background context: This section highlights the challenges in standardizing secret management practices across different teams using various methods.

:p What are some common mistakes developers make when managing secrets?
??x
Common mistakes include not encrypting sensitive data, incorrectly handling encryption keys, and accidentally checking plain-text files into version control.
x??

---


#### Using AWS Secrets Manager for Secret Storage
Background context: This section describes the steps to use AWS Secrets Manager to store and retrieve database credentials securely.

:p How can you read a secret stored in AWS Secrets Manager using Terraform?
??x
You can use the `aws_secretsmanager_secret_version` data source to read the secret. Here is how you can do it:

```hcl
data "aws_secretsmanager_secret_version" "creds" {
  secret_id = "db-creds"
}
```

After retrieving the secret, parse the JSON string using the `jsondecode` function:

```hcl
locals {
  db_creds = jsondecode(data.aws_secretsmanager_secret_version.creds.secret_string)
}
```

Now you can use `local.db_creds.username` and `local.db_creds.password` to pass the secrets into resources like an AWS database instance.

Example Terraform resource configuration:

```hcl
resource "aws_db_instance" "example" {
  identifier_prefix = "terraform-up-and-running"
  engine            = "mysql"
  allocated_storage = 10
  instance_class    = "db.t2.micro"
  skip_final_snapshot = true
  db_name           = var.db_name
  username          = local.db_creds.username
  password          = local.db_creds.password
}
```
x??

---


#### Advantages of Using Secret Stores
Background context: This section lists the benefits of using centralized secret stores like AWS Secrets Manager, Google Secret Manager, Azure Key Vault, or HashiCorp Vault.

:p What are some advantages of using a centralized secret store?
??x
Some key advantages include:
- Keeping plain-text secrets out of code and version control.
- Everything is defined in code with no manual steps required.
- Ease of storing secrets through web UIs.
- Support for rotating and revoking secrets as needed.
- Detailed audit logs showing access to data.
- Enforcing specific types of encryption, storage, and access patterns.

These features help standardize practices across teams.
x??

---

