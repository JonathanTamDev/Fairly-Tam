public class OrgMemberUserCheck : BaseUser
{
    #nullable enable
    public int? OrganizationId { get; set; }
    public string? InviteEmail { get; set; }
    #nullable disable
}