// Slideshow functionality
document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  let previousSlide = null;
  const slides = document.querySelectorAll(".slideshow-item");
  const dots = document.querySelectorAll(".slide-dot");
  let slideInterval;

  // Function to show specific slide
  function showSlide(index) {
    // If it's the first time, no previous slide
    if (previousSlide === null) {
      previousSlide = 0;
    } else {
      previousSlide = currentSlide;
    }
    
    // Update current slide
    currentSlide = index;
    
    // Hide all slides except current and previous
    slides.forEach((slide, i) => {
      if (i !== previousSlide && i !== currentSlide) {
        slide.classList.remove("current", "previous");
        slide.style.opacity = "0";
        slide.style.zIndex = "0";
      }
    });
    
    // Set previous slide
    if (previousSlide !== currentSlide) {
      slides[previousSlide].classList.remove("current");
      slides[previousSlide].classList.add("previous");
      slides[previousSlide].style.opacity = "0";
      slides[previousSlide].style.zIndex = "0";
    }
    
    // Show current slide
    slides[currentSlide].classList.remove("previous");
    slides[currentSlide].classList.add("current");
    slides[currentSlide].style.opacity = "1";
    slides[currentSlide].style.zIndex = "1";

    // Update dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
      dot.classList.add("opacity-60");
    });
    dots[currentSlide].classList.add("active");
    dots[currentSlide].classList.remove("opacity-60");
  }

  // Function to start/reset the slideshow timer
  function startSlideTimer() {
    // Clear existing timer if it exists
    if (slideInterval) {
      clearInterval(slideInterval);
    }

    // Start a new timer
    slideInterval = setInterval(function () {
      const nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 7000);
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      showSlide(index);
      startSlideTimer(); // Reset the timer when a dot is clicked
    });
  });

  // Initial setup - make all slides hidden except the first one
  slides.forEach((slide, index) => {
    if (index !== 0) {
      slide.style.opacity = "0";
      slide.style.zIndex = "0";
    } else {
      slide.classList.add("current");
      slide.style.opacity = "1";
      slide.style.zIndex = "1";
    }
  });

  // Initialize the first slide and start the timer
  showSlide(0);
  startSlideTimer();
});

// back to top
const button = document.getElementById("toTopButton");

button.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    button.classList.add("is-active");
  } else {
    button.classList.remove("is-active");
  }
});

// Hamburger menu functionality
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.querySelector(".mobile-nav");

hamburgerBtn.addEventListener("click", function () {
  // Toggle active class on button for animation
  this.classList.toggle("active");

  // Toggle mobile navigation
  mobileNav.classList.toggle("active");
  mobileNav.classList.toggle("hidden");

  // Prevent body scrolling when menu is open
  document.body.classList.toggle("overflow-hidden");
});

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll(".mobile-nav .navigation");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hamburgerBtn.classList.remove("active");
    mobileNav.classList.remove("active");
    mobileNav.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
});

// Gallery navigation
document.addEventListener("DOMContentLoaded", function () {
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const prevButton = document.querySelector(".gallery-prev");
  const nextButton = document.querySelector(".gallery-next");

  let currentPage = 0;
  const totalPages = document.querySelectorAll(".gallery-page").length;

  // Initialize buttons visibility
  updateButtonsVisibility();

  // Previous slide
  prevButton.addEventListener("click", function () {
    if (currentPage > 0) {
      currentPage--;
      updateGallery();
    }
  });

  // Next slide
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateGallery();
    }
  });

  function updateGallery() {
    galleryWrapper.style.transform = `translateX(-${currentPage * 100}%)`;
    updateButtonsVisibility();
  }

  function updateButtonsVisibility() {
    // Show/hide prev button
    prevButton.style.opacity = currentPage === 0 ? "0.5" : "1";
    prevButton.style.pointerEvents = currentPage === 0 ? "none" : "auto";

    // Show/hide next button
    nextButton.style.opacity = currentPage === totalPages - 1 ? "0.5" : "1";
    nextButton.style.pointerEvents =
      currentPage === totalPages - 1 ? "none" : "auto";
  }
});

// Setup image modal/lightbox functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal-close-btn");

  // Get all gallery images
  const galleryImages = document.querySelectorAll(".gallery-container img");
  const interactiveImages = document.querySelectorAll("#intractive .mx-2 img");


  // Add click event to all gallery images
  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Prepare the modal
      modal.classList.remove("hidden");
      modal.classList.add("flex", "modal-animate-in");

      // Reset image opacity and scale
      modalImg.style.opacity = "0";

      // Set image source
      modalImg.src = this.src;

      // Apply animation classes
      setTimeout(() => {
        modalImg.classList.add("modal-image-in");
      }, 100);

      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    });
  });

  // Add click event to all interactive images
  interactiveImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Prepare the modal
      modal.classList.remove("hidden");
      modal.classList.add("flex", "modal-animate-in");

      // Reset image opacity and scale
      modalImg.style.opacity = "0";

      // Set image source
      modalImg.src = this.src;

      // Apply animation classes
      setTimeout(() => {
        modalImg.classList.add("modal-image-in");
      }, 100);

      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal when clicking the close button
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeModal();
    });
  }

  // Close modal when clicking outside the image (but not when clicking the image itself)
  modal.addEventListener("click", function (e) {
    if (e.target !== modalImg) {
      closeModal();
    }
  });

  // Close modal on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.add("modal-animate-out");
    modalImg.classList.remove("modal-image-in");
    modalImg.classList.add("modal-image-out");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      modal.classList.remove("flex", "modal-animate-in", "modal-animate-out");
      modal.classList.add("hidden");
      modalImg.classList.remove("modal-image-out");
      document.body.style.overflow = ""; // Restore scrolling
    }, 300);
  }
});
