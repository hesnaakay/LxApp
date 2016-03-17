using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LinuxKomutApp.Logic;

namespace LxTests
{
    [TestClass]
    public class GenelTest
    {
        GenelRepository repo = new GenelRepository();

        [TestMethod]
        public void TestMethod1()
        {
            repo.SeedTable();
        }

        [TestMethod]
        public void RandomEkle()
        {
           
        }

        [TestMethod]
        public void KomutlariSil()
        {
            repo.HepsiniSil(300);
        }
    }
}
