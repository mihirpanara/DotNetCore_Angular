namespace API.Helpers
{
    public class LikeParams : PaginationParams
    {
        public int UserID { get; set; }
        public string Predicate { get; set; }
    }
}
