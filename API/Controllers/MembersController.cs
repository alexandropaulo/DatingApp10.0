using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
/* Retirado deviddo a alteração para herdar da classe base
[Route("api/[controller]")] //localhost:5001/members
[ApiController]*/

public class MembersController(AppDbContext context) : BaseApiController //ControllerBase Alterado para herdar da classe modelo
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
    {
        var members = await context.Users.ToListAsync();
        return members;
    }

    [Authorize]
    [HttpGet("{id}")] //localhost:5001/members/bop=id
    public async Task<ActionResult<AppUser>> GetMember(string id)
    {
        var member = await context.Users.FindAsync(id);
        if (member == null) return NotFound();
        return member;
    }
}
