# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 17)


**Starting Chapter:** Conclusion

---


#### Terraform Resource Movement and Immutability
Terraform will perform actions based on changes detected between the desired state and the current state. In this case, `aws_security_group.instance` has been moved to `aws_security_group.cluster_instance`. When you update a resource that is immutable (unchangeable), Terraform will destroy the old resource and create a new one.
:p What does Terraform do when it encounters an immutable parameter change?
??x
When an immutable parameter changes, Terraform destroys the old resource and creates a new one. This ensures consistency with the desired state but can result in additional costs due to the creation and deletion of resources.
x??

---


#### Plan Command in Terraform
The `plan` command is used to preview the actions that will be taken by Terraform based on changes detected between the current state and the desired state. In this case, no actions are required as there are no resources to add, change, or destroy.
:p What does the `plan` command show in Terraform?
??x
The `plan` command shows a preview of what Terraform intends to do based on the differences between the current state and the desired state. It helps you understand whether any changes will be made before actually applying them.
x??

---


#### Immutable Parameters in Resources
Many resources have parameters that are immutable, meaning once they are set, they cannot be changed without Terraform deleting the old resource and creating a new one. This is important to consider when planning updates to your infrastructure using Terraform.
:p Why are some parameters considered immutable in Terraform?
??x
Immutable parameters in Terraform are those where changing their value will cause Terraform to destroy the existing resource and create a new one with the updated configuration. This ensures that the state of the resource remains consistent with its intended configuration, but it can lead to additional costs if not managed carefully.
x??

---


#### Plan Output Interpretation
The plan output indicates that there are no actions required as the desired state matches the current state without any changes. However, this does not mean no further changes will be made; you should still use the `plan` command for future updates.
:p What does "0 to add, 0 to change, 0 to destroy" in a Terraform plan indicate?
??x
"0 to add, 0 to change, 0 to destroy" in a Terraform plan indicates that no new resources need to be created, no existing resources need to be modified, and no existing resources need to be destroyed. This suggests that the desired state already matches the current state.
x??

---


#### Plan Command Usage
The `plan` command is used to get a preview of what Terraform intends to do before applying any changes. It helps you understand if your configurations are correct and if there will be any actions taken by Terraform.
:p When should you use the `plan` command in Terraform?
??x
You should use the `plan` command in Terraform whenever you make changes to your configuration files or when you want to see what actions Terraform intends to take before applying them. This helps in understanding and validating the intended state without actually making the changes.
x??

---


#### Flexibility of Terraform Language
Terraform includes many tools like variables, modules, `count`, `for_each`, `for`, `create_before_destroy` strategies, and built-in functions that provide a lot of flexibility and expressive power to the language. This allows you to handle complex configurations more effectively.
:p What are some of the flexible tools in Terraform?
??x
Some of the flexible tools in Terraform include variables, modules, `count`, `for_each`, `for` loops, `create_before_destroy` strategies, and built-in functions. These tools help manage configuration files for large or complex infrastructures more effectively.
x??

---


#### Conclusion on Modules Handling Secrets
The next chapter will cover how to create modules that handle secrets and sensitive data in a safe and secure manner. This is crucial as it helps ensure that sensitive information is not exposed during the infrastructure deployment process.
:p What is the focus of the upcoming chapter?
??x
The upcoming chapter focuses on creating modules that handle secrets and sensitive data securely, ensuring that such information remains protected during the infrastructure deployment process.
x??

---

---


#### Do Not Store Secrets in Plain Text
Background context explaining why storing secrets in plain text is a bad practice. The text emphasizes the importance of keeping sensitive data secure and provides examples of potential risks if secrets are not managed properly.

:p Why should you avoid storing secrets like database credentials or API keys directly in your Terraform code?
??x
Storing secrets in plain text poses significant security risks. If someone gains access to your version control system, they could potentially obtain all the sensitive information required to compromise your systems and data. This is particularly dangerous because:

- **Version Control System**: Every developer with access to the repository can see these credentials.
- **Local Copies**: Any machine that has ever checked out or worked on the project might still have local copies of the secrets, even after they are supposedly removed.

For example, consider a scenario where you check in your Terraform code into GitHub and use Jenkins for CI/CD. If an attacker gains access to either system, they can potentially retrieve the sensitive information.
x??

---


#### Secrets Management Basics
Background context explaining the importance of managing secrets securely. The text highlights that storing secrets in plain text is a major security risk.

:p What are the two fundamental rules of secrets management mentioned in the chapter?
??x
The first rule of secrets management is: Do not store secrets in plain text.
The second rule of secrets management is: DO NOT STORE SECRETS IN PLAIN TEXT. Seriously, don’t do it.

These rules emphasize the critical importance of keeping sensitive information secure by avoiding any plaintext storage, especially within version control systems like Git.
x??

---


