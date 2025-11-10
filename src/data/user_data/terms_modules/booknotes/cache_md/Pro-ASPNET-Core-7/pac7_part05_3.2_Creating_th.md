# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 5)


**Starting Chapter:** 3.2 Creating the project

---


#### Creating a Controller and View
Background context: This part involves setting up a controller that handles HTTP requests and generates views to present forms.

:p What are controllers and views used for in this application?
??x
Controllers handle the logic and business rules of the application, while views provide the user interface. In this case, they work together to manage form submissions and display responses.
x??

---


#### Validating User Data and Displaying Errors
Background context: This step involves ensuring that input from users is correct before processing it.

:p How does validation affect the data handling process?
??x
Validation ensures that only valid data is processed by the application. It helps prevent errors, such as incorrect or missing information, by providing immediate feedback to the user through error messages.
x??

---


#### Configuring the Project Settings
Background context: This concept involves setting up the `launchSettings.json` file in the `Properties` folder to specify which port the application will listen on for HTTP requests. It helps in ensuring that the application starts correctly.

:p How do you configure the project settings to set a specific port?
??x
You need to modify the `launchSettings.json` file located in the `Properties` folder. The relevant part of the configuration should look like this:

```json
{
  "profiles": {
    "PartyInvites": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "applicationUrl": "http://localhost:5000",  // Set your desired port here
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

Here, the `applicationUrl` is set to listen on `http://localhost:5000`. You can replace `5000` with any port number you prefer.

x??

---


#### Defining a HomeController
Background context: This concept involves creating a basic home controller that returns a view when requested. It sets the stage for adding more functionality such as displaying information, handling forms, and validation.

:p How do you define a simple home controller in ASP.NET Core?
??x
You can define a simple `HomeController` by modifying or creating the `HomeController.cs` file in the `Controllers` folder. The basic structure is as follows:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace PartyInvites.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}
```

This code defines a controller named `HomeController` with an action method named `Index`. When this action is called, it returns the view associated with the `Index` action.

x??

---


#### Adding a Data Model
Background context: The data model represents real-world objects, processes, and rules that define the subject of an ASP.NET Core application. For simplicity, only one domain class (`GuestResponse`) is needed for the PartyInvites project.

:p What is the `GuestResponse` class used for in this example?
??x
The `GuestResponse` class is a simple data model representing an RSVP from an invitee. It contains properties such as Name, Email, Phone, and WillAttend to store information about guest responses.

```csharp
namespace PartyInvites.Models {
    public class GuestResponse {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public bool? WillAttend { get; set; }
    }
}
```
x??

---


#### Adding Validation
Background context: Nullable properties in the `GuestResponse` class are important for validation. ASP.NET Core will handle null values appropriately, ensuring that optional fields are not required to be filled out.

:p Why are all the properties of the `GuestResponse` class nullable?
??x
All the properties of the `GuestResponse` class are made nullable (using `?`) because it allows them to be optional. This is useful for validation purposes where some fields may not always have values, such as a guest's phone number.

For example:
- `Name`: May or may not be provided by the user.
- `Email`: Required but might still contain null if no value was entered.
- `Phone`: Not required and can be left empty.

This approach ensures that the model is flexible and can handle different data entry scenarios gracefully.

```csharp
public class GuestResponse {
    public string? Name { get; set; } // Nullable string for name
    public string? Email { get; set; } // Nullable string for email, required field
    public string? Phone { get; set; } // Nullable string for phone, optional field
    public bool? WillAttend { get; set; } // Nullable boolean to indicate attendance status
}
```
x??

---


#### Creating a Second Action and View
Background context: An ASP.NET Core application often needs multiple actions to handle different requests. The `RsvpForm` action method was added to the `HomeController` to provide an RSVP form for users.

:p How did you add the `RsvpForm` action in the HomeController?
??x
To add a new action method called `RsvpForm` in the `HomeController`, update the `HomeController.cs` file as follows:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace PartyInvites.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() { return View(); }
        public ViewResult RsvpForm() { return View(); }
    }
}
```

This code defines a new action method `RsvpForm` that returns a view result, indicating to the Razor view engine to look for a corresponding view file.

To create the associated view:

- In Visual Studio, right-click on the `Views/Home` folder and select "Add > New Item", then choose "Razor View – Empty" with the name `RsvpForm.cshtml`.
- In Visual Studio Code, right-click on the `Views/Home` folder, select "New File", set the file name to `RsvpForm.cshtml`, and add the content as shown.

The view file contains basic HTML:

```html
@{ Layout = null; }
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>RsvpForm</title>
</head>
<body>
    <div>
        This is the RsvpForm.cshtml View
    </div>
</body>
</html>
```

:p How does the `RsvpForm` action method work?
??x
The `RsvpForm` action method works by returning a view result (`ViewResult`). The Razor view engine uses this to locate and render the corresponding view file, in this case, `RsvpForm.cshtml`. 

When you navigate to `/home/rsvpform` via your browser or URL, ASP.NET Core locates the `RsvpForm.cshtml` view and renders it, displaying a simple message indicating that this is the RsvpForm view.

```csharp
public ViewResult RsvpForm() { return View(); }
```
x??

---

---

