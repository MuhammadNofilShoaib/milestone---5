import { jsPDF } from 'jspdf';

document.addEventListener('DOMContentLoaded', () => {
    // TypeScript type definitions
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const shareLinkMessage = document.getElementById('shareLinkMessage') as HTMLParagraphElement;

    // Generate Resume Button
    document.getElementById('generateResume')?.addEventListener('click', () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
        const photoInput = document.getElementById('photo') as HTMLInputElement;
        const photo = photoInput.files?.[0];

        if (photo) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
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

        (document.getElementById('resumeName') as HTMLHeadingElement).innerText = name;
        (document.getElementById('resumeEmail') as HTMLParagraphElement).innerText = email;
        (document.getElementById('resumeEducation') as HTMLParagraphElement).innerText = education;
        (document.getElementById('resumeExperience') as HTMLParagraphElement).innerText = experience;
        (document.getElementById('resumeSkills') as HTMLParagraphElement).innerText = skills;

        // Generate a unique URL based on username
        const uniqueURL = `http://${username}.vercel.app/resume`; // Example URL, replace with actual URL logic
        shareLinkMessage.innerText = `Your resume is available at: ${uniqueURL}`;

        resumeOutput.style.display = 'block';
    });

    // Download PDF Button
    document.getElementById('downloadPDF')?.addEventListener('click', () => {
        const doc = new jsPDF();
        doc.text('Resume', 10, 10);
        doc.text(`Name: ${(document.getElementById('resumeName') as HTMLHeadingElement).innerText}`, 10, 20);
        doc.text(`Email: ${(document.getElementById('resumeEmail') as HTMLParagraphElement).innerText}`, 10, 30);
        doc.text(`Education: ${(document.getElementById('resumeEducation') as HTMLParagraphElement).innerText}`, 10, 40);
        doc.text(`Experience: ${(document.getElementById('resumeExperience') as HTMLParagraphElement).innerText}`, 10, 50);
        doc.text(`Skills: ${(document.getElementById('resumeSkills') as HTMLParagraphElement).innerText}`, 10, 60);

        const resumePhoto = document.getElementById('resumePhoto') as HTMLImageElement;
        if (resumePhoto.src) {
            doc.addImage(resumePhoto.src, 'JPEG', 10, 70, 50, 50);
        }

        doc.save('resume.pdf');
    });

    // Save Resume Button
    document.getElementById('saveResume')?.addEventListener('click', () => {
        const resumeData = {
            name: (document.getElementById('resumeName') as HTMLHeadingElement).innerText,
            email: (document.getElementById('resumeEmail') as HTMLParagraphElement).innerText,
            education: (document.getElementById('resumeEducation') as HTMLParagraphElement).innerText,
            experience: (document.getElementById('resumeExperience') as HTMLParagraphElement).innerText,
            skills: (document.getElementById('resumeSkills') as HTMLParagraphElement).innerText,
            photo: (document.getElementById('resumePhoto') as HTMLImageElement).src
        };
        localStorage.setItem('savedResume', JSON.stringify(resumeData));
        alert('Resume saved successfully!');
    });
});
