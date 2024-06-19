$(function () { //  sayfamız yüklendiğinde aşağıdaki load fonksiyonumuzun çalışması için
    load()
    $('#submit-button').on('click', function () { // #submit-button id'li butonun click eventi gerçekleştiğinde addCourse() methodunun çalışmasını sağlayan kısım
        addCourse();
    });
        
});
// GET İşlemi
function load() { 
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
                    var priceUsdConverted = parseFloat(asset.priceUsd)
                    var marketCapUsdConverted = parseFloat(asset.marketCapUsd)  // burada priceUsd ve marketCapUsd string değerlerimizi toFixed methodu ile kullanabilmek için float' a çeviriyoruz.
                    var row = '<tr>' +
                        '<td>' + asset.rank + '</td>' +
                        '<td>' + asset.name + '</td>' +
                        '<td>' + asset.symbol + '</td>' +          // burada row yapımızı oluşturuyoruz
                        '<td>' + priceUsdConverted.toFixed(2) + '</td>' +   //  burada toFixed methodu ile içerisine gönderdiğimiz sayı kadar virgülden sonra basamağı olmasını sağlıyoruz.(2)
                        '<td>' + marketCapUsdConverted.toFixed(2) + '</td>' +
                        '</tr>';
                    tableBody.append(row);   // burada oluşturduğumuz row yapısını tabloya ekliyoruz.
                });
            } else {
                console.error('Response Data İçermiyor!', response); //  eğer response içerisinde datamız yok ise console'a error ekliyoruz
            }
        },
        error: function (error) {
            console.error('Veriler Getirilirken Hata Oluştu!', error); // eğer veriler getirilirken bir hata oluşursa bilgilendiriyoruz ve hatayı veriyoruz.
        }
    });
}

//Post işlemi 
function addCourse() {
    var formData = {
        title: $('#title').val(),
        name: $('#name').val(),
        price: $('#price').val(),  // belirlenen idli inputlardan verilerin değişkenlere aktarılması
        description: $('#description').val(),
        categoryId: $('#categoryId').val()
    };

    $.ajax({
        type: 'POST',
        url: 'https://localhost:7006/api/course/create',
        data: JSON.stringify(formData), //datanın jsona çevirilmesi.
        contentType: 'application/json',
        success: function (response, textStatus, xhr) {
            if (xhr.status === 201) {
                alert('Form başarıyla gönderildi!');  // sonuç başarılı ise yapılacak işlemler.
            } else {
                alert('Bir hata oluştu: ' + textStatus);
            }
        },
        error: function (xhr, status, error) {
            alert('Bir hata oluştu: ' + error);// sonuç başarısız ise yapılacak işlemler.
        }
    });
}