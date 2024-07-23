using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using todoAPI.Entities;

namespace todoAPI.Data
{
    public class TodoDbContext : IdentityDbContext
    {
        private readonly IConfiguration configuration;

        public DbSet<TodoTask> Tasks {  get; set; }

        public TodoDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;   
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostgreSqlConnection"));
        }
    }
}
