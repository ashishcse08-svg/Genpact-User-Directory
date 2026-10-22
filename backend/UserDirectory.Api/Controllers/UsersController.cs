using Microsoft.AspNetCore.Mvc;
using UserDirectory.Api.DTOs;
using UserDirectory.Api.Models;
using UserDirectory.Api.Services;

namespace UserDirectory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UsersController(IUserService users) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<User>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<User>>> GetAll(CancellationToken ct) => Ok(await users.GetAllAsync(ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> GetById(int id, CancellationToken ct)
    {
        var user = await users.GetByIdAsync(id, ct); return user is null ? NotFound(new { message = "User not found." }) : Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> Create([FromBody] UserRequest request, CancellationToken ct)
    {
        var user = await users.CreateAsync(request, ct); return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UserRequest request, CancellationToken ct)
        => await users.UpdateAsync(id, request, ct) ? NoContent() : NotFound(new { message = "User not found." });

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
        => await users.DeleteAsync(id, ct) ? NoContent() : NotFound(new { message = "User not found." });
}
