function submit_film() {
  $(".isi-movie").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "GET",
    dataType: "json",
    data: {
      s: $("#search-input").val(),
      apikey: "4809ee5e",
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $(".isi-movie").append(
            `
                    <div class="card mt-3 " style="width: 18rem;">
                            <img src="` + data.Poster +`" class="card-img-top" alt="...">
                    <div class="card-body">
                                <h5 class="card-title">` +data.Title +`</h5>
                                <p class="card-text">` +data.Year +`</p>
                                <a type="button"  href="#" class="btn btn-primary lihat-detail "  data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID +`">liat detail</a>
                            </div>
                           
                        </div>
                    `
          );
        });
      } else {
        $(".isi-movie").html("<h1>Kosong sayang</h1>");
      }
    },
  });
}

$("#search-button").on("click", function () {
  submit_film();
});

$("#search-input").keypress(function (event) {
  // Menangkap tombol yang ditekan dan memeriksa apakah itu adalah Enter
  if (event.keyCode === 13) {
    // Melakukan aksi atau fungsi yang Anda inginkan di sini
    submit_film();
    console.log("sddsf");
  }
});

// $("#search-input").on("click", function () {
//   $(".isi-movie").html("");
// });

$(document).ready(function () {
  // Menggunakan event keypress untuk mendeteksi setiap kali pengguna mengetik pada input
  $("#myInput").keyup(function (event) {
    // Mendapatkan karakter yang ditekan oleh pengguna
    var charCode = event.which;

    // Menampilkan karakter yang ditekan pada konsol
    console.log("Karakter yang ditekan: " + String.fromCharCode(charCode));
  });
});

$('.isi-movie').on('click','.lihat-detail',function () {
    $(".modal-body").html(
        `
             
      
                `
      );
    let imdb_id = $(this).data('id')
    $.ajax({
        url: "http://www.omdbapi.com",
        type: "GET",
        dataType: "json",
        data: {
          i: imdb_id,
          apikey: "4809ee5e",
        },
        success: function (movie) {
            if (movie.Response == "True") {
                $(".modal-body").append(
                  `
                        <p>`+movie.Plot+`</p>
                
                          `
                );
            }
          },
    })
})
