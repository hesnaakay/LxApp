using LinuxKomutApp.Logic;
using LinuxKomutApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LinuxKomutApp.Controllers
{
    [RoutePrefix("api/komut")]
    public class KomutController : ApiController
    {
        lxEntities db = new lxEntities();
        GenelRepository repo = new GenelRepository();
        // bütün komutları döndür

        [Authorize]
        [Route("hepsi")]
        [HttpGet]
        public IHttpActionResult GetKomuts()
        {
            
            
            return Ok(db.Komut.ToList());
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetKomut(string adi)
        {
            Komut komut = db.Komut.Where(p => p.KomutAdi == adi).First();
            return Ok(komut);
        }

        [Route("guncelle")]
        [HttpPut]

        public IHttpActionResult UpdateKomut(Komut komut)
        {
            var guncellenmisKomut = repo.Guncelle(komut);

            return Ok(guncellenmisKomut);
        }
        [Route("newkomut")]
        [HttpPost]
        public IHttpActionResult PostKomut([FromBody]Komut komut)
        {
            if (komut == null)
            {
                return BadRequest("Yanlış istek, lütfen doğru bilgiler giriniz!");
            }
            db.Komut.Add(komut);
            db.SaveChanges();

            return Ok(komut);
        }

        [Route("adamsin")]
        [HttpGet]
        public IHttpActionResult GetAdamsin()
        {
            return Ok();
        }
    }
}
