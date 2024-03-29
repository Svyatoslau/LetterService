﻿using LetterService.Services.Security.Interfaces;
using System.Security.Cryptography;

namespace LetterService.Services.Security;

public class SecretHasher : IHasher
{
    private const int _saltSize = 16;
    private const int _keySize = 32;
    private const int _iterations = 100000;
    private readonly HashAlgorithmName _algorithm = HashAlgorithmName.SHA256;

    private const char segmentDelimiter = ':';

    public string Hash(string input)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(_saltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
            input,
            salt,
            _iterations,
            _algorithm,
            _keySize
        );
        return string.Join(
            segmentDelimiter,
            Convert.ToHexString(hash),
            Convert.ToHexString(salt)
        );
    }

    public bool Verify(string input, string hashString)
    {
        string[] segments = hashString.Split(segmentDelimiter);
        byte[] hash = Convert.FromHexString(segments[0]);
        byte[] salt = Convert.FromHexString(segments[1]);
        byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(
            input,
            salt,
            _iterations,
            _algorithm,
            _keySize
        );
        return CryptographicOperations.FixedTimeEquals(inputHash, hash);
    }
}
