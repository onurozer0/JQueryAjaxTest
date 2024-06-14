$(function () {
    $.ajax({
        url: 'https://api.coincap.io/v2/assets',
        type: 'GET',
        dataType: 'json',
        success: function (response) { // Eğer başarılı bir şekilde data getirildi ise bu fonksiyonun kod blokları çalışacak.
            if (response && response.data) { // burada responseımız var mı ve bir dataya sahip mi bunu kontrol ediyoruz.
                var assets = response.data; // burada responseımızdaki datayı assets adlı değişkene yolluyoruz.
                var tableBody = $('#crypto-table tbody');// burada "crypto-table" adlı tablomuzun bodysini alıyoruz.
                tableBody.empty();// burada .empty() fonksiyonuyla tablomuzun eski verilerini temizliyoruz
                assets.sort(function (a, b) {
                    return b.rank - a.rank     // assetlerimizi rank propertysindeki değere göre büyükten küçüğe doğru sıralayacak kod bloğumuz.
                });

                assets.forEach(function (asset) { // burada assets içindeki her bir varlık için fonksiyon içerisindeki kod bloklarını çalıştırıyoruz.
                    var row = '<tr>' +
                        '<td>' + asset.rank + '</td>' +
                        '<td>' + asset.name + '</td>' +    
                        '<td>' + asset.symbol + '</td>' +          // burada row yapımızı oluşturuyoruz
                        '<td>' + asset.priceUsd + '</td>' +
                        '<td>' + asset.marketCapUsd + '</td>' +
                        '</tr>';
                    tableBody.append(row);   // burada oluşturduğumuz row yapısını tabloya ekliyoruz.
                });
            } else {
                console.error('Response Data İçermiyor!', data); //  eğer response içerisinde datamız yok ise console'a error ekliyoruz
            }
        },
        error: function (error) {
            console.error('Veriler Getirilirken Hata Oluştu!', error); // eğer veriler getirilirken bir hata oluşursa bilgilendiriyoruz ve hatayı veriyoruz.
        }
    });
});