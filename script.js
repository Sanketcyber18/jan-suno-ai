// JAN-SUNO AI - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // Get HTML elements
    const complaintForm = document.getElementById("complaintForm");
    const trackForm = document.getElementById("trackForm");

    // Get complaints from Local Storage
    let complaints = [];

    try {
        complaints = JSON.parse(localStorage.getItem("janSunOComplaints")) || [];
    } catch (error) {
        complaints = [];
    }

    // Save complaints
    function saveComplaints() {
        localStorage.setItem(
            "janSunOComplaints",
            JSON.stringify(complaints)
        );
    }

    // Generate Tracking ID
    function generateTrackingID() {
        return "JS-" + Date.now().toString().slice(-8);
    }

    // AI-style complaint analysis (keyword-based demo)
    function analyzeComplaint(message) {
        const text = message.toLowerCase();

        if (
            text.includes("road") ||
            text.includes("sadak") ||
            text.includes("pothole")
        ) {
            return {
                category: "Road & Transport",
                department: "Public Works Department",
                priority: "High"
            };
        }

        if (
            text.includes("water") ||
            text.includes("pani") ||
            text.includes("supply")
        ) {
            return {
                category: "Water Supply",
                department: "Water Department",
                priority: "High"
            };
        }

        if (
            text.includes("electricity") ||
            text.includes("light") ||
            text.includes("bijli")
        ) {
            return {
                category: "Electricity",
                department: "Electricity Department",
                priority: "Medium"
            };
        }

        if (
            text.includes("garbage") ||
            text.includes("waste") ||
            text.includes("kachra")
        ) {
            return {
                category: "Sanitation",
                department: "Municipal Corporation",
                priority: "Medium"
            };
        }

        return {
            category: "General Complaint",
            department: "General Administration",
            priority: "Normal"
        };
    }

    // Update dashboard statistics
    function updateStats() {
        const totalElement = document.getElementById("totalComplaints");
        const resolvedElement = document.getElementById("resolvedComplaints");
        const pendingElement = document.getElementById("pendingComplaints");

        const total = complaints.length;

        const resolved = complaints.filter(function (item) {
            return item.status === "Resolved";
        }).length;

        const pending = total - resolved;

        if (totalElement) {
            totalElement.textContent = total;
        }

        if (resolvedElement) {
            resolvedElement.textContent = resolved;
        }

        if (pendingElement) {
            pendingElement.textContent = pending;
        }
    }

    // Submit complaint
    if (complaintForm) {
        complaintForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const location = document.getElementById("location").value.trim();
            const message = document.getElementById("complaint").value.trim();

            if (!name || !email || !location || !message) {
                alert("Please fill in all the fields.");
                return;
            }

            const analysis = analyzeComplaint(message);

            const newComplaint = {
                id: generateTrackingID(),
                name: name,
                email: email,
                location: location,
                message: message,
                category: analysis.category,
                department: analysis.department,
                priority: analysis.priority,
                status: "Pending",
                date: new Date().toLocaleDateString()
            };

            complaints.push(newComplaint);
            saveComplaints();
            updateStats();

            alert(
                "Complaint submitted successfully!\n\n" +
                "Your Tracking ID: " + newComplaint.id +
                "\nCategory: " + newComplaint.category +
                "\nDepartment: " + newComplaint.department +
                "\nPriority: " + newComplaint.priority
            );

            complaintForm.reset();
        });
    }

    // Track complaint
    if (trackForm) {
        trackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const trackingInput = document.getElementById("trackingId");

            if (!trackingInput) {
                return;
            }

            const trackingID = trackingInput.value.trim().toUpperCase();

            const result = complaints.find(function (item) {
                return item.id.toUpperCase() === trackingID;
            });

            if (result) {
                alert(
                    "Complaint Found!\n\n" +
                    "Tracking ID: " + result.id +
                    "\nCategory: " + result.category +
                    "\nDepartment: " + result.department +
                    "\nStatus: " + result.status +
                    "\nPriority: " + result.priority
                );
            } else {
                alert("Complaint not found. Please check your Tracking ID.");
            }
        });
    }

    // Initial dashboard update
    updateStats();

});