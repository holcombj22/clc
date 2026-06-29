// Registration form validation
const registrationForm = document.getElementById("registration");
if (registrationForm) {
    registrationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        
        // Validation
        if (!firstName || !lastName) {
            alert("Please enter your first and last name.");
            return;
        }
        
        if (!email || !isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        if (!phone || !isValidPhone(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }
        
        if (!service) {
            alert("Please select a service type.");
            return;
        }
        
        // If all validations pass
        alert("Thank you for registering! We'll be in touch soon.");
        registrationForm.reset();
    });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (!name || !email || !subject || !message) {
            alert("Please fill out all fields.");
            return;
        }
        
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        alert("Thank you for your message! We'll respond within 24 hours.");
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    // Accept various phone formats
    const phoneRegex = /^[\d\s\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
    return phoneRegex;
}

// Add real-time validation feedback
document.querySelectorAll("input, textarea, select").forEach(field => {
    field.addEventListener("blur", function() {
        validateField(this);
    });
    
    field.addEventListener("focus", function() {
        this.style.borderColor = "";
    });
});

function validateField(field) {
    let isValid = true;
    
    if (field.hasAttribute("required") && !field.value.trim()) {
        isValid = false;
    }
    
    if (field.type === "email" && field.value && !isValidEmail(field.value)) {
        isValid = false;
    }
    
    if (field.id === "phone" && field.value && !isValidPhone(field.value)) {
        isValid = false;
    }
    
    field.style.borderColor = isValid ? "#ddd" : "#d32f2f";
}