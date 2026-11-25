// Mobile Menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("show");
  });
});

// Booking Modal
function openModal(trainer = "") {
  document.getElementById("booking-modal").style.display = "block";

  if (trainer) {
    document.getElementById("trainer-name").value = trainer;
  }
}

function closeModal() {
  document.getElementById("booking-modal").style.display = "none";
}

// Close modal when clicking outside
document.getElementById("booking-modal").addEventListener("click", function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Set minimum booking date to today
const dateInput = document.getElementById("session-date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

dateInput.min = localToday;

// Time Slot Selection
const timeButtons = document.querySelectorAll(".time-btn");
const selectedTime = document.getElementById("selected-time");

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    timeButtons.forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    selectedTime.value = button.textContent.trim();
  });
});

// Workout Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const workoutCards = document.querySelectorAll(".workout-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    workoutCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Booking Form
const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const trainer = document.getElementById("trainer-name").value;
  const date = dateInput.value;
  const time = selectedTime.value;

  if (!name || !email || !trainer || !date || !time) {
    alert("Please fill in all details and select a time slot.");
    return;
  }

  if (date < localToday) {
    alert("Please select a valid future date.");
    return;
  }

  alert(
    "Booking Confirmed!\n\n" +
    "Name: " + name + "\n" +
    "Trainer: " + trainer + "\n" +
    "Date: " + date + "\n" +
    "Time: " + time + "\n\n" +
    "We will contact you shortly."
  );

  bookingForm.reset();
  selectedTime.value = "";
  timeButtons.forEach(btn => btn.classList.remove("selected"));
  closeModal();
});

console.log("FitConnect website loaded successfully!");
