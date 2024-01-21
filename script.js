let currentPage = 1;
const imageContainer = document.getElementById("image-container");
const loadMoreButton = document.getElementById("load-btn");

const getImageList = async (pageID) => {
  const response = await axios.get(
    `https://picsum.photos/v2/list?page=${pageID}&limit=50`
  );
  return response.data;
};

const createImageElement = (element) => {
  const imageItem = document.createElement("div");
  imageItem.className = "image-item";

  const imageLink = document.createElement("a");
  imageLink.className = "image-link";
  imageLink.href = element.download_url;
  imageLink.target = "_blank";

  const image = document.createElement("img");
  image.className = "image";
  image.src = "";
  image.classList.add("loading");
  image.addEventListener("load", () => {
    image.classList.remove("loading");
  });
  image.src = element.download_url;

  imageLink.appendChild(image);

  const imageContent = document.createElement("div");
  imageContent.className = "image-content";

  const imageAuthor = document.createElement("a");
  imageAuthor.className = "image-author";
  imageAuthor.href = element.url;
  imageAuthor.target = "_blank";
  imageAuthor.innerHTML = element.author;

  imageContent.appendChild(imageAuthor);

  imageItem.appendChild(imageLink);
  imageItem.appendChild(imageContent);

  return imageItem;
};

const loadImage = () => {
  getImageList(currentPage).then((result) => {
    result.forEach((element) => {
      const imageItem = createImageElement(element);
      imageContainer.appendChild(imageItem);
    });
    currentPage++;
  });
};

loadImage();

loadMoreButton.addEventListener("click", () => {
  loadImage();
});
