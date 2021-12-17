using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthService.Models
{
    /*From Entity Framework to implement ORM. ApplicationDbContext is used for database CRUD operations.
    -https://docs.microsoft.com/en-us/ef/core/dbcontext-configuration/
    -https://docs.microsoft.com/en-us/ef/ef6/fundamentals/working-with-dbcontext?redirectedfrom=MSDN
    */
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext()
        {

        }
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; } = null!;
    }
}
