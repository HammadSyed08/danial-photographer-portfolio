/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

  const loader =
    document.getElementById("loader");

  setTimeout(() => {

    loader.classList.add("hidden");

  }, 1000);

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor =
  document.getElementById("cursor");

let cursorX = 0;
let cursorY = 0;

let currentX = 0;
let currentY = 0;


if (window.innerWidth > 700) {

  document.addEventListener(
    "mousemove",
    (event) => {

      cursorX = event.clientX;
      cursorY = event.clientY;

    }
  );


  function animateCursor() {

    currentX +=
      (cursorX - currentX) * 0.18;

    currentY +=
      (cursorY - currentY) * 0.18;

    cursor.style.left =
      `${currentX}px`;

    cursor.style.top =
      `${currentY}px`;

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  document
    .querySelectorAll(
      "a, button, .gallery-item"
    )
    .forEach((element) => {

      element.addEventListener(
        "mouseenter",
        () => {

          cursor.classList.add(
            "hover"
          );

        }
      );

      element.addEventListener(
        "mouseleave",
        () => {

          cursor.classList.remove(
            "hover"
          );

        }
      );

    });

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton =
  document.getElementById("menuButton");

const navigation =
  document.getElementById("navigation");


menuButton.addEventListener(
  "click",
  () => {

    menuButton.classList.toggle(
      "active"
    );

    navigation.classList.toggle(
      "open"
    );

  }
);


document
  .querySelectorAll(".navigation a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        navigation.classList.remove(
          "open"
        );

        menuButton.classList.remove(
          "active"
        );

      }
    );

  });


/* =========================================
   THEME
========================================= */

const themeButton =
  document.getElementById("themeButton");


const savedTheme =
  localStorage.getItem(
    "daniel-theme"
  );


if (savedTheme === "dark") {

  document.body.classList.add(
    "dark"
  );

}


themeButton.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );

    const isDark =
      document.body.classList.contains(
        "dark"
      );

    localStorage.setItem(
      "daniel-theme",
      isDark
        ? "dark"
        : "light"
    );

  }
);


/* =========================================
   SCROLL PROGRESS
========================================= */

const scrollProgress =
  document.getElementById(
    "scrollProgress"
  );


window.addEventListener(
  "scroll",
  () => {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;

    const percentage =
      (scrollTop / documentHeight) *
      100;

    scrollProgress.style.width =
      `${percentage}%`;

  }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "active"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================================
   GALLERY FILTER
========================================= */

const filters =
  document.querySelectorAll(
    ".filter"
  );

const galleryItems =
  document.querySelectorAll(
    ".gallery-item"
  );


filters.forEach(
  (filter) => {

    filter.addEventListener(
      "click",
      () => {

        filters.forEach(
          (item) => {

            item.classList.remove(
              "active"
            );

          }
        );

        filter.classList.add(
          "active"
        );


        const category =
          filter.dataset.filter;


        galleryItems.forEach(
          (item) => {

            if (
              category === "all" ||
              item.dataset.category ===
              category
            ) {

              item.style.display =
                "block";

              requestAnimationFrame(
                () => {

                  item.style.opacity =
                    "1";

                }
              );

            } else {

              item.style.opacity =
                "0";

              setTimeout(
                () => {

                  item.style.display =
                    "none";

                },
                300
              );

            }

          }
        );

      }
    );

  }
);


/* =========================================
   LIGHTBOX
========================================= */

const lightbox =
  document.getElementById(
    "lightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const lightboxTitle =
  document.getElementById(
    "lightboxTitle"
  );

const lightboxLocation =
  document.getElementById(
    "lightboxLocation"
  );

const lightboxClose =
  document.getElementById(
    "lightboxClose"
  );

const lightboxPrev =
  document.getElementById(
    "lightboxPrev"
  );

const lightboxNext =
  document.getElementById(
    "lightboxNext"
  );


let currentGalleryIndex = 0;


/*
   Get only gallery elements
   that are currently visible.
*/

function getVisibleGalleryItems() {

  return Array.from(
    galleryItems
  ).filter(
    (item) =>
      item.style.display !==
      "none"
  );

}


/*
   Open lightbox
*/

function openLightbox(index) {

  const visibleItems =
    getVisibleGalleryItems();

  if (!visibleItems.length) {
    return;
  }

  currentGalleryIndex = index;

  const item =
    visibleItems[
    currentGalleryIndex
    ];

  lightboxImage.src =
    item.dataset.image;

  lightboxImage.alt =
    item.dataset.title;

  lightboxTitle.textContent =
    item.dataset.title;

  lightboxLocation.textContent =
    item.dataset.location;

  lightbox.classList.add(
    "open"
  );

  document.body.classList.add(
    "no-scroll"
  );

}


/*
   Gallery click
*/

galleryItems.forEach(
  (item) => {

    item.addEventListener(
      "click",
      () => {

        const visibleItems =
          getVisibleGalleryItems();

        const index =
          visibleItems.indexOf(
            item
          );

        openLightbox(index);

      }
    );

  }
);


/*
   Close
*/

function closeLightbox() {

  lightbox.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "no-scroll"
  );

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


/*
   Next
*/

lightboxNext.addEventListener(
  "click",
  () => {

    const items =
      getVisibleGalleryItems();

    currentGalleryIndex++;

    if (
      currentGalleryIndex >=
      items.length
    ) {

      currentGalleryIndex = 0;

    }

    const item =
      items[currentGalleryIndex];

    lightboxImage.src =
      item.dataset.image;

    lightboxImage.alt =
      item.dataset.title;

    lightboxTitle.textContent =
      item.dataset.title;

    lightboxLocation.textContent =
      item.dataset.location;

  }
);


/*
   Previous
*/

lightboxPrev.addEventListener(
  "click",
  () => {

    const items =
      getVisibleGalleryItems();

    currentGalleryIndex--;

    if (
      currentGalleryIndex < 0
    ) {

      currentGalleryIndex =
        items.length - 1;

    }

    const item =
      items[currentGalleryIndex];

    lightboxImage.src =
      item.dataset.image;

    lightboxImage.alt =
      item.dataset.title;

    lightboxTitle.textContent =
      item.dataset.title;

    lightboxLocation.textContent =
      item.dataset.location;

  }
);


/*
   Close by clicking outside
*/

lightbox.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      lightbox
    ) {

      closeLightbox();

    }

  }
);


