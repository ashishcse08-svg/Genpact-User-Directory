using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;
using UserDirectory.Api.DTOs;
using UserDirectory.Api.Models;

namespace UserDirectory.Api.Services;

public sealed class UserService(AppDbContext db) : IUserService
{
    public Task<List<User>> GetAllAsync(CancellationToken ct) => db.Users.AsNoTracking().OrderBy(x => x.Name).ToListAsync(ct);
    public Task<User?> GetByIdAsync(int id, CancellationToken ct) => db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
    public async Task<User> CreateAsync(UserRequest request, CancellationToken ct)
    {
        var user = Map(request); db.Users.Add(user); await db.SaveChangesAsync(ct); return user;
    }
    public async Task<bool> UpdateAsync(int id, UserRequest request, CancellationToken ct)
    {
        var user = await db.Users.FindAsync([id], ct); if (user is null) return false;
        user.Name = request.Name.Trim(); user.Age = request.Age!.Value; user.City = request.City.Trim(); user.State = request.State.Trim(); user.Pincode = request.Pincode.Trim();
        await db.SaveChangesAsync(ct); return true;
    }
    public async Task<bool> DeleteAsync(int id, CancellationToken ct)
    {
        var user = await db.Users.FindAsync([id], ct); if (user is null) return false;
        db.Users.Remove(user); await db.SaveChangesAsync(ct); return true;
    }
    private static User Map(UserRequest r) => new() { Name = r.Name.Trim(), Age = r.Age!.Value, City = r.City.Trim(), State = r.State.Trim(), Pincode = r.Pincode.Trim() };
}
