# projectc
project c
Needed to open project:
 - Visual Studio 2019 or another version (not Visual Studio Code) https://visualstudio.microsoft.com/
 - NPM.js (Node Package Manager) https://docs.npmjs.com/
 - .NET Core 3.1 https://dotnet.microsoft.com/download
 - pgAdmin4 and postgres installed on your computer
 - postman  https://www.postman.com/

1. Open the Project.sln
2. Go to appsettings.json and replace "Host=localhost;Port=5432;Database=Project C;Username=postgres;Password=postgres" with your own credentials for pgAdmin
3. If appsettings.json is not included, right click on the project add -> add new item -> App Settings File and replace the content with the following :
NOTE: replace the connection string with your own credentials.
```
        {
          "Logging": {
            "LogLevel": {
              "Default": "Information",
              "Microsoft": "Warning",
              "Microsoft.Hosting.Lifetime": "Information"
            }
          },
          "ConnectionStrings": {
            "ProjectcDb": "Host=localhost;Port=5432;Database=Project C;Username=postgres;Password=postgres"
          },
          "AllowedHosts": "*",
          "jwtTokenConfig": {
            "secret": "1234567890123456789",
            "issuer": "https://localhost:44338",
            "audience": "https://localhost:44338",
            "accessTokenExpiration": 20,
            "refreshTokenExpiration": 60
          }
        }
```
4. Open Nugget Package manager console in visual studio (tools -> nugget package manager -> package manager console).
5. Type the following command: "Dotnet ef database update".
6. After success message, click on run.
7. NPM should be installing the packages and the project should be runnning, Note that it might take a while because there are a lot of dependencies.
8. For the Unit Tests and Integration Tests, press ctrl + r + t to get the test explorer and to run the tests.
9. To test the admin panel etc, open postman
10. Enter the following url : https://localhost:44338/api/admins
11. Set the method to POST
12. Go to the Body tab, and selec "raw" and JSON
13. Enter the following to create an Admin:
```
{
    "Username": "",
    "Password": "",
}
```
You can create an admin with any credentials you would like, just make sure the data is between "".

14. The url for the admin login is "/adminlogin" and for the admin panel "/adminpanel"







