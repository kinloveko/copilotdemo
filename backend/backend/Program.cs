using backend.Data;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);



// Add a scoped for ContactServices
builder.Services.AddScoped<IContactServices, ContactServices>();
// add a scoped for JsonRepository
builder.Services.AddScoped<JsonRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
