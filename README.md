# projectc
project c
Needed to open project:
 - Visual Studio 2019 or another version (not Visual Studio Code) https://visualstudio.microsoft.com/
 - NPM.js (Node Package Manager) https://docs.npmjs.com/
 - .NET Core 3.1 https://dotnet.microsoft.com/download
 - pgAdmin4 and postgres installed on your computer

1. Open the Project.sln
2. Go to appsettings.json and replace "Host=localhost;Port=5432;Database=Project C;Username=postgres;Password=postgres" with your own credentials for pgAdmin
3. If appsettings.json is not included, right click on the project add -> add new item -> App Settings File and replace the content with the following :
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
NOTE: replace the connection string with your own credentials.
4. Open Nugget Package manager console in visual studio (tools -> nugget package manager -> package manager console)
5. Type the following command: "Dotnet ef database update"
6. After success message, click on run.
7. NPM should be installing the packages and the project should be runnning, Note that it might take a while because there are a lot of dependencies.
8. For the Unit Tests and Integration Tests, press ctrl + r + t to get the test explorer and to run the tests.
