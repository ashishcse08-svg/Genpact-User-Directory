using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;
using UserDirectory.Api.DTOs;
using UserDirectory.Api.Services;
using Xunit;

namespace UserDirectory.Api.Tests;

public sealed class UserServiceTests
{
    private static (AppDbContext Db, UserService Service) CreateService()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        var db = new AppDbContext(options); return (db, new UserService(db));
    }
    [Fact]
    public async Task CreateAndGet_ReturnsPersistedUser()
    {
        var (db, service) = CreateService();
        var created = await service.CreateAsync(new UserRequest { Name = "Asha Rao", Age = 30, City = "Pune", State = "Maharashtra", Pincode = "411001" }, default);
        var found = await service.GetByIdAsync(created.Id, default);
        Assert.NotNull(found); Assert.Equal("Asha Rao", found!.Name); await db.DisposeAsync();
    }
    [Fact]
    public async Task Delete_MissingUser_ReturnsFalse()
    {
        var (db, service) = CreateService(); Assert.False(await service.DeleteAsync(999, default)); await db.DisposeAsync();
    }
}
