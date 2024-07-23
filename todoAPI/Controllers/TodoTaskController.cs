using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoAPI.Data;
using todoAPI.Entities;

namespace todoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTaskController : ControllerBase
    {
        private readonly TodoDbContext _dbContext;

        public TodoTaskController(TodoDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks() 
        { 
            if(_dbContext.Tasks == null)
                return NotFound();
            return await _dbContext.Tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (id < 1)
                return BadRequest();
            var product = await _dbContext.Tasks.FirstOrDefaultAsync(m => m.Id == id);
            if (product == null)
                return NotFound();
            return Ok(product);

        }

        [HttpPost]
        public async Task<IActionResult> Post(TodoTask todoTask)
        {
            _dbContext.Add(todoTask);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(TodoTask todoTask)
        {
            if (todoTask == null || todoTask.Id == 0)
                return BadRequest();

            var product = await _dbContext.Tasks.FindAsync(todoTask.Id);
            if (product == null)
                return NotFound();
            product.Name = todoTask.Name;
            product.Description = todoTask.Description;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id < 1) 
                return BadRequest();
            var task = await _dbContext.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();
            _dbContext.Tasks.Remove(task);
            await _dbContext.SaveChangesAsync();
            return Ok();

        }
    }
}
