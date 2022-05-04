const CLIENT_ID = "Iv1.eb4523af07cd8312";
const CLIENT_SECRET = "6852d1604c9c181bec03c3f22e05c40088d934f3";

export function fetchUser(userName) {
  return fetch(
    `https://api.github.com/users/${userName}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return "깃헙과 연동이 필요합니다.";
    }
  });
}

export function fetchRepos(userName) {
  return fetch(
    `https://api.github.com/users/${userName}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    return response.json();
  });
}

export function fetchRepoLanguage(userName, repoName) {
  return fetch(
    `https://api.github.com/repos/${userName}/${repoName}/languages?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    return response.json();
  });
}
