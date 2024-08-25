import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField, Box, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const WorkExperience = () => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience'
  });

  return (
    <Box>
      {fields.map((item, index) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Job Title"
            {...register(`workExperience.${index}.jobTitle`, { required: 'Job title is required' })}
            error={!!errors.workExperience?.[index]?.jobTitle}
            helperText={errors.workExperience?.[index]?.jobTitle?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Company"
            {...register(`workExperience.${index}.company`, { required: 'Company is required' })}
            error={!!errors.workExperience?.[index]?.company}
            helperText={errors.workExperience?.[index]?.company?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Years of Experience"
            type="number"
            {...register(`workExperience.${index}.years`, {
              required: 'Years of experience is required',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Enter a valid number of years'
              }
            })}
            error={!!errors.workExperience?.[index]?.years}
            helperText={errors.workExperience?.[index]?.years?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            {...register(`workExperience.${index}.description`)}
            margin="normal"
          />

          <IconButton color="secondary" onClick={() => remove(index)} aria-label="delete">
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        color="primary"
        startIcon={<Add />}
        onClick={() => append({ jobTitle: '', company: '', years: '', description: '' })}
      >
        Add Work Experience
      </Button>
    </Box>
  );
};

export default WorkExperience;
