using Microsoft.EntityFrameworkCore;
using Project;
using System;
using System.Collections.Generic;
using System.Text;

namespace XUnitTestProject1
{
    public static class MockContext
    {
        public static ProjectCContext GetContext(string dbName)
        {
            // Create options for DbContext instance
            var options = new DbContextOptionsBuilder<ProjectCContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            // Create instance of DbContext
            var dbContext = new ProjectCContext(options);

            // Add entities in memory
            //dbContext.Seed();

            return dbContext;
        }
    }
}
