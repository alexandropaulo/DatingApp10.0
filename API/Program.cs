using Microsoft.EntityFrameworkCore;
using API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi(); Removido pelo instrutor pesquisar documento da API

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

app.MapControllers();

app.Run();
