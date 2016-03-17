using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LinuxKomutApp.Models;
namespace LinuxKomutApp.Logic
{
    
    public class GenelRepository
    {
        lxEntities db = new lxEntities();

        public bool Ekle(Komut komut)
        {
            db.Komut.Add(komut);
            db.SaveChanges();
            return true;
        }

        public void HepsiniSil(int miktar)
        {
            var komutlar = db.Komut.ToList();
            for (int i = 0; i < miktar; i++)
            {
                db.Komut.Remove(komutlar[i]);
            }

            db.SaveChanges();
            
        }

        public bool Sil(string komutAdi)
        {
            Komut silinecekKomut = db.Komut.Where(p => p.KomutAdi == komutAdi).First();
            db.Komut.Remove(silinecekKomut);
            db.SaveChanges();
            return true;
        }

        public Komut Guncelle(Komut komut)
        {
            var bulunanKomut = db.Komut.Where(p => p.Id == komut.Id).FirstOrDefault();
            if (bulunanKomut == null || bulunanKomut.Id == 0)
                throw new Exception("Belirtilen komut bulunamadı!");

            bulunanKomut.KomutAdi = komut.KomutAdi;
            bulunanKomut.Referans = komut.Referans;
            bulunanKomut.Aciklama = komut.Aciklama;
            db.SaveChanges();

            return bulunanKomut;
        }

        public void SeedTable()
        {
            for (int i = 0; i < 100; i++)
            {
                Komut komut = new Komut();
                komut.Aciklama = "Default Açıklama";
                komut.KomutAdi = "" + i + "komut";
                komut.Referans = "Default Referans";
                db.Komut.Add(komut);
                db.SaveChanges();
            }
        }
    }
}