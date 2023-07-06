public class OrganizationMember
{
    public int Id { get; set; }
    public MembersOrganizationBase Organization { get; set; }
    public LookUp OrganizationTypeId { get; set; }
    public BaseLocation Location { get; set; }
    public List<Member> Members { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateModified { get; set; }
}