#### Example of Poor Secret Management
Background context explaining a bad practice of storing secrets directly in code and checking them into version control. The text provides an example of incorrect Terraform configuration.

:p Why is it considered poor practice to include sensitive information like database usernames and passwords directly in the Terraform code?
??x
Including sensitive information like database usernames and passwords directly in the Terraform code without proper management practices can lead to several security issues, including:

- **Exposure through Version Control**: Anyone with access to the repository can see these credentials.
- **Persistence on Local Machines**: Any machine that has checked out the repository might still have local copies of the secrets.

For example:
```hcl
resource "aws_db_instance" "example" {
   identifier_prefix    = "terraform-up-and-running"
   engine               = "mysql"
   allocated_storage    = 10
   instance_class       = "db.t2.micro"
   skip_final_snapshot  = true
   db_name              = var.db_name
   # DO NOT DO THIS...
   username  = "admin"
   password  = "password"
}
```
The above code directly embeds sensitive information, which is a significant security risk.
x??

---


#### Proper Secret Management Techniques
Background context explaining the importance of using tools to manage secrets securely. The text mentions that proper secret management involves not storing secrets in plain text.

:p What is one recommended practice for managing database credentials in Terraform?
??x
One recommended practice for managing database credentials in Terraform is to use environment variables, secret management services (like HashiCorp Vault), or other secure methods to store and retrieve sensitive information without hardcoding it into your configuration files.

For example:
```hcl
resource "aws_db_instance" "example" {
   identifier_prefix    = "terraform-up-and-running"
   engine               = "mysql"
   allocated_storage    = 10
   instance_class       = "db.t2.micro"
   skip_final_snapshot  = true
   db_name              = var.db_name
   username             = var.username
   password             = var.password
}

# Example in a Terraform backend configuration or an environment variable setup
variable "username" {
   default = "${var.secret_engine.get \"db_username\"}"
}

variable "password" {
   default = "${var.secret_engine.get \"db_password\"}"
}
```
Using this approach, you can securely manage and retrieve sensitive information without exposing them in your code.
x??

---

---


#### Storing Secrets: File-Based Strategy
Background context: The text explains that file-based secret stores use encrypted files stored in version control systems. Managing these keys securely is crucial to prevent unauthorized access.

:p What are the challenges associated with storing secrets using a file-based strategy?
??x
The challenges associated with storing secrets using a file-based strategy include:

1. **Key Management**: The encryption key itself needs secure storage, which can be problematic since it cannot be stored as plain text in version control.
2. **Security Risk**: If the key is compromised, all encrypted secrets become vulnerable.
3. **Complexity**: Implementing and managing the KMS (Key Management Service) securely adds complexity.

To address these challenges, common solutions involve storing keys in services like AWS KMS, GCP KMS, or Azure Key Vault. These services are trusted to securely store and manage access to the encryption keys.
x??

---


#### Storing Secrets: Centralized Strategy
Background context: The text describes centralized secret stores as web services that handle the encryption and storage of secrets using a data store such as MySQL or DynamoDB.

:p What is a key benefit of using a centralized secret store?
??x
A key benefit of using a centralized secret store is:

- **Simplified Key Management**: These systems manage the encryption keys for you, reducing the risk associated with manually managing keys.
- **Enhanced Security**: They provide robust security features and access controls to ensure that secrets are only accessible to authorized users.

Centralized secret stores simplify the process of storing and managing secrets by abstracting away the complexities of key management. This approach enhances overall security and reduces the burden on developers or administrators.
x??

---


#### Using Key Management Services (KMS)
Background context: The text explains how KMS services provided by cloud providers like AWS, GCP, and Azure are used to securely store encryption keys.

:p What is a key management service (KMS) and what role does it play in secret storage?
??x
A **Key Management Service (KMS)** is a cloud-based service that helps you create, control, and use encryption keys. It plays the following roles:

- **Secure Key Storage**: KMS securely stores your encryption keys without exposing them.
- **Access Controls**: It manages access controls to ensure that only authorized entities can use or manage these keys.

For example, using AWS KMS:
```java
// Pseudocode for accessing AWS KMS in Java
import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.model.*;

public class KmsExample {
    public static void main(String[] args) throws Exception {
        // Initialize the AWS KMS client
        AWSKMS kmsClient = AWSKMSClientBuilder.defaultClient();
        
        // Get a key from KMS
        String keyId = "1234abcd-12ab-34cd-56ef-1234567890ab";
        DecryptRequest request = new DecryptRequest().withCiphertextBlob(ByteBuffer.wrap("encryptedData".getBytes()));
        DecryptResponse response = kmsClient.decrypt(request);
        
        // Use the decrypted data
        System.out.println(new String(response.getPlaintext().array()));
    }
}
```

In this example, AWS KMS is used to decrypt an encrypted blob of data. The key ID is securely managed by AWS, providing a secure and centralized way to handle encryption keys.
x??

---

---

