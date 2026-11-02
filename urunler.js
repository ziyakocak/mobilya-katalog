/* =====================================================================
   KATALOG VERİ DOSYASI  —  Sitedeki tüm yazılar ve ürünler buradadır.
   ---------------------------------------------------------------------
   Bu dosyayı Not Defteri ile açıp düzenleyebilirsiniz. Kaydettikten
   sonra tarayıcıda sayfayı yenileyin (F5).

   KURALLAR:
   - Yazıları "çift tırnak" içinde yazın.  Örn: ad: "Chester Koltuk",
   - Her satırın sonundaki virgülü silmeyin.
   - Sayılarda (fiyat, ölçü) tırnak ve nokta kullanmayın. Örn: fiyat: 42500,
   - Fotoğraf eklemek için resmi "resimler" klasörüne koyun ve
     resim: "resimler/dosya-adi.jpg", şeklinde yazın.
     Şu anki örnek fotoğraflar internetten (Unsplash, ücretsiz) gelir;
     internet yoksa ya da resim: "", boşsa otomatik çizim gösterilir.

   YENİ ÜRÜN EKLEMEK:
   Aşağıdaki ürünlerden birini { ile başlayıp }, ile biten haliyle
   kopyalayın, listenin içine yapıştırın ve bilgilerini değiştirin.

   Kategori adları şunlardan biri olmalı:
   "Oturma Odası", "Yatak Odası", "Yemek Odası", "Ofis"
   ===================================================================== */

