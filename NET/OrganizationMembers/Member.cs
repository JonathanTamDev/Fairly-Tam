public class Member
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Mi { get; set; }
    public string Email { get; set; }
    public string AvatarUrl { get; set; }
    public LookUp Role { get; set; }
    public LookUp Position { get; set; }
    public string OrganizationEmail { get; set; }
}