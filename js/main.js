import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration from your project
const firebaseConfig = {
    apiKey: "AIzaSyDxbNqqxoWr9nBMYujSXnqD-KnYPoOPMd0",
    authDomain: "tasktimes-vn.firebaseapp.com",
    projectId: "tasktimes-vn",
    storageBucket: "tasktimes-vn.firebasestorage.app",
    messagingSenderId: "561471525471",
    appId: "1:561471525471:web:45f9ec52ac1c2f1fa7c1ea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password visibility logic for index.html
const toggleEye = document.getElementById('toggleEye');
if (toggleEye) {
    toggleEye.addEventListener('click', () => {
        const passInput = document.getElementById('password');
        passInput.type = passInput.type === 'password' ? 'text' : 'password';
    });
}

// Submit request logic for request.html
const submitReq = document.getElementById('submitReq');
if (submitReq) {
    submitReq.addEventListener('click', async () => {
        // Retrieve data from input fields based on your provided templates
        const name = document.getElementById('req-name').value;
        const email = document.getElementById('req-email').value;
        const address = document.getElementById('req-address').value; // Your address field
        const statusMsg = document.getElementById('status-msg');

        // Validation check
        if (!name || !email || !address) {
            alert("Please fill in all required fields!");
            return;
        }

        try {
            // Send data to the created "inviteRequests" collection
            await addDoc(collection(db, "inviteRequests"), {
                fullName: name,
                email: email,
                address: address,
                timestamp: serverTimestamp()
            });

            // Display success message matching the image template
            statusMsg.innerText = "✨ Success! Your request has been sent.";
            statusMsg.style.color = "#2ecc71";
            
            // Redirect to home page after 2 seconds
            setTimeout(() => { window.location.href = "index.html"; }, 2000);
        } catch (e) {
            alert("Error: " + e.message);
        }
    });
}
