import { primaryColor } from "./css-vars";

const slideshows = document.getElementsByClassName(
  "slideshow"
) as HTMLCollectionOf<HTMLElement>;

for (let j = 0; j < slideshows.length; ++j) {
  const slideshow = slideshows[j];
  slideshow.style.position = "relative";
  slideshow.style.width = "min(100%, 1200px)";
  slideshow.style.height = "auto";
  slideshow.style.minHeight = slideshow.getAttribute("min-height") || "69vh";
  slideshow.style.marginLeft = "auto";
  slideshow.style.marginRight = "auto";
  slideshow.style.overflow = "hidden";

  const slides = slideshow.children as HTMLCollectionOf<HTMLElement>;
  for (let k = 0; k < slides.length; ++k) {
    const slide = slides[k];
    slide.style.width = "100%";
    slide.style.height = "auto";
    slide.style.marginLeft = "auto";
    slide.style.marginRight = "auto";
  }

  let i = 0;

  hideChildren(slides, () => true);
  slides[i].style.display = "block";

  const leftButton = document.createElement("button");
  leftButton.setAttribute("slideshow-button", "true");
  leftButton.addEventListener("click", () => {
    hideChildren(slides, (child) => !child.hasAttribute("slideshow-button"));
    do {
      --i;
      i = i < 0 ? slides.length - 1 : i;
    } while (slides[i].hasAttribute("slideshow-button"));
    slides[i].style.display = "block";
  });
  leftButton.style.left = "0";
  styleSlideshowBtn(leftButton);
  const rightButton = document.createElement("button");
  rightButton.setAttribute("slideshow-button", "true");
  rightButton.addEventListener("click", () => {
    hideChildren(slides, (child) => !child.hasAttribute("slideshow-button"));
    do {
      i = (i + 1) % slides.length;
    } while (slides[i].hasAttribute("slideshow-button"));
    slides[i].style.display = "block";
  });
  rightButton.style.right = "0";
  styleSlideshowBtn(rightButton);

  slideshow.appendChild(leftButton);
  slideshow.appendChild(rightButton);

  console.log("Slideshow initialized");
}

function hideChildren(
  children: HTMLCollectionOf<HTMLElement>,
  filter: (e: HTMLElement) => boolean
) {
  for (let j = 0; j < children.length; ++j) {
    const child = children[j];
    if (filter(child)) {
      child.style.display = "none";
    }
  }
}

function styleSlideshowBtn(btn: HTMLButtonElement) {
  btn.style.position = "absolute";
  btn.style.width = "max(10%, 50px)";
  btn.style.aspectRatio = "1/1";
  btn.style.borderRadius = "15px";
  btn.style.top = "40px";
  btn.style.fontSize = "x-large";
  btn.style.fontWeight = "1000";
  btn.style.border = "none";
  btn.style.backgroundColor = "var(--text-color)";
  btn.style.opacity = "0.5";
  btn.style.cursor = "pointer";
  btn.addEventListener("mouseover", () => {
    btn.style.opacity = "1";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.opacity = "0.5";
    btn.style.backgroundColor = "var(--text-color)";
  });
  btn.addEventListener("mousedown", () => {
    btn.style.backgroundColor = primaryColor();
  });
  btn.addEventListener("mouseup", () => {
    btn.style.backgroundColor = "var(--text-color)";
  });
}
