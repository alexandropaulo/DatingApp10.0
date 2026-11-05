using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi(); Removido pelo instrutor pesquisar documento da API

builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options =>
      {
            var tokenKey = builder.Configuration["TokenKey"]
                 ?? throw new Exception("Token key not found - Program.cs");
            options.TokenValidationParameters = new TokenValidationParameters
            {
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
                  ValidateIssuer = false,
                  ValidateAudience = false
            };
      });

var app = builder.Build();

// Configure the HTTP request pipeline.
// Removido para simplificar a aplicação pesquisar
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }

// Removido pois não vamos usar o http então não precisa redirecionar
// app.UseHttpsRedirection();

// Removido mas sera utilizado mais tarde para autenticar
//app.UseAuthorization();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
      .WithOrigins("http://localhost:4200","https://localhost:4200"));


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
