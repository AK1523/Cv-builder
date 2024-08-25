import React from 'react';
import './ResumePreivew.css'; // Import the CSS file

const ResumePreview = () => {
  const resumeData = JSON.parse(localStorage.getItem('resumeData'));

  if (!resumeData) {
    return <div>No resume data found. Please fill out the form.</div>;
  }

  return (
    <div className="resume-container">
      <h1>Resume Preview</h1>

      <h2>Personal Information</h2>
      <p><strong>Name:</strong> {resumeData.personalInfo?.name}</p>
      <p><strong>Email:</strong> {resumeData.personalInfo?.email}</p>
      <p><strong>Phone:</strong> {resumeData.personalInfo?.phone}</p>

      <h2>Education</h2>
      {resumeData.education && resumeData.education.length > 0 ? (
        resumeData.education.map((edu, index) => (
          <div key={index}>
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>Institution:</strong> {edu.institution}</p>
            <p><strong>Year of Graduation:</strong> {edu.graduationYear}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No education entries found.</p>
      )}

      <h2>Work Experience</h2>
      {resumeData.workExperience && resumeData.workExperience.length > 0 ? (
        resumeData.workExperience.map((work, index) => (
          <div key={index}>
            <p><strong>Job Title:</strong> {work.jobTitle}</p>
            <p><strong>Company:</strong> {work.company}</p>
            <p><strong>Years of Experience:</strong> {work.years}</p>
            <p><strong>Description:</strong> {work.description}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No work experience entries found.</p>
      )}

      <h2>Skills</h2>
      {resumeData.skills && Array.isArray(resumeData.skills) && resumeData.skills.length > 0 ? (
        <ul className="skills-list">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill.value}</li>
          ))}
        </ul>
      ) : (
        <p>No skills added.</p>
      )}
    </div>
  );
};

export default ResumePreview;
