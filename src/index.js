import { fetchRepoLanguage, fetchRepos, fetchUser } from "./fetch.js";
import { $ } from "./utils.js";

google.charts.load("current", { packages: ["corechart"] });

const USER_NAME = "byeolyee";

function getDataTable(object) {
  return Object.entries(object);
}

function convertNullableText(text) {
  if (text === null) {
    return "값을 입력해주세요.";
  } else {
    return text;
  }
}

function attachUserLink(res) {
  $(".overview").href = `https://github.com/${res}`;
  $(".repositories").href = `https://github.com/${res}?tab=repositories`;
  $(".projects").href = `https://github.com/${res}?tab=projects`;
}

function renderUserInfo(userInfo) {
  $(".profile img").src = userInfo.avatar_url;
  $(".nickname").innerText = USER_NAME;
  $(".name").innerText = userInfo.name;
  $(".words").innerText = userInfo.bio;
  $(".followers").innerText = userInfo.followers;
  $(".following").innerText = userInfo.following;
  $(".location").innerText = convertNullableText(userInfo.location);
  $(".email").innerText = convertNullableText(userInfo.email);
}

function renderLanguageChart(dataTable) {
  if (!dataTable) {
    return;
  }

  const dataTableHeader = ["언어", "작성된 코드 라인"];

  const data = google.visualization.arrayToDataTable([
    dataTableHeader,
    ...dataTable
  ]);

  const options = {
    title: "",
    pieHole: 0.4
  };

  const chart = new google.visualization.PieChart(
    document.querySelector("#language-chart")
  );
  chart.draw(data, options);
}

function renderRepoList(repos) {
  repos.map((item) => {
    const createEl = document.createElement("div");
    createEl.classList.add("repository");
    createEl.innerHTML = `
      <span class="title">${item.full_name}</span>
      <span class="public">${item.visibility}</span>
    `;
    $(".wrapper").appendChild(createEl);
  });
}

function renderPortfolio() {
  fetchUser(USER_NAME).then((res) => {
    //console.log(res);
    renderUserInfo(res);
    console.log(res);
    attachUserLink(res.login);
    //코드샌드박스 브라우저 오른쪽 상단 open in new window에선 실행 됩니다.
  });

  fetchRepos(USER_NAME).then((repos) => {
    // console.log(repos);
    renderRepoList(repos);
  });

  // const totalLanguage = {};

  // const languageDataTable = getDataTable(totalLanguage);
  // renderLanguageChart(languageDataTable);
}

renderPortfolio();
