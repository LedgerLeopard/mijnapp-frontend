﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MijnApp.Domain.Models;
using MijnApp_Backend.HttpClients;
using Newtonsoft.Json;

namespace MijnApp_Backend.Controllers
{
    [Authorize]
    public class PersonController : Controller
    {
        private readonly string _baseUri;
        private const string UrlGetAll = "{0}processes";
        private const string UrlGetById = "{0}processes/{1}";

        private readonly IServiceClient _serviceClient;

        public PersonController(IConfiguration config, IServiceClient serviceClient)
        {
            _baseUri = config.GetValue<string>("Api:BrpUri");
            _serviceClient = serviceClient;
        }

        [HttpGet]
        [Route("person")]
        public IActionResult GetPerson(string id)
        {
            var currentUser = HttpContext.User;
            string username = "Onbekend";
            if (currentUser.HasClaim(c => c.Type == JwtRegisteredClaimNames.Sub))
            {
                username = currentUser.Claims.First(c => c.Type == JwtRegisteredClaimNames.Sub).Value;
            }
            var test = new Persoon
            {
                Id = new Guid("F5BA2997-AD97-4085-AF9F-03919A1067F2"),
                Voornamen = "Erik",
                Geslachtsnaam = username
            };
            return Ok(test);
        }

        [HttpGet]
        [Route("personsMoving/{id}")]
        public IActionResult GetPersonsMoving(string id)
        {
            return Ok(new[]
            {
                "Evelien de Vries",
                "Thomas de Vries"
            });
        }
    }
}