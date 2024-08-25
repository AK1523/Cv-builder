import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField, Box, Button } from '@mui/material';

const Skills = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills', // Name of the field array
  });

  return (
    <Box>
      <h2>Skills</h2>
      {fields.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            label={`Skill ${index + 1}`}
            {...register(`skills.${index}.value`, { required: 'Skill is required' })}
            error={!!errors.skills?.[index]?.value}
            helperText={errors.skills?.[index]?.value?.message}
            margin="normal"
          />
          <Button variant="contained" color="error" onClick={() => remove(index)} sx={{ ml: 2 }}>
            Remove
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={() => append({ value: '' })}>
        Add Skill
      </Button>
    </Box>
  );
};

export default Skills;
