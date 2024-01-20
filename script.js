let currentPage = 1;
const getImageList = async (pageID) => {
  const response = await axios.get(
    `https://picsum.photos/v2/list?page=${pageID}&limit=50`
  );
  return response.data;
};
const loadImage = () => {
  getImageList(currentPage).then((result) => {
    result.forEach((element) => {
      const imageItem = document.createElement("div");
      imageItem.className = "image-item";

      const imageLink = document.createElement("a");
      imageLink.className = "image-link";
      const image = document.createElement("div");

      image.className = "image";
      const imageUrl = element.download_url.replace(/\/\d+\/\d+$/, "/1080");
      imageLink.href = element.download_url;
      imageLink.target = "_blank";
      image.style.backgroundImage = `url(${imageUrl})`;
      image.src = imageUrl;
      imageLink.appendChild(image);

      const imageContent = document.createElement("div");
      imageContent.className = "image-content";

      const imageAuthor = document.createElement("a");
      imageAuthor.href = element.url;
      imageAuthor.target = "_blank";
      imageAuthor.className = "image-author";
      imageAuthor.innerHTML = element.author;

      const imageID = document.createElement("p");
      imageID.className = "image-id";
      imageID.innerHTML = "#" + element.id;

      imageContent.appendChild(imageAuthor);
      imageContent.appendChild(imageID);

      imageItem.appendChild(imageLink);
      imageItem.appendChild(imageContent);

      imageContainer.appendChild(imageItem);
      console.log(element);
    });
    currentPage++;
    console.log(currentPage);
  });
};

loadImage();

const imageContainer = document.getElementById("image-container");

const loadMoreButton = document.getElementById("load-btn");
loadMoreButton.addEventListener("click", () => {
  loadImage();
});
