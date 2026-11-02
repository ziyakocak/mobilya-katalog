/* Sitenin çalışma kodu. İçerik değişiklikleri için bu dosyaya değil, urunler.js dosyasına bakın. */
(function () {
  "use strict";

  var KATEGORILER = ["Oturma Odası", "Yatak Odası", "Yemek Odası", "Ofis"];
  var WP_IKON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.5 10.5 0 0 1-1.7-5.7C5.1 10 10 5.2 16 5.2S26.9 10 26.9 15.8 22 26.4 16 26.4zm6-7.9c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.8 1.1 3.4.9 4 .8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>';

  var $ = function (id) { return document.getElementById(id); };

  function kacis(metin) {
    return String(metin == null ? "" : metin)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- Veri kontrolü ---------- */
  var veri = window.KATALOG;
  if (!veri || !veri.firma || !Array.isArray(veri.urunler)) {
    document.querySelector("main").innerHTML =
      '<div class="hata"><strong>urunler.js okunamadı.</strong><br>' +
      "Dosyada bir yazım hatası olabilir (eksik virgül, tırnak veya parantez). " +
      "Son yaptığınız değişikliği kontrol edin ve sayfayı yenileyin.</div>";
    return;
  }
  var firma = veri.firma;
  var urunler = veri.urunler;
  var belgeler = Array.isArray(firma.belgeler) ? firma.belgeler : [];

  function fiyatYaz(fiyat) {
    if (typeof fiyat !== "number") return kacis(fiyat || "Fiyat sorunuz");
    return fiyat.toLocaleString("tr-TR") + " " + (firma.paraBirimi || "₺");
  }

  function whatsappLinki(mesaj) {
    var no = String(firma.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + no + (mesaj ? "?text=" + encodeURIComponent(mesaj) : "");
  }

  /* ---------- Yer tutucu çizimler ---------- */
  var CIZIMLER = {
    "Oturma Odası":
      '<rect x="110" y="120" width="180" height="56" rx="10"/>' +
      '<rect x="92" y="140" width="30" height="66" rx="10"/><rect x="278" y="140" width="30" height="66" rx="10"/>' +
      '<rect x="120" y="170" width="160" height="30" rx="6"/><line x1="200" y1="170" x2="200" y2="200"/>' +
      '<line x1="104" y1="206" x2="104" y2="222"/><line x1="296" y1="206" x2="296" y2="222"/>',
    "Yatak Odası":
      '<rect x="100" y="104" width="200" height="74" rx="8"/>' +
      '<rect x="100" y="168" width="200" height="40"/><rect x="88" y="168" width="224" height="40" rx="4"/>' +
      '<rect x="122" y="150" width="60" height="22" rx="8"/><rect x="218" y="150" width="60" height="22" rx="8"/>' +
      '<line x1="96" y1="208" x2="96" y2="224"/><line x1="304" y1="208" x2="304" y2="224"/>',
    "Yemek Odası":
      '<line x1="110" y1="150" x2="290" y2="150"/><line x1="104" y1="158" x2="296" y2="158"/>' +
      '<line x1="130" y1="158" x2="124" y2="222"/><line x1="270" y1="158" x2="276" y2="222"/>' +
      '<path d="M60 112 L60 222 M60 172 L92 172 L92 222 M60 112 Q76 104 92 112 L92 172"/>' +
      '<path d="M340 112 L340 222 M340 172 L308 172 L308 222 M340 112 Q324 104 308 112 L308 172"/>' +
      '<path d="M190 150 L190 130 Q200 120 210 130 L210 150"/>',
    "Ofis":
      '<line x1="80" y1="160" x2="260" y2="160"/><rect x="80" y="160" width="180" height="10"/>' +
      '<rect x="200" y="170" width="54" height="52"/><line x1="200" y1="196" x2="254" y2="196"/>' +
      '<line x1="88" y1="170" x2="88" y2="222"/>' +
      '<path d="M120 160 L120 122 L170 122 L170 160"/>' +
      '<rect x="285" y="70" width="60" height="152"/><line x1="285" y1="108" x2="345" y2="108"/>' +
      '<line x1="285" y1="146" x2="345" y2="146"/><line x1="285" y1="184" x2="345" y2="184"/>' +
      '<line x1="295" y1="84" x2="295" y2="108"/><line x1="303" y1="88" x2="303" y2="108"/><line x1="311" y1="80" x2="311" y2="108"/>'
  };

  function urunCizimi(urun) {
    var cizim = CIZIMLER[urun.kategori] || CIZIMLER["Oturma Odası"];
    return '<svg viewBox="0 -40 400 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + kacis(urun.ad) + '">' +
      '<rect class="cizim-zemin" x="0" y="-40" width="400" height="380"/>' +
      '<line class="cizim-cizgi" x1="40" y1="224" x2="360" y2="224" stroke-opacity=".4"/>' +
      '<g class="cizim-cizgi" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + cizim + "</g>" +
      '<text class="cizim-yazi" x="200" y="266" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14">' + kacis(urun.ad) + "</text>" +
      "</svg>";
  }

  function sertifikaCizimi(belge) {
    return '<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + kacis(belge.ad) + '">' +
      '<rect width="300" height="400" fill="#fbfaf7"/>' +
      '<rect x="16" y="16" width="268" height="368" rx="4" fill="none" stroke="#d9dfd4" stroke-width="1.5"/>' +
      '<text x="150" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="13" letter-spacing="5" fill="#8a847a">SERTİFİKA</text>' +
      '<text x="150" y="128" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="300" fill="#2f2c28">' + kacis(belge.ad) + "</text>" +
      '<text x="150" y="154" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#8a847a">' + kacis(belge.aciklama) + "</text>" +
      '<text x="150" y="192" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="10" fill="#8a847a">' + kacis(firma.ad) + "</text>" +
      '<line x1="60" y1="226" x2="240" y2="226" stroke="#ece8e0"/><line x1="60" y1="240" x2="240" y2="240" stroke="#ece8e0"/>' +
      '<line x1="60" y1="254" x2="190" y2="254" stroke="#ece8e0"/>' +
      '<circle cx="150" cy="315" r="30" fill="#e6ebe2"/>' +
      '<path d="M137 315 l9 9 l17 -18" fill="none" stroke="#6f7c67" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="150" y="214" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="700" fill="#c98f80" fill-opacity=".16" transform="rotate(-30 150 210)">ÖRNEK</text>' +
      "</svg>";
  }

  /* Fotoğraf yüklenemezse (internet yok, yanlış dosya adı) yerine çizim gösterilir */
  var yedekler = [];

  function gorsel(yol, yedek) {
    if (!yol) return yedek;
    yedekler.push(yedek);
    return '<img src="' + kacis(yol) + '" alt="" loading="lazy" data-yedek="' + (yedekler.length - 1) + '">';
  }

  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img.tagName !== "IMG" || !img.hasAttribute("data-yedek")) return;
    var kutu = document.createElement("div");
    kutu.innerHTML = yedekler[+img.getAttribute("data-yedek")] || "";
    if (kutu.firstChild) img.replaceWith(kutu.firstChild);
  }, true);

  /* ---------- Açık / koyu mod ---------- */
  $("temaDugme").addEventListener("click", function () {
    var yeni = document.documentElement.getAttribute("data-tema") === "koyu" ? "acik" : "koyu";
    document.documentElement.setAttribute("data-tema", yeni);
    try { localStorage.setItem("tema", yeni); } catch (e) {}
  });

  /* ---------- Firma bilgileri ---------- */
  document.title = (firma.ad || "Mobilya") + " — Katalog";
  document.querySelectorAll("[data-firma]").forEach(function (el) {
    el.textContent = firma[el.getAttribute("data-firma")] || "";
  });

  $("girisGorsel").innerHTML = gorsel(firma.kapakResim, urunCizimi({ ad: "", kategori: "Oturma Odası" }));

  $("hakkimizdaMetin").innerHTML = [].concat(firma.hakkimizda || []).map(function (p) {
    return "<p>" + kacis(p) + "</p>";
  }).join("");

  $("ilTelefon").textContent = firma.telefon || "";
  $("ilTelefon").href = "tel:" + String(firma.telefon || "").replace(/[^\d+]/g, "");
  $("ilEposta").textContent = firma.eposta || "";
  $("ilEposta").href = "mailto:" + (firma.eposta || "");
  $("ilAdres").textContent = firma.adres || "";
  $("ilWhatsapp").href = whatsappLinki("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.");
  $("wpSabit").href = whatsappLinki("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.");
  $("telif").textContent = "© " + new Date().getFullYear() + " " + (firma.ad || "") + ". Tüm hakları saklıdır.";

  /* ---------- Katalog ---------- */
  var seciliKategori = "Tümü";

  function sekmeleriCiz() {
    var liste = ["Tümü"].concat(KATEGORILER);
    $("sekmeler").innerHTML = liste.map(function (k) {
      return '<button type="button" role="tab" class="sekme' + (k === seciliKategori ? " aktif" : "") +
        '" aria-selected="' + (k === seciliKategori) + '" data-kategori="' + kacis(k) + '">' + kacis(k) + "</button>";
    }).join("");
  }

  function urunleriCiz() {
    var html = "";
    urunler.forEach(function (u, i) {
      if (seciliKategori !== "Tümü" && u.kategori !== seciliKategori) return;
      html +=
        '<button type="button" class="kart" data-urun="' + i + '">' +
          '<div class="kart-gorsel">' + gorsel(u.resim, urunCizimi(u)) + "</div>" +
          '<div class="kart-govde">' +
            '<div><h3 class="kart-ad">' + kacis(u.ad) + "</h3>" +
            '<div class="kart-kategori">' + kacis(u.kategori) + "</div></div>" +
            '<div class="kart-fiyat">' + fiyatYaz(u.fiyat) + "</div>" +
          "</div>" +
        "</button>";
    });
    $("urunIzgara").innerHTML = html || '<p style="text-align:center;color:var(--yazi-soluk);grid-column:1/-1">Bu kategoride henüz ürün yok.</p>';
  }

  $("sekmeler").addEventListener("click", function (e) {
    var b = e.target.closest(".sekme");
    if (!b) return;
    seciliKategori = b.getAttribute("data-kategori");
    sekmeleriCiz();
    urunleriCiz();
  });

  $("urunIzgara").addEventListener("click", function (e) {
    var k = e.target.closest(".kart");
    if (k) urunPenceresi(urunler[+k.getAttribute("data-urun")]);
  });

  /* ---------- Belgeler ---------- */
  $("belgeIzgara").innerHTML = belgeler.map(function (b, i) {
    return '<button type="button" class="belge-kart" data-belge="' + i + '">' +
      '<div class="belge-gorsel">' + gorsel(b.resim, sertifikaCizimi(b)) + "</div>" +
      '<div class="belge-ad">' + kacis(b.ad) + "</div>" +
      '<div class="belge-aciklama">' + kacis(b.aciklama) + "</div>" +
      "</button>";
  }).join("");

  $("belgeIzgara").addEventListener("click", function (e) {
    var k = e.target.closest(".belge-kart");
    if (k) belgePenceresi(belgeler[+k.getAttribute("data-belge")]);
  });

  /* ---------- Açılır pencere ---------- */
  var sonOdak = null;

  function pencereAc(html, dar) {
    sonOdak = document.activeElement;
    $("pencereIcerik").innerHTML = html;
    document.querySelector(".pencere").classList.toggle("dar", !!dar);
    document.querySelector(".pencere").scrollTop = 0;
    $("perde").hidden = false;
    document.body.classList.add("kilitli");
    $("pencereKapat").focus();
  }

  function pencereKapat() {
    if ($("perde").hidden) return;
    $("perde").hidden = true;
    $("pencereIcerik").innerHTML = "";
    document.body.classList.remove("kilitli");
    if (sonOdak) sonOdak.focus();
  }

  function urunPenceresi(u) {
    var o = u.olculer || {};
    var olcu = [o.genislik, o.derinlik, o.yukseklik].every(function (x) { return x != null; })
      ? o.genislik + " × " + o.derinlik + " × " + o.yukseklik + " cm" : "";
    var renkler = [].concat(u.renkler || []).map(function (r) {
      return '<span class="renk">' + kacis(r) + "</span>";
    }).join("");

    pencereAc(
      '<div class="detay">' +
        '<div class="detay-gorsel">' + gorsel(u.resim, urunCizimi(u)) + "</div>" +
        '<div class="detay-bilgi">' +
          '<div class="kart-kategori">' + kacis(u.kategori) + "</div>" +
          '<h3 id="pencereBaslik">' + kacis(u.ad) + "</h3>" +
          '<div class="detay-fiyat">' + fiyatYaz(u.fiyat) + "</div>" +
          "<dl>" +
            (olcu ? '<div class="ozellik"><dt>Ölçüler (G × D × Y)</dt><dd>' + olcu + "</dd></div>" : "") +
            (u.malzeme ? '<div class="ozellik"><dt>Malzeme</dt><dd>' + kacis(u.malzeme) + "</dd></div>" : "") +
            (renkler ? '<div class="ozellik"><dt>Renk Seçenekleri</dt><dd class="renkler">' + renkler + "</dd></div>" : "") +
          "</dl>" +
          '<a class="wp-dugme" target="_blank" rel="noopener" href="' +
            kacis(whatsappLinki("Merhaba, \"" + u.ad + "\" ürünü hakkında bilgi almak istiyorum.")) + '">' +
            WP_IKON + "WhatsApp'tan Sor</a>" +
        "</div>" +
      "</div>"
    );
  }

  function belgePenceresi(b) {
    pencereAc(
      '<div class="belge-detay">' +
        '<div class="buyuk">' + gorsel(b.resim, sertifikaCizimi(b)) + "</div>" +
        '<h3 id="pencereBaslik">' + kacis(b.ad) + "</h3>" +
        '<p class="belge-bilgi">' + kacis(b.aciklama) + "</p>" +
        (b.belgeNo ? '<p class="belge-bilgi">Belge No: ' + kacis(b.belgeNo) + "</p>" : "") +
        (b.gecerlilik ? '<p class="belge-bilgi">Geçerlilik: ' + kacis(b.gecerlilik) + "</p>" : "") +
      "</div>",
      true
    );
  }

  $("kvkkAc").addEventListener("click", function () {
    var govde = [].concat(firma.kvkk || []).map(function (p) {
      p = String(p);
      return p.indexOf("## ") === 0 ? "<h4>" + kacis(p.slice(3)) + "</h4>" : "<p>" + kacis(p) + "</p>";
    }).join("");
    pencereAc('<div class="metin-pencere"><h3 id="pencereBaslik">KVKK Aydınlatma Metni</h3>' + govde + "</div>", true);
  });

  $("pencereKapat").addEventListener("click", pencereKapat);
  $("perde").addEventListener("click", function (e) {
    if (e.target === $("perde")) pencereKapat();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") pencereKapat();
  });

  sekmeleriCiz();
  urunleriCiz();
})();
