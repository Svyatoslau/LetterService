﻿namespace LetterService.Models.DTO;

public class UserDto
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public Role Role { get; set; }
}
