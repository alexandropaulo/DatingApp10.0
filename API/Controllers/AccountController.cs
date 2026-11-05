using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //public class AccountController(AppDbContext context) : BaseApiController
    //Alterado para incluir o serviço que gera o token de autenticação para que possa ser retornado
    public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] //api/account/register
        /*public async Task<ActionResult<AppUser>> Register(string email, string displayName, string password)
        Alterado para que os dados do registro sejam obtiddos pelo corpo(body) da página e não pela barra de endereço
        Então foi criado uma classe dto que agora é o parâmetro da requsição*/
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            //validando se o email já existe no banco
            if(await EmailExists(registerDto.Email)) return BadRequest("Email already taken");
            
            using var hmac = new HMACSHA512(); 
            //Classe para criptografar a senha informada
            //using garante que ao final do uso a memória do objeto será liberada
            //Esse passo deve ser para que esse dado fique na memória somente durante o registro

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName, //displayName,
                Email = registerDto.Email, //email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            /*return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
            Código acima retirado pois foi criado um métido extension para evitar que esse código seja copiado em vários lugares*/

            return user.ToDto(tokenService);
        }

        [HttpPost("login")] //api/account/login

        //public async Task<ActionResult<AppUser>> Login(LoginDto loginDto) alterado para trazer os dados do usuário com o token de autenticação
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid email address");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computeHash =  hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (var i = 0; i< computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return user.ToDto(tokenService);
        }

        private async Task<bool> EmailExists(string email)
        {
            return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
            //Validação para ignorar maúsculas
        }
    }
}