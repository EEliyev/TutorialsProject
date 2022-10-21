using System.ComponentModel;

namespace TutorialsWebApi.Domain.Enums
{
    public enum RecordStatus
    {
        [Description("IsActive")]
        IsActive,
        [Description("InActive")]
        InActive,
        [Description("Deleted")]
        Deleted

    }

}
