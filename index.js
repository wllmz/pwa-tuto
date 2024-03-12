const template = document.getElementById("card");

async function load() {
  const postsContainer = document.getElementById("posts");
  const spinner = loader();
  postsContainer.appendChild(spinner);
  try {
    const posts = await fetch("/posts.json").then((d) => d.json());
    for (const post of posts) {
      postsContainer.appendChild(generatePost(post));
    }
  } catch (e) {
    const errorElement = error();
    postsContainer.appendChild(errorElement);
    const reload = (e) => {
      window.removeEventListener("online", reload);
      e.preventDefault();
      errorElement.remove();
      load();
    };
    window.addEventListener("online", reload);
    errorElement.querySelector(".js-reload").addEventListener("click", reload);
  }
  spinner.remove();
}

function error() {
  const div = document.createElement("div");
  div.appendChild(
    document.importNode(document.getElementById("error").content, true)
  );
  return div;
}

function loader() {
  const div = document.createElement("div");
  div.appendChild(
    document.importNode(document.getElementById("loader").content, true)
  );
  return div;
}

function generatePost(post) {
  const clone = document.importNode(template.content, true);
  clone.querySelector(".js-body").innerText = post.body;
  clone.querySelector(".js-title").innerText = post.title;
  return clone;
}

function wait(time = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, time);
  });
}

load();