window.KATALOG = {

  firma: {
    ad: "Atölye Nova",
    slogan: "El işçiliğiyle şekillenen zamansız mobilyalar",
    hakkimizda: [
      "Atölye Nova, 1998 yılından bu yana masif ahşap ve doğal malzemelerle özel üretim mobilyalar tasarlamaktadır.",
      "Her parça, deneyimli ustalarımızın elinde tek tek şekillenir; kullandığımız ahşaplar sertifikalı ormanlardan temin edilir.",
      "Amacımız, yaşam alanlarınıza nesiller boyu eşlik edecek, sade ve güçlü mobilyalar üretmektir."
    ],
    telefon: "0 (212) 555 01 23",
    whatsapp: "905551234567",          // Başında + olmadan, ülke koduyla: 90 5xx xxx xx xx
    eposta: "bilgi@atolyenova.com.tr",
    adres: "Örnek Mah. Mobilyacılar Cad. No: 12, İnegöl / Bursa",
    paraBirimi: "₺",
    kapakResim: "https://images.unsplash.com/photo-1762320893556-71850b0e0f57?w=1600&q=75&auto=format&fit=crop",   // Karşılama alanındaki büyük fotoğraf

    /* Firma belgeleri — "Hakkımızda" bölümünde gösterilir.
       Belgenin taranmış halini resimler klasörüne koyup resim alanına yazın. */
    belgeler: [
      {
        ad: "ISO 9001:2015",
        aciklama: "Kalite Yönetim Sistemi",
        belgeNo: "ÖRNEK-QMS-2024-0147",
        gecerlilik: "15.03.2027",
        resim: ""
      },
      {
        ad: "ISO 14001:2015",
        aciklama: "Çevre Yönetim Sistemi",
        belgeNo: "ÖRNEK-EMS-2024-0093",
        gecerlilik: "15.03.2027",
        resim: ""
      },
      {
        ad: "ISO 45001:2018",
        aciklama: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
        belgeNo: "ÖRNEK-OHS-2024-0211",
        gecerlilik: "02.09.2027",
        resim: ""
      },
      {
        ad: "TSE Belgesi",
        aciklama: "Türk Standartlarına Uygunluk",
        belgeNo: "ÖRNEK-TSE-16-4471",
        gecerlilik: "20.11.2026",
        resim: ""
      }
    ],

    /* KVKK Aydınlatma Metni — alt bilgideki bağlantıdan açılır.
       ÖNEMLİ: Bu bir ÖRNEK metindir. Gerçek metni bir hukukçuya hazırlatın/kontrol ettirin.
       Her paragraf ayrı bir "..." satırıdır. ## ile başlayan satır ara başlık olur. */
    kvkk: [
      "Bu metin örnek amaçlıdır ve hukuki geçerliliği yoktur.",
      "## Veri Sorumlusu",
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Atölye Nova tarafından aşağıda açıklanan kapsamda işlenebilecektir.",
      "## İşlenen Kişisel Veriler",
      "Bizimle iletişime geçmeniz halinde ad, soyad, telefon numarası, e-posta adresi ve talebinize ilişkin bilgiler işlenebilir.",
      "## İşlenme Amaçları",
      "Kişisel verileriniz; ürün ve fiyat taleplerinize yanıt verilmesi, sipariş ve teslimat süreçlerinin yürütülmesi, müşteri ilişkilerinin yönetimi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.",
      "## Aktarım",
      "Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak kanunen yetkili kamu kurumlarına ve hizmet aldığımız iş ortaklarına (kargo, muhasebe vb.) aktarılabilir.",
      "## Toplama Yöntemi ve Hukuki Sebep",
      "Verileriniz telefon, e-posta, WhatsApp ve mağaza ziyaretleri yoluyla; KVKK m.5/2 kapsamında sözleşmenin kurulması ve ifası ile meşru menfaat hukuki sebeplerine dayanılarak toplanmaktadır.",
      "## Haklarınız",
      "KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve itiraz etme haklarına sahipsiniz. Başvurularınızı bilgi@atolyenova.com.tr adresine iletebilirsiniz."
    ]
  },

  urunler: [
    {
      ad: "Deri Üçlü Koltuk",
      kategori: "Oturma Odası",
      fiyat: 42500,
      olculer: { genislik: 220, derinlik: 95, yukseklik: 78 },
      malzeme: "Gürgen iskelet, hakiki deri döşeme",
      renkler: ["Konyak", "Antrasit", "Krem"],
      resim: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Yuvarlak Yan Sehpa",
      kategori: "Oturma Odası",
      fiyat: 8900,
      olculer: { genislik: 50, derinlik: 50, yukseklik: 55 },
      malzeme: "Lake tabla, masif kayın ayak",
      renkler: ["Kırık Beyaz", "Taş Grisi"],
      resim: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Kapitone Başlıklı Karyola",
      kategori: "Yatak Odası",
      fiyat: 36750,
      olculer: { genislik: 176, derinlik: 215, yukseklik: 120 },
      malzeme: "Masif iskelet, keten kumaş başlık",
      renkler: ["Bej", "Açık Gri"],
      resim: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Aynalı Şifonyer",
      kategori: "Yatak Odası",
      fiyat: 24000,
      olculer: { genislik: 140, derinlik: 45, yukseklik: 80 },
      malzeme: "Mat lake gövde, meşe ayak, yuvarlak ayna",
      renkler: ["Beyaz / Meşe", "Kum / Meşe"],
      resim: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Monarch Yemek Masası",
      kategori: "Yemek Odası",
      fiyat: 47800,
      olculer: { genislik: 220, derinlik: 100, yukseklik: 76 },
      malzeme: "Masif meşe tabla, siyah metal ayak",
      renkler: ["Doğal Meşe", "Koyu Meşe"],
      resim: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Ahşap Ayaklı Sandalye",
      kategori: "Yemek Odası",
      fiyat: 3900,
      olculer: { genislik: 47, derinlik: 54, yukseklik: 82 },
      malzeme: "Polipropilen oturak, kayın ayak",
      renkler: ["Siyah", "Beyaz", "Adaçayı Yeşili"],
      resim: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Ahşap Çalışma Masası",
      kategori: "Ofis",
      fiyat: 19900,
      olculer: { genislik: 140, derinlik: 70, yukseklik: 75 },
      malzeme: "Ceviz kaplama tabla, siyah çelik ayak",
      renkler: ["Ceviz / Siyah", "Meşe / Siyah"],
      resim: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1000&q=75&auto=format&fit=crop"
    },
    {
      ad: "Modüler Kitaplık",
      kategori: "Ofis",
      fiyat: 22300,
      olculer: { genislik: 80, derinlik: 35, yukseklik: 200 },
      malzeme: "Meşe raflar, mat lake gövde",
      renkler: ["Meşe / Beyaz", "Ceviz / Antrasit"],
      resim: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=75&auto=format&fit=crop"
    }
  ]
};
