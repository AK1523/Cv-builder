import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField, Box, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const Education = () => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  });

  return (
    <Box>
      {fields.map((item, index) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Degree"
            {...register(`education.${index}.degree`, { required: 'Degree is required' })}
            error={!!errors.education?.[index]?.degree}
            helperText={errors.education?.[index]?.degree?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Institution"
            {...register(`education.${index}.institution`, { required: 'Institution is required' })}
            error={!!errors.education?.[index]?.institution}
            helperText={errors.education?.[index]?.institution?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Year of Graduation"
            type="number"
            {...register(`education.${index}.graduationYear`, {
              required: 'Graduation year is required',
              valueAsNumber: true,
              min: {
                value: 1900,
                message: 'Enter a valid year'
              },
              max: {
                value: new Date().getFullYear(),
                message: 'Year cannot be in the future'
              }
            })}
            error={!!errors.education?.[index]?.graduationYear}
            helperText={errors.education?.[index]?.graduationYear?.message}
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
        onClick={() => append({ degree: '', institution: '', graduationYear: '' })}
      >
        Add Education
      </Button>
    </Box>
  );
};

export default Education;
