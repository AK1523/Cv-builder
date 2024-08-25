import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import { AppBar, Tabs, Tab, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ResumeForm = () => {
  const methods = useForm({ mode: 'onChange' });
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('resumeData'));
    if (savedData) {
      // Pre-fill personal information
      methods.setValue('personalInfo.name', savedData.personalInfo?.name || '');
      methods.setValue('personalInfo.email', savedData.personalInfo?.email || '');
      methods.setValue('personalInfo.phone', savedData.personalInfo?.phone || '');

      // Pre-fill education
      if (savedData.education) {
        savedData.education.forEach((edu, index) => {
          methods.setValue(`education.${index}.degree`, edu.degree || '');
          methods.setValue(`education.${index}.institution`, edu.institution || '');
          methods.setValue(`education.${index}.graduationYear`, edu.graduationYear || '');
        });
      }

      // Pre-fill work experience
      if (savedData.workExperience) {
        savedData.workExperience.forEach((work, index) => {
          methods.setValue(`workExperience.${index}.jobTitle`, work.jobTitle || '');
          methods.setValue(`workExperience.${index}.company`, work.company || '');
          methods.setValue(`workExperience.${index}.years`, work.years || '');
          methods.setValue(`workExperience.${index}.description`, work.description || '');
        });
      }

      // Pre-fill skills
      if (savedData.skills) {
        savedData.skills.forEach((skill, index) => {
          methods.setValue(`skills.${index}.value`, skill.value || '');
        });
      }

    }
  }, [methods]);

  const handleTabChange = async (newIndex) => {
    const isValid = await methods.trigger(); // Validate the current tab
    if (isValid || newIndex < tabIndex) {
      setTabIndex(newIndex);
    }
  };

  const onSubmit = (data) => {
    localStorage.setItem('resumeData', JSON.stringify(data));
    alert('Resume data saved!');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AppBar position="static">
          <Tabs
            value={tabIndex}
            variant="fullWidth"
            sx={{ backgroundColor: '#000' }} // Default background for all tabs
          >
            <Tab
              label="Personal Info"
              onClick={() => handleTabChange(0)}
              sx={{
                backgroundColor: tabIndex === 0 ? '#1976d2' : 'inherit',
                color: tabIndex === 0 ? '#fff' : 'inherit',
              }}
            />
            <Tab
              label="Education"
              onClick={() => handleTabChange(1)}
              sx={{
                backgroundColor: tabIndex === 1 ? '#1976d2' : 'inherit',
                color: tabIndex === 1 ? '#fff' : 'inherit',
              }}
            />
            <Tab
              label="Work Experience"
              onClick={() => handleTabChange(2)}
              sx={{
                backgroundColor: tabIndex === 2 ? '#1976d2' : 'inherit',
                color: tabIndex === 2 ? '#fff' : 'inherit',
              }}
            />
            <Tab
              label="Skills"
              onClick={() => handleTabChange(3)}
              sx={{
                backgroundColor: tabIndex === 3 ? '#1976d2' : 'inherit',
                color: tabIndex === 3 ? '#fff' : 'inherit',
              }}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={tabIndex} index={0}>
          <PersonalInfo />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Education />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <WorkExperience />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Skills />
        </TabPanel>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleTabChange(tabIndex - 1)}
            disabled={tabIndex === 0}
          >
            Back
          </Button>
          {tabIndex < 3 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleTabChange(tabIndex + 1)}
            >
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Save Resume
            </Button>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default ResumeForm;
