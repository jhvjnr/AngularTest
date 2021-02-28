using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularTest.Controllers
{
    [ApiController]
    public class WeatherForecasttController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecasttController> _logger;

        public WeatherForecasttController(ILogger<WeatherForecasttController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("all-forecasts")]
        public WeatherForecastVO[] AllForecasts([FromBody] RequestVO value)
        {
            System.Diagnostics.Debug.WriteLine(value.key);
            var rng = new Random();
            return Enumerable.Range(0, 5).Select(index => new WeatherForecastVO
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            }).ToArray();
   
        }

        [HttpPost]
        [Route("request-vo")]
        public RequestVO RequestVOtest([FromBody] RequestVO value)
        {
            System.Diagnostics.Debug.WriteLine(value.key);
            return new RequestVO("I got a response from the backend");

        }
    }


}
public class RequestVO
{
    public string key { get; set; }

    public RequestVO(string key)
    {
        this.key = key;
    }
}