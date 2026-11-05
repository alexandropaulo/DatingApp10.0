using Microsoft.AspNetCore.Mvc;

//Classe Base criada para que os controladores herdem dela a conguração o namespace e simplifique a escrita. 
//Herança de classe usada para modelar as filhas e economizar linhas de código
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        
    }
}