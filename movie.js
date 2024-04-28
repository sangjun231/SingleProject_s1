const getMovie = async (val = "") => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTgyODI3ZDZmZmE5NDRjNDU2N2FlODIzZTE1ZTJkZiIsInN1YiI6IjY2MjYyNTI4ZWI3OWMyMDE2NWQ0M2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bdvFO8e_naip64AYTGlq-zQSBQdh2vSqX6BTdRn-yH4",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
    options
  );
  const json = await response.json();

  const responseArray = json.results;
  const movieInfo = responseArray
    .map((movieInfo, i) => {
      if (movieInfo.title.includes(val))
        return `
      <div class="movieInfo" id="${movieInfo.id}">
        <img class="movieImg" src="https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}" />
        <p class="movieTitle" id="movieName">${movieInfo.title}</p>
        <p class="movieOverview">${movieInfo.overview}</p>
        <p class="movieVoteAverage">Rating: ${movieInfo.vote_average}</p>
      </div>`;
    })
    .join("");

  const movieSection = document.getElementById("movieSection");
  //movieSection.innerHTML = "";
  movieSection.innerHTML = movieInfo;

  // const movieName = document.querySelectorAll(".movieTitle");
  // const movieId = event.target.getAttribute("class");
  document.addEventListener("click", (event) => {
    event.target.closest(".movieInfo") &&
      alert("movieID : " + event.target.closest(".movieInfo").id);
    // console.log(event.target.closest(".movieInfo").children[1].innerText);
    // console.log(event.target.closest(".movieInfo").children);
  });

  const searchInput = document.getElementById("Text");
  const searchButton = document.getElementById("Button");
  searchButton.addEventListener("click", (x) => {
    x.preventDefault(); // << 얘 중요함 알아보자
    const val = searchInput.value;
    console.log(val);
    getMovie(val);

    // 전체 리스트 저장 -> 배열 필터 함수(맵 필터 중요)
    // 객체: 변수 타입 (데이터 타입 { key: value })
    // 함수: 인풋 아웃풋 (매개변수(공백도) , 리턴값) 필수
    // 메소드 : 객체가 가진 여러가지 기능
    // a && 실행문? -> a가 참일 때 함수 실행 (조건부 실행) / a || 실행문? -> a가 undefined일 때(=존재X) 함수 실행
  });
};

await getMovie();
