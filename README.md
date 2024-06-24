# Atmosware Staj Tamamlama Final Projem

Bu proje, Atmosware'deki stajımı tamamlama projemdir. Proje, React, TypeScript ve Vite kullanılarak geliştirilmiştir.

## Kurulum

Projeyi yerel makinenize klonlayın:

```bash
git clone https://github.com/ykurt56/atmosware-final.git
cd atmosware-final
```

Projeyi başlatmak için:

```
npm start
yarn start
```

Admin Bilgileri :
```
admin@admin.com
admin
```

# Final Projesi - e-Commerce Web Sitesi

## Proje Tanımı

- Bu proje, bir e-Commerce web sitesi için gerekli olan temel yapıyı oluşturmanızı amaçlamaktadır.
- Proje, 3 ana bölümden oluşmaktadır. Bunlar:
  - Kullanıcı Yönetimi
  - Ürün Yönetimi
  - Sepet Yönetimi
- Proje, 3 farklı veritabanı tablosundan oluşmaktadır. Bunlar:
  - Users
  - Products
  - Carts

## Proje Tasarımı

Aşağıdaki figma tasarımı esas alınarak çalışılmalıdır. Mobil ve web görünüme uyumlu ( responsive olmalıdır)
Tasarımdaki marka, logo , resimler , ürünler özelleştirilmelidir.

<https://www.figma.com/design/ANhbaCyFOHo6kx4zEh5hcS/E-commerce-Website-Template-(Freebie)-(Community)?node-id=20-2&t=TjJpEb0oxdSfKrQZ-0>

## Kullanıcı Yönetimi

- Kullanıcılar, sisteme kayıt olabilmelidir.
- Kullanıcılar, sisteme kayıt olduktan sonra sisteme giriş yapabilmelidir.

## Ürün Yönetimi

- Admin ürünlerin içeriğini düzenleyebilecek (Ekleme-Silme yok).

## Sepet Yönetimi

- Sepet, kullanıcıya ait bir veri olarak tutulacaktır.
- Sepet, kullanıcıya ait bir veri olarak tutulurken kullanıcının ID'si tutulacaktır.
- Sepet, kullanıcıya ait bir veri olarak tutulurken kullanıcının ID'si tutulurken kullanıcının ID'si doğru formatta tutulacaktır.
- Sepet, kullanıcının ID'si boş bırakılamaz.
- Sepet, ürün adedi düzenlenebilir. (Burada stok kontrolü yapılmalıdır.)

## Teknik Şartlar

- Proje React kütüphanesi kullanılarak geliştirilmelidir.
- Proje React Router kullanılarak geliştirilmelidir.
- Proje React Hooks kullanılarak geliştirilmelidir.
- Proje React Formik kullanılarak geliştirilmelidir.
- Proje React Zod kullanılarak geliştirilmelidir. (Form Doğrulaması için)
- Proje React Toastify yada tailwind kullanılarak sgeliştirilmelidir.
- Proje Tailwind kullanılarak geliştirilmelidir.
- Proje typescript kullanılarak geliştirilmelidir.
- Kullanıcıdan veri alınan bütün alanlar için formik kullanılmalıdır.
- Ürünler için fakeapi kullanılabilir. Örneğin: <https://fakestoreapi.com/>
  Dökümanları gayet açıklayıcıdır.
  <https://www.petfinder.com/developers/>
  <https://publicapis.dev/category/animals>
  <https://rapidapi.com/search/pets>
- Veri tabanı olarak json-server kullanabilirsin. Kullanılan yapı için readme dosyası oluşturulmalıdır (benim yapıyı anlamam ve çalıştırmam için). Bu readme dosyalarına bakılarak projeler ayağa kaldırılacaktır. Hatta package.json dosyasında scipt düzenleyebilirsin tek seferde çalıştırmak için bu çok daha iyi olur.
- Ürünleri get ile json-server'dan alıp listeleyecek (ürün adı, fiyatı, görsel, kategori ve stok adedi)

