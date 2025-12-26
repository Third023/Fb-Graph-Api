const appId = "2302267646954216";
const redirectUri = window.location.origin + "/";
let currentToken = null;

function loginWithFacebook() {
  const url = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  url.searchParams.append("client_id", appId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("scope", "public_profile");
  url.searchParams.append("response_type", "token");

  console.log("Redirecting to:", url.toString());
  window.location.href = url.toString();
}

function getAccessToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

async function fetchProfile(token) {
  // Request only basic public profile fields (no review required)
  const response = await fetch(
    "https://graph.facebook.com/me?fields=id,name,picture&access_token=" + token
  );
  return response.json();
}

function logout() {
  window.location.href = redirectUri;
}


window.onload = async () => {
  const token = getAccessToken();

  if (token) {
    document.getElementById("login-box").style.display = "none";

    const profile = await fetchProfile(token);

    document.getElementById("name").innerText = profile.name;
    document.getElementById("picture").src =
      profile.picture.data.url;

    document.getElementById("profile").style.display = "block";
  }
};

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}


