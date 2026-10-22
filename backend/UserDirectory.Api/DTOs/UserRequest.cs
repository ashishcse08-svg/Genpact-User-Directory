using System.ComponentModel.DataAnnotations;

namespace UserDirectory.Api.DTOs;

public sealed class UserRequest
{
    [Required, StringLength(100, MinimumLength = 2)] public string Name { get; set; } = string.Empty;
    [Required, Range(0, 120)] public int? Age { get; set; }
    [Required, StringLength(100)] public string City { get; set; } = string.Empty;
    [Required, StringLength(100)] public string State { get; set; } = string.Empty;
    [Required, StringLength(10, MinimumLength = 4)] public string Pincode { get; set; } = string.Empty;
}