- ürün güncelleme butonu olacak, json-server'dan put ile güncellenecek.
- sepet için json-server'da yeni bir data oluşturulacak.
- sepete ekle butonu olacak, sepete eklenecek (json-server'daki).
- satın al dendiği zaman sepet boşaltılacak. (json-server'daki), satın alınan ürünlerin adetleri stoktan düşülecek stokta kalmadıysa sepete ekle butonu ürünlerde disable olacak. (stok yok)
- kategoriye göre filtreleme yapılabilecek
- sıralama yapabilecek (fiyat, başlık, kategori, a-z, z-a)
- arama (ürün adı) inputu olacak, listede filtreleme yapacak
- ürünü sepete eklerken bir kontrol olacak stoktan fazla eklenemez.
- sepet bölümü olacak, sepete eklenen ürünler listelenecek, ürün adedi arttırılıp azaltılacak, ürün silinecek.
- sepetteki ürün adedi ürün çeşiti kadar olacak. (ürün çeşidi 3 ise sepetteki ürün adedi 3 olacak) (3 elma, 2 armut, 1 portakal)
- sepette ürün adedi artmalı azalmalı, manuel olarak girilebilmeli.
- bir kullanıcı sepete mesela 5 ürün ekledi ama satın almadı, diğer kullanıcı bu ürünlerden bazılarını satın alarak sotoğu tüketti. ilk kullanıcı tekrar sepete girdiğinde ürünlerin stok adedi güncellenecek ve kullanıcıya uyarı verecek. Kullanıcı sayfayı kapatmadıysa satın al butonunda bu kontrol yapılacak.
- kullanıcı ile etkileşime girilen her yerde toast mesajı olacak. (başarılı, hata, uyarı)

## Proje Bölümleri

- Anasayfa
- Ürünler Sayfası
- Ürün Detay Sayfası
- Sepet Sayfası
- Kayıt Ol Sayfası
- Giriş Yap Sayfası

### Anasayfa

- Anasayfa, kullanıcıların sisteme giriş yapabileceği veya kayıt olabileceği bir sayfadır.
- Anasayfa, kullanıcıların sisteme giriş yapabileceği veya kayıt olabileceği bir sayfadırken kullanıcılar sisteme giriş yapmışlarsa bu sayfada giriş yapmalarına gerek yoktur.
- Anasayfa dışındaki sayfalara login olmuş kullanıcılar girebilmelidir.
- Kullanıcı giriş yaptıysa giriş yap butonu sepet butonu olacak. Sinup olan kısımda kullanıcı adı fotosu ve logout dropdown'u olacak.

### Ürünler Sayfası

- Ürünler sayfası, kullanıcıların ürünleri görüntüleyebileceği bir sayfadır.
- Ürünler sayfası, kullanıcıların ürünleri görüntüleyebileceği bir sayfadırken kullanıcılar ürünleri görüntüleyebilmek için sisteme giriş yapmış olmalıdır.

### Ürün Detay Sayfası

- Ürün detay sayfası, kullanıcıların ürünlerin detaylarını görüntüleyebileceği bir sayfadır.
- Ürün detay sayfası, kullanıcıların ürünleri görüntüleyebileceği bir sayfadırken kullanıcılar ürünleri görüntüleyebilmek için sisteme giriş yapmış olmalıdır.
- Ürün Detay sayfası, admin kullanıcıların ürünleri görüntüleyebileceği ve düzenleyebileceği bir sayfadır.
- Ürün detayın altındaki iki bölüm birleşerek rastgele ürünlerin listelendiği bir bölüm olacak.

### Sepet Sayfası

- Sepet sayfası, kullanıcıların sepetlerini görüntüleyebileceği ve satın alabileceği bir sayfadır.
- Sepet sayfası, kullanıcıların sepetlerini görüntüleyebileceği bir sayfadırken kullanıcılar sepetlerini görüntüleyebilmek için sisteme giriş yapmış olmalıdır.

### Kayıt Ol Sayfası

- Kayıt ol sayfası, kullanıcıların sisteme kayıt olabileceği bir sayfadır.
- Kayıt ol sayfası, kullanıcıların sisteme kayıt olabileceği bir sayfadırken kullanıcılar sisteme giriş yapmışlarsa bu sayfada kayıt olmalarına gerek yoktur.

### Giriş Yap Sayfası

- Giriş yap sayfası, kullanıcıların sisteme giriş yapabileceği bir sayfadır.
- Giriş yap sayfası, kullanıcıların sisteme giriş yapabileceği bir sayfadırken kullanıcılar sisteme giriş yapmışlarsa bu sayfada giriş yapmalarına gerek yoktur.

## Geliştirme Süreci

Proje geliştirilirken aşağıdaki adımlar izlenmelidir:

1. Main Branch'ten Yeni Bir Branch Oluşturun :
   git checkout -b feature-branch-name

Geliştirmeyi Yeni Brancht'te Yapın

2. Tüm değişiklikleri bu branch'te gerçekleştirin.
   Sık sık commit yaparak gelişmeleri kaydedin.

3. Branch'i Main'e Merge Edin

Geliştirme tamamlandığında, feature branch'ini main branch'e merge edin.

