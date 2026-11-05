using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Alterado pois a cláusula required apenas valida se o campo existe no body da requisição, mas não se possui um valor válido
        //Então foi introduzido o comando [Required] para esse tipo de validação, porem com ele o campo deve ser inicializado com nulo
        
        [Required]
        public string DisplayName { get; set; } = "";
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        [MinLength(4)]
        public string Password { get; set; } = "";
    }
}