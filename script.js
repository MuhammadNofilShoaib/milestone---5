document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const shareLinkMessage = document.getElementById('shareLinkMessage');
    
    // Helper function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Generate Resume Button
    document.getElementById('generateResume').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const photoInput = document.getElementById('photo');
        const photo = photoInput.files?.[0];

        if (photo) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const photoUrl = event.target.result;
                document.getElementById('resumePhoto').src = photoUrl;
                document.getElementById('resumePhoto').style.display = 'block';
            };
            reader.readAsDataURL(photo);
        } else {
            document.getElementById('resumePhoto').style.display = 'none';
        }

        document.getElementById('resumeName').innerText = name;
        document.getElementById('resumeEmail').innerText = email;
        document.getElementById('resumeEducation').innerText = education;
        document.getElementById('resumeExperience').innerText = experience;
        document.getElementById('resumeSkills').innerText = skills;

        const uniqueURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
        shareLinkMessage.innerHTML = `Your resume is available at: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>`;

        // Show the resume output
        resumeOutput.style.display = 'block';
    });

    // Save Resume Button
    document.getElementById('saveResume').addEventListener('click', () => {
        const resumeData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            education: document.getElementById('education').value,
            experience: document.getElementById('experience').value,
            skills: document.getElementById('skills').value,
        };

        const username = document.getElementById('username').value;
        localStorage.setItem(username, JSON.stringify(resumeData));
        alert('Resume saved locally!');
    });

    // Download PDF Button
    document.getElementById('downloadPDF').addEventListener('click', () => {
        const doc = new jspdf.jsPDF();
        const name = document.getElementById('resumeName').innerText;
        const email = document.getElementById('resumeEmail').innerText;
        const education = document.getElementById('resumeEducation').innerText;
        const experience = document.getElementById('resumeExperience').innerText;
        const skills = document.getElementById('resumeSkills').innerText;

        doc.text(`Name: ${name}`, 10, 10);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Education: ${education}`, 10, 30);
        doc.text(`Work Experience: ${experience}`, 10, 40);
        doc.text(`Skills: ${skills}`, 10, 50);

        doc.save('resume.pdf');
    });

    // Load Resume if "username" param is present
    const loadedUsername = getQueryParam('username');
    if (loadedUsername) {
        const storedResume = localStorage.getItem(loadedUsername);
        if (storedResume) {
            const resumeData = JSON.parse(storedResume);

            document.getElementById('resumeName').innerText = resumeData.name;
            document.getElementById('resumeEmail').innerText = resumeData.email;
            document.getElementById('resumeEducation').innerText = resumeData.education;
            document.getElementById('resumeExperience').innerText = resumeData.experience;
            document.getElementById('resumeSkills').innerText = resumeData.skills;

            shareLinkMessage.innerHTML = `Your resume is available at: <a href="${window.location.href}" target="_blank">${window.location.href}</a>`;
            resumeOutput.style.display = 'block';
        }
    }
});
