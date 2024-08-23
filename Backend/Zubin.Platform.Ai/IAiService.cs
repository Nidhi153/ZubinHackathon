using System.Threading.Tasks;
using Zubin.Platform.Ai.Models;

namespace Zubin.Platform.Ai
{
    public interface IAiService
    {
        //     Task<Device> ControlDeviceAsync(string accessToken, string gatewayId,
        //DeviceType deviceEnum, string deviceId, ActionType actionEnum, string value);
        Task<SendMessageResponse> SendMessageToChatbox(string userId, string message);
    }


}