/*
   Keyboard controls
*/

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !lightbox.classList.contains(
        "open"
      )
    ) {
      return;
    }

    if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }

    if (
      event.key === "ArrowRight"
    ) {

      lightboxNext.click();

    }

    if (
      event.key === "ArrowLeft"
    ) {

      lightboxPrev.click();

    }

  }
);


/* =========================================
   STORIES SLIDER
========================================= */

const storiesTrack =
  document.getElementById(
    "storiesTrack"
  );

const storyNext =
  document.getElementById(
    "storyNext"
  );

const storyPrev =
  document.getElementById(
    "storyPrev"
  );


let storyPosition = 0;


function storyStep() {

  const slide =
    document.querySelector(
      ".story-slide"
    );

  const style =
    window.getComputedStyle(
      storiesTrack
    );

  const gap =
    parseFloat(
      style.columnGap ||
      style.gap ||
      25
    );

  return slide.offsetWidth + gap;

}


function maxStoryPosition() {

  return Math.max(
    0,
    storiesTrack.scrollWidth -
    storiesTrack.parentElement
      .offsetWidth
  );

}


storyNext.addEventListener(
  "click",
  () => {

    storyPosition +=
      storyStep();

    const max =
      maxStoryPosition();

    if (
      storyPosition > max
    ) {

      storyPosition = 0;

    }

    storiesTrack.style.transform =
      `translateX(-${storyPosition}px)`;

  }
);


storyPrev.addEventListener(
  "click",
  () => {

    storyPosition -=
      storyStep();

    const max =
      maxStoryPosition();

    if (
      storyPosition < 0
    ) {

      storyPosition = max;

    }

    storiesTrack.style.transform =
      `translateX(-${storyPosition}px)`;

  }
);


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
  document.querySelector(
    ".hero-background img"
  );


window.addEventListener(
  "scroll",
  () => {

    const scroll =
      window.scrollY;

    if (
      scroll <
      window.innerHeight
    ) {

      heroImage.style.transform =
        `scale(1.02)
                 translateY(${scroll * 0.08}px)`;

    }

  }
);


/* =========================================
   ESCAPE BODY SCROLL
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      navigation.classList.remove(
        "open"
      );

      menuButton.classList.remove(
        "active"
      );

    }

  }
);