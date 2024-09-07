import { jsPDF } from 'jspdf';

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLElement;
    const shareLinkMessage = document.getElementById('shareLinkMessage') as HTMLElement;
    
    function getQueryParam(param: string): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    document.getElementById('generateResume')?.addEventListener('click', () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLInputElement).value;
        const experience = (document.getElementById('experience') as HTMLInputElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value;
        const photoInput = document.getElementById('photo') as HTMLInputElement;
        const photo = photoInput.files?.[0];

        if (photo) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const photoUrl = event.target?.result as string;
                const resumePhoto = document.getElementById('resumePhoto') as HTMLImageElement;
                resumePhoto.src = photoUrl;
                resumePhoto.style.display = 'block';
            };
            reader.readAsDataURL(photo);
        } else {
            const resumePhoto = document.getElementById('resumePhoto') as HTMLImageElement;
            resumePhoto.style.display = 'none';
        }

        (document.getElementById('resumeName') as HTMLElement).innerText = name;
        (document.getElementById('resumeEmail') as HTMLElement).innerText = email;
        (document.getElementById('resumeEducation') as HTMLElement).innerText = education;
        (document.getElementById('resumeExperience') as HTMLElement).innerText = experience;
        (document.getElementById('resumeSkills') as HTMLElement).innerText = skills;

        const uniqueURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
        shareLinkMessage.innerHTML = `Your resume is available at: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>`;

        resumeOutput.style.display = 'block';
    });

    document.getElementById('saveResume')?.addEventListener('click', () => {
        const resumeData = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            education: (document.getElementById('education') as HTMLInputElement).value,
            experience: (document.getElementById('experience') as HTMLInputElement).value,
            skills: (document.getElementById('skills') as HTMLInputElement).value,
        };

        const username = (document.getElementById('username') as HTMLInputElement).value;
        localStorage.setItem(username, JSON.stringify(resumeData));
        alert('Resume saved locally!');
    });

    document.getElementById('downloadPDF')?.addEventListener('click', () => {
        const doc = new jsPDF();
        const name = (document.getElementById('resumeName') as HTMLElement).innerText;
        const email = (document.getElementById('resumeEmail') as HTMLElement).innerText;
        const education = (document.getElementById('resumeEducation') as HTMLElement).innerText;
        const experience = (document.getElementById('resumeExperience') as HTMLElement).innerText;
        const skills = (document.getElementById('resumeSkills') as HTMLElement).innerText;

        doc.text(`Name: ${name}`, 10, 10);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Education: ${education}`, 10, 30);
        doc.text(`Work Experience: ${experience}`, 10, 40);
        doc.text(`Skills: ${skills}`, 10, 50);

        doc.save('resume.pdf');
    });

    const loadedUsername = getQueryParam('username');
    if (loadedUsername) {
        const storedResume = localStorage.getItem(loadedUsername);
        if (storedResume) {
            const resumeData = JSON.parse(storedResume);

            (document.getElementById('resumeName') as HTMLElement).innerText = resumeData.name;
            (document.getElementById('resumeEmail') as HTMLElement).innerText = resumeData.email;
            (document.getElementById('resumeEducation') as HTMLElement).innerText = resumeData.education;
            (document.getElementById('resumeExperience') as HTMLElement).innerText = resumeData.experience;
            (document.getElementById('resumeSkills') as HTMLElement).innerText = resumeData.skills;

            shareLinkMessage.innerHTML = `Your resume is available at: <a href="${window.location.href}" target="_blank">${window.location.href}</a>`;
            resumeOutput.style.display = 'block';
        }
    }
});